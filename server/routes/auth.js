import express from 'express';
import handlers from './handlers/auth';
import utils from '../utils';
import constants from '../utils/constants';

const router = express.Router();

<<<<<<< HEAD
router.get(
  '/registerUser',
  utils.isLoggedIn,
  utils.hasPrivilegeLevel.bind(null, constants.PRIVILEGES.EDITOR),
  handlers.registerUser
);
=======
router.get('/registerUser', utils.hasPrivilegeLevel.bind(null, constants.PRIVILEGES.EDITOR.ENUM), handlers.registerUser);
>>>>>>> 2add135e1484e6138e31ebbb0c8d4cef70ba2d40
router.get('/login', handlers.login);
router.get('/logout', utils.isLoggedIn, handlers.logout);
router.get('/auth', handlers.auth);

module.exports = router;
