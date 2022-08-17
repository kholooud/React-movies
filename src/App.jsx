import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Movies from './Components/Movies/Movies';
import Details from './Components/Details/Details';
import Tvshows from './Components/Tvshows/Tvshows';
import People from './Components/People/People';
import About from './Components/About/About';
import Network from './Components/Network/Network';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Logout from './Components/Logout/Logout';
import Notfound from './Components/Notfound/Notfound';
import { Routes , Route,useNavigate , Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { useState ,useEffect } from 'react';
import TrendingContextProvider from './Store';


function App() {
  let [userData,setuserData] = useState(null);
  let navigate = useNavigate();

  function saveUserData(){
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(encodedToken);
    setuserData(decodedToken)
  }
  useEffect(() => {
    if(localStorage.getItem('userToken')!=null){
      saveUserData();
    }
  }, [])
  function ProtectedRoute(props){
    if(localStorage.getItem('userToken')==null){
      return <Navigate to="/login" />
    }else{
      return props.children
    }
  }
  function logout(){
    localStorage.removeItem('userToken');
    setuserData(null);
    navigate('/login')

  }
  return (
    <div className="App">
      <Navbar userData={userData} logout={logout} />
      <div className="container">
      <TrendingContextProvider>
          <Routes>
            <Route path='React-movies/' element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
            <Route path='React-movies/Home' element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
            <Route path='React-movies/movies' element={<ProtectedRoute><Movies /></ProtectedRoute>}></Route>
            <Route path='React-movies/tvshows' element={<ProtectedRoute><Tvshows /></ProtectedRoute>}></Route>
            <Route path='React-movies/people' element={<ProtectedRoute><People /></ProtectedRoute>}></Route>
            <Route path='React-movies/details' element={<ProtectedRoute><Details /></ProtectedRoute>}></Route>
            <Route path='React-movies/about' element={<About />}></Route>
            <Route path='React-movies/network' element={<Network />}></Route>
            <Route path='React-movies/login' element={<Login saveUserData={saveUserData} />}></Route>
            <Route path='React-movies/register' element={<Register />}></Route>
            <Route path='React-movies/logout' element={<Logout />}></Route>
            <Route path='React-movies/notfound' element={<Notfound />}></Route>
            <Route path='*' element={<Notfound />}></Route>
          </Routes>
      </TrendingContextProvider>
      </div>
    </div>
  );
}

export default App;
