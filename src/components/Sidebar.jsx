import PropTypes from "prop-types";
import { NavLink, useLoaderData, useSubmit, useParams } from "react-router-dom";
import { motion } from "framer-motion";
/**
 * Custom modules
 */
import deleteConversation from "../utils/deleteConversation";

import Logo from "./Logo";
import { ExtendedFab, IconBtn } from "./Button";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const {
    conversations: { documents: conversationData } = {},
  } = useLoaderData() || {};

  const { conversationId } = useParams();

  const submit = useSubmit();

  return (
    <>
      {/* Sidebar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={`sidebar fixed top-0 left-0 h-dvh w-full max-w-[80vw] sm:max-w-[320px] shadow-lg z-40 
        transition-transform duration-300 ease-in-out 
        bg-gradient-to-b from-gray-900 to-gray-700 dark:from-gray-800 dark:to-gray-600 
        text-white ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:w-full`}
      >
        <div className="relative flex flex-col h-full p-6">
          {/* Logo & Title */}
          <div className="flex items-center gap-3 mb-6">
            <Logo />
            <h1 className="text-xl font-bold"></h1>
          </div>

        

          {/* Close Button for Mobile */}
          <button
            onClick={toggleSidebar}
            className="absolute top-4 right-4 text-white lg:hidden"
          >
            ✖
          </button>

          {/* New Chat Button */}
          <button
            className="w-full flex items-center gap-3 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 py-2 px-4 rounded-lg 
            hover:bg-gray-300 dark:hover:bg-gray-700 transition"
            onClick={toggleSidebar}
          >
            <span className="material-symbols-rounded text-lg">add</span>
            <span className="font-medium text-sm">New Chat</span>
          </button>

          {/* Recent Chats Section */}
          {conversationData?.length > 0 && (
            <div className="flex flex-col gap-2 mt-6">
              <p className="text-sm font-medium text-gray-300">Recent</p>
              <nav className="flex flex-col gap-2">
                {conversationData.map((item, index) => (
                  <div
                    key={item.$id}
                    className="group flex items-center justify-between p-2 bg-gray-200 dark:bg-gray-800 rounded-lg 
                    hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                  >
                    {/* Chat Link */}
                    <NavLink
                      to={item.$id}
                      title={item.title}
                      onClick={toggleSidebar}
                      className="flex items-center gap-2 flex-1 truncate text-sm font-medium text-gray-900 dark:text-gray-200"
                    >
                      <span className="material-symbols-rounded text-lg">chat_bubble</span>
                      <span className="truncate">{item.title}</span>
                    </NavLink>

                    {/* Delete Button */}
                    <IconBtn 
                      icon="delete" 
                      size="small" 
                      classes="text-red-500 dark:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2"
                      title="Delete" 
                      onClick={() => {
                        deleteConversation({
                          id: item.$id,
                          title: item.title,
                          submit,
                        });
                      }}
                    />
                  </div>
                ))}
              </nav>
            </div>
          )}

          {/* Footer */}
          <div className="mt-auto text-sm text-center text-gray-400">&copy; 2024 SASAi</div>
        </div>
      </motion.div>

      {/* Overlay for Mobile (Click to Close) */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity ${
          isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } lg:hidden`}
        onClick={toggleSidebar}
      ></div>
    </>
  );
};

Sidebar.propTypes = {
  isSidebarOpen: PropTypes.bool,
  toggleSidebar: PropTypes.func,
};

export default Sidebar;
