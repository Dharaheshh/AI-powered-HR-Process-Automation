const mongoose = require('mongoose');

const jobOpeningSchema = new mongoose.Schema(
  {
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
      required: [true, 'Role is required'],
    },
    title: {
      type: String,
      required: [true, 'Job opening title is required'],
      trim: true,
    },
    customSkills: {
      type: [String],
      default: [],
    },
    experienceRequired: {
      type: String,
      default: '',
    },
    educationRequired: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: '',
    },
    jobType: {
      type: String,
      enum: ['full-time', 'part-time', 'internship', 'contract'],
      default: 'full-time',
    },
    status: {
      type: String,
      enum: ['open', 'closed'],
      default: 'open',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    applicantCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('JobOpening', jobOpeningSchema);
