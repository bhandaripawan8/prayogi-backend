import express from 'express'
const router = express.Router();

import  {
  createBlogPost,
  getBlogPosts,
  getBlogByPostId,
  updateBlogPost,
  deleteBlogPost,
} from '../controllers/blogPostController.js';



router.post('/', createBlogPost);
router.get('/', getBlogPosts);
router.get('/:id', getBlogByPostId);
router.put('/:id', updateBlogPost);
router.delete('/:id', deleteBlogPost);

export default router;