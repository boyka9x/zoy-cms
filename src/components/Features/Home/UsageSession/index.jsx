import { Paper, Slider, Typography } from '@mui/material';

export const UsageSession = ({ usage = 0, total = 0 }) => {
    const percent = total > 0 ? Math.min(100, Math.round((usage / total) * 100)) : 0;
    const today = new Date();
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const daysLeft = endOfMonth.getDate() - today.getDate();

    return (
        <Paper elevation={1} sx={{ p: 3, backgroundColor: '#fdfdfd' }}>
            <Typography variant='caption' component='div' sx={{ fontWeight: 'bold' }} gutterBottom>
                Usage
            </Typography>
            <Typography variant='caption' component='div' sx={{ fontWeight: 'bold' }}>
                {usage} / {total} recordings
            </Typography>
            <Slider
                value={percent}
                min={0}
                max={100}
                color='secondary'
                disabled
                sx={{
                    '& .MuiSlider-thumb': {
                        display: 'none',
                    },
                    '&': {
                        padding: '0 0 0 0',
                    },
                }}
            />
            <Typography variant='caption' component='div' gutterBottom>
                {percent}% sessions used — {daysLeft} day{daysLeft !== 1 ? 's' : ''} left this month
            </Typography>
        </Paper>
    );
};
