import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Student from './pages/Student';
import Admin from './pages/Admin';
import TestPage from './pages/TestPage';
import AdminTestManager from './pages/AdminTestManager';
import ViewResults from './pages/ResultsView';
import { SessionProvider } from './context/sessionContext'; // Import the context
import './App.css';

function App() {
  return (
    <Router>
      <div className="p-4 bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={<Admin />} />
          <Route path="/manage" element={<AdminTestManager />} />

          {/* Wrap only Student and TestPage with SessionProvider */}
          <Route
            path="/student"
            element={
              <SessionProvider>
                <Student />
              </SessionProvider>
            }
          />
          <Route
            path="/start"
            element={
              <SessionProvider>
                <TestPage />
              </SessionProvider>
            }
          />
          <Route
            path="/result/view"
            element={
              <SessionProvider>
                <ViewResults />
              </SessionProvider>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
