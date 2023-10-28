import React from 'react';
import ReactDOM from 'react-dom/client';
import { Container } from 'react-bootstrap';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <div style={{backgroundColor: 'black'}}>
        <Container style={{backgroundColor: '#141414', height: '100vh'}} fluid data-bs-theme="dark">
            <App />
        </Container>
    // {/* </div> */}
);