import PropTypes from "prop-types";
import { useLoaderData } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

/**
 * Custom modules
 */
import { useToggle } from "../hooks/useToggle";

/**
 * Components
 */
import Avatar from "./Avatar";
import { IconBtn } from "./Button";

const UserPrompt = ({ text }) => {
  // Retrieve the user data from the loader using the useLoaderData hook.
  const { user } = useLoaderData();

  // Use the useToggle hook to manage the expanded state of the user prompt text.
  const [isExpanded, toggleExpand] = useToggle();

  // Create a ref to access the text box element in the DOM.
  const textBoxRef = useRef(null);

  // Initialize the hasMoreContent state, indicating whether the content exceeds the visible height of the text box.
  const [hasMoreContent, setMoreContent] = useState(false);

  // Use useEffect to check if the text content overflows
  useEffect(() => {
    if (textBoxRef.current) { // ✅ Ensure ref is defined
      setMoreContent(
        textBoxRef.current.scrollHeight > textBoxRef.current.clientHeight
      );
    }
  }, [text]); // ✅ Depend on `text` instead of `textBoxRef`

  return (
    <div className="grid grid-cols-1 items-start gap-1 py-4 md:grid-cols-[max-content,minmax(0,1fr),max-content] md:gap-5">
      <Avatar name={user?.name} className="w-10 h-10" />
      <p
        ref={textBoxRef} // ✅ Attach ref
        className={`text-bodyLarge pt-1 whitespace-pre-wrap ${!isExpanded ? "line-clamp-4" : ""}`}
      >
        {text}
      </p>

      {hasMoreContent && (
        <IconBtn
          icon={isExpanded ? "keyboard_arrow_up" : "keyboard_arrow_down"}
          onClick={toggleExpand}
          title={isExpanded ? "Collapse text" : "Expand text"}
        />
      )}
    </div>
  );
};

UserPrompt.propTypes = {
  text: PropTypes.string.isRequired,
};

export default UserPrompt;
