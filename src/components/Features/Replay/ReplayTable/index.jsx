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
    Tooltip,
} from '@mui/material';

const countryNameMap = {
    VN: 'Vietnam',
    US: 'United States',
    FR: 'France',
    DE: 'Germany',
    CN: 'China',
    JP: 'Japan',
    KR: 'South Korea',
    IN: 'India',
    GB: 'United Kingdom',
};

function countryCodeToEmoji(countryCode) {
    if (!countryCode || countryCode.length !== 2) return '🏳️';

    return countryCode
        .toUpperCase()
        .split('')
        .map((char) => String.fromCodePoint(127397 + char.charCodeAt()))
        .join('');
}

function formatDuration(seconds) {
    if (!seconds || isNaN(seconds)) return '0s';

    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    const parts = [];
    if (h > 0) parts.push(`${h}h`);
    if (m > 0) parts.push(`${m}m`);
    if (s > 0 || parts.length === 0) parts.push(`${s}s`);

    return parts.join(' ');
}

export const ReplayTable = ({ sessions, onPlay }) => {
    const handlePlaySession = (session) => {
        if (!onPlay) return;
        onPlay(session);
    };

    return (
        <TableContainer
            component={Paper}
            sx={{
                borderRadius: 2,
                boxShadow: 3,
            }}
        >
            <Table stickyHeader size='small' aria-label='sessions table'>
                <TableHead>
                    <TableRow>
                        <TableCell align='left'>ID</TableCell>
                        <TableCell align='left'>Country</TableCell>
                        <TableCell align='left'>Duration</TableCell>
                        <TableCell align='left'>Device</TableCell>
                        <TableCell align='right'>Browser</TableCell>
                        <TableCell align='right'>OS</TableCell>
                        <TableCell align='right'>Last Active</TableCell>
                        <TableCell align='center'>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sessions?.data?.map((session) => (
                        <TableRow
                            key={session._id}
                            hover
                            sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
                        >
                            <TableCell align='left'>{session._id}</TableCell>
                            <TableCell align='left' sx={{ whiteSpace: 'nowrap' }}>
                                {countryCodeToEmoji(session.location)}{' '}
                                {countryNameMap[session.location] || session.location || 'Unknown'}
                            </TableCell>
                            <TableCell align='left'>{formatDuration(session.duration)}</TableCell>
                            <TableCell align='left'>{session.device}</TableCell>
                            <TableCell align='right'>{session.browser}</TableCell>
                            <TableCell align='right'>{session.os}</TableCell>
                            <TableCell align='right'>
                                {session.lastActive
                                    ? new Date(session.lastActive).toLocaleString()
                                    : '-'}
                            </TableCell>
                            <TableCell align='center'>
                                <Tooltip title='Play session'>
                                    <IconButton
                                        aria-label='play session'
                                        size='small'
                                        color='primary'
                                        onClick={() => handlePlaySession(session)}
                                        sx={{
                                            bgcolor: 'primary.light',
                                            color: 'primary.dark',
                                            '&:hover': {
                                                bgcolor: 'primary.main',
                                                color: 'white',
                                                boxShadow: 4,
                                            },
                                            borderRadius: 2,
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        <PlayCircle fontSize='small' />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
