import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesComponent from './routes/Routes';
import "./App.css"
const App = () => (
  <Router>
    <RoutesComponent />
  </Router>
);

export default App;
