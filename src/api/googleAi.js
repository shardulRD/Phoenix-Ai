/**
 * Custom modules
 */
import model from '../lib/googleAi';

/**
 
 *
 * @async
 * @function getConversationTitle
 * @param {string} userPrompt - The text input from which the conversation title will be generated.
 * @returns {Promise<string>} - A promise that resolves to the generated conversation title as a plain text string.
*/

const getConversationTitle = async (userPrompt) => {
    try {
        const result = await model.generateContent(
            `Given a user prompt, generate a concise and informative title that accurately describes the conversation. Consider keywords, topics, and the overall intent of the prompt. Response in plain text format, not markdown.

            Prompt: ${userPrompt}`,
        );
        return result.response.text();
    } catch (err){
        console.log(`Error generating conversation title:${err.message}`);
    }

};


/**
 * Generates a response from an AI model based on the user's prompt and the chat history.
*/
const getAiResponse = async (userPrompt, chats = []) => {
    const history = [];
    chats.forEach(({ user_prompt, ai_response }) => {
      history.push(
        {
          role: 'user',
          parts: [{ text: user_prompt }],
        },
        {
          role: 'model',
          parts: [{ text: ai_response }],
        },
      );
    });
   

    try {
        model.generationConfig = { temperature: 1.5}
        const chat = model.startChat({ history });
        const result = await chat.sendMessage(userPrompt);

        return result.response.text();
    } catch  (err) {
        console.log(`Error generating AI response: ${err.
        message}`);
    }
};




export { getConversationTitle, getAiResponse };