import { Button } from '@mui/material';
import { useState } from 'react';

export const HeatmapClickType = ({ onChange }) => {
    const [selected, setSelected] = useState('all');

    const handleChange = (event) => {
        const value = event.target.value;
        setSelected(value);
        onChange?.(value);
    };

    return (
        <Button variant='outlined' size='small'>
            All Clicks
        </Button>
    );
};
