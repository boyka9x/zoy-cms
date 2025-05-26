import {
    BehaviorChart,
    SessionAnalytic,
    SessionChart,
    SessionSource,
    TopPages,
    VisitorChart,
} from '@/components/Analytic';
import { MainLayout } from '@/components/Layout';
import { Container, Grid, Typography } from '@mui/material';

export default function AnalyticsDashboard() {
    return (
        <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
            <Typography variant='h5' gutterBottom>
                Analytics
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <VisitorChart />
                </Grid>

                <Grid item xs={12} md={6}>
                    <SessionChart />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TopPages />
                </Grid>

                <Grid item xs={12} md={6}>
                    <SessionSource />
                </Grid>

                <Grid item xs={12}>
                    <BehaviorChart />
                </Grid>

                <Grid item xs={12}>
                    <SessionAnalytic />
                </Grid>
            </Grid>
        </Container>
    );
}

AnalyticsDashboard.Layout = MainLayout;
