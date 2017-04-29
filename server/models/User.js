import { Schema } from 'mongoose';
import constants from '../utils/constants';
import privileges from '../utils/privilege';
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
  _privilegeEnum: Number,
  deactivated: Date
});

User.virtual('privilege').get(function() {
  return privileges.getPrivilegeObjectFromEnum(this._privilegeEnum);
}).set(function(privilege) {
  if (!privilege) {
    this._privilegeEnum = null;
  } else if (privilege instanceof privileges.Privilege) {
    this._privilegeEnum = privilege.ENUM;
  } else if (!isNaN(privilege)) {
    if (privileges.isValidEnum(privilege)) {
      this._privilegeEnum = privilege;
    } else {
      throw new Error('Invalid privilege');
    }
  } else {
    throw new Error('Invalid usage');
  }
  return true;
});

User.method('hasPrivilege', function(privilegeLevel) {
  return this.privilege.hasPrivilege(privilegeLevel);
});

User.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

User.static('findActive', function(query, callback) {
  query.deactivated = null;
  return this.find(query, callback);
});

User.plugin(passportLocalMongoose, {
  usernameField: 'email',
  usernameLowerCase: true
});

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

export default User;
