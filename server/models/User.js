import { Schema } from 'mongoose';
import constants from '../utils/constants';

const User = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    match: constants.EMAIL_REGEX
  },
  phoneNumber: String,
  privilege: {
    type: String,
    enum: [
      constants.PRIVILEGES.OWNER,
      constants.PRIVILEGES.WRITER,
      constants.PRIVILEGES.CONSULTANT
    ],
    default: constants.PRIVILEGES.WRITER
  },
  deactivated: Date
});

export default User;
