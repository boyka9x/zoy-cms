import { DateRange } from '@/components/Common';
import { Stack } from '@mui/material';

export const HeatmapFilter = () => {
    return (
        <Stack direction='row' spacing={2}>
            {/* Filter date range */}
            <DateRange />
        </Stack>
    );
};
