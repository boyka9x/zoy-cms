import { ReplayTable } from '@/components/Features/Replay';
import { MainLayout } from '@/components/Layout';
import { selectSessionFilter, sessionActions } from '@/redux/slices/session.slice';
import { Box, Container, Pagination, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';

export default function ReplayList() {
    const router = useRouter();
    const dispatch = useDispatch();
    const filter = useSelector(selectSessionFilter);
    const { page, limit } = filter;

    const { data: sessions } = useSWR(`/sessions?page=${page}&limit=${limit}`);

    const handlePlaySession = (session) => {
        router.push(`/replays/${session._id}`);
    };

    const handlePageChange = (value) => {
        dispatch(
            sessionActions.setFilter({
                ...filter,
                page: value,
            })
        );
    };

    return (
        <Container>
            <Stack spacing={2}>
                <Typography variant='h4' gutterBottom>
                    Session Replays
                </Typography>

                <ReplayTable sessions={sessions} onPlay={handlePlaySession} />

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Pagination
                        page={page}
                        count={Math.ceil(sessions?.total / limit)}
                        variant='outlined'
                        shape='rounded'
                        onChange={handlePageChange}
                    />
                </Box>
            </Stack>
        </Container>
    );
}

ReplayList.Layout = MainLayout;
