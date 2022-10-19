const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      required: true,
      trim: true
    },
    feedback: {
      type: String,
      trim: true
    },
    area: {
      type: String
    },
    pharmacist: {
      type: String
    },
    file_path: {
      type: String,
      required: true
    },
    file_mimetype: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const File = mongoose.model('file', fileSchema);

module.exports = File;