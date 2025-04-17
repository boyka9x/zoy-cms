import {
    Box,
    Container,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import useSWR from 'swr';
import { MainLayout } from '@/components/Layout';
import { ReplayFilter } from '@/components/Features/Replay';

export default function ReplayList() {
    // const router = useRouter();

    // const { data: sessions } = useSWR('/sessions');

    // const handlePlay = useCallback(
    //     (session) => {
    //         router.push(`/replays/${session._id}`);
    //     },
    //     [router]
    // );

    return (
        <Container>
            <ReplayFilter />
        </Container>
    );
}

ReplayList.Layout = MainLayout;
