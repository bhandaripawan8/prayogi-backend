// models/blogPost.js

import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  header: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  paragraph: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});


export default mongoose.model('BlogPost', blogPostSchema);
