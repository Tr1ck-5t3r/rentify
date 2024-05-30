import { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col, Modal } from "react-bootstrap";
import { getInterestsByBuyerId, deleteInterest } from "../services/buyerService";
import { useAuth } from '../contexts/AuthContext';
import { getPropertiesByIds } from "../services/propertyService";

const BuyerDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { user }  = useAuth();

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleUninterest = async (propertyId) => {
    try {
      await deleteInterest(propertyId);
      fetchProperties();
    } catch (error) {
      console.error("Error uninteresting property:", error);
    }
  };

  const fetchProperties = async () => {
    try {
      const propertiesids = await getInterestsByBuyerId(user.id);
      let propertyIds = propertiesids.map((property) => property.propertyId);
      const propertiesData = await getPropertiesByIds(propertyIds);
      setProperties(propertiesData);
      console.log(propertiesData);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const handleShowModal = (property) => {
    setSelectedProperty(property);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProperty(null);
  };

  return (
    <Container>
      <h3 className="">Properties</h3>
      <Row>
        {properties.map((property) => (
          <Col key={property._id} xs={12} md={4} className="mb-3">
            <Card onClick={() => handleShowModal(property)} style={{ cursor: 'pointer' }}>
              <Card.Img variant="top" src={property.image} />
              <Card.Body>
                <Card.Title>{property.title}</Card.Title>
                <Card.Text>{property.description}</Card.Text>
                <Button variant="primary" onClick={handleUninterest}>Uninterest</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {selectedProperty && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedProperty.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={selectedProperty.image} alt={selectedProperty.title} className="img-fluid mb-3" />
            <p><strong>Description: </strong>{selectedProperty.description}</p>
            <p><strong>Price: </strong>{selectedProperty.price}</p>
            <p><strong>Address: </strong>{selectedProperty.address}</p>
            <p><strong>City: </strong>{selectedProperty.city}</p>
            <p><strong>State: </strong>{selectedProperty.state}</p>
            <p><strong>Zip Code: </strong>{selectedProperty.zipCode}</p>
            <p><strong>Country: </strong>{selectedProperty.country}</p>
            <p><strong>Area: </strong>{selectedProperty.area}</p>
            <p><strong>Bedrooms: </strong>{selectedProperty.bedrooms}</p>
            <p><strong>Bathrooms: </strong>{selectedProperty.bathrooms}</p>
            <p><strong>Type: </strong>{selectedProperty.type}</p>
            <p><strong>Amenities: </strong>{selectedProperty.amenities.join(', ')}</p>
            <p><strong>Year Built: </strong>{selectedProperty.yearBuilt}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default BuyerDashboard;
