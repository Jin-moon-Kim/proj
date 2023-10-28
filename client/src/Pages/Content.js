import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import '../styles/Content.css'
import { Card, Container, Row, Col, Button } from 'react-bootstrap';


function Content() {
    const navigate = useNavigate();
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
    const { post_id } = useParams();
    const [crntPost, setCrntPost] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/posts/${post_id}`)
            .then(response => {
                // 요청이 성공하면 데이터를 상태(state)에 저장합니다.
                setCrntPost(response.data);
            })
            .catch(error => {
                // 요청이 실패하면 에러를 처리합니다.
                console.error('GET 요청에 실패했습니다:', error);
            });
    }, [])

    const deletePost = async () => {

        await axios.delete(`http://localhost:3000/api/posts/${post_id}`)
            .then(response => {
                // 요청이 성공하면 해당 게시물을 삭제합니다.
                console.log(response.data);
                alert("삭제되었습니다.");
                navigate(-1);
            })
            .catch(error => {
                // 요청이 실패하면 에러를 처리합니다.
                console.error('DELETE 요청에 실패했습니다:', error);
            });

    }

    return (
        <>
            {crntPost ? <div>
                <Container className="mt-4">
                    <h1>게시물 상세 페이지</h1>
                    <Card className="mt-4">
                        <Card.Header>
                            <Row>
                                <Col lg={9} className="d-flex align-items-center justify-content-center"> {/* 제목을 가운데 정렬 */}
                                    <h4 className="text-center">{crntPost.title}</h4>
                                </Col>
                                <Col lg={3}>
                                    <p className="text-muted text-right">글쓴이: {crntPost.author}</p>
                                    <p className="text-muted text-right">조회수: {crntPost.view}</p>
                                    <p className="text-muted text-right">카테고리: {crntPost.category.map((e) => { return <span key={e} className="badge bg-secondary ms-2">{e}</span> })}</p>
                                    <Link to={`/edit/${crntPost.author}/${crntPost._id}`}><Button>수정</Button>{' '}</Link>
                                    <Button variant="danger" onClick={() => { deletePost(crntPost._id) }}>삭제</Button>
                                </Col>

                            </Row>

                        </Card.Header>
                        <Card.Body>
                            <Card.Text>{crntPost.content}</Card.Text>
                        </Card.Body>
                    </Card>
                </Container>
                <div className='text-center'>
                    <Button className='ms-2' variant="danger" onClick={() => { navigate(-1) }}>
                        뒤로가기
                    </Button>
                </div>

            </div > : <p></p>
            }


        </>
    )
}

export default Content