import { Button, Paper, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import BlockIcon from '@mui/icons-material/Block';

export const NewRecording = ({ count = 0 }) => {
    const router = useRouter();

    const handleRedirect = () => {
        router.push('/replays');
    };

    return (
        <Paper
            elevation={1}
            sx={{
                p: 3,
                backgroundColor: '#fdfdfd',
                '&': {
                    height: '100%',
                },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {count == 0 ? (
                <>
                    <BlockIcon sx={{ fontSize: 48, color: '#bbb', mb: 1 }} />
                    <Typography variant='body1'>
                        No new recordings from the last 24 hours
                    </Typography>
                </>
            ) : (
                <>
                    <Typography variant='body1' gutterBottom>
                        You have {count} new recording{count > 1 ? 's' : ''} from the last 24 hours
                    </Typography>
                    <Button size='small' variant='contained' onClick={handleRedirect}>
                        View Recordings
                    </Button>
                </>
            )}
        </Paper>
    );
};
