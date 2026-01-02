import React from 'react';
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div data-theme="luxury">
      <Routes>
        <Route path={"/"} element={<HomePage />} />
      </Routes>
    </div>
  )
};

export default App;