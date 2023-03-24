import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const validate = () => {
    let isReq = true;
    if (!username) {
      isReq = false;
    } else if (username.length < 2) {
      isReq = false;
    }
    if (!password) {
      isReq = false;
    } else if (password.length < 6) {
      isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();

    if (isReq) {
      axios.post('https://mighty-falls-90534.herokuapp.com/login', {
        Username: username,
        Password: password
      }).then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      }).catch(e => {
        console.log('User does not exist');
        alert('Username or password is incorrect');
      });
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card id="login-card">
              <Card.Body>
                <Card.Title className="login-title">Login</Card.Title>
                <Form>
                  <Form.Group id="form-group" controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      className="user-input"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      placeholder="Enter your username."
                    />
                  </Form.Group>

                  <Form.Group id="form-group" controlId="formPasswrod">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      className="user-input"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Enter your password."
                    />
                  </Form.Group>

                  <Link to={"/register"}>
                    <Button variant="primary" type="submit" id="register-btn">Sign Up</Button>
                  </Link>

                  <Button variant="primary" type="submit" id="login-btn" onClick={handleSubmit}>Log In</Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}