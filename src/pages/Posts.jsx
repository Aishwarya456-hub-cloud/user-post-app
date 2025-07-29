import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  CircularProgress,
  Box,
  Paper,
} from '@mui/material';
import { fetchAllPosts, fetchUsers } from '../api/userApi';
import { useNavigate } from 'react-router-dom';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [usersMap, setUsersMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const rowsPerPage = 20;

  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const postsData = await fetchAllPosts();
        const usersData = await fetchUsers(500); // Enough to get all users
        const userMap = {};
        usersData.users.forEach(user => {
          userMap[user.id] = `${user.firstName} ${user.lastName}`;
        });

        setPosts(postsData.posts);
        setUsersMap(userMap);
      } catch (err) {
        console.error('Error loading posts:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>All Posts</Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Post ID</strong></TableCell>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>User</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((post) => (
                <TableRow
                  key={post.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/post/${post.id}`)}
                >
                  <TableCell>{post.id}</TableCell>
                  <TableCell sx={{ maxWidth: 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {post.title}
                  </TableCell>
                  <TableCell>{usersMap[post.userId] || 'Unknown'}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={posts.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[20]}
        />
      </Paper>
    </Container>
  );
};

export default Posts;
