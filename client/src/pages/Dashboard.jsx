import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import BuyerDashboard from '../components/BuyerDashboard';
import SellerDashboard from '../components/SellerDashboard';
import { Card, Button, Container } from 'react-bootstrap';

const Dashboard = () => {
  const { isAuthenticated, userType } = useAuth();

  return (
    <Container className="d-flex justify-content-center vh-100 mt-4">
      {isAuthenticated ? (
        userType === 'buyer' ? (
          <BuyerDashboard />
        ) : (
          <SellerDashboard />
        )
      ) : (
        <Card className="text-center ">
          <Card.Body>
            <Card.Title>Please login to view the dashboard</Card.Title>
            <Link to="/login">
              <Button variant="primary">Login</Button>
            </Link>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default Dashboard;
