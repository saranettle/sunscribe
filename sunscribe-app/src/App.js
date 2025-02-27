// Import dependencies
import React from 'react';
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

//Post-login pages
import UserHome from './pages/user_home';
import PrevEntries from './pages/prev_entries';
import NewEntry from './pages/new_entry';
import EditAccount from './pages/edit_account';


function App() {


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
                    For now, user authentication doesn't actually exist. But this routing does give the appearance that
                    a user can sign in and add entries under their username, and see past entries. */}
                    <Route path="/home/:username" element={<UserHome/>} />
                    <Route path="/entries/:username" element={<PrevEntries/>} />
                    <Route path="/new/:username" element={<NewEntry/>} />
                    <Route path="/edit_account/:username" element={<EditAccount/>} />

                
                </Routes>
              </section>
          </main>

          </Container>

      </BrowserRouter>
    </div>
  );
}

export default App;