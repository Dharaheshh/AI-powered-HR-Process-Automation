const mongoose = require('mongoose');

const hrSettingsSchema = new mongoose.Schema({
  hrId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  timezone: {
    type: String,
    default: 'GMT+5.5'
  },
  workingHours: [
    {
      day: { type: String, required: true },
      start: { type: String, default: '09:00' },
      end: { type: String, default: '18:00' },
      isOff: { type: Boolean, default: false }
    }
  ],
  interviewSlots: [
    {
      name: { type: String, required: true },
      duration: { type: String, required: true } // e.g., '30 Minutes', '45 Minutes'
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('HrSettings', hrSettingsSchema);
