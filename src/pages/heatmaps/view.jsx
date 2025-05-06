import {
    HeatmapClickType,
    HeatmapContent,
    HeatmapDevice,
    HeatmapSidebar,
} from '@/components/Features/Heatmap';
import { MainLayout } from '@/components/Layout';
import { Container, Grid, Stack } from '@mui/material';

export default function HeatmapView() {
    return (
        <Container>
            <Stack direction='row' spacing={2} sx={{ mb: 1 }}>
                <HeatmapDevice />
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
