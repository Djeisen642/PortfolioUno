import eHandler from '../../utils/error';
import models from '../../models';
import passport from 'passport';

function auth(req, res) {
  if (req.user) {
    res.json({ success: 'User is logged in.' });
  } else {
    res.json({ success: 'User is not logged in.' });
  }
}

function registerUser(req, res) {
  models.User.register(new models.User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    alias: req.body.alias,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    privilege: req.body.privilege
  }, req.body.password, function(err, account) {
    if (err) {
      return eHandler.jsonError(res, err);
    }
    return res.json({ success: 'User registered.' });
  }));
}

function login(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return eHandler.jsonError(res, err);
    }
    if (!user) {
      return eHandler.jsonError(res, info);
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.json({ success: 'User logged in.' });
    });
  })(req, res, next);
}

function logout(req, res) {
  req.logout();
  res.json({ success: 'User logged out.' });
}

export default {
  auth,
  registerUser,
  login,
  logout
};
