/**
 * @copyright 2024 codewithsadee
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { motion } from 'framer-motion';

const Skeleton = () => {
  const skeletonLines = [1, 2, 3];

  // Defines Framer Motion variants for a skeleton loading animation.
  const skeletonVariant = {
    start: {},
    end: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const skeletonChildVariant = {
    start: { opacity: 0.5 },
    end: { opacity: 1 },
  };

  return (
    <motion.div
      variants={skeletonVariant}
      initial="start"
      animate="end"
      className="space-y-3"
    >
      {skeletonLines.map((item) => (
        <motion.div
          key={item}
          className="w-full h-6 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse"
          variants={skeletonChildVariant}
          transition={{
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 0.5,
          }}
        />
      ))}
    </motion.div>
  );
};

export default Skeleton;
