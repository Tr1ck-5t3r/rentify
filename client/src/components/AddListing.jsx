import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { createProperty } from '../services/propertyService';

const AddListing = ({ showModal, handleClose }) => {
  const [newListing, setNewListing] = useState({
    title: '',
    description: '',
    price: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    type: '',
    amenities: [],
    yearBuilt: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewListing({ ...newListing, [name]: value });
  };

  const handleAdd = async () => {
    try {
      await createProperty(newListing); 
      setNewListing({
        title: '',
        description: '',
        price: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        area: '',
        bedrooms: '',
        bathrooms: '',
        type: '',
        amenities: [],
        yearBuilt: '',
      });
      handleClose();
    } catch (error) {
      console.error('Error adding property:', error);
    }
  };
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Listing</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={newListing.title}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={newListing.description}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={newListing.price}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={newListing.address}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={newListing.city}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="state">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              name="state"
              value={newListing.state}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="zipCode">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control
              type="text"
              name="zipCode"
              value={newListing.zipCode}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              name="country"
              value={newListing.country}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="area">
            <Form.Label>Area (in sqft)</Form.Label>
            <Form.Control
              type="number"
              name="area"
              value={newListing.area}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="bedrooms">
            <Form.Label>Bedrooms</Form.Label>
            <Form.Control
              type="number"
              name="bedrooms"
              value={newListing.bedrooms}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="bathrooms">
            <Form.Label>Bathrooms</Form.Label>
            <Form.Control
              type="number"
              name="bathrooms"
              value={newListing.bathrooms}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="type">
            <Form.Label>Type</Form.Label>
            <Form.Control
              as="select"
              name="type"
              value={newListing.type}
              onChange={handleInputChange}
            >
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="villa">Villa</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="amenities">
            <Form.Label>Amenities</Form.Label>
            <Form.Control
              type="text"
              name="amenities"
              value={newListing.amenities.join(',')}
              onChange={handleInputChange}
            />
            <Form.Text className="text-muted">
              Separate amenities with commas (e.g., Gym, Pool)
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="yearBuilt">
            <Form.Label>Year Built</Form.Label>
            <Form.Control
              type="number"
              name="yearBuilt"
              value={newListing.yearBuilt}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleAdd}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddListing;
