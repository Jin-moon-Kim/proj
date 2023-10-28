import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';
import dayjs from 'dayjs';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Board.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function formatDate(inputDate) {
  const formattedDate = dayjs(inputDate).format('YYYY-MM-DD HH:mm');
  return formattedDate;
}

const Board = () => {
  const navigate = useNavigate();
  
  //추가된 부분
  const checkSession = async ()=>{
    const response = await axios.get('http://localhost:3000/api/users/session',{withCredentials:true});
    if(!response.data.user){
      navigate('/login');
    }
    return response.data.user;
  }
  useEffect(()=>{
    checkSession(); 
  },[])

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const perpage = 10; // 페이지당 항목 수 (고정)
  const [maxPage, setMaxPage] = useState(100);

  const fetchData = async () => {
    if (currentPage == 0) {
      setCurrentPage(1)
      return;
    }
    else if (currentPage > maxPage) {
      setCurrentPage(crnt => crnt - 1)
      return;
    }
    await axios
      .get(`http://localhost:3000/api/posts?page=${currentPage}&perpage=${perpage}`)
      .then((response) => {
        setPosts(response.data.posts);
        setMaxPage(response.data.totalPages)
      })
      .catch((error) => {
        console.error('GET 요청에 실패했습니다:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]); // currentPage가 변경될 때마다 데이터 다시 가져오기

  const handlePageChange = (page) => {
    setCurrentPage((crnt) => page);
  };

  const getCategory = async (category) => {
    await axios.get(`http://localhost:3000/api/posts/by-category/${category}`)
      .then((response) => {
        setPosts(response.data);

      })
  }

  return (
    <>

      <div className='text-center'>
        {/* <hr></hr> */}
        <h3>Categories</h3>
        {['JS','TS','CSS','SCSS','Bootstrap','Git','React','Express.js','Docker','MongoDB','OpenAPI','Etc'].map((e) => { return <span onClick={() => { getCategory(e) }} key={e} className="badge btn bg-secondary ms-2">{e}</span> })}

      </div>
      <br />
      <div className='board-container'>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th></th>
              <th>제목</th>
              <th>글쓴이</th>
              <th>날짜</th>
              <th>조회수</th>
              <th>카테고리</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={post._id}>
                <td>{(currentPage - 1) * 10 + index + 1}</td>
                <td>
                  <Link style={{ textDecoration: 'None' }} to={`/posts/${post._id}`}>{post.title}</Link>
                </td>
                <td>{post.author}</td>
                <td>{formatDate(post.createdAt)}</td>
                <td>{post.view}</td>
                <td>{post.category.map((e) => { return <span key={e} className="badge bg-secondary ms-2">{e}</span> })}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <hr></hr>
        <div className='text-center'>
          <Button variant='outline-secondary' onClick={() => { handlePageChange(currentPage - 1) }}>{'<'}</Button>
          {' '+currentPage+' '}
          <Button variant='outline-secondary' onClick={() => { handlePageChange(currentPage + 1) }}>{'>'}</Button>
        </div>
        <span className='text-end'>
        <hr></hr>
          <Link to='/posts/write'> <Button variant='outline-secondary'>글쓰기</Button></Link>
        </span>
      </div>
    </>
  );
};

export default Board;
