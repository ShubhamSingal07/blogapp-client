import { Navigate } from 'react-router-dom';

export function RedirectController({ children }) {
  const token = localStorage.getItem('token');

  if (token) return <Navigate to="/" replace={true} />;

  return children;
}
