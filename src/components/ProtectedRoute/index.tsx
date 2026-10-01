import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useStore();
  const location = useLocation();

  if (!user) {
    
    return <Navigate to="/" state={{ from: location, openAuth: true }} replace />;
  }

  return <>{children}</>;
}
