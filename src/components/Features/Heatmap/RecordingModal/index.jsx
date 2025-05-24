import { sessionApi } from '@/api-client';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    List,
    ListItem,
    ListItemText,
    CircularProgress,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const RecordingModal = ({ open, onClose, sessionIds }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [recordings, setRecordings] = useState([]);

    useEffect(() => {
        if (open && sessionIds?.length) {
            setLoading(true);
            const fetchRecordings = async () => {
                try {
                    const res = await sessionApi.getByIds({
                        ids: sessionIds,
                    });
                    setRecordings(res.data || []);
                } catch (error) {
                    console.error('Error fetching recordings:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchRecordings();
        }
    }, [open, sessionIds]);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
            <DialogTitle>Recordings</DialogTitle>
            <DialogContent dividers>
                {loading ? (
                    <CircularProgress />
                ) : recordings.length === 0 ? (
                    <p>No recordings found.</p>
                ) : (
                    <List dense>
                        {recordings.map((rec, idx) => {
                            const date = new Date(rec.createdAt);
                            const formattedDate = date.toLocaleString();
                            const durationSec = Math.floor(rec.duration || 0);
                            const durationMin = Math.floor(durationSec / 60);
                            const duration = `${durationMin}m ${durationSec % 60}s`;

                            return (
                                <ListItem
                                    key={rec._id || idx}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        border: '1px solid #eee',
                                        borderRadius: 1,
                                        px: 2,
                                        py: 1,
                                        mb: 1,
                                    }}
                                >
                                    <ListItemText
                                        primary={`#${idx + 1} | ${rec.os} • ${rec.device} • ${
                                            rec.browser
                                        }`}
                                        secondary={`${formattedDate} • ${duration}`}
                                        sx={{ mr: 2 }}
                                    />
                                    <Button
                                        size='small'
                                        variant='outlined'
                                        onClick={() => router.push(`/replays/${rec._id}`)}
                                    >
                                        Play
                                    </Button>
                                </ListItem>
                            );
                        })}
                    </List>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};
