import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { AuthProvider } from '../contexts/AuthContext';
// import { StoryProvider } from '../contexts/StoryContext';
// import { UserProvider } from '../contexts/UserContext';
// import "../styles/App.css";
// import Layout from "./Layout";
// import About from './pages/About';
// import CreateStory from './pages/CreateStory';
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import NotFound from './pages/NotFound';
// import Profile from './pages/Profile';
// import ProfileUpdate from './pages/ProfileUpdate';
// import Signup from "./pages/Signup";
// import StoryDetails from './pages/StoryDetails';
// import UpdateStory from './pages/UpdateStory';
// import PrivateRoute from './PrivateRoute';
// import PublicRoute from './PublicRoute';

import Layout from '../components/Layout';
import PrivateRoute from '../components/PrivateRoute';
import PublicRoute from '../components/PublicRoute';
import { AuthProvider } from '../contexts/AuthContext';
import { StoryProvider } from '../contexts/StoryContext';
import { UserProvider } from '../contexts/UserContext';
import About from '../pages/About';
import CreateStory from '../pages/CreateStory';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import ProfileUpdate from '../pages/ProfileUpdate';
import Signup from '../pages/Signup';
import StoryDetails from '../pages/StoryDetails';
import UpdateStory from '../pages/UpdateStory';
import "../styles/App.css";

function App() {
  console.log('App rendered')
  return (
    <Router>
        <AuthProvider>
          <UserProvider>
            <StoryProvider>
              <Layout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About/>}/>
                    <Route path="/users/:username" element={ <Profile/> }/>

                    <Route path="/signup" element={<PublicRoute/>} >
                      <Route path="/signup" element={<Signup/>} />
                    </Route>

                    <Route path="/login" element={<PublicRoute/>} >
                      <Route path="/login" element={<Login/>} />
                    </Route>

                    <Route path="/stories/new" element={ <PrivateRoute/>}>
                      <Route path="/stories/new" element={ <CreateStory/> }/>
                    </Route>

                    <Route path="/story/:id/edit" element={ <PrivateRoute/>}>
                      <Route path="/story/:id/edit" element={ <UpdateStory/> }/>
                    </Route>

                    <Route path="/users/:username/update" element={ <PrivateRoute/>}>
                      <Route path="/users/:username/update" element={ <ProfileUpdate/> }/>
                    </Route>
                    

                    <Route path="/stories/:id" element={<StoryDetails/>}/>
                    <Route path="/notFound" element={<NotFound/>}/>

                  </Routes>
                </Layout>
              </StoryProvider>
            </UserProvider>
        </AuthProvider>
   </Router>
  );
}

export default App;
