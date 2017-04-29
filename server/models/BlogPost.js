import { Schema } from 'mongoose';
import BlogComment from './BlogComment';
const ObjectId = Schema.Types.ObjectId;

var BlogPost = new Schema({
  title: {
    type: String,
    maxlength: 100,
    required: true
  },
  subTitle: String,
  author: {
    type: ObjectId,
    ref: 'User'
  },
  datePosted: {
    type: Date,
    default: Date.now
  },
  comments: [BlogComment],
  dateEdited: [Date],
  editor: [{
    type: ObjectId,
    ref: 'User'
  }],
  body: {
    type: String,
    required: true
  },
  hidden: Boolean
});

export default BlogPost;
