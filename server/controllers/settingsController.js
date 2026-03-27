const HrSettings = require('../models/HrSettings');

const DEFAULT_WORKING_HOURS = [
  { day: 'Monday', start: '09:00', end: '18:00', isOff: false },
  { day: 'Tuesday', start: '09:00', end: '18:00', isOff: false },
  { day: 'Wednesday', start: '09:00', end: '18:00', isOff: false },
  { day: 'Thursday', start: '09:00', end: '18:00', isOff: false },
  { day: 'Friday', start: '09:00', end: '18:00', isOff: false },
  { day: 'Saturday', start: '10:00', end: '13:00', isOff: false },
  { day: 'Sunday', start: '00:00', end: '00:00', isOff: true },
];

const DEFAULT_INTERVIEW_SLOTS = [
  { name: 'Standard Screening', duration: '30 Minutes' },
  { name: 'Technical Review', duration: '45 Minutes' },
  { name: 'Culture Fit', duration: '45 Minutes' },
];

// @desc    Get HR availability settings
// @route   GET /api/settings/availability
// @access  HR only
const getHrSettings = async (req, res) => {
  try {
    let settings = await HrSettings.findOne({ hrId: req.user.id });
    
    // If none exist for this HR, return defaults (or create them)
    if (!settings) {
      settings = new HrSettings({
        hrId: req.user.id,
        workingHours: DEFAULT_WORKING_HOURS,
        interviewSlots: DEFAULT_INTERVIEW_SLOTS,
        timezone: 'GMT+5.5'
      });
      await settings.save();
    }
    
    res.status(200).json({ success: true, settings });
  } catch (error) {
    console.error('Error fetching HR settings:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Update HR availability settings
// @route   PUT /api/settings/availability
// @access  HR only
const updateHrSettings = async (req, res) => {
  try {
    const { workingHours, interviewSlots, timezone } = req.body;
    let settings = await HrSettings.findOne({ hrId: req.user.id });

    if (!settings) {
      settings = new HrSettings({ hrId: req.user.id });
    }

    if (workingHours) settings.workingHours = workingHours;
    if (interviewSlots) settings.interviewSlots = interviewSlots;
    if (timezone) settings.timezone = timezone;

    await settings.save();
    
    res.status(200).json({ success: true, settings });
  } catch (error) {
    console.error('Error updating HR settings:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
  getHrSettings,
  updateHrSettings
};
