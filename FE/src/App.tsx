import React from 'react';
import Navbar from './components/navbar/Navbar';
import Appbar from './components/appbar/Appbar';
import { Route, Routes } from 'react-router-dom';
import Box from '@mui/material/Box';
import Home from './pages/Home';
import Play from './pages/Play';
import Variants from './pages/Variants';
import Puzzles from './pages/Puzzles';
import LeaderboardPage from './pages/LeaderboardPage';
import Friends from './pages/Friends';
import { styled } from '@mui/material';
import bgimg from './images/bachground.png'

const PageBox=styled(Box)({
  margin:'120px 0 0 300px',
  backgroundImage:`require(${bgimg})`,
});

function App() {
  return (
      <Box>
        <Appbar/>
        <Navbar/>
        <PageBox>
          {/* <img src={require('./images/bachground.png')}></img> */}
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/play" element={<Play/>}/>
            <Route path="/variants" element={<Variants/>}/>
            <Route path="/puzzles" element={<Puzzles/>}/>
            <Route path="/leaderboard" element={<LeaderboardPage/>}/>
            <Route path="/friends" element={<Friends/>}/>
          </Routes>
        </PageBox>
      </Box>
  );
}

export default App;