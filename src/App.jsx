import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import SideBar from './Components/Sidebar';
import Dashboard from './Pages/Dashboard';


function App() {
  return (
    <Router>
      <Navbar />
      <div className="flex">
        <SideBar />
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
