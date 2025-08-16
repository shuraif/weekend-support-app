// src/App.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import MainLayout from './MainLayout'
import NotFound from '@/pages/NotFound'
import LoginScreen from '@/pages/LoginScreen';
import Register from './pages/Register';
import WeekendSupportManager from './pages/WeekendSupportManager';
import TeamManagement from './components/TeamManagement';


function App() {
  

  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginScreen />}/>
      <Route path="/register" element={<Register />}/>
        {
          <Route path="/home" element={<MainLayout />}>

            <Route path="weekendsupport" element={<WeekendSupportManager/>} />
            <Route path="manage-team" element={<TeamManagement/>} />

          </Route>
        }
        
       
        {/* 404 fallback route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}


export default App
