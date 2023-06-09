import React from 'react';
import ReactDOM from 'react-dom/client';
import Container from 'react-bootstrap/Container';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <HashRouter>  
        <Container>
          <App />
        </Container>
      </HashRouter>
    </React.StrictMode>
   
);