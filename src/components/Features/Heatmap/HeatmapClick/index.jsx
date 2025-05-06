import { MenuItem, Select } from '@mui/material';
import { useState } from 'react';

const CLICK_TYPES = [
    { type: 'all', label: 'All Clicks' },
    { type: 'first-click', label: 'First Clicks' },
    { type: 'last-click', label: 'Last Clicks' },
];

export const HeatmapClickType = ({ onChange }) => {
    const [selected, setSelected] = useState('all');

    const handleChange = (event) => {
        const value = event.target.value;
        setSelected(value);
        onChange?.(value);
    };

    return (
        <Select
            labelId='click-type-select-label'
            value={selected}
            label='Click Type'
            onChange={handleChange}
        >
            {CLICK_TYPES.map(({ type, label }) => (
                <MenuItem key={type} value={type}>
                    {label}
                </MenuItem>
            ))}
        </Select>
    );
};
