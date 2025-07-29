
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  
import ErrorDisplay from '../components/ErrorDisplay'; // Add this at the top

import {
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
  CircularProgress
} from '@mui/material';
import { getUserById, getPostsByUserId } from '../api/userApi';

const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 


  useEffect(() => {
    
    /*const parsedUserId = parseInt(userId);

    if (parsedUserId < 1 || parsedUserId > 208 || isNaN(parsedUserId)) {
      setLoading(false);
      setError(`User with Id ${userId} not found.`);
      return;
    }*/

    const fetchUserAndPosts = async () => {
      setLoading(true); 

      try {
        const userData = await getUserById(userId);
        setUser(userData);

        const postData = await getPostsByUserId(userId);
        setUserPosts(postData.posts || []);
        setError(null);  
      } catch (error) {
        console.error('Error fetching user details:', error);
        setUser(null);
        setError('Error fetching user details.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndPosts();
  }, [userId]);


  if (loading) {
    return (
      <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  
 /*if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }*/
 if (error) {
    return (
      <ErrorDisplay
        message={error}
        suggestion="The user you are looking for might not exist. Try browsing from the user list."
      />
    );
  }


  
  if (!user) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ p: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {user.firstName} {user.lastName}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {user.email}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box
              component="img"
              src={user.image}
              alt={`${user.firstName} ${user.lastName}`}
              sx={{ width: 150, borderRadius: 2 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Personal Info</Typography>
            <Typography>Maiden Name: {user.maidenName}</Typography>
            <Typography>Age: {user.age}</Typography>
            <Typography>Gender: {user.gender}</Typography>
            <Typography>Birth Date: {user.birthDate}</Typography>
            <Typography>Blood Group: {user.bloodGroup}</Typography>
            <Typography>Height: {user.height} cm</Typography>
            <Typography>Weight: {user.weight} kg</Typography>
            <Typography>Eye Color: {user.eyeColor}</Typography>
            <Typography>Hair: {user.hair?.color}, {user.hair?.type}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Contact</Typography>
            <Typography>Phone: {user.phone}</Typography>
            <Typography>Username: {user.username}</Typography>
            <Typography>Password: {user.password}</Typography>
            <Typography>IP: {user.ip}</Typography>
            <Typography>MAC Address: {user.macAddress}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Online Info</Typography>
            <Typography>Domain: {user.domain}</Typography>
            <Typography>User Agent: {user.userAgent}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Home Address</Typography>
            <Typography>{user.address?.address}</Typography>
            <Typography>
              {user.address?.city}, {user.address?.state}
            </Typography>
            <Typography>Postal Code: {user.address?.postalCode}</Typography>
            <Typography>
              Coordinates: {user.address?.coordinates?.lat},{' '}
              {user.address?.coordinates?.lng}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Bank Info</Typography>
            <Typography>Card Type: {user.bank?.cardType}</Typography>
            <Typography>Card Number: {user.bank?.cardNumber}</Typography>
            <Typography>Card Expiry: {user.bank?.cardExpire}</Typography>
            <Typography>Currency: {user.bank?.currency}</Typography>
            <Typography>IBAN: {user.bank?.iban}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Company Info</Typography>
            <Typography>Name: {user.company?.name}</Typography>
            <Typography>Department: {user.company?.department}</Typography>
            <Typography>Title: {user.company?.title}</Typography>
            <Typography>
              Address: {user.company?.address?.address}, {user.company?.address?.city}
            </Typography>
            <Typography>
              State: {user.company?.address?.state}, Postal Code: {user.company?.address?.postalCode}
            </Typography>
            <Typography>
              Coordinates: {user.company?.address?.coordinates?.lat},{' '}
              {user.company?.address?.coordinates?.lng}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Education & IDs</Typography>
            <Typography>University: {user.university}</Typography>
            <Typography>SSN: {user.ssn}</Typography>
            <Typography>EIN: {user.ein}</Typography>
          </Grid>
        </Grid>

        <Box sx={{ mt: 5 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Latest Posts
          </Typography>
          {userPosts.slice(0, 2).map((post) => (
            <Box key={post.id} sx={{ mb: 1 }}>
              <Typography
                component="a"
                href={`/post/${post.id}`}
                variant="body1"
                sx={{
                  textDecoration: 'none',
                  color: 'primary.main',
                  fontWeight: 'bold',
                }}
              >
                {post.title}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default UserDetails;


