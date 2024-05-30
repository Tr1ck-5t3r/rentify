import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <Container className="mt-custom">
      <Row className="justify-content-md-center">
        <Col md="8">
          <h1>Welcome to Rentify</h1>
          <p>
            Rentify is a platform that allows users to rent properties easily and
            efficiently. Whether you are looking to rent a house, apartment, or office space,
            Rentify has got you covered. Sign up today and explore the various options available.
          </p>
          <p>
            <Link to="/register">
              <Button variant="primary">Register</Button>
            </Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
