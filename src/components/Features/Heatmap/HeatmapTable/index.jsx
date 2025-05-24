import WhatshotIcon from '@mui/icons-material/Whatshot';
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
    Box,
} from '@mui/material';

export const HeatmapTable = ({ pageviews, onView }) => {
    const handleHeatmapView = (pageview) => {
        if (!onView) return;
        onView(pageview);
    };

    return (
        <TableContainer component={Paper} elevation={1} sx={{ borderRadius: 2 }}>
            <Table size='small' aria-label='heatmap table'>
                <TableHead>
                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableCell>
                            <strong>Page URL</strong>
                        </TableCell>
                        <TableCell align='center'>
                            <strong>Total Views</strong>
                        </TableCell>
                        <TableCell align='left'>
                            <strong>Views by Device</strong>
                        </TableCell>
                        <TableCell align='center'>
                            <strong>Action</strong>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pageviews?.data?.map((pageview) => (
                        <TableRow hover key={pageview?.href}>
                            <TableCell>{pageview?.href}</TableCell>
                            <TableCell align='center'>
                                <Typography variant='body1' fontWeight={600}>
                                    {pageview.counts}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Box display='flex' gap={2}>
                                    <Typography variant='caption' color='textSecondary'>
                                        🖥 Desktop: {pageview.device?.Desktop || 0}
                                    </Typography>
                                    <Typography variant='caption' color='textSecondary'>
                                        📱 Mobile: {pageview.device?.Mobile || 0}
                                    </Typography>
                                    <Typography variant='caption' color='textSecondary'>
                                        📟 Tablet: {pageview.device?.Tablet || 0}
                                    </Typography>
                                </Box>
                            </TableCell>
                            <TableCell align='center'>
                                <Tooltip title='View Heatmap'>
                                    <IconButton
                                        size='small'
                                        color='secondary'
                                        onClick={() => handleHeatmapView(pageview)}
                                        sx={{
                                            bgcolor: 'secondary.light',
                                            color: 'secondary.dark',
                                            '&:hover': {
                                                bgcolor: 'secondary.main',
                                                color: 'white',
                                                boxShadow: 3,
                                            },
                                            borderRadius: 2,
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        <WhatshotIcon fontSize='small' />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
