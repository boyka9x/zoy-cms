import { Paper, Typography, Stack } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import useSWR from 'swr';
import { format, parseISO, eachDayOfInterval } from 'date-fns';

export const VisitorChart = () => {
    const { data } = useSWR('/analytics/visitor-by-date', {
        revalidateOnReconnect: false,
        refreshInterval: 60000,
    });

    const rawData = data?.data || [];
    const total = data?.total || 0;

    if (rawData.length === 0) return null;

    const startDate = parseISO(rawData[0].date);
    const endDate = parseISO(rawData[rawData.length - 1].date);
    const fullDateList = eachDayOfInterval({ start: startDate, end: endDate });

    const countMap = rawData.reduce((acc, item) => {
        const key = format(parseISO(item.date), 'yyyy-MM-dd');
        acc[key] = item.count;
        return acc;
    }, {});

    const xAxisLabels = fullDateList.map((date) => format(date, 'MMM d'));
    const counts = fullDateList.map((date) => {
        const key = format(date, 'yyyy-MM-dd');
        return countMap[key] || 0;
    });

    return (
        <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
            <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                sx={{ mb: 2 }}
            >
                <Typography variant='subtitle1' fontWeight='bold'>
                    Visitor Trends
                </Typography>
                <Typography variant='subtitle1' fontWeight='bold' color='text.secondary'>
                    {total}
                </Typography>
            </Stack>

            <LineChart
                xAxis={[{ scaleType: 'point', data: xAxisLabels }]}
                series={[{ data: counts }]}
                height={300}
            />
        </Paper>
    );
};
