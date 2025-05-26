import useSWR from 'swr';
import { Paper, Typography, CircularProgress, Box, Stack, Button, Alert } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { useSelector } from 'react-redux';
import { selectShop } from '@/redux/slices/shop.slice';
import { useRouter } from 'next/router';

export const BehaviorChart = () => {
    const router = useRouter();
    const shop = useSelector(selectShop);

    const {
        data: behaviors,
        isLoading,
        error,
    } = useSWR('/analytics/session-by-type', {
        revalidateOnReconnect: false,
        refreshInterval: 60000,
    });

    console.log(shop);

    if (!shop?.pixel_id) {
        return (
            <Paper sx={{ p: 3, textAlign: 'center' }} elevation={2}>
                <Alert severity='warning' sx={{ mb: 2 }}>
                    Bạn cần liên kết với Shopify để xem dữ liệu hành vi.
                </Alert>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => router.push('/integrations')}
                >
                    Liên kết với Shopify
                </Button>
            </Paper>
        );
    }

    if (isLoading) {
        return (
            <Box display='flex' justifyContent='center' alignItems='center' minHeight={200}>
                <CircularProgress />
            </Box>
        );
    }

    if (error || !behaviors?.data) {
        return (
            <Box p={3} textAlign='center'>
                <Typography color='error' variant='body1'>
                    Không có dữ liệu hành vi.
                </Typography>
            </Box>
        );
    }

    const order = [
        'view-product',
        'add-to-cart',
        'removed-from-cart',
        'view-cart',
        'checkout-started',
        'checkout-completed',
    ];

    const behaviorMap = new Map(behaviors.data.map((item) => [item.type, item.count]));

    const chartData = {
        xAxis: [
            {
                id: 'type',
                data: order,
                scaleType: 'band',
            },
        ],
        series: [
            {
                data: order.map((type) => behaviorMap.get(type) ?? 0),
                label: 'Clicks',
                color: '#1976d2',
            },
        ],
        height: 320,
    };

    return (
        <Paper sx={{ p: 2 }} elevation={1}>
            <Stack>
                <Typography variant='h6' fontWeight='bold'>
                    Behaviors
                </Typography>
            </Stack>
            <BarChart {...chartData} />
        </Paper>
    );
};
