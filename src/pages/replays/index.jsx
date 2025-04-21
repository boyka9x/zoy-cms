import { ReplayFilter, ReplayTable } from '@/components/Features/Replay';
import { MainLayout } from '@/components/Layout';
import { Box, Container, Pagination, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import useSWR from 'swr';

export default function ReplayList() {
    const router = useRouter();

    const { data: sessions } = useSWR('/sessions');

    const handlePlaySession = useCallback(
        (session) => {
            router.push(`/replays/${session._id}`);
        },
        [router]
    );

    return (
        <Container>
            <Stack spacing={2}>
                <ReplayFilter />
                <ReplayTable sessions={sessions} onPlay={handlePlaySession} />

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Pagination count={10} variant='outlined' shape='rounded' />
                </Box>
            </Stack>
        </Container>
    );
}

ReplayList.Layout = MainLayout;
