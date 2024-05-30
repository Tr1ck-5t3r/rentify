import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { isAuthenticated, user } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      setUserData(user);
    } else {
      setUserData(null);
    }
  }, [isAuthenticated, user]);

  return (
    <Container className="mt-5 ">
      <Row>
        <Col>
          <h2>Profile</h2>
          {isAuthenticated && userData ? (
            <Card className=" w-25 ">
              <Card.Body>
                <Card.Title>User Details</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item><strong>First Name:</strong> {userData.name}</ListGroup.Item>
                  <ListGroup.Item><strong>Email:</strong> {userData.email}</ListGroup.Item>
                  <ListGroup.Item><strong>Phone Number:</strong> {userData.phone}</ListGroup.Item>
                  <ListGroup.Item><strong>User Type:</strong> {userData.type}</ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          ) : (
            <Card className="text-center">
              <Card.Body>
                <Card.Title>Please login to view your profile</Card.Title>
                <Link to="/login">
                  <Button variant="primary">Login</Button>
                </Link>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
