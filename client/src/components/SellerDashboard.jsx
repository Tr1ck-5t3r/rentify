import AddListing from './AddListing'; 
import { useState } from 'react';

const SellerDashboard = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);

  const handleAddListing = (newListing) => {
    console.log('New Listing:', newListing);
    setShowModal(false);
  };

  const handleShowModal = () => setShowModal(true);

  return (
    <div>
      <h2>Your Listings</h2>
      <button onClick={handleShowModal}>Add Listing</button>
      <AddListing showModal={showModal} handleClose={handleClose} handleAddListing={handleAddListing} />
    </div>
  );
};

export default SellerDashboard;
