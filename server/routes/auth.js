import express from 'express';
import handlers from './handlers/auth';
import utils from '../utils';
import constants from '../utils/constants';

const router = express.Router();

router.get('/registerUser', utils.hasPrivilegeLevel.bind(null, constants.PRIVILEGES.EDITOR), handlers.registerUser);
router.get('/login', handlers.login);
router.get('/logout', utils.isLoggedIn, handlers.logout);
router.get('/auth', handlers.auth);

module.exports = router;
