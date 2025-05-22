import { PlayCircle } from '@mui/icons-material';
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';

export const ReplayTable = ({ sessions, onPlay }) => {
    const handlePlaySesssion = (session) => {
        if (!onPlay) return;

        onPlay(session);
    };

    return (
        <TableContainer component={Paper}>
            <Table size='small' aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <TableCell align='left'>ID</TableCell>
                        <TableCell align='left'>Duration</TableCell>
                        <TableCell align='left'>Device</TableCell>
                        <TableCell align='right'>Browser</TableCell>
                        <TableCell align='right'>Os</TableCell>
                        <TableCell align='right'>Time</TableCell>
                        <TableCell align='right'>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sessions?.data?.map((session) => (
                        <TableRow hover key={session._id}>
                            <TableCell align='left'>{session._id}</TableCell>
                            <TableCell align='left'>{session.duration}</TableCell>
                            <TableCell align='left'>{session.device}</TableCell>
                            <TableCell align='right'>{session.browser}</TableCell>
                            <TableCell align='right'>{session.os}</TableCell>
                            <TableCell align='right'>{session.lastActive}</TableCell>
                            <TableCell align='right'>
                                <IconButton
                                    aria-label='edit'
                                    size='small'
                                    color='secondary'
                                    onClick={() => handlePlaySesssion(session)}
                                >
                                    <PlayCircle />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
