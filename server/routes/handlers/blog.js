import eHandler from '../../utils/error';
import models from '../../models';

function newBlogPost(req, res) {
  const title = req.body.title;
  const subTitle = req.body.subTitle;
  const body = req.body.body;

  if (!title) {
    return eHandler.jsonError(res, 'Please include a title.');
  }
  if (!body) {
    return eHandler.jsonError(res, 'Please include content.');
  }

  var newBlogPost = new models.BlogPost({
    title,
    subTitle,
    body,
    author: req.user
  });
  newBlogPost.save()
  .then(() => {
    return res.json({ success: 'Blog post created' });
  }).catch((err) => {
    return eHandler.jsonError(res, err);
  });
}

function blog(req, res) {
  models.BlogPost.find({})
  .then((blogPosts) => {
    res.json({
      Success: 'Blog posts retrieved.',
      blogPosts
    });
  }).catch((err) => {
    eHandler.jsonError(res, err);
  });
}

export default {
  newBlogPost,
  blog
};
