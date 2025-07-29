

import { Routes, Route } from 'react-router-dom';
import Users from './pages/Users';
import UserDetails from './pages/UserDetails';
import PostDetails from './pages/PostDetails';
 
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/user/:userId" element={<UserDetails />} />
      <Route path="/post/:postId" element={<PostDetails />} />
    </Routes>
  );
};
 
export default App;
 