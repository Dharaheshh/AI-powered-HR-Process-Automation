const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    jobOpening: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobOpening',
      required: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
      required: true,
    },
    resumeFile: {
      type: String, // Store URL/path to the uploaded resume
    },
    status: {
      type: String,
      enum: ['applied', 'screening', 'shortlisted', 'interview', 'offered', 'rejected'],
      default: 'applied',
    },
    matchScore: {
      type: Number,
      default: null,
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// One candidate can only apply once per job opening
applicationSchema.index({ candidate: 1, jobOpening: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);
