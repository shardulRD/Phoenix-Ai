/**
 * Node modules
 */
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';


const Snackbar = ({ snackbar }) => {
    // Defines Framer Motion variants for a snackbar animation.
    const snackbarVariant = {
      hidden: { scaleY: 0 },
      visible: {
        scaleY: 1,
        transition: {
          duration: 0.2,
          ease: [0.05, 0.7, 0.1, 1],
        },
      },
    };
  
    const snackbarChildVariant = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    };
  
    return (
        <AnimatePresence>
     {snackbar.open && (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
          }}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
          className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md shadow-lg text-white 
            ${snackbar.type === 'success' ? 'bg-green-500' : snackbar.type === 'error' ? 'bg-red-500' : 'bg-gray-800'}`}
        >
          {snackbar.message}
        </motion.div>
      )}
        </AnimatePresence>
    );
};
  
Snackbar.propTypes = {
    snackbar: PropTypes.object,
};
  
export default Snackbar;
  