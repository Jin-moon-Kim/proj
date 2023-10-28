// App.js

import axios from 'axios';
import Board from './Pages/Board';
import Content from './Pages/Content';
import Edit from './Pages/Edit';
import Write from './Pages/Write';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  // useNavigate
} from "react-router-dom";


function App() {
  const [userInfo, setUserInfo] = useState({ email: "", name: "", id: "" });
  const checkSession = async ()=>{
    const response = await axios.get('http://localhost:3000/api/users/session',{withCredentials:true});
    console.log("세션 정보 : ",response.data.user);
    if(response.data.user){
      setUserInfo(response.data.user);
    }
    
    return response.data.user;
  }
  useEffect(()=>{
    checkSession(); 
  },[])
  const handleLogout = async ()=>{
    axios.get('http://localhost:3000/api/users/logout',{withCredentials:true})
    .then(res=>setUserInfo({ email: "", name: "", id: "" }))
    .catch((err)=>{alert(err)})

  }

  return (
    <Router>
      
      <div className='text-center' style={{ backgroundColor: '#141414'}}>
      <br />        
          <Link style={{ textDecoration: 'None', color: 'black' }} to='/'><h2>Full-Stack Web Developer Community</h2></Link>
      <br />

          {userInfo.email ?
            <>
              {userInfo.name}님 반갑습니다.
              <br />
              
              <Link to='/login'><Button variant = 'outline-secondary' onClick={handleLogout}>Sign out</Button></Link>
            </>
            :
            <>
              <Link to='/login'><Button variant='outline-secondary'>Sign in</Button></Link>
              {' '}
              <Link to='/signup'><Button variant='outline-secondary'>Sign up</Button></Link>
            </>}



          {' '}

          <Link to='/posts'><Button variant='outline-secondary'>Posts</Button></Link>
        
          <br /><br />

      </div>


      <Routes>
        <Route path="/signup" element={<Signup ></Signup>}></Route>
        <Route path="/login" element={<Login userInfo={userInfo} setUserInfo={setUserInfo} ></Login>}></Route>
        <Route path="/posts" element={<Board></Board>}></Route>
        <Route path="/posts/write" element={<Write ></Write>}></Route>
        <Route path="/posts/:post_id" element={<Content ></Content>}></Route>
        <Route path="/edit/:user_id/:post_id" element={<Edit ></Edit>}></Route>
      </Routes>
    </Router>
  );
}

export default App;