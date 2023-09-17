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
import { styled, useTheme } from '@mui/material';
import bgimg from './images/bachground.png'
import MyAccount from './pages/MyAccount';
import PlayOnline from './pages/PlayOnline';
import StandardGame from './Games/StandardGame';

function App() {
  const theme = useTheme();

  const PageBox=styled(Box)({
    backgroundImage:`require(${bgimg})`,
    margin:'90px 0 0 230px',
    [theme.breakpoints.up('laptop')]: {
      margin: '120px 0 0 300px',
    },
  });

  return (
      <Box>
        <Appbar/>
        <Navbar/>
        <PageBox>
          {/* <img src={require('./images/bachground.png')}></img> */}
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/play">
              <Route path="" element={<Play/>}/>
              <Route path="/play/online" element={<PlayOnline/>}/>
              <Route path="/play/game" element={<StandardGame/>}/>
            </Route>
            <Route path="/variants" element={<Variants/>}/>
            <Route path="/puzzles" element={<Puzzles/>}/>
            <Route path="/leaderboard" element={<LeaderboardPage/>}/>
            <Route path="/friends" element={<Friends/>}/>
            <Route path="/my-account" element={<MyAccount/>}/>
            <Route path="*" element={<h1>404 NOT FOUND</h1>}/>
          </Routes>
        </PageBox>
      </Box>
  );
}

export default App;
