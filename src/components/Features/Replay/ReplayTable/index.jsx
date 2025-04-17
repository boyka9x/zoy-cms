import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export const ReplayTable = ({ sessions }) => {
    return (
        <TableContainer>
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
                    {sessions?.data?.map((session, index) => (
                        <TableRow hover key={session._id}>
                            <TableCell align='left'>{index + 1}</TableCell>
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
                                    onClick={() => handlePlay?.(session)}
                                >
                                    <PlayCircleIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
