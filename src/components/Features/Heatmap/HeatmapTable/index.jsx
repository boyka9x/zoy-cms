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

export const HeatmapTable = ({ pageviews, onView }) => {
    const handleHeatmapView = (pageview) => {
        if (!onView) return;

        onView(pageview);
    };

    return (
        <TableContainer component={Paper}>
            <Table size='small' aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <TableCell align='left'>Page</TableCell>
                        <TableCell align='left'>Pageviews</TableCell>
                        <TableCell align='left'>Desktop</TableCell>
                        <TableCell align='right'>Tablet</TableCell>
                        <TableCell align='right'>Mobile</TableCell>
                        <TableCell align='right'>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pageviews?.data?.map((pageview) => (
                        <TableRow hover key={pageview?.href}>
                            <TableCell align='left'>{pageview?.href}</TableCell>
                            <TableCell align='left'>{pageview.counts}</TableCell>
                            <TableCell align='left'>{pageview.device?.Desktop || 0}</TableCell>
                            <TableCell align='right'>{pageview.device?.Tablet || 0}</TableCell>
                            <TableCell align='right'>{pageview.device?.Mobile || 0}</TableCell>
                            <TableCell align='right'>
                                <IconButton
                                    aria-label='edit'
                                    size='small'
                                    color='secondary'
                                    onClick={() => handleHeatmapView(pageview)}
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
