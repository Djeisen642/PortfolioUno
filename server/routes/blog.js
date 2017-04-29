import express from 'express';
import handlers from './handlers/blog';
import utils from '../utils';
import privileges from '../utils/privilege';

const router = express.Router();

router.post(
  '/',
  utils.isLoggedIn,
  utils.hasPrivilege.bind(null, privileges.WRITER),
  handlers.newBlogPost
);

router.post(
  '/:blogId',
  utils.isLoggedIn,
  utils.hasPrivilege.bind(null, privileges.EDITOR),
  handlers.editBlogPost
);

router.get('/', handlers.blog);

module.exports = router;
