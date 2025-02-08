/**
 * Custom modules
 */
import { databases } from '../../lib/appwrite';
import { getAiResponse } from '../../api/googleAi';
import generateID from '../../utils/generateID';

/**
 * Handles the conversation action, processing the user's prompt and storing the AI response in the database.
 */
const conversationAction = async ({ request, params }) => {
    const { conversationId } = params;
    const formData = await request.formData();
    const userPrompt = formData.get('user_prompt');

    let chatHistory = [];
    let aiResponse = '';

    // 🟢 Step 1: Fetch chat history
    try {
        const { chats } = await databases.getDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            'conversations', // ✅ Ensure 'conversations' is the correct collection name
            conversationId,
        );
        
        chatHistory = chats.map(chat => ({
            user_prompt: chat.user_prompt,
            ai_response: chat.ai_response
        }));

    } catch (err) {
        console.log(`Error getting chat: ${err.message}`);
    }

    // 🟢 Step 2: Get AI response
    try {
        aiResponse = await getAiResponse(userPrompt, chatHistory);

        if (!aiResponse) {
            console.error("AI response is empty!");
            aiResponse = "I'm sorry, I couldn't generate a response."; // Default fallback response
        }
    } catch (err) {
        console.log(`Error getting Gemini response: ${err.message}`);
        aiResponse = "AI response could not be retrieved due to an error.";
    }

    // 🟢 Step 3: Validate before storing
    if (!userPrompt || !aiResponse || !conversationId) {
        console.error("Invalid data: Missing required fields!");
        return null;
    }

    // 🟢 Step 4: Store chat in the database
    try {
        await databases.createDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          'chats', // ✅ Ensure 'chats' is the correct collection name
          generateID(),
          {
            user_prompt: userPrompt,
            ai_response: aiResponse,
            conversation: conversationId,
          },
        );
    } catch (err) {
        console.log(`Error storing chat: ${err.message}`);
    }

    return null;
};

export default conversationAction;
