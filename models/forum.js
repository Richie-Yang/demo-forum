const mongoose = require('mongoose')
const { Schema } = mongoose

const forumSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    image: String,
    comment: {
      type: String,
      required: true
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
)

module.exports = mongoose.model('Forum', forumSchema)