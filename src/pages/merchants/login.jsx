import { MerchantLoginForm } from '@/components/Features/Merchant';
import { Box, Paper, Typography } from '@mui/material';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const initialMerchant = {
    email: '',
    password: '',
};

export default function Login() {
    const router = useRouter();

    const handleLogin = async (formValues) => {
        try {
            const { email, password } = formValues;
            const res = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (res.error) {
                toast.error('Invalid email or password');
                return;
            }

            toast.success('Have a good day!');
            router.push('/');
        } catch (error) {
            console.error('Login error:', error);
            toast.error('Login failed. Please try again.');
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexFlow: 'row nowrap',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
            }}
        >
            <Box
                sx={{
                    width: '444px',
                    maxWidth: '100%',
                }}
            >
                <Paper sx={{ p: 4 }} elevation={3}>
                    <Typography variant='h6' component='h1' align='center'>
                        Welcome to&nbsp;
                        <Typography variant='h6' component='span'>
                            Record & Heatmap
                        </Typography>
                    </Typography>

                    <MerchantLoginForm initial={initialMerchant} onSubmit={handleLogin} />
                </Paper>
            </Box>
        </Box>
    );
}
