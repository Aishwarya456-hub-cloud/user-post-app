

import { Routes, Route } from 'react-router-dom';
import Users from './pages/Users';
import UserDetails from './pages/UserDetails';
import PostDetails from './pages/PostDetails';
import UserListView from './pages/UserListView';
import PostList from './pages/PostList';



const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/users" element={<Users />} />
     
      <Route path="/users/list" element={<UserListView />} />
      <Route path="/user/:userId" element={<UserDetails />} />
      <Route path="/post/:postId" element={<PostDetails />} />
      <Route path="/posts" element={<PostList />} />
    </Routes>
  );
};
 
export default App;
 