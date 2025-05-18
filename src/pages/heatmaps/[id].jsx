import {
    HeatmapClickType,
    HeatmapContent,
    HeatmapDevice,
    HeatmapSidebar,
} from '@/components/Features/Heatmap';
import { MainLayout } from '@/components/Layout';
import { selectHeatmapPage } from '@/redux/slices/heatmap.slice';
import { selectShop } from '@/redux/slices/shop.slice';
import { Container, Grid, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import useSWR from 'swr';

export default function HeatmapView() {
    const page = useSelector(selectHeatmapPage);
    const shop = useSelector(selectShop);

    const [device, setDevice] = useState('Desktop');

    const { data: clicks } = useSWR(
        page
            ? `/clicks?shopId=${shop._id}&device=${device}&page=${encodeURIComponent(page?.href)}`
            : null,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    console.log(clicks);
    const handleDeviceChange = (newDevice) => {
        setDevice(newDevice);
    };

    return (
        <Container>
            <Typography variant='h6'>{page?.title}</Typography>
            <Typography variant='body1' sx={{ mb: 2 }}>
                URL: {page?.href}
            </Typography>

            <Stack direction='row' spacing={2} sx={{ mb: 1 }}>
                <HeatmapDevice devices={page?.device} onChange={handleDeviceChange} />
                <HeatmapClickType />
            </Stack>

            <Grid container spacing={2} sx={{ p: 2 }}>
                <Grid sx={12} md={8}>
                    <HeatmapContent />
                </Grid>
                <Grid sx={12} md={4}>
                    <HeatmapSidebar />
                </Grid>
            </Grid>
        </Container>
    );
}

HeatmapView.Layout = MainLayout;
