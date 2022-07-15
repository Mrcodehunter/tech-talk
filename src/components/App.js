import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { StoryProvider } from '../contexts/StoryContext';
import { UserProvider } from '../contexts/UserContext';
import "../styles/App.css";
import Layout from "./Layout";
import About from './pages/About';
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileUpdate from './pages/ProfileUpdate';
import Signup from "./pages/Signup";
import StoryDetails from './pages/StoryDetails';
import StoryUpdate from './pages/StoryUpdate';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

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

                    <Route path="/signup" element={<PublicRoute/>} >
                      <Route path="/signup" element={<Signup/>} />
                    </Route>

                    <Route path="/login" element={<PublicRoute/>} >
                      <Route path="/login" element={<Login/>} />
                    </Route>
                    
                    <Route path="/users/:username" element={ <PrivateRoute/>}>
                      <Route path="/users/:username" element={ <Profile/> }/>
                    </Route>
                    
                    <Route path="/stories/:id" element={<StoryDetails/>}/>
                    <Route path="/notFound" element={<NotFound/>}/>

                    <Route path="/story/storyUpdate/:id" element={<StoryUpdate/>}/>
                    <Route path="/users/profileUpdate/:username" element={<ProfileUpdate/>}/>
                  </Routes>
                </Layout>
              </StoryProvider>
            </UserProvider>
        </AuthProvider>
   </Router>
  );
}

export default App;
