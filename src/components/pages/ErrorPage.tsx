import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();

  let errorMessage: string;
  let errorStatus: number | string = 500;

  if (isRouteErrorResponse(error)) {
    errorStatus = error.status;
    errorMessage = error.statusText || 'An error occurred';
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else {
    errorMessage = 'An unexpected error occurred';
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-gray px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-primary mb-4">{errorStatus}</h1>
        <h2 className="text-2xl font-heading font-semibold text-dark-gray mb-2">
          Oops! Something went wrong
        </h2>
        <p className="text-dark-gray mb-8 opacity-75">
          {errorMessage}
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-organic-green-light transition-colors"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
