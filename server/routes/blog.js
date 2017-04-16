import express from 'express';
import handlers from './handlers/blog';

const router = express.Router();

router.get('/', handlers.blog);

module.exports = router;
