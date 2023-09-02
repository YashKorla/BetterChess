import React from 'react';
import Navbar from './components/navbar/Navbar';
import Appbar from './components/appbar/Appbar';
import Box from '@mui/material/Box';

function App() {
  return (
    <Box sx={{display:'flex'}}>
      <h1>App</h1>
      <Appbar/>
      <Navbar/>
      </Box>
    
  );
}

export default App;
