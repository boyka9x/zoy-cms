import { eventApi } from '@/api-client';
import {
    HeatmapClickType,
    HeatmapContent,
    HeatmapDevice,
    HeatmapSidebar,
} from '@/components/Features/Heatmap';
import { MainLayout } from '@/components/Layout';
import { SnapshotHelper } from '@/helpers';
import { HeatmapBuilder } from '@/helpers/heatmap/builder.helper';
import { groupClickPoints } from '@/helpers/heatmap/click.helper';
import { selectHeatmapPage } from '@/redux/slices/heatmap.slice';
import { selectShop } from '@/redux/slices/shop.slice';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useSWR from 'swr';

export default function HeatmapView() {
    const page = useSelector(selectHeatmapPage);
    const shop = useSelector(selectShop);

    const [device, setDevice] = useState('Desktop');
    const [type, setType] = useState('click');

    const { data: clicks } = useSWR(
        page
            ? `/clicks?shopId=${shop._id}&device=${device}&page=${encodeURIComponent(page?.href)}`
            : null,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    const [snapshot, setSnapshot] = useState({
        building: 'processing',
        iframe: null,
        hmInstances: [],
    });

    const [click, setClick] = useState({
        points: [],
        totalCounts: 0,
    });

    useEffect(() => {
        const fetchSnapshot = async () => {
            setSnapshot((prev) => ({ ...prev, building: 'proccessing' }));
            try {
                if (!page) return;
                const res = await eventApi.findSnapshot({
                    shopId: shop._id,
                    page: page?.href,
                    device: device,
                });

                const { iframe, hmInstances } = await SnapshotHelper.build(res.data.data);

                setSnapshot((prev) => ({
                    ...prev,
                    iframe: iframe,
                    hmInstances: hmInstances || [],
                    building: 'success',
                }));
            } catch (error) {
                console.error('Error fetching snapshot:', error);
                setSnapshot((prev) => ({ ...prev, building: 'error' }));
            }
        };

        fetchSnapshot();
    }, [device]);

    useEffect(() => {
        if (snapshot.building !== 'success') return;
        if (!clicks?.data) return;

        // Group the points by selector
        const data = groupClickPoints({ points: clicks?.data });

        // Render the points on the heatmap
        HeatmapBuilder.buildClicks({
            type,
            points: data.points,
            device,
            totalCounts: data.totalCounts,
        });

        setClick(() => {
            return {
                points: data.points,
                totalCounts: data.totalCounts,
            };
        });
    }, [snapshot]);

    const handleDeviceChange = (newDevice) => {
        setDevice(newDevice);
    };

    return (
        <Box sx={{ height: '100vh', width: '100%' }}>
            <Typography variant='h6'>{page?.title}</Typography>
            <Typography variant='body1' sx={{ mb: 2 }}>
                URL: {page?.href}
            </Typography>

            <Stack direction='row' spacing={2} sx={{ mb: 1 }}>
                <HeatmapDevice devices={page?.device} onChange={handleDeviceChange} />
                <HeatmapClickType />
            </Stack>

            <Grid container spacing={2} sx={{ height: '80%' }}>
                <Grid item xs={12} md={8}>
                    <HeatmapContent device={device} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <HeatmapSidebar total={click?.totalCounts} data={click?.points} />
                </Grid>
            </Grid>
        </Box>
    );
}

HeatmapView.Layout = MainLayout;
