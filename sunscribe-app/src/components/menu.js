import React from 'react';
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <nav>
        <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/entries">Entries</Link></li>
            <li><Link to="/">Logout</Link></li>
        </ul>
    </nav>
  );
}

export default Menu;