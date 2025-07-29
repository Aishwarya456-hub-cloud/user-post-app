

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPost } from '../api/userApi';
import ErrorDisplay from '../components/ErrorDisplay';

import {
  Box,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await fetchPost(postId);
        setPost(data);
        setError(null);
      } catch (err) {
        console.error('Error loading post:', err);
        setPost(null);
        setError(err.message || 'Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [postId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  /*if (error) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }*/
 if (error) {
  return (
    <ErrorDisplay
      message={error}
      suggestion="The post you're looking for may have been removed or doesn't exist."
    />
  );
}


  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <ArticleIcon fontSize="large" />
          <Typography variant="h5" fontWeight="bold">
            {post.title}
          </Typography>
        </Box>

        <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
          {post.body}
        </Typography>
      </Paper>
    </Box>
  );
};

export default PostDetails;
