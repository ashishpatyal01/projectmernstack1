import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className='header'>
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>
          Craving something delicious? Browse through a wide selection of restaurants, 
          from local favorites to top chains, and get your meal delivered hot and fresh 
          right to your doorstep.
        </p>
        <button className="view-menu-btn">View Menu</button>
      </div>
    </div>
  );
};

export default Header;
