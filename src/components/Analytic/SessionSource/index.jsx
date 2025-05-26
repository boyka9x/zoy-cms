import {
    Box,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    LinearProgress,
    Chip,
    Tooltip,
    Stack,
} from '@mui/material';
import useSWR from 'swr';
import PublicIcon from '@mui/icons-material/Public';
import LinkIcon from '@mui/icons-material/Link';

const typeColors = {
    organic: 'success',
    direct: 'default',
    referred: 'info',
    paid: 'error',
};

export const SessionSource = () => {
    const { data } = useSWR('/analytics/session-by-source', {
        revalidateOnReconnect: false,
        refreshInterval: 60000,
    });

    const list = data?.data || [];
    const maxCount = Math.max(...list.map((i) => i.count), 1);

    return (
        <Paper sx={{ p: 2, height: '100%' }} elevation={1}>
            <Box display='flex' alignItems='center' gap={1} mb={2}>
                <PublicIcon color='primary' />
                <Typography variant='h6' fontWeight='bold'>
                    Traffic Sources
                </Typography>
            </Box>

            {list.length ? (
                <List dense disablePadding>
                    {list.map((item, index) => (
                        <ListItem
                            key={index}
                            disableGutters
                            sx={{ mb: 2, alignItems: 'flex-start' }}
                        >
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: 'primary.light' }}>
                                    <LinkIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Tooltip title={item._id || 'Unknown'}>
                                        <Typography
                                            variant='body1'
                                            fontWeight={500}
                                            noWrap
                                            sx={{ maxWidth: 180 }}
                                        >
                                            {item._id || 'Null'}
                                        </Typography>
                                    </Tooltip>
                                }
                                secondary={
                                    <Stack spacing={1} mt={0.5}>
                                        <Box display='flex' alignItems='center' gap={1}>
                                            <Chip
                                                label={item.type || 'unknown'}
                                                size='small'
                                                color={typeColors[item.type] || 'default'}
                                                variant='outlined'
                                            />
                                            <Typography variant='body2' color='text.secondary'>
                                                Sessions: {item.count}
                                            </Typography>
                                        </Box>
                                        <LinearProgress
                                            variant='determinate'
                                            value={(item.count / maxCount) * 100}
                                            sx={{ height: 8, borderRadius: 4 }}
                                            color='primary'
                                        />
                                    </Stack>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography variant='body2' color='text.disabled'>
                    No data available.
                </Typography>
            )}
        </Paper>
    );
};
