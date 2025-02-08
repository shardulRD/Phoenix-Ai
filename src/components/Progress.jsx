/**
 * @copyright 2024 codewithsadee
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import PropTypes from "prop-types";
import { motion } from "framer-motion";

/**
 * Circular progress component
 */
const CircularProgress = ({ classes = "", size = "w-8 h-8", color = "border-blue-500" }) => {
  return (
    <div
      role="progressbar"
      aria-valuenow="0"
      aria-valuemin="0"
      aria-valuemax="100"
      className={`relative flex items-center justify-center ${size} ${classes}`}
    >
      <div className={`absolute inset-0 border-4 border-t-transparent animate-spin rounded-full ${color}`} />
    </div>
  );
};

CircularProgress.propTypes = {
  classes: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
};

/**
 * Linear progress component
 */
const LinearProgress = ({
  classes = "",
  barColor = "bg-blue-500",
  trackColor = "bg-gray-200 dark:bg-gray-700",
  duration = 1.5,
}) => {
  const progressbarVariant = {
    start: { scaleY: 0 },
    end: {
      scaleY: 1,
      transition: { when: "beforeChildren", duration: 0.2, ease: "easeOut", delay: 0.5 },
    },
    exit: {
      scaleY: 0,
      transition: { duration: 0.1, ease: "easeOut" },
    },
  };

  const activeIndicatorVariant = {
    start: { translateX: "-100%" },
    end: { translateX: "100%" },
  };

  return (
    <motion.div
      role="progressbar"
      aria-valuenow="0"
      aria-valuemin="0"
      aria-valuemax="100"
      variants={progressbarVariant}
      initial="start"
      animate="end"
      exit="exit"
      className={`relative w-full h-1.5 overflow-hidden ${trackColor} ${classes}`}
    >
      <motion.div
        variants={activeIndicatorVariant}
        transition={{ repeat: Infinity, duration, ease: [0.2, 0, 0, 1] }}
        className={`absolute left-0 top-0 w-full h-full ${barColor}`}
      ></motion.div>
    </motion.div>
  );
};

LinearProgress.propTypes = {
  classes: PropTypes.string,
  barColor: PropTypes.string,
  trackColor: PropTypes.string,
  duration: PropTypes.number,
};

export { CircularProgress, LinearProgress };
