import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css';
function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSignup = async () => {
    
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email.match(emailPattern)) {
      setEmailError('올바른 이메일 형식을 입력하세요.');
      return;
    } else {
      setEmailError('');
    }

    // 비밀번호 확인
    if (password !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    } else {
      setPasswordError('');
    }

    // 회원가입 요청 보내기
    try {
      const response = await axios.post('http://localhost:3000/api/users', {
        email,
        password,
        name,
      });
      console.log('회원가입 결과:', response);
      navigate('/login');
    } catch (error) {
      console.error('회원가입 오류:', error);
    }
  };

  return (
    <div className="signup-container">
      <h1>회원가입</h1>
      <div className="form-group">
        <label>이메일
          <span className="error-message">{' '+ emailError}</span> {/* 이메일 형식 에러 표시 */}
        </label>
        <input
          type="email"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
      </div>
      <div className="form-group">
        <label>비밀번호</label>
        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>비밀번호 확인
          <span className="error-message">{' '+ passwordError}</span> {/* 비밀번호 일치 에러 표시 */}
        </label>
        <input
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        
      </div>
      <div className="form-group">
        <label>닉네임</label>
        <input
          type="text"
          placeholder="닉네임을 입력하세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='form-group'>
        <button className="signup-button" onClick={handleSignup}>회원가입</button>
      </div>
      
      <br /> <br />
    </div>
  );
}

export default Signup;