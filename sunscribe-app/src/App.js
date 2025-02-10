// Import dependencies
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importing bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Import Components, styles, media
import './App.css';

import Home from './pages/home';
import About from './pages/about';
import Login from './pages/login';
import Register from './pages/register';

import User_Home from './pages/user_home';
import Prev_Entries from './pages/prev_entries';
import New_Entry from './pages/new_entry';


// Define the function that renders the content in Routes, using State.
function App() {

  const [username, setUsername] = useState()

  return (
    <div className="App">
      <BrowserRouter>

      <Container>

          <Row>
            <Col sm={12} md={4}>
              <header>
                <h1 class="display-1">sunscribe</h1>
              </header>
            </Col>
            <Col sm={12} md={8}>
            </Col>
          </Row>
          <main>
            <section>
                <Routes> 
                    {/* Routes for Home, Writing, Ferment Tracker, Gallery */}
                    <Route path="/" element={<Home/>} />
                    <Route path="/about" element={<About/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />

                    {/* Adding the routes for the pages that do require user-authentication. 
                    How this works may change, since I don't really know how to do user authentication lol. */}
                    <Route path="/home/:username" element={<User_Home/>} />
                    <Route path="/entries" element={<Prev_Entries/>} />
                    <Route path="/new" element={<New_Entry/>} />

                
                </Routes>
              </section>
          </main>

          <footer>
            <p>&copy; 2023 Sara Nettle.</p>
          </footer>

          </Container>

      </BrowserRouter>
    </div>
  );
}

export default App;