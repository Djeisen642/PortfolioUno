import express from 'express';
import handlers from './handlers/blog';
import utils from '../utils';
import privileges from '../privilege';

const router = express.Router();

router.post(
  '/',
  utils.isLoggedIn,
  utils.hasPrivilege.bind(null, privileges.WRITER),
  handlers.newBlogPost
);

router.get('/', handlers.blog);

module.exports = router;
