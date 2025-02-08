/**
 * Node modules
 */
import { useRouteError, Link, useNavigation } from 'react-router-dom';

/**
 * Component
 */
import { LinearProgress } from '../components/Progress';


const RootError = () => {
    const error = useRouteError();

    // Access the navigation state.
    const navigation = useNavigation();

    return (
        <>
          <div className='h-full grid grid-cols-1 justify-items-center content-center px-6'>
            <p className='text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 dark:text-gray-100'>{error.status}</p>
    
            <p className='text-gray-600 dark:text-gray-300 mt-2 mb-4 text-center max-w-md'>
              We couldn&apos;t find the page you&apos;re looking for.
            </p>
    
            <Link
              className='relative overflow-hidden px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium shadow-md transition-all duration-200'
              to='/'
            >
              Back to home
              <div className='absolute inset-0 bg-white opacity-10 rounded-lg'></div>
            </Link>
          </div>
    
           {navigation.state === "loading" && (
               <LinearProgress classes="fixed top-0 left-0 w-full h-1.5 bg-gray-300 dark:bg-gray-700">
                  <div className="absolute left-0 top-0 h-full w-full bg-blue-500 animate-pulse" />
               </LinearProgress>
            )}

        </>
    );
};

export default RootError;
