import { fetchPostsPaginated, fetchUsersMap } from '../api/userApi';

import { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography, Button,
  Box, CircularProgress
} from "@mui/material";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState({});
  const [skip, setSkip] = useState(0);
  const limit = 10;


  const fetchPosts = async () => {
  const data = await fetchPostsPaginated(limit, skip);
  setPosts(data);
};

const fetchUsers = async () => {
  const userMap = await fetchUsersMap();
  setUsers(userMap);
};

  useEffect(() => {
    fetchPosts();
    fetchUsers();
  }, [skip]);

  const handleNext = () => setSkip(skip + limit);
  const handlePrev = () => setSkip(Math.max(skip - limit, 0));

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Posts List
      </Typography>

      {posts.length === 0 ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>User</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.map(post => (
                <TableRow key={post.id}>
                  <TableCell>{post.id}</TableCell>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{users[post.userId] || "Unknown"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Box mt={2} display="flex" justifyContent="space-between">
        <Button variant="contained" onClick={handlePrev} disabled={skip === 0}>
          Previous
        </Button>
        <Button variant="contained" onClick={handleNext}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default PostList;
