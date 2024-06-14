
import BlogPost  from '../model/BlogPost.js'
import mongoose from 'mongoose';

// creating a new blog
export const createBlogPost = async (req, res) => {
    try {
      const { image, header, user, paragraph } = req.body;
      const existingBlog = await BlogPost.findOne({ header, user });
      if (existingBlog) {
        console.log('Duplicate blog post found, please use a different header');
        return res.status(400).json({ message: 'Duplicate blog post found, please use a different header', success: false });
      }
  
      const newPost = new BlogPost({
        image,
        header,
        user,
        paragraph,
      });
      const savedBlog = await newPost.save();
      res.status(201).json({ message: 'Blog post created successfully', success: true, data: savedBlog });
    } catch (error) {
      if (error.code === 11000) { 
        return res.status(400).json({ message: 'Duplicate blog post found, please use a different header', success: false });
      }
      console.error('Error creating blog post:', error.message);
      res.status(500).json({ message: 'Error creating blog post', success: false, error: error.message });
    }
  };


    // all blog posts
    export const getBlogPosts = async (req, res)=>{
        try {
            const posts = await BlogPost.find().populate('user', 'name email');
            res.status(200).json({ success: true, data: posts });
          } catch (error) {
            console.error('Error fetching blog posts:', error.message);
            res.status(500).json({ message: 'Error fetching blog posts', success: false, error: error.message });
          }
    }

    
    // get blog by id
     export const getBlogByPostId = async (req, res) =>{
        try {
            const post = await BlogPost.findById(req.params.id).populate('user', 'name email');
            if (!post) {
              return res.status(404).json({ message: 'Blog post not found', success: false });
            }
            res.status(200).json({ success: true, data: post });
          } catch (error) {
            console.error('Error fetching blog post:', error.message);
            res.status(500).json({ message: 'Error fetching blog post', success: false, error: error.message });
          }
     }

    //  update
     export const updateBlogPost = async (req, res) => {
        try {
          const { image, header, paragraph } = req.body;
          const post = await BlogPost.findById(req.params.id);
      
          if (!post) {
            return res.status(404).json({ message: 'Blog post not found', success: false });
          }
      
          // Check if updating the header to a duplicate
          if (header && header !== post.header) {
            const existingPost = await BlogPost.findOne({ header, user: post.user });
            if (existingPost) {
              return res.status(400).json({ message: 'Duplicate blog post found, please use a different header', success: false });
            }
          }
      
          post.image = image || post.image;
          post.header = header || post.header;
          post.paragraph = paragraph || post.paragraph;
      
          const updatedPost = await post.save();
          res.status(200).json({ message: 'Blog post updated successfully', success: true, data: updatedPost });
        } catch (error) {
          if (error.code === 11000) { // MongoDB duplicate key error
            return res.status(400).json({ message: 'Duplicate blog post found, please use a different header', success: false });
          }
          console.error('Error updating blog post:', error.message);
          res.status(500).json({ message: 'Error updating blog post', success: false, error: error.message });
        }
      };
      

    //   delete blog
    export const deleteBlogPost = async (req, res) => {
        try {
          const { id } = req.params;
          if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid blog post ID', success: false });
          }
          const post = await BlogPost.findById(id);
          if (!post) {
            return res.status(404).json({ message: 'Blog post not found', success: false });
          }
          await BlogPost.deleteOne({ _id: id });
          res.status(200).json({ message: 'Blog post deleted successfully', success: true });
        } catch (error) {
          console.error('Error deleting blog post:', error.message);
          res.status(500).json({ message: 'Error deleting blog post', success: false, error: error.message });
        }
      };



