import './App.css';
import Login from './Components/Body/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import SignUp from './Components/Body/SignUp';
import Daanam from './Components/Body/MahaDaanam/Daanam';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RaiseFund from './Components/Body/MahaDaanam/RaiseFund/RaiseFund';
import SetUserProfile from './Components/Body/MahaDaanam/UserProfileCard/SetUserProfile';
import Footer from './Components/Footer/Footer';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route  exact path='/' element={< Login />}></Route>
        <Route  path='/signup' element={< SignUp />}></Route>
        <Route  path='/daanam' element={< Daanam />}></Route>
        <Route  path='/RaiseFund' element={< RaiseFund />}></Route>
        <Route  path='/SetUserProfile' element={< SetUserProfile />}></Route>
        <Route  path='/footer' element={< Footer />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
