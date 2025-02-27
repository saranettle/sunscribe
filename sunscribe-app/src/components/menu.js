import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


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
            <li><Nav.Link><Link to={`/edit_account/${username}`}>Account Settings</Link></Nav.Link></li>
            <li><Nav.Link><Link to={`/entries/${username}`}>Entries</Link></Nav.Link></li>
            <li><Nav.Link><Link to={`/`}>Logout</Link></Nav.Link></li>
            </ul>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
  
}

export default Menu;