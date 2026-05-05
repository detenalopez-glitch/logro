import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import Dashboard from './pages/Dashboard';
import GameCollection from './pages/GameCollection';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/collection" element={<GameCollection />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </GameProvider>
  );
}

export default App;
