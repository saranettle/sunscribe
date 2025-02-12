import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { GiHamburgerMenu } from "react-icons/gi";

function Menu() {

  const { username } = useParams();



  return (

    <Navbar expand="lg" className="bg-white">
      <Container>
        
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <ul class="user_menu">
            <li><Nav.Link><Link to={`/home/${username}`}>Home</Link></Nav.Link></li>
            <li><Nav.Link><Link to={`/entries/${username}`}>Entries</Link></Nav.Link></li>
            <li><Nav.Link><Link to={`/`}>Logout</Link></Nav.Link></li>
            </ul>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
    {/* Routes for Home, Writing, Ferment Tracker, Gallery 
    <nav>
        <ul>
        <li><Link to={`/home/${username}`}>Home</Link></li>
        <li><Link to={`/entries/${username}`}>Entries</Link></li>
        <li><Link to="/">Logout</Link></li>
        </ul>
    </nav> */}
  
  
}

export default Menu;