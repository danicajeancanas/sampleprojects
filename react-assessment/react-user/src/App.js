import React from 'react';
import { UserProvider } from './context/UserContext';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import UserDetails from './components/UserDetails';
import NotFound from './components/NotFound';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" exact element={<><UserForm/><br/><br/><UserList /></>} />
            <Route path='/contact-detail/:id' element={<UserDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;