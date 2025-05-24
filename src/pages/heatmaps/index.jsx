import { HeatmapTable } from '@/components/Features/Heatmap';
import { MainLayout } from '@/components/Layout';
import { heatmapActions } from '@/redux/slices/heatmap.slice';
import { Box, Container, Pagination, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import useSWR from 'swr';

export default function HeatmapPage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [filter, setFilter] = useState({
        page: 1,
        limit: 5,
    });

    const { data: pageviews } = useSWR('/pageviews/list-page?' + new URLSearchParams(filter));

    const handleViewHeatmap = useCallback(
        (page) => {
            if (!page) return;
            dispatch(heatmapActions.setPage(page));
            router.push('/heatmaps/view');
        },
        [router]
    );

    const handlePageChange = (event, value) => {
        setFilter((prev) => ({
            ...prev,
            page: value,
        }));
    };

    return (
        <Container>
            <Stack spacing={2}>
                <Typography variant='h4' gutterBottom>
                    Heatmaps
                </Typography>
                <HeatmapTable pageviews={pageviews} onView={handleViewHeatmap} />

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Pagination
                        page={filter.page}
                        count={Math.ceil(pageviews?.total / pageviews?.limit) || 0}
                        variant='outlined'
                        shape='rounded'
                        onChange={handlePageChange}
                    />
                </Box>
            </Stack>
        </Container>
    );
}

HeatmapPage.Layout = MainLayout;
