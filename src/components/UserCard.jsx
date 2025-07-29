
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
} from '@mui/material';
 
import { useNavigate } from 'react-router-dom';
 
const UserCard = ({ user, posts }) => {
  const navigate = useNavigate();
 
  const userPosts = posts.filter((post) => post.userId === user.id);
  const topPosts = userPosts.slice(0, 4);
 
  const handleUserClick = () => {
    navigate(`/user/${user.id}`);
  };
 
  return (
   <Card
     onClick={handleUserClick}
    sx={{
    boxSizing: 'border-box',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    p: 3,
    borderRadius: 4,
    textAlign: 'center',
    boxShadow: 3,
    transition: '0.3s',
    '&:hover': {
      boxShadow: 6,
      backgroundColor: '#f9f9f9',
    },
  }}
>
   <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" justifyContent="center" mb={2}>
          <Avatar
            src={user.image}
            alt={`${user.firstName} ${user.lastName}`}
            sx={{ width: 80, height: 80 }}
          />
        </Box>
 
        <Typography variant="h6" fontWeight="bold" gutterBottom noWrap>
          {user.firstName} {user.lastName}
        </Typography>
 
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Age: {user.age}
        </Typography>
 
        <Typography variant="subtitle2" fontWeight="medium" mt={2}>
          Posts: {userPosts.length}
        </Typography>
 
        <Box mt={1}>
          {topPosts.map((post) => (
            <Typography
              key={post.id}
              variant="body2"
              color="primary"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/post/${post.id}`);
              }}
              sx={{
                cursor: 'pointer',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textAlign: 'left',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              • {post.title}
            </Typography>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
 
export default UserCard;
 
 