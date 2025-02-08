/**
 * @copyright 2024 codewithsadee
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { useRouteError, Link } from 'react-router-dom';

const ConversationError = () => {
  // Retrieve the error object associated with the current route, if any.
  const error = useRouteError();

  return (
    <div className='h-full grid grid-cols-1 justify-items-center content-center px-6'>
      <p className='text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 dark:text-gray-100'>
        {error.code}</p>

      <p className='text-gray-600 dark:text-gray-300 mt-2 mb-4 text-center max-w-md'>
        {error.message}
      </p>

      <Link
        className='relative overflow-hidden px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium shadow-md transition-all duration-200'
        to='/'
      >
        Create new chat
        <div className='absolute inset-0 bg-white opacity-10 rounded-lg'></div>
      </Link>
    </div>
  );
};

export default ConversationError;
   