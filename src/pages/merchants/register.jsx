import { shopApi } from '@/api-client';
import { MerchantRegisterForm } from '@/components/Features/Merchant';
import { Box, Paper, Typography } from '@mui/material';
import Link from 'next/link';

const initialMerchant = {
    username: '',
    email: '',
    pw: '',
    pwConfirm: '',
    domain: '',
};

export default function RegisterMerchant() {
    const handleMerchantRegister = async (merchant) => {
        try {
            const shop = await shopApi.register(merchant);
            console.log(shop);
        } catch (err) {
            console.error(err);
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

                    <MerchantRegisterForm
                        initial={initialMerchant}
                        onSubmit={handleMerchantRegister}
                    />

                    <Typography variant='body1' component='div' align='center'>
                        Already have an account?{' '}
                        <Link href='/merchants/login' passHref legacyBehavior>
                            <Typography
                                component='a'
                                color='primary'
                                sx={{ fontWeight: 500, textDecoration: 'none', cursor: 'pointer' }}
                            >
                                Sign in
                            </Typography>
                        </Link>
                    </Typography>
                </Paper>
            </Box>
        </Box>
    );
}
