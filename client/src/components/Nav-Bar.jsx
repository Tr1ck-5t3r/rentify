import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from '../contexts/AuthContext';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';

function NavBar() {
  const { logout, isAuthenticated } = useAuth();
  const handleLogout = () => {
    logout();
  };

  const [isauth, setAuth] = useState(false);
  
  useEffect(() => {
    if (isAuthenticated) {
      setAuth(true);
    }
    else {
      setAuth(false);
    }
  }, [isAuthenticated]);

  return (
    <section>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Rentify</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/profile">Profile</Nav.Link>
              <Nav.Link href="/listings">Listings</Nav.Link>
              <Nav.Link href="/Dashboard">Dashboard</Nav.Link>
            </Nav>
            <Nav>
              {!isauth ?
                (<Nav.Link href = "/login">
                  <Button variant="primary">
                    Login
                  </Button>{' '}
                </Nav.Link>) :
                (<Nav.Link href = "/" onClick={handleLogout}>
                  <Button variant="primary">
                     logout
                  </Button>{' '}
                </Nav.Link>)}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </section>
  )
}

export default NavBar