import { useAuth } from '../context/AuthContext';
import StudentDashboard from './dashboard/StudentDashboard';
import MentorDashboard from './dashboard/MentorDashboard';

export default function Dashboard() {
    const { user } = useAuth();

    if (user?.role === 'mentor' || user?.role === 'admin') {
        return <MentorDashboard />;
    }

    return <StudentDashboard />;
}
