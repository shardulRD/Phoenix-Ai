/**
 * Node modules
 */
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Outlet, useParams, useNavigation, useActionData} from 'react-router-dom';


/**
 * Custom hooks
 */
import { useToggle } from './hooks/useToggle';
import { useSnackbar } from './hooks/useSnackbar';
import { usePromptPreloader } from './hooks/userPromptPreloader';

/**
 * Components
 */
import PageTitle from "./components/PageTitle";
import TopAppBar from "./components/TopAppBar";
import Sidebar from "./components/Sidebar";
import Greetings from './pages/Greetings';
import PromptField from './components/PromptField';

const App = () => {
  const params = useParams();

  // Access the navigation state.
  const navigation = useNavigation();
  
  // Get the data passed from a form action.
  const actionData = useActionData();

  const chatHistoryRef = useRef();

  const [isSidebarOpen, toggleSidebar] = useToggle();

  const { promptPreloaderValue } = usePromptPreloader();

  const { showSnackbar } = useSnackbar();

  const isNormalLoad = navigation.state === 'loading' && !navigation.formData;

  useEffect(() => {
    const chatHistory = chatHistoryRef.current;
    if (promptPreloaderValue) {
      chatHistory.scroll({
        top: chatHistory.scrollHeight - chatHistory.clientHeight,
        behavior: 'smooth',
      });
    }
  }, [chatHistoryRef, promptPreloaderValue]);

  useEffect(() => {
    if (actionData?.conversationTitle) {
      showSnackbar({
        message: `Deleted '${actionData.conversationTitle}' conversation.`,
      });
    }
  }, [actionData, showSnackbar]);
  
  return (
    <>
      <PageTitle title='Phoenix - Chat to Supercharge Your Ideas' />

      {/* Layout Grid */}
      <div className="h-dvh lg:grid lg:grid-cols-[320px_1fr]">
        {/* Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} 
        />

        {/* Main Section (Top Bar + Content + Prompt) */}
        <div className="flex flex-col h-dvh">
          {/* Top App Bar */}
          <TopAppBar toggleSidebar={toggleSidebar} />

          {/* Main Content - Takes up available space */}
          <div ref={chatHistoryRef} className="flex-1 p-6 overflow-auto">
            <div className='max-w-[840px] w-full mx-auto grow'>
              {isNormalLoad ? null : params.conversationId ? (
                <Outlet /> 
              ) : (
                <Greetings />
              )}
            </div> 
          </div>

          {/* Prompt Field (Fixed at Bottom) */}
           <div className="p-4 bg-gray-900 text-sm text-center">
             <PromptField />
              <motion.p
                initial={{ opacity: 0, translateY: '-4px' }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.2, delay: 0.8, ease: 'easeOut' }}
                className='text-bodySmall text-center text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant p-3'
              >
                Phoenix may display inaccurate info, including about people, so
                double-check its responses.
                <a
                  href='https://support.google.com/gemini?p=privacy_notice'
                  target='_blank'
                  className='inline underline ms-1'
                >
                  Your privacy & Gemini Apps
                </a>
              </motion.p>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
