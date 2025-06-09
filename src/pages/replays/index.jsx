import { ReplayTable } from '@/components/Features/Replay';
import { MainLayout } from '@/components/Layout';
import { selectSessionFilter, sessionActions } from '@/redux/slices/session.slice';
import { Box, Container, Pagination, Stack, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';
import dayjs from 'dayjs';

export default function ReplayList() {
    const router = useRouter();
    const dispatch = useDispatch();
    const filter = useSelector(selectSessionFilter);
    const { page, limit, date } = filter;

    const { data: sessions } = useSWR(`/sessions?page=${page}&limit=${limit}&date=${date}`);

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

    const handleDateChange = (newDate) => {
        dispatch(
            sessionActions.setFilter({
                ...filter,
                date: newDate?.toISOString(),
                page: 1,
            })
        );
    };

    return (
        <Container>
            <Stack spacing={2}>
                <Typography variant='h4' gutterBottom>
                    Session Replays
                </Typography>

                <DatePicker
                    label='Filter by Date'
                    value={date ? dayjs(date) : null}
                    onChange={handleDateChange}
                    slotProps={{
                        textField: { size: 'small', fullWidth: false, sx: { width: 200 } },
                    }}
                />

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
