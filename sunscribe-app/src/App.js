import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importing bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Importing the pages of the application
import Home from './pages/home';
import About from './pages/about';
import Login from './pages/login';
import Register from './pages/register';

import User_Home from './pages/user_home';
import Prev_Entries from './pages/prev_entries';
import New_Entry from './pages/new_entry';

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
            <Routes>
              
              {/* Adding the routes for the pages of the application that do not require user-authentication */}
              <Route path="/" element={<Home/>} />
              <Route path="/about" element={<About/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />

              {/* Adding the routes for the pages that do require user-authentication. 
              How this works may change, since I don't really know how to do user authentication lol. */}
              <Route path="/home" element={<User_Home/>} />
              <Route path="/entries" element={<Prev_Entries/>} />
              <Route path="/new" element={<New_Entry/>} />

            </Routes>
          </main>

          <Row>
            <Col sm={12}>
              <footer>
                <p>&copy; 2025 Sara Nettle</p>
              </footer>
            </Col>
          </Row>

        </Container>

      </BrowserRouter>

    </div>
  );
}

export default App;
