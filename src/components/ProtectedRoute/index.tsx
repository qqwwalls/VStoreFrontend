import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, authLoading } = useStore();
  const location = useLocation();

  if (authLoading) return <div className="p-12 text-gray-400 text-center">Loading account...</div>;

  if (!user) {
    
    return <Navigate to="/" state={{ from: location, openAuth: true }} replace />;
  }

  return <>{children}</>;
}
