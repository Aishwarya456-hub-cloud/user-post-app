

import { useEffect, useState } from 'react';
import { fetchUsers, fetchAllPosts } from '../api/userApi';
import { Container, Button, Typography } from '@mui/material';
import UserList from '../components/UserList';
 
const Users = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [skip, setSkip] = useState(0);
 
  const loadUsers = async () => {
    const data = await fetchUsers(30, skip);
    setUsers((prev) => [...prev, ...data.users]);
    setSkip((prev) => prev + 30);
  };
 
  useEffect(() => {
    loadUsers();
    fetchAllPosts().then((data) => {
      setPosts(data.posts);
    });
  }, []);

 
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>User List</Typography>
      <UserList users={users} posts={posts} />
      <Button variant="contained" onClick={loadUsers} sx={{ mt: 3 }}>
        Show More
      </Button>
    </Container>
  );
};
 
export default Users;