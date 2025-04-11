import { RRWebPlayer } from '@/components/Features/Replay';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import rrwebPlayer from 'rrweb-player';
import useSWR from 'swr';

export default function Replay() {
    const router = useRouter();
    const { id } = router.query;
    const { data: events } = useSWR(id && `/events?sessionId=${id}`);

    useEffect(() => {
        if (!events) return;

        new rrwebPlayer({
            target: document.querySelector('#player > div.rrweb'),
            props: {
                events: events.data,
            },
        });
    }, [events]);

    return (
        <Box
            sx={{
                display: 'flex',
                height: '100vh',
                width: '100vw',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f5f5f5',
            }}
        >
            <RRWebPlayer />

            {/* Timeline */}
        </Box>
    );
}
