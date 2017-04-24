import { Schema } from 'mongoose';
import constants from '../utils/constants';
import passportLocalMongoose from 'passport-local-mongoose';
import passport from 'passport';

const User = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  alias: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    trim: true,
    match: constants.EMAIL_REGEX
  },
  phoneNumber: String,
  privilege: {
    type: Number,
    min: constants.MIN_PRIVILEGE_ENUM,
    max: constants.MAX_PRIVILEGE_ENUM,
    default: constants.PRIVILEGES.WRITER.ENUM
  },
  deactivated: Date
});

User.plugin(passportLocalMongoose, {
  usernameField: 'email',
  usernameLowerCase: true
});

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

export default User;
