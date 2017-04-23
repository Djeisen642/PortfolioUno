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
    match: constants.EMAIL_REGEX
  },
  phoneNumber: String,
  privilege: {
    type: String,
    enum: [
      constants.PRIVILEGES.OWNER.NAME,
      constants.PRIVILEGES.EDITOR.NAME,
      constants.PRIVILEGES.WRITER.NAME,
      constants.PRIVILEGES.CONSULTANT.NAME
    ],
    default: constants.PRIVILEGES.WRITER.NAME
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
