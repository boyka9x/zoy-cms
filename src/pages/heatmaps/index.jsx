import { HeatmapFilter, HeatmapTable } from '@/components/Features/Heatmap';
import { MainLayout } from '@/components/Layout';
import { heatmapActions } from '@/redux/slices/heatmap.slice';
import { Box, Container, Pagination, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import useSWR from 'swr';

export default function HeatmapPage() {
    const router = useRouter();
    const dispatch = useDispatch();

    const { data: pageviews } = useSWR(
        '/pageviews/list-page?' +
            new URLSearchParams({
                page: 1,
                limit: 5,
                from: new Date().toUTCString(),
                to: new Date().toUTCString(),
            })
    );

    const handleViewHeatmap = useCallback(
        (page) => {
            if (!page) return;
            dispatch(heatmapActions.setPage(page));
            router.push('/heatmaps/view');
        },
        [router]
    );

    return (
        <Container>
            <Stack spacing={2}>
                <HeatmapFilter />
                <HeatmapTable pageviews={pageviews} onView={handleViewHeatmap} />

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Pagination
                        defaultPage={pageviews?.page}
                        count={Math.ceil(pageviews?.total / pageviews?.limit) || 0}
                        variant='outlined'
                        shape='rounded'
                    />
                </Box>
            </Stack>
        </Container>
    );
}

HeatmapPage.Layout = MainLayout;
