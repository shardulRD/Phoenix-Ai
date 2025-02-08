/**
 * @copyright 2024 codewithsadee
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { useLoaderData } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Custom hooks
 */
import { usePromptPreloader } from '../hooks/userPromptPreloader';

/**
 * Components
 */
import PromptPreloader from '../components/PromptPreloader';

const Greetings = () => {
  // Load the user data from the loader data using the useLoaderData hook.
  const { user } = useLoaderData();

  // Retrieve the prompt preloader value using the custom hook `usePromptPreloader`.
  const { promptPreloaderValue } = usePromptPreloader();

  return (
    <>
      {promptPreloaderValue ? (
        <PromptPreloader promptValue={promptPreloaderValue} />
      ) : (
        <div className='grid place-content-center h-screen'>
          <h2 className='text-4xl font-bold text-center tracking-tight'>
            <motion.span
              initial={{ backgroundPositionX: '100%' }}
              animate={{ backgroundPositionX: '0%' }}
              transition={{ duration: 4, ease: [0.05, 0.7, 0.1, 1] }}
              className='bg-gradient-to-r from-teal-400 via-cyan-500 to-transparent 
              bg-[length:350%_100%] bg-clip-text text-transparent'
            >
              Hello, {user.name.split(' ').at()}
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              className='dark:font-medium'
            >
              How can I help?
            </motion.span>
          </h2>
        </div>
      )}
    </>
  );
};

export default Greetings;
