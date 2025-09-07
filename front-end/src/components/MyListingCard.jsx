import React from 'react';
import PropTypes from 'prop-types';

export default function MyListingCard({ product, onEdit, onDelete }) {
  // SVG for the Edit icon
  const editIcon = React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-5 w-5",
    viewBox: "0 0 20 20",
    fill: "currentColor"
  },
    React.createElement('path', { d: "M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" }),
    React.createElement('path', { fillRule: "evenodd", d: "M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z", clipRule: "evenodd" })
  );

  // SVG for the Delete icon
  const deleteIcon = React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-5 w-5",
    viewBox: "0 0 20 20",
    fill: "currentColor"
  },
    React.createElement('path', { fillRule: "evenodd", d: "M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z", clipRule: "evenodd" })
  );

  return React.createElement('div', { className: "flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow" },
    // Product Image
    React.createElement('div', { className: "w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-md flex-shrink-0 overflow-hidden" },
      product.imageUrl ?
        React.createElement('img', { src: product.imageUrl, alt: product.title, className: "w-full h-full object-cover" }) :
        React.createElement('span', { className: "text-gray-500 text-xs flex items-center justify-center h-full" }, "Image")
    ),

    // Product Details
    React.createElement('div', { className: "ml-4 flex-grow" },
      React.createElement('h3', { className: "font-semibold text-lg text-gray-800" }, product.title),
      React.createElement('p', { className: "text-gray-600" }, `₹${product.price}`),
      React.createElement('p', { className: "text-sm text-gray-500 mt-1" },
        "Status: ",
        React.createElement('span', { className: "font-medium" }, product.status)
      )
    ),

    // Action Buttons
    React.createElement('div', { className: "flex space-x-2 ml-4" },
      React.createElement('button', {
        onClick: () => onEdit(product.id),
        className: "p-2 text-blue-500 hover:text-blue-700 transition-colors",
        "aria-label": `Edit ${product.title}`
      }, editIcon),
      React.createElement('button', {
        onClick: () => onDelete(product.id),
        className: "p-2 text-red-500 hover:text-red-700 transition-colors",
        "aria-label": `Delete ${product.title}`
      }, deleteIcon)
    )
  );
}

MyListingCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
