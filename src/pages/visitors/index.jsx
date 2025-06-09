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
    Button,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Dialog,
    DialogTitle,
    DialogContent,
    Pagination,
} from '@mui/material';
import useSWR from 'swr';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import GroupIcon from '@mui/icons-material/Group';
import { useRouter } from 'next/router';
import { useState } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { formatDuration } from '@/components/Features/Replay';

dayjs.extend(relativeTime);

export default function Visitors() {
    const router = useRouter();
    const [openModalVisitor, setOpenModalVisitor] = useState(null);
    const [filter, setFilter] = useState({
        page: 1,
        limit: 6,
    });

    const { data: visitors, isLoading } = useSWR(
        `/visitors?page=${filter.page}&limit=${filter.limit}`
    );

    const handlePageChange = (value) => {
        setFilter({
            ...filter,
            page: value,
        });
    };

    const handleOpenModal = (visitor) => {
        setOpenModalVisitor(visitor);
    };

    const handleCloseModal = () => {
        setOpenModalVisitor(null);
    };

    const handleSessionClick = (sessionId) => {
        router.push(`/replays/${sessionId}`);
        handleCloseModal();
    };

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

                                <Box mt={2}>
                                    <Button
                                        variant='outlined'
                                        size='small'
                                        onClick={() => handleOpenModal(visitor)}
                                    >
                                        Show Sessions
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Pagination
                    page={filter.page}
                    count={Math.ceil(visitors?.total / filter.limit)}
                    variant='outlined'
                    shape='rounded'
                    onChange={handlePageChange}
                />
            </Box>

            <Dialog open={!!openModalVisitor} onClose={handleCloseModal} maxWidth='sm' fullWidth>
                <DialogTitle>
                    Sessions of Visitor #{openModalVisitor?.display_id || openModalVisitor?._id}
                </DialogTitle>
                <DialogContent dividers>
                    {openModalVisitor?.session?.length ? (
                        <List>
                            {openModalVisitor.session.slice(0, 5).map((session) => (
                                <ListItem
                                    key={session._id}
                                    disablePadding
                                    secondaryAction={
                                        <Button
                                            variant='outlined'
                                            onClick={() => handleSessionClick(session._id)}
                                        >
                                            <PlayArrowIcon />
                                        </Button>
                                    }
                                >
                                    <ListItemButton onClick={() => handleSessionClick(session._id)}>
                                        <ListItemText
                                            primary={`Session #${session._id.slice(-6)}`}
                                            secondary={
                                                <>
                                                    <Stack
                                                        direction='row'
                                                        spacing={1}
                                                        alignItems='center'
                                                    >
                                                        <Typography
                                                            variant='body2'
                                                            color='textSecondary'
                                                        >
                                                            Last Active:{' '}
                                                            {dayjs(session.lastActive).format(
                                                                'YYYY-MM-DD HH:mm:ss'
                                                            )}
                                                        </Typography>
                                                        <Typography
                                                            variant='body2'
                                                            color='textSecondary'
                                                            sx={{ ml: 2 }}
                                                        >
                                                            Duration:{' '}
                                                            {formatDuration(session.duration)}
                                                        </Typography>
                                                    </Stack>
                                                </>
                                            }
                                        />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Typography>No sessions found.</Typography>
                    )}
                </DialogContent>
            </Dialog>
        </Container>
    );
}

Visitors.Layout = MainLayout;
