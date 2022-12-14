import { Navigate } from 'react-router-dom';

export function EntryController({ children }) {
  const token = localStorage.getItem('token');

  if (token) return children;

  return <Navigate to="/login" replace={true} />;
}
