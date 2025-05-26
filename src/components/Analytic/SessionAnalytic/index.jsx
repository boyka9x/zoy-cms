import {
    Box,
    CircularProgress,
    Grid,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
} from '@mui/material';
import useSWR from 'swr';
import DevicesIcon from '@mui/icons-material/Devices';
import PublicIcon from '@mui/icons-material/Public';
import ComputerIcon from '@mui/icons-material/Computer';
import LanguageIcon from '@mui/icons-material/Language';

const iconMap = {
    'Operating Systems': <ComputerIcon color='primary' />,
    Devices: <DevicesIcon color='secondary' />,
    Browsers: <LanguageIcon color='success' />,
    Locations: <PublicIcon color='warning' />,
};

const CategoryBlock = ({ title, data }) => (
    <Paper sx={{ p: 2, height: '100%' }} elevation={1}>
        <Box display='flex' alignItems='center' gap={1} mb={1}>
            {iconMap[title]}
            <Typography variant='subtitle1' fontWeight='bold'>
                {title}
            </Typography>
        </Box>
        {data?.length ? (
            <List dense disablePadding>
                {data.map((item, index) => (
                    <ListItem key={index} disableGutters sx={{ py: 0.5 }}>
                        <ListItemAvatar>
                            <Avatar
                                sx={{
                                    width: 28,
                                    height: 28,
                                    bgcolor: 'primary.light',
                                    fontSize: 14,
                                }}
                            >
                                {item._id?.[0]?.toUpperCase() || '?'}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={item._id || 'Unknown'}
                            secondary={`Sessions: ${item.count}`}
                            primaryTypographyProps={{ fontWeight: 500, fontSize: 14 }}
                            secondaryTypographyProps={{ fontSize: 12, color: 'text.secondary' }}
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

export const SessionAnalytic = () => {
    const { data: sessions, isLoading } = useSWR('/analytics/session-analytic', {
        revalidateOnReconnect: false,
    });

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    const categories = [
        { title: 'Operating Systems', data: sessions?.data?.os },
        { title: 'Devices', data: sessions?.data?.device },
        { title: 'Browsers', data: sessions?.data?.browser },
        { title: 'Locations', data: sessions?.data?.location },
    ];

    return (
        <Box>
            <Grid container spacing={2}>
                {categories.map((cat, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <CategoryBlock title={cat.title} data={cat.data} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
