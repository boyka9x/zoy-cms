import * as React from 'react';
import { Container, Grid, Paper, Typography, List, ListItem, ListItemText } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { MainLayout } from '@/components/Layout';

// Dữ liệu mẫu
const sessionsData = [
    { date: '2023-05-01', sessions: 120, visitors: 100 },
    { date: '2023-05-02', sessions: 150, visitors: 120 },
    { date: '2023-05-03', sessions: 170, visitors: 130 },
    { date: '2023-05-04', sessions: 140, visitors: 110 },
];

const xLabels = sessionsData.map((d) => d.date);
const sessionValues = sessionsData.map((d) => d.sessions);
const visitorValues = sessionsData.map((d) => d.visitors);

const deviceData = [
    { id: 0, value: 400, label: 'Mobile' },
    { id: 1, value: 300, label: 'Desktop' },
    { id: 2, value: 100, label: 'Tablet' },
];

const osData = [
    { id: 0, value: 450, label: 'Windows' },
    { id: 1, value: 250, label: 'MacOS' },
    { id: 2, value: 100, label: 'Linux' },
];

const browserData = [
    { id: 0, value: 500, label: 'Chrome' },
    { id: 1, value: 200, label: 'Firefox' },
    { id: 2, value: 100, label: 'Safari' },
];

const topPages = [
    { title: '/home', views: 300 },
    { title: '/products', views: 250 },
    { title: '/about', views: 150 },
];

export default function AnalyticsDashboard() {
    return (
        <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
            <Typography variant='h4' gutterBottom>
                Analytics Dashboard
            </Typography>

            <Grid container spacing={3}>
                {/* Line Chart - Sessions */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant='h6' gutterBottom>
                            Sessions by Date
                        </Typography>
                        <LineChart
                            xAxis={[{ data: xLabels, label: 'Date' }]}
                            series={[{ data: sessionValues, label: 'Sessions' }]}
                            height={300}
                        />
                    </Paper>
                </Grid>

                {/* Line Chart - Visitors */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant='h6' gutterBottom>
                            Visitors by Date
                        </Typography>
                        <LineChart
                            xAxis={[{ data: xLabels, label: 'Date' }]}
                            series={[{ data: visitorValues, label: 'Visitors' }]}
                            height={300}
                        />
                    </Paper>
                </Grid>

                {/* PieChart - Devices */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant='h6' gutterBottom>
                            Devices
                        </Typography>
                        <PieChart
                            series={[{ data: deviceData, innerRadius: 60 }]}
                            width={300}
                            height={300}
                        />
                    </Paper>
                </Grid>

                {/* PieChart - OS */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant='h6' gutterBottom>
                            Operating Systems
                        </Typography>
                        <PieChart
                            series={[{ data: osData, innerRadius: 60 }]}
                            width={300}
                            height={300}
                        />
                    </Paper>
                </Grid>

                {/* PieChart - Browser */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant='h6' gutterBottom>
                            Browsers
                        </Typography>
                        <PieChart
                            series={[{ data: browserData, innerRadius: 60 }]}
                            width={300}
                            height={300}
                        />
                    </Paper>
                </Grid>

                {/* Top Pages */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant='h6' gutterBottom>
                            Top Pages
                        </Typography>
                        <List>
                            {topPages.map((page, index) => (
                                <ListItem key={index}>
                                    <ListItemText
                                        primary={page.title}
                                        secondary={`Views: ${page.views}`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

AnalyticsDashboard.Layout = MainLayout;
