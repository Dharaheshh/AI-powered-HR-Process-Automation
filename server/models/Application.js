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
      type: String,
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
    interviewDate: {
      type: Date
    },
    interviewLink: {
      type: String
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
    recruiterNotes: [
      {
        text: { type: String, required: true },
        addedBy: { type: String },
        addedAt: { type: Date, default: Date.now }
      }
    ],
    timeline: [
      {
        status: { type: String },
        date: { type: Date, default: Date.now },
        note: { type: String }
      }
    ]
  },
  {
    timestamps: true,
  }
);

// Index for fast lookups (non-unique to allow re-applications after rejection)
applicationSchema.index({ candidate: 1, jobOpening: 1 });

module.exports = mongoose.model('Application', applicationSchema);
