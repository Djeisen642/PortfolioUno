import { Schema } from 'mongoose';

const BlogComment = new Schema({
  author: [{
    firstName: {
      type: String,
      required: true
    },
    lastName: String,
    email: String
  }],
  datePosted: {
    type: Date,
    default: Date.now
  },
  dateEdited: [Date],
  body: String,
  hidden: Boolean
});

export default BlogComment;
