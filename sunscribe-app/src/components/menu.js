import React from 'react';
import { Link, useParams } from 'react-router-dom';

function Menu() {

  const { username } = useParams();



  return (
    <nav>
        <ul>
        <li><Link to={`/home/${username}`}>Home</Link></li>
        <li><Link to={`/entries/${username}`}>Entries</Link></li>
        <li><Link to="/">Logout</Link></li>
        </ul>
    </nav>
  );
}

export default Menu;