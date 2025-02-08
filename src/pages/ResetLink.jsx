import { Link, Form, useNavigation, useActionData } from 'react-router-dom';
import { useEffect } from 'react';
import { banner } from '../assets/assets';
import { AnimatePresence } from 'framer-motion';
import { useSnackbar } from '../hooks/useSnackbar';
import PageTitle from '../components/PageTitle';
import TextField from '../components/TextField';
import { Button } from '../components/Button';
import { CircularProgress, LinearProgress } from '../components/Progress';
import Logo from '../components/Logo';

const ResetLink = () => {
    const actionData = useActionData();
  const navigation = useNavigation();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    if (actionData) {
      showSnackbar({
        message: actionData.message,
        type: actionData.ok ? 'info' : 'error',
        timeOut: 8000,
      });
    }
  }, [actionData, showSnackbar]);

  return (
    <>
      <PageTitle title='Reset Password' />
      <div className='relative w-screen h-screen p-2 grid grid-cols-1 lg:grid-cols-2 gap-2 bg-black text-white'>
        {/* Form Section - Appears first in mobile view */}
        <div className='flex flex-col p-4 order-first lg:order-last'>
          <Logo classes='mb-auto mx-auto lg:mx-0'/>
          
          <div className='flex flex-col gap-2 max-w-[480px] w-full mx-auto'>
            <h2 className='text-4xl font-semibold text-light-onBackground dark:text-dark-onBackground text-center'>
                Forgot Your Password ?            </h2>
            <p className='text-bodyLarge text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant mt-1 mb-5 text-center px-2'>
            Enter your email, and we&apos;ll send a password reset link.
            </p>
            <Form method='POST' className='grid grid-cols-1 gap-4'>
              <TextField type='email' name='email' label='Email' placeholder='Email' helperText='The verification link sent to your email address will be valid for 1 hour.' required={true} autoFocus={true} />
    
              <Button
                type='submit'
                disabled={navigation.state === 'submitting'}
                className='bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 hover:bg-blue-700 disabled:bg-black'
              >
                {navigation.state === 'submitting' ? <CircularProgress size='small' /> : 'Get Link'}
              </Button>
            </Form>
          </div>
          <p className='mt-auto mx-auto text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant text-bodyMedium'>&copy; 2025 SASAi. All rights reserved.</p>
        </div>
        {/* Banner Section - Appears below form in mobile view */}
        <div className='relative hidden lg:flex flex-col justify-center'>
          <img src={banner} alt='Banner' className='object-cover w-full h-full rounded-lg' />
          <p className='absolute bottom-10 left-12 right-12 z-10 text-4xl font-semibold text-right text-black drop-shadow-lg'>
            Chat with Phoenix to supercharge your ideas.
          </p>
        </div>
      </div>
      <AnimatePresence>
        {navigation.state === 'loading' && <LinearProgress className='absolute top-0 left-0 right-0' />}
      </AnimatePresence>
    </>
  );
};

export default ResetLink;
