// DocumentItem.js

import React from 'react';

const DocumentItem = ({ document }) => {
  const { title, description, date } = document;

  return (
    <div className="card">
      <div className="top-section">
        <div className="border"></div>
        <div className="icons">
          {/* Add icons here if needed */}
        </div>
      </div>
      <div className="bottom-section">
        <h3 className="title">{title}</h3>
        <p className="description">{description}</p>
        <p className="date">{date}</p>
      </div>
    </div>
  );
};

export default DocumentItem;
