import eHandler from '../../utils/error';
import models from '../../models';

// function postBlog(req, res) {
// }

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
  blog
};
