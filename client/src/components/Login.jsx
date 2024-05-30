import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated to use useNavigate
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate(); // Updated to use useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      setMessage('Login successful');
      setError('');
      navigate('/dashboard'); // Updated to use navigate
    } catch (err) {
      setError(err.message);
      setMessage('');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4" style={{ width: '600px' }}>
        <Card.Body>
          <h2 className="mb-4">Login</h2>
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4">
              Login
            </Button>
          </Form>
          <p className='mt-5'>
            Need an account?{" "}
            <Link to="/register">
              <Button variant="primary" className="text-white">
                Register
              </Button>
            </Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
