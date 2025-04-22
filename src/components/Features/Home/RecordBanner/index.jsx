import { Box, Button, Paper, Typography } from '@mui/material';

export const HomeRecordBanner = ({ status, onChange }) => {
    return (
        <Paper sx={{ mt: 2, p: 2, backgroundColor: '#fdfdfd' }} elevation={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography component='div'>
                    <Typography variant='body1' component='span' sx={{ fontWeight: 'bold' }}>
                        Heatmap, Record & Replay&nbsp;
                    </Typography>
                    <Typography variant='body2' component='span'>
                        is {status ? 'enabled' : 'disabled'} in your live theme.
                    </Typography>
                </Typography>

                <Button size='small' variant='contained' onClick={() => onChange(!status)}>
                    {status ? 'Disable' : 'Enable'}
                </Button>
            </Box>
        </Paper>
    );
};
