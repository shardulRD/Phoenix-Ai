/**
 * Custom modules
 */
import { account, databases} from '../../lib/appwrite';
import { getConversationTitle, getAiResponse } from '../../api/googleAi';
import generateID from '../../utils/generateID';

/**
 * Node modules
 */
import { redirect } from 'react-router-dom';





const userPromptAction = async (formData) => {
    const userPrompt = formData.get('user_prompt');
    
    // Get current user info
    const user = await account.get();

    // Get a conversation title based on user prompt
    const conversationTitle = await getConversationTitle
    (userPrompt);
    let conversation = null;

    try {
        // Create a new conversation document in the Appwrite database
        conversation = await databases.createDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            'conversations',
            generateID(),
            {
                title: conversationTitle,
                user_id: user.$id,
            },
        );

    } catch (err) {
        console.log(`Error creating conversation: ${err.message}`);
    }

    // Generate an AI response based on the user's prompt
    const aiResponse = await getAiResponse(userPrompt);

    try { 
        // Create a new chat document in the 'chats' collection
        await databases.createDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            'chats',
            generateID(),
            {
                user_prompt: userPrompt,
                ai_response: aiResponse,
                conversation: conversation.$id
            },
        );
    } catch (err) {
        console.log(`Error creating chat: ${err.message}`);
    }

    return redirect(`/${conversation.$id}`);

};

const conversationAction = async (formData) => {
    const conversationId = formData.get('conversation_id');
    const conversationTitle = formData.get('conversation_title');
  
    try {
      await databases.deleteDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        'conversations',
        conversationId,
      );
  
      return { conversationTitle };
    } catch (err) {
      console.log(`Error in deleting conversation: ${err.message}`);
    }
};


const appAction = async ({request}) => {
    const formData = await request.formData();
    const requestType = formData.get('request_type');

    if (requestType === 'user_prompt') {
        return await userPromptAction(formData);
    }

    if (requestType === 'delete_conversation') {
        return await conversationAction(formData);
    }
};

export default appAction;
