import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from 'react-hot-toast';

// Pages
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VerifyEmail from './pages/VerifyEmail';
import PendingApproval from './pages/PendingApproval';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import MaterialViewer from './pages/MaterialViewer';
import Assignments from './pages/Assignments';
import AssignmentDetail from './pages/AssignmentDetail';
import LiveClasses from './pages/LiveClasses';
import Forum from './pages/Forum';
import Messages from './pages/Messages';
import Blogs from './pages/Blogs';
import Profile from './pages/Profile';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/welcome" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/pending-approval" element={<PendingApproval />} />

            {/* Protected Routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />

            <Route path="/courses" element={
              <ProtectedRoute>
                <Courses />
              </ProtectedRoute>
            } />

            <Route path="/course/:id" element={
              <ProtectedRoute>
                <CourseDetail />
              </ProtectedRoute>
            } />

            <Route path="/material/:id" element={
              <ProtectedRoute>
                <MaterialViewer />
              </ProtectedRoute>
            } />

            <Route path="/assignments" element={
              <ProtectedRoute>
                <Assignments />
              </ProtectedRoute>
            } />

            <Route path="/assignment/:id" element={
              <ProtectedRoute>
                <AssignmentDetail />
              </ProtectedRoute>
            } />

            <Route path="/live-classes" element={
              <ProtectedRoute>
                <LiveClasses />
              </ProtectedRoute>
            } />

            <Route path="/forum" element={
              <ProtectedRoute>
                <Forum />
              </ProtectedRoute>
            } />

            <Route path="/blogs" element={
              <ProtectedRoute>
                <Blogs />
              </ProtectedRoute>
            } />

            <Route path="/messages" element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            } />

            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/welcome" replace />} />
          </Routes>
        </Router>
        <Toaster position="top-center" />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
