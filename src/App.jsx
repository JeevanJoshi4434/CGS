import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Student from './pages/Student';
import Admin from './pages/Admin';
import TestPage from './pages/TestPage';
import AdminTestManager from './pages/AdminTestManager';
import './App.css';

function App() {
  return (
    <Router>
      <div className="p-4 bg-gray-100 min-h-screen">
       
        <Routes>
          <Route path="/student" element={<Student />} />
          <Route path="/" element={<Admin />} />
          <Route path="/test" element={<TestPage/>}/>
          <Route path="/manage" element={<AdminTestManager />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
