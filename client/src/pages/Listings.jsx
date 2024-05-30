import { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Modal, Button, Form } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { useAuth } from '../contexts/AuthContext';
import { getAllProperties } from '../services/propertyService';
import { createInterest } from '../services/buyerService'; // Import the function to create interests
import './Listings.css';

const Listings = () => {
  const { user }  = useAuth();
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    minBathrooms: '',
    maxBathrooms: '',
  });
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const propertiesData = await getAllProperties();
      setProperties(propertiesData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching properties:", error);
      setLoading(false);
    }
  };

  const filteredProperties = properties.filter((property) => {
    const { type, minPrice, maxPrice, minBedrooms, maxBedrooms, minBathrooms, maxBathrooms } = filters;
    return (
      (!type || property.type === type) &&
      (!minPrice || property.price >= minPrice) &&
      (!maxPrice || property.price <= maxPrice) &&
      (!minBedrooms || property.bedrooms >= minBedrooms) &&
      (!maxBedrooms || property.bedrooms <= maxBedrooms) &&
      (!minBathrooms || property.bathrooms >= minBathrooms) &&
      (!maxBathrooms || property.bathrooms <= maxBathrooms)
    );
  });

  const offset = currentPage * itemsPerPage;
  const currentPageItems = filteredProperties.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredProperties.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleInterestClick = async (propertyId) => {
    try {
      const buyerId = user.id; // Replace with actual buyer ID, possibly from context or props
      console.log('buyerId', buyerId);
      await createInterest({ buyerId, propertyId });
      alert('Interest registered successfully!');
    } catch (error) {
      console.error('Error registering interest:', error);
      alert('Failed to register interest.');
    }
  };

  return (
    <Container>
      <Row className="mt-5">
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} md="4">
              <Form.Label>Property Type</Form.Label>
              <Form.Select name="type" onChange={handleFilterChange}>
                <option value="">All</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>Minimum Price</Form.Label>
              <Form.Control type="number" name="minPrice" onChange={handleFilterChange} />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>Maximum Price</Form.Label>
              <Form.Control type="number" name="maxPrice" onChange={handleFilterChange} />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="4">
              <Form.Label>Minimum Bedrooms</Form.Label>
              <Form.Control type="number" name="minBedrooms" onChange={handleFilterChange} />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>Maximum Bedrooms</Form.Label>
              <Form.Control type="number" name="maxBedrooms" onChange={handleFilterChange} />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>Minimum Bathrooms</Form.Label>
              <Form.Control type="number" name="minBathrooms" onChange={handleFilterChange} />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>Maximum Bathrooms</Form.Label>
              <Form.Control type="number" name="maxBathrooms" onChange={handleFilterChange} />
            </Form.Group>
          </Row>
        </Form>
      </Row>
      {loading ? (
        <Row>
          <Col className="d-flex justify-content-center">
            <p>Loading properties...</p>
          </Col>
        </Row>
      ) : (
        <>
          <Row>
            {currentPageItems.map((item) => (
              <Col key={item._id} md={4} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title onClick={() => handleItemClick(item)}>{item.title}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                    <Card.Text>Price: ${item.price}</Card.Text>
                    <Card.Text>Bedrooms: {item.bedrooms}</Card.Text>
                    <Card.Text>Bathrooms: {item.bathrooms}</Card.Text>
                    <Card.Text>Type: {item.type}</Card.Text>
                    <Button variant="primary" onClick={() => handleInterestClick(item._id)}>Interested</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Row>
            <Col className="d-flex justify-content-center">
              <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                breakLinkClassName={'page-link'}
              />
            </Col>
          </Row>
        </>
      )}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedItem ? selectedItem.title : ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Description: {selectedItem ? selectedItem.description : ''}</p>
          <p>Price: {selectedItem ? selectedItem.price : ''}</p>
          <p>Address: {selectedItem ? selectedItem.address : ''}</p>
          <p>City: {selectedItem ? selectedItem.city : ''}</p>
          <p>State: {selectedItem ? selectedItem.state : ''}</p>
          <p>Zip Code: {selectedItem ? selectedItem.zipCode : ''}</p>
          <p>Country: {selectedItem ? selectedItem.country : ''}</p>
          <p>Area: {selectedItem ? selectedItem.area : ''}</p>
          <p>Bedrooms: {selectedItem ? selectedItem.bedrooms : ''}</p>
          <p>Bathrooms: {selectedItem ? selectedItem.bathrooms : ''}</p>
          <p>Type: {selectedItem ? selectedItem.type : ''}</p>
          <p>Amenities: {selectedItem && selectedItem.amenities ? selectedItem.amenities.join(', ') : ''}</p>
          <p>Images:</p>
          {selectedItem && selectedItem.images && selectedItem.images.map((image, index) => (
            <img key={index} src={image} alt={`Property Image ${index + 1}`} style={{ width: '100%', marginBottom: '10px' }} />
          ))}
          <p>Year Built: {selectedItem ? selectedItem.yearBuilt : ''}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Listings;
