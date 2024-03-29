import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const RegistrationView = () => {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');
  const [ emailErr, setEmailErr ] = useState('');

  const validate = () => {
    let isReq = true;

    if(!username){
     setUsernameErr('Username Required');
     isReq = false;
     alert(usernameErr);
    } else if(username.length < 2) {
     setUsernameErr('Username must be 2 characters long');
     isReq = false;
     alert(usernameErr);
    }

    if(!password){
     setPasswordErr('Password Required');
     isReq = false;
     alert(passwordErr);
    } else if(password.length < 6) {
     setPasswordErr('Password must be 6 characters long');
     isReq = false;
     alert(passwordErr);
    }

    if(!email) {
      setEmailErr('Email is Required');
      isReq = false;
      alert(emailErr)
    } else if(email.indexOf('@') === -1) {
      setEmailErr('Must have a valid email');
      isReq = false;
      alert(emailErr)
    }

    return isReq;
  }

  const handleRegister = (e) => {
    e.preventDefault();
    const isReq = validate();

    if(isReq) {
      axios.post('https://mighty-falls-90534.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      }).then(response => {
        const data = response.data;
        console.log(data);
        alert('Welcome to myBooks!');
        window.open('/', '_self');
      }).catch(e => {
        console.log('Error registering the user')
      });
    }
  };
  
  /*
  const handleRegister = (e) => {
    e.preventDefault();

    axios.post("https://mighty-falls-90534.herokuapp.com/users", {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    }).then(response => {
      if (response.ok) {
        console.log(response.data);
        alert('Welcome to myBooks!');
        window.open('/', '_self');
      } else {
        console.log('Error registering the user');
        alert("Registration failed. Try again.");
      }
    }).catch(e => {
      console.log(e);
    });
  };
  */

  return (
    <Container>
      <Row>
        <Col>
          <Card id="registration-card">
            <Card.Body>
              <Card.Title className="registration-title">Welcome!</Card.Title>
              <p className='notice'>We do not collect data and send any emails.</p>
              <Form onSubmit={(e) => handleRegister(e)}>
                <Form.Group id="form-group">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control 
                    type="text"
                    className="user-input"
                    placeholder="username"
                    value={username} 
                    onChange={e => setUsername(e.target.value)} 
                  />
                </Form.Group>
                <Form.Group id="form-group">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control 
                    type="password"
                    className="user-input"
                    placeholder="password (must be at least 6 characters)"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group id="form-group">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control 
                    type="email"
                    className="user-input"
                    placeholder="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group id="form-group">
                  <Form.Label>Birthday:</Form.Label>
                  <Form.Control
                    type="date"
                    className="user-input"
                    value={birthday}
                    onChange={e => setBirthday(e.target.value)}
                  />
                </Form.Group>

                <Link to={"/"}>
                  <Button type="submit" id="back-btn">Back</Button>
                </Link>

                <Button type="submit" id="submit-btn">Submit</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}