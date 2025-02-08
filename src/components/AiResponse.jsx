/**
 * Node modules
 */
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { hopscotch, coy } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState, useEffect, useCallback } from 'react';

/**
 * Custom modules
 */
import toTitleCase from '../utils/toTitleCase';

/**
 * Assets
 */
import { iconLogo } from '../assets/assets';

/**
 * Components
 */
import { IconBtn } from './Button';
import { useSnackbar } from '../hooks/useSnackbar'; // Ensure this is correctly imported

const AiResponse = ({ aiResponse, children }) => {
    // State to store the selected code theme
    const [codeTheme, setCodeTheme] = useState('');

    const { showSnackbar, hideSnackbar } = useSnackbar();

    useEffect(() => {
        // Create a media query to detect the user's preferred color scheme.
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        // Set the initial theme
        setCodeTheme(mediaQuery.matches ? hopscotch : coy);

        // Event listener function
        const themeListener = (event) => {
            setCodeTheme(event.matches ? hopscotch : coy);
        };

        // Attach event listener
        mediaQuery.addEventListener('change', themeListener);

        // Cleanup function to remove the event listener when the component unmounts.
        return () => mediaQuery.removeEventListener('change', themeListener);
    }, []);

    const handleCopy = useCallback(
        async (text) => {
            hideSnackbar();
            try {
                await navigator.clipboard.writeText(text);
                showSnackbar({
                    message: 'Copied to clipboard',
                    timeOut: 2500,
                });
            } catch (err) {
                showSnackbar({ message: err.message });
                console.error(`Error copying text to clipboard: ${err.message}`);
            }
        },
        [showSnackbar, hideSnackbar],
    );

    // Define CodeBlock component properly
    const CodeBlock = ({ children, className, ...rest }) => {
        const match = className?.match(/language-(\w+)/);
        return match ? (
            <>
                <div className='code-block'>
                    <div className='p-4 pb-0 font-sans'>{toTitleCase(match[1])}</div>

                    <SyntaxHighlighter
                        {...rest}
                        PreTag='div'
                        language={match[1]}
                        style={codeTheme}
                        customStyle={{
                            marginBlock: '0',
                            padding: '2px',
                        }}
                        codeTagProps={{
                            style: {
                                padding: '14px',
                                fontWeight: '600',
                            },
                        }}
                    >
                        {children}
                    </SyntaxHighlighter>
                </div>

                <div className='bg-light-surfaceContainer dark:bg-dark-surfaceContainer rounded-t-extraSmall rounded-b-medium flex justify-between items-center h-11 font-sans text-bodyMedium ps-4 pe-2'>
                    <p>
                        Use code
                        <a
                            className='link ms-2'
                            href='https://gemini.google.com/faq#coding'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            with caution.
                        </a>
                    </p>

                    <IconBtn
                        icon='content_copy'
                        size='small'
                        title='Copy code'
                        onClick={() => handleCopy(children)}
                    />
                </div>
            </>
        ) : (
            <code className={className}>{children}</code>
        );
    };

    return (
        <div className='flex items-start gap-3 py-4'>
            <figure className='w-8 h-8 flex-shrink-0'>
                <img src={iconLogo} width={32} height={32} alt="Phoenix logo" />
            </figure>

            {children}

            {aiResponse && (
               <div className='markdown-content'>
                   <Markdown
                       remarkPlugins={[remarkGfm]}
                       components={{ code: CodeBlock }}
                    >
                      {aiResponse}
                  </Markdown>
              </div>
            )}
        </div>
    );
};

AiResponse.propTypes = {
    aiResponse: PropTypes.string,
    children: PropTypes.any,
};

export default AiResponse;
