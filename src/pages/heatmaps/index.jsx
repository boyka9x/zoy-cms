import { HeatmapFilter, HeatmapTable } from '@/components/Features/Heatmap';
import { MainLayout } from '@/components/Layout';
import { Box, Container, Pagination, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import useSWR from 'swr';

export default function HeatmapPage() {
    const router = useRouter();

    const { data: pageviews } = useSWR(
        '/pageviews/list-page?' +
            new URLSearchParams({
                page: 1,
                limit: 5,
                from: new Date(),
                to: new Date(),
            })
    );

    const handleViewHeatmap = (page) => {
        if (!page || !page.href) return;
        router.push(`/heatmaps/view?page=${page.href}`);
    };

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
