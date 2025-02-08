/**
 * Node modules
 */
import { useEffect, useState } from 'react';
import { useNavigation } from 'react-router-dom';

const usePromptPreloader = () => {
  // Get navigation state
  const navigation = useNavigation();

  
  // Initialize preloader value
  const [promptPreloaderValue, setPromptPreloaderValue] = useState('');

  useEffect(() => {
    // If form data exists, get the user prompt and update the preloader value.
    if (navigation.formData) {
      setPromptPreloaderValue(navigation.formData.get('user_prompt'));
    } else {
      // If no form data found, reset preloader value to empty string.
      setPromptPreloaderValue('');
    }
  }, [navigation]);
  
  return { promptPreloaderValue };

};

export { usePromptPreloader };