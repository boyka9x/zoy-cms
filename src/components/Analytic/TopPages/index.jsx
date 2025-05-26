import {
    Box,
    List,
    ListItem,
    ListItemText,
    Paper,
    Typography,
    Link,
    CircularProgress,
} from '@mui/material';
import useSWR from 'swr';

export const TopPages = () => {
    const { data: topPages, isLoading } = useSWR('/analytics/top-pages', {
        revalidateOnReconnect: false,
        refreshInterval: 60000,
    });

    return (
        <Paper elevation={1} sx={{ p: 2 }}>
            <Typography variant='h6' gutterBottom fontWeight='bold'>
                🔝 Top Pages
            </Typography>

            {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                    <CircularProgress size={24} />
                </Box>
            ) : topPages?.data?.length > 0 ? (
                <List disablePadding>
                    {topPages.data.map((page, index) => (
                        <ListItem key={index} divider sx={{ py: 1.5, alignItems: 'flex-start' }}>
                            <Box
                                sx={{
                                    minWidth: 32,
                                    mr: 2,
                                    textAlign: 'right',
                                    color: 'text.secondary',
                                    fontWeight: 500,
                                    fontFamily: 'monospace',
                                }}
                            >
                                {`#${index + 1}`}
                            </Box>
                            <ListItemText
                                primary={
                                    <Link
                                        href={page.href}
                                        underline='hover'
                                        target='_blank'
                                        rel='noopener'
                                        sx={{ fontWeight: 500 }}
                                    >
                                        {page.title || page.href}
                                    </Link>
                                }
                                secondary={
                                    <Typography
                                        variant='body2'
                                        color='text.secondary'
                                        sx={{ mt: 0.5 }}
                                    >
                                        Views: <strong>{page.counts}</strong>
                                    </Typography>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography variant='body2' color='text.secondary'>
                    No data available.
                </Typography>
            )}
        </Paper>
    );
};
