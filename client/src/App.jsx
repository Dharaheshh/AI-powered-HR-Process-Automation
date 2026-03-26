import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import HRLogin from './pages/HRLogin';
import CandidateLogin from './pages/CandidateLogin';
import Signup from './pages/Signup';
import HRDashboard from './pages/HRDashboard';
import HRAnalytics from './pages/HRAnalytics';
import CandidateDashboard from './pages/CandidateDashboard';
import OpenRole from './pages/OpenRole';
import MyOpenings from './pages/MyOpenings';
import BrowseRoles from './pages/BrowseRoles';
import RoleDetail from './pages/RoleDetail';
import Applicants from './pages/Applicants';
import MyApplications from './pages/MyApplications';
import InterviewScheduling from './pages/InterviewScheduling';
import RecruiterAvailability from './pages/RecruiterAvailability';
import HiringInsights from './pages/HiringInsights';
import CandidateFollowUp from './pages/CandidateFollowUp';
import Candidates from './pages/Candidates';
import Settings from './pages/Settings';
import SLAAlerts from './pages/SLAAlerts';
import './index.css';

// Redirect authenticated users away from auth pages
const AuthRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();
  if (loading) return null;
  if (isAuthenticated) {
    return <Navigate to={user.role === 'hr' ? '/dashboard' : '/candidate/dashboard'} replace />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1e293b',
              color: '#f8fafc',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              borderRadius: '12px',
            },
          }}
        />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login/hr" element={<AuthRoute><HRLogin /></AuthRoute>} />
          <Route path="/login/candidate" element={<AuthRoute><CandidateLogin /></AuthRoute>} />
          <Route path="/signup" element={<AuthRoute><Signup /></AuthRoute>} />

          {/* HR protected routes */}
          <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['hr']}><HRDashboard /></ProtectedRoute>} />
          <Route path="/hr-analytics" element={<ProtectedRoute allowedRoles={['hr']}><HRAnalytics /></ProtectedRoute>} />
          <Route path="/open-role" element={<ProtectedRoute allowedRoles={['hr']}><OpenRole /></ProtectedRoute>} />
          <Route path="/job-requirements" element={<ProtectedRoute allowedRoles={['hr']}><MyOpenings /></ProtectedRoute>} />
          <Route path="/applicants/:jobId" element={<ProtectedRoute allowedRoles={['hr']}><Applicants /></ProtectedRoute>} />
          <Route path="/interviews" element={<ProtectedRoute allowedRoles={['hr']}><InterviewScheduling /></ProtectedRoute>} />
          <Route path="/calendar" element={<ProtectedRoute allowedRoles={['hr']}><RecruiterAvailability /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute allowedRoles={['hr']}><HiringInsights /></ProtectedRoute>} />
          <Route path="/candidates" element={<ProtectedRoute allowedRoles={['hr']}><Candidates /></ProtectedRoute>} />
          <Route path="/candidates/:id" element={<ProtectedRoute allowedRoles={['hr']}><CandidateFollowUp /></ProtectedRoute>} />
          <Route path="/sla-alerts" element={<ProtectedRoute allowedRoles={['hr']}><SLAAlerts /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute allowedRoles={['hr']}><Settings /></ProtectedRoute>} />

          {/* Candidate protected routes */}
          <Route path="/candidate/dashboard" element={<ProtectedRoute allowedRoles={['candidate']}><CandidateDashboard /></ProtectedRoute>} />
          <Route path="/roles" element={<ProtectedRoute allowedRoles={['candidate']}><BrowseRoles /></ProtectedRoute>} />
          <Route path="/roles/:id" element={<ProtectedRoute allowedRoles={['candidate']}><RoleDetail /></ProtectedRoute>} />
          <Route path="/my-applications" element={<ProtectedRoute allowedRoles={['candidate']}><MyApplications /></ProtectedRoute>} />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
