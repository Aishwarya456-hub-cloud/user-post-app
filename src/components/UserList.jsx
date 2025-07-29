 
import { Grid } from '@mui/material';
import UserCard from './UserCard';
 
const UserList = ({ users, posts }) => {
  return (
     <Grid container spacing={3} alignItems="stretch">
      {users.map((user) => (
         <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
           <UserCard user={user} posts={posts} />
       </Grid>
      ))}
     </Grid>

  );
};
 
export default UserList;
 