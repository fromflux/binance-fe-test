import React from 'react';
import PropTypes from 'prop-types';

import './layout.css';

export default function Layout({ children }) {
  return (
    <div className="layout">
      {children}
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
