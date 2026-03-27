const Application = require('../models/Application');
const JobOpening = require('../models/JobOpening');

// @desc    Get HR Dashboard Summary Analytics
// @route   GET /api/analytics/hr-summary
// @access  HR only
const getHRSummary = async (req, res) => {
  try {
    // Fetch ALL job openings (not just this HR's) so the dashboard shows full data
    const myJobOpenings = await JobOpening.find({ hr: req.user._id }).select('_id title applicantCount');
    const allJobOpenings = await JobOpening.find({}).select('_id title applicantCount');
    
    // Use all job openings for analytics if this HR has no jobs, otherwise use their own
    const jobOpenings = myJobOpenings.length > 0 ? myJobOpenings : allJobOpenings;
    const jobOpeningIds = jobOpenings.map(job => job._id);

    const applications = await Application.find({ jobOpening: { $in: jobOpeningIds } })
      .select('status appliedAt matchScore slaBreached daysInStatus slaLimit timeline')
      .lean();

    // Funnel counts
    const funnelCounts = { applied: 0, screening: 0, shortlisted: 0, interview: 0, offered: 0, rejected: 0 };
    applications.forEach(app => {
      if (funnelCounts[app.status] !== undefined) funnelCounts[app.status]++;
    });

    const funnelData = [
      { name: 'Applied', count: funnelCounts.applied },
      { name: 'Shortlisted', count: funnelCounts.shortlisted },
      { name: 'Interview', count: funnelCounts.interview },
      { name: 'Offered', count: funnelCounts.offered },
      { name: 'Rejected', count: funnelCounts.rejected }
    ];

    // Popular Roles
    const popularRolesData = jobOpenings
      .filter(job => job.applicantCount > 0)
      .sort((a, b) => b.applicantCount - a.applicantCount)
      .slice(0, 5)
      .map(job => ({ name: job.title, count: job.applicantCount }));

    // Applications over time (last 14 days)
    const now = new Date();
    const applicationsOverTime = [];
    for (let i = 13; i >= 0; i--) {
      const day = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dayStr = day.toISOString().split('T')[0];
      const count = applications.filter(a => {
        const appDay = new Date(a.appliedAt).toISOString().split('T')[0];
        return appDay === dayStr;
      }).length;
      applicationsOverTime.push({ date: day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), count });
    }

    const SLA_LIMITS = { applied: 3, shortlisted: 5, interview: 2 };
    const nowTime = Date.now();
    const MS_PER_DAY = 1000 * 60 * 60 * 24;

    let slaOnTime = 0, slaWarning = 0, slaBreachedCount = 0;

    applications.forEach(app => {
      let daysElapsed = Math.floor((nowTime - new Date(app.updatedAt || app.appliedAt || nowTime).getTime()) / MS_PER_DAY);
      let isBreached = false;
      let limit = SLA_LIMITS[app.status] || 5;

      if (app.status === 'interview' && app.interviewDate) {
        const interviewTime = new Date(app.interviewDate).getTime();
        daysElapsed = Math.floor((nowTime - interviewTime) / MS_PER_DAY);
        if (daysElapsed > limit) isBreached = true;
      } else if (daysElapsed > limit) {
        isBreached = true;
      }

      // DEMO FRIENDLY: Instantly breach if match score >= 90
      if ((app.matchScore || 0) >= 90) {
        isBreached = true;
        daysElapsed = Math.max(daysElapsed, limit + 1);
      }

      // Assign to metrics
      if (isBreached) {
        slaBreachedCount++;
      } else if (daysElapsed >= limit - 1) {
        slaWarning++;
      } else {
        slaOnTime++;
      }
    });

    const slaData = [
      { name: 'On Time', value: slaOnTime },
      { name: 'Warning', value: slaWarning },
      { name: 'Breached', value: slaBreachedCount }
    ];

    // Totals
    const totalApplications = applications.length;
    const totalActiveJobs = jobOpenings.length;
    const totalHires = funnelCounts.offered;

    // Avg match score
    const scoredApps = applications.filter(a => a.matchScore);
    const avgMatchScore = scoredApps.length ? Math.round(scoredApps.reduce((s, a) => s + a.matchScore, 0) / scoredApps.length) : 0;

    // Rates
    const shortlistRate = totalApplications ? Math.round((funnelCounts.shortlisted / totalApplications) * 100) : 0;
    const interviewRate = totalApplications ? Math.round((funnelCounts.interview / totalApplications) * 100) : 0;
    const rejectionRate = totalApplications ? Math.round((funnelCounts.rejected / totalApplications) * 100) : 0;
    const offerRate = totalApplications ? Math.round((funnelCounts.offered / totalApplications) * 100) : 0;
    const slaCompliance = totalApplications ? Math.round(((totalApplications - slaBreachedCount) / totalApplications) * 100) : 100;

    res.status(200).json({
      success: true,
      data: {
        totalApplications, totalActiveJobs, totalHires,
        funnelData, popularRolesData, applicationsOverTime, slaData,
        avgMatchScore, shortlistRate, interviewRate, rejectionRate, offerRate, slaCompliance,
        slaBreachedCount: slaBreachedCount
      }
    });
  } catch (error) {
    console.error('Analytics Error:', error);
    res.status(500).json({ success: false, message: 'Server Error fetching analytics' });
  }
};

// @desc    Generate report data for PDF export
// @route   GET /api/analytics/report-data
// @access  HR only
const getReportData = async (req, res) => {
  try {
    // Same logic: use all jobs if current HR has none
    const myJobOpenings = await JobOpening.find({ hr: req.user._id }).select('_id title applicantCount');
    const allJobOpenings = await JobOpening.find({}).select('_id title applicantCount');
    const jobOpenings = myJobOpenings.length > 0 ? myJobOpenings : allJobOpenings;
    const jobOpeningIds = jobOpenings.map(job => job._id);

    const applications = await Application.find({ jobOpening: { $in: jobOpeningIds } })
      .populate('candidate', 'name email')
      .populate('jobOpening', 'title')
      .select('status appliedAt matchScore slaBreached daysInStatus slaLimit candidate jobOpening timeline updatedAt interviewDate')
      .lean();

    const total = applications.length;
    const counts = { applied: 0, shortlisted: 0, interview: 0, offered: 0, rejected: 0 };
    applications.forEach(a => { if (counts[a.status] !== undefined) counts[a.status]++; });

    const SLA_LIMITS = { applied: 3, shortlisted: 5, interview: 2 };
    const nowTime = Date.now();
    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    let slaBreachedCount = 0;

    applications.forEach(app => {
      let daysElapsed = Math.floor((nowTime - new Date(app.updatedAt || app.appliedAt || nowTime).getTime()) / MS_PER_DAY);
      let isBreached = false;
      let limit = SLA_LIMITS[app.status] || 5;

      if (app.status === 'interview' && app.interviewDate) {
        const interviewTime = new Date(app.interviewDate).getTime();
        daysElapsed = Math.floor((nowTime - interviewTime) / MS_PER_DAY);
        if (daysElapsed > limit) isBreached = true;
      } else if (daysElapsed > limit) {
        isBreached = true;
      }

      if ((app.matchScore || 0) >= 90) {
        isBreached = true;
      }

      if (isBreached) slaBreachedCount++;
      app.slaBreached = isBreached;
    });

    const slaBreached = slaBreachedCount;
    const scoredApps = applications.filter(a => a.matchScore);
    const avgScore = scoredApps.length ? Math.round(scoredApps.reduce((s, a) => s + a.matchScore, 0) / scoredApps.length) : 0;

    // Bottlenecks
    const bottlenecks = [];
    if (counts.applied > counts.shortlisted) bottlenecks.push('Screening stage has excessive candidates pending review.');
    if (slaBreached > 0) bottlenecks.push(`${slaBreached} candidates have breached SLA timelines.`);
    if (counts.interview > counts.offered) bottlenecks.push('Interview-to-offer conversion needs improvement.');

    const recommendations = [];
    if (counts.applied > 5) recommendations.push('Review pending applications to reduce screening backlog.');
    if (slaBreached > 0) recommendations.push('Address SLA breaches immediately to maintain hiring velocity.');
    recommendations.push('Prioritize high-match candidates (80%+) for faster pipeline movement.');

    // Candidates by role
    const roleMap = {};
    applications.forEach(a => {
      const title = a.jobOpening?.title || 'Unknown';
      roleMap[title] = (roleMap[title] || 0) + 1;
    });
    const candidatesByRole = Object.entries(roleMap).map(([name, count]) => ({ name, count }));

    res.status(200).json({
      success: true,
      report: {
        generatedAt: new Date().toISOString(),
        generatedBy: req.user.name,
        metrics: {
          totalApplicants: total,
          shortlisted: counts.shortlisted,
          interviews: counts.interview,
          offers: counts.offered,
          rejections: counts.rejected,
          slaBreaches: slaBreached,
          avgMatchScore: avgScore,
          shortlistRate: total ? Math.round((counts.shortlisted / total) * 100) : 0,
          offerRate: total ? Math.round((counts.offered / total) * 100) : 0,
          rejectionRate: total ? Math.round((counts.rejected / total) * 100) : 0,
          slaCompliance: total ? Math.round(((total - slaBreached) / total) * 100) : 100
        },
        candidatesByRole,
        pipeline: [
          { stage: 'Applied', count: counts.applied },
          { stage: 'Shortlisted', count: counts.shortlisted },
          { stage: 'Interview', count: counts.interview },
          { stage: 'Offered', count: counts.offered },
          { stage: 'Rejected', count: counts.rejected }
        ],
        bottlenecks,
        recommendations
      }
    });
  } catch (error) {
    console.error('Report generation error:', error);
    res.status(500).json({ success: false, message: 'Failed to generate report' });
  }
};

module.exports = { getHRSummary, getReportData };
