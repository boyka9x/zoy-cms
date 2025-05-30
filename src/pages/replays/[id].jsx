import { MainLayout } from '@/components/Layout';
import { Box, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import rrwebPlayer from 'rrweb-player';
import useSWR from 'swr';

export default function Replay() {
    const router = useRouter();
    const { id } = router.query;
    const containerRef = useRef(null);

    const { data: events } = useSWR(id ? `/events?sessionId=${id}` : null, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    useEffect(() => {
        if (!events || !containerRef.current) return;

        containerRef.current.innerHTML = '';

        new rrwebPlayer({
            target: containerRef.current,
            props: {
                events: events.data,
            },
        });
    }, [events]);

    return (
        <Box sx={{ height: '100vh', p: 2, boxSizing: 'border-box' }}>
            <Grid container spacing={2} sx={{ height: '100%' }}>
                {/* RRWeb Player Area */}
                <Grid xs={12}>
                    <div ref={containerRef} />
                </Grid>
            </Grid>
        </Box>
    );
}

Replay.Layout = MainLayout;
