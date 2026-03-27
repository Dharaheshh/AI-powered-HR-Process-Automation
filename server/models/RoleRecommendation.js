const mongoose = require('mongoose');

const roleRecommendationSchema = new mongoose.Schema({
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  application: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application',
    required: true,
  },
  appliedRole: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required: true,
  },
  recommendedJobOpening: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobOpening',
    required: true,
  },
  appliedMatchScore: {
    type: Number,
    required: true,
  },
  recommendedMatchScore: {
    type: Number,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'ignored'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('RoleRecommendation', roleRecommendationSchema);
