import express from 'express';
import handlers from './handlers/auth';
import utils from '../utils';
// import constants from '../utils/constants';
import privileges from '../utils/privilege';

const router = express.Router();

router.post(
  '/registerUser',
  utils.isLoggedIn,
  utils.hasPrivilege.bind(null, privileges.EDITOR),
  handlers.registerUser
);

router.post('/login', handlers.login);

router.post('/logout', utils.isLoggedIn, handlers.logout);

router.get('/', handlers.auth);

module.exports = router;
