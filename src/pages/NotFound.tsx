import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="mt-4 text-lg text-gray-600">Oops! Page not found.</p>
        <p className="mt-2 text-gray-500">The page you're looking for doesn't exist.</p>
        <Link to="/home/dashboard" className="inline-block mt-6 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded">
          Go Back Home
        </Link>
      </div>
    </div>
  );
}