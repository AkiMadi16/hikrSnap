import React from 'react';

function DeleteCard({ id, onDelete }) {
  const handleDelete = async (e) => {
    try {
      e.stopPropagation();
      console.log('delete click');
      await onDelete(id); 
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  return (
    <button onClick={(e) => handleDelete(e)} className="btn btn-danger">
      Delete
    </button>
  );
}

export default DeleteCard;
