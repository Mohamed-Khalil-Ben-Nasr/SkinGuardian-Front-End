import { useState } from 'react';
import './App.css';
import AuthContext from './AuthContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogInPage from './components/LogInPage';
import Navbar from './components/Navbar';
import SignUpPage from './components/SignUpPage';
import ProfilePage from './components/ProfilePage';
import NewDiagnosisPage from './components/NewDiagnosisPage';
import HistoryPage from './components/HistoryPage';


function App() {
  
  // auth context will passs the jwt to all of the components within its context
  // they will all be able to access the jwt using 'useContext'
  const [jwt, setJwt] = useState('');
  
  return (
    <>
    <AuthContext.Provider value={{ jwt, setJwt }}>
    <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<LogInPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/newDiagnosis" element={<NewDiagnosisPage />} />
              <Route path="/history" element={<HistoryPage />} />
            </Routes>
          </BrowserRouter>
    </AuthContext.Provider>
    </>
  )
}

export default App
