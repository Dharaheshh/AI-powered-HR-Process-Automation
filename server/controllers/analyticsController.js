const Application = require('../models/Application');
const JobOpening = require('../models/JobOpening');

// @desc    Get HR Dashboard Summary Analytics
// @route   GET /api/analytics/hr-summary
// @access  HR only
const getHRSummary = async (req, res) => {
  try {
    const hrId = req.user._id;

    // 1. Get all job openings managed by this HR
    const jobOpenings = await JobOpening.find({ hr: hrId }).select('_id title applicantCount');
    const jobOpeningIds = jobOpenings.map(job => job._id);

    // 2. Fetch all applications for these jobs
    const applications = await Application.find({ jobOpening: { $in: jobOpeningIds } })
      .select('status appliedAt timeline')
      .lean();

    // 3. Compute Funnel Data
    const funnelCounts = {
      applied: 0,
      screening: 0,
      shortlisted: 0,
      interview: 0,
      offered: 0,
      rejected: 0
    };

    applications.forEach(app => {
      if (funnelCounts[app.status] !== undefined) {
        funnelCounts[app.status]++;
      }
    });

    const funnelData = [
      { name: 'Applied', count: funnelCounts.applied },
      { name: 'Shortlisted', count: funnelCounts.shortlisted },
      { name: 'Interview', count: funnelCounts.interview },
      { name: 'Offered', count: funnelCounts.offered },
      { name: 'Rejected', count: funnelCounts.rejected }
    ];

    // 4. Compute Top Roles Data
    const popularRolesData = jobOpenings
      .filter(job => job.applicantCount > 0)
      .sort((a, b) => b.applicantCount - a.applicantCount)
      .slice(0, 5)
      .map(job => ({ name: job.title, count: job.applicantCount }));

    // 5. Total counts
    const totalApplications = applications.length;
    const totalActiveJobs = jobOpenings.length;
    const totalHires = funnelCounts.offered;

    res.status(200).json({
      success: true,
      data: {
        totalApplications,
        totalActiveJobs,
        totalHires,
        funnelData,
        popularRolesData
      }
    });

  } catch (error) {
    console.error('Analytics Error:', error);
    res.status(500).json({ success: false, message: 'Server Error fetching analytics' });
  }
};

module.exports = { getHRSummary };
