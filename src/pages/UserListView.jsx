/*
import { useEffect, useState } from 'react';
import { fetchUsers } from '../api/userApi';
import {
  Container, Typography, Button, Box, Table, TableHead,
  TableRow, TableCell, TableBody
} from '@mui/material';
import { Link } from 'react-router-dom';

const UserListView = () => {
  const [users, setUsers] = useState([]);
  const [skip, setSkip] = useState(0);

  const loadUsers = async () => {
    const data = await fetchUsers(30, skip);
    setUsers((prev) => [...prev, ...data.users]);
    setSkip((prev) => prev + 30);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Users - List View</Typography>
        <Button variant="outlined" component={Link} to="/users">
          View as Cards
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Company</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.firstName} {user.lastName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.age}</TableCell>
              <TableCell>{user.company?.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button variant="contained" onClick={loadUsers} sx={{ mt: 3 }}>
        Show More
      </Button>
    </Container>
  );
};

export default UserListView;*/
import { useEffect, useState } from "react";
import { fetchUsers, fetchAllPosts } from "../api/userApi";
import {
  Container,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const UserListView = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const loadUsers = async () => {
    const data = await fetchUsers(30, skip);
    setUsers((prev) => [...prev, ...data.users]);
    setSkip((prev) => prev + 30);

    // Stop loading if we've fetched all users
    if (skip + 30 >= data.total) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    loadUsers();
    fetchAllPosts().then((data) => setPosts(data.posts));
  }, []);

  const getPostCount = (userId) =>
    posts.filter((post) => post.userId === userId).length;

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h4">User List View</Typography>
        <Button variant="outlined" component={Link} to="/users">
          Back to Grid
        </Button>
      </Box>

      <List>
        {users.map((user) => (
          <ListItem
            key={user.id}
            component={Link}
            to={`/user/${user.id}`}
            sx={{
              borderBottom: "1px solid #ddd",
              py: 2,
              '&:hover': { backgroundColor: "#f5f5f5" },
              textDecoration: "none",
              color: "inherit"
            }}
          >
            <ListItemAvatar>
              <Avatar src={user.image} />
            </ListItemAvatar>
            <ListItemText
              primary={`${user.firstName} ${user.lastName}`}
              secondary={
                <Typography variant="body2" color="textSecondary">
                  {user.email} • Posts: {getPostCount(user.id)}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>

      {hasMore && (
        <Button variant="contained" onClick={loadUsers} sx={{ mt: 3 }}>
          Show More
        </Button>
      )}
    </Container>
  );
};

export default UserListView;

