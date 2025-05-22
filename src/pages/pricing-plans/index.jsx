import { shopApi } from '@/api-client';
import { MainLayout } from '@/components/Layout';
import { selectShop, shopActions } from '@/redux/slices/shop.slice';
import { Box, Button, Chip, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const plans = [
    {
        name: 'Free',
        code: 'free',
        price: '$0',
        features: ['400 sessions', '30 day data storage'],
        buttonText: 'Get Started',
    },
    {
        name: 'Basic',
        code: 'basic',
        price: '$19/month',
        features: ['3000 sessions', '30 day data storage'],
        buttonText: 'Upgrade',
    },
    {
        name: 'Enterprise',
        code: 'enterprise',
        price: 'Contact us',
        features: ['Unlimited sessions', '60 day data storage'],
        buttonText: 'Contact Sales',
    },
];

export default function PricingPlans() {
    const dispatch = useDispatch();
    const shop = useSelector(selectShop);
    const currentPlan = shop?.pricing?.title;

    const [loading, setLoading] = useState(false);

    const handleSubPricing = async (code) => {
        try {
            setLoading(true);
            await shopApi.subPricing({ code });

            dispatch(shopActions.fetchShop());
            toast.success('🎉 Subscription successful! Thank you for upgrading your plan.');
        } catch (error) {
            console.log(error);
            toast.error('⚠️ Subscription failed. Please check your connection or try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth='md' sx={{ py: 6 }}>
            <Typography variant='h4' align='center' gutterBottom>
                Pricing Plans
            </Typography>

            <Grid container spacing={4} sx={{ mt: 1 }}>
                {plans.map((plan) => {
                    const isCurrent = currentPlan === plan.name;

                    return (
                        <Grid item xs={12} sm={4} key={plan.name}>
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 3,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    borderRadius: 3,
                                    textAlign: 'center',
                                }}
                            >
                                <Stack spacing={2}>
                                    <Box
                                        display='flex'
                                        justifyContent='center'
                                        alignItems='center'
                                        gap={1}
                                    >
                                        <Typography variant='h6'>{plan.name}</Typography>
                                        {isCurrent && (
                                            <Chip
                                                label='Current Plan'
                                                color='success'
                                                size='small'
                                            />
                                        )}
                                    </Box>

                                    <Typography variant='h4' color='primary'>
                                        {plan.price}
                                    </Typography>

                                    <Box>
                                        {plan.features.map((feature, index) => (
                                            <Typography
                                                key={index}
                                                variant='body2'
                                                color='text.secondary'
                                            >
                                                • {feature}
                                            </Typography>
                                        ))}
                                    </Box>
                                </Stack>

                                <Button
                                    variant={isCurrent ? 'outlined' : 'contained'}
                                    color='primary'
                                    sx={{ mt: 3 }}
                                    fullWidth
                                    disabled={isCurrent}
                                    onClick={() => handleSubPricing(plan.code)}
                                    loading={loading}
                                >
                                    {isCurrent ? 'Current Plan' : plan.buttonText}
                                </Button>
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    );
}

PricingPlans.Layout = MainLayout;
