import { MainLayout } from '@/components/Layout';
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    Chip,
    Stack,
    CircularProgress,
    Box,
} from '@mui/material';
import useSWR from 'swr';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import GroupIcon from '@mui/icons-material/Group';

dayjs.extend(relativeTime);

export default function Visitors() {
    const { data: visitors, isLoading } = useSWR('/visitors');

    if (isLoading) {
        return (
            <Box display='flex' justifyContent='center' alignItems='center' minHeight={200}>
                <CircularProgress />
            </Box>
        );
    }

    if (!visitors?.data?.length) {
        return (
            <Container>
                <Typography>No visitors found.</Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant='h5' gutterBottom>
                Visitors
            </Typography>
            <Grid container spacing={3}>
                {visitors?.data?.map((visitor) => (
                    <Grid item xs={12} md={6} lg={4} key={visitor._id}>
                        <Card elevation={2}>
                            <CardContent>
                                <Typography variant='subtitle1' fontWeight={600}>
                                    # {visitor.display_id || visitor._id}
                                </Typography>

                                <Stack direction='row' spacing={1} my={1} flexWrap='wrap'>
                                    <Chip label={visitor.os} size='small' />
                                    <Chip label={visitor.device} size='small' />
                                    <Chip label={visitor.browser} size='small' />
                                    <Chip label={visitor.location || 'VN'} size='small' />
                                </Stack>

                                <Stack
                                    direction='row'
                                    alignItems='center'
                                    spacing={1}
                                    mt={1}
                                    mb={1}
                                >
                                    <GroupIcon fontSize='small' color='primary' />
                                    <Typography
                                        variant='body2'
                                        color='text.primary'
                                        fontWeight={500}
                                    >
                                        {visitor.sessionCount} session
                                        {visitor.sessionCount !== 1 ? 's' : ''}
                                    </Typography>
                                </Stack>

                                <Typography variant='body2' color='text.secondary'>
                                    Last Active:{' '}
                                    {visitor.lastActive
                                        ? dayjs(visitor.lastActive).fromNow()
                                        : 'N/A'}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

Visitors.Layout = MainLayout;
