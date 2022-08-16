import { Link as ReactLink } from 'react-router-dom';

export function Link({ children, to }) {
  return (
    <ReactLink
      className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
      to={to}>
      {children}
    </ReactLink>
  );
}
