import { Paper, Typography } from '@mui/material';

export const UsageSession = () => {
    return (
        <Paper elevation={1} sx={{ p: 2, backgroundColor: '#fdfdfd' }}>
            <Typography variant='caption' sx={{ fontWeight: 'bold' }}>
                Usage
            </Typography>
        </Paper>
    );
};
