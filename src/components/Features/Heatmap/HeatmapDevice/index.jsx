import { useState, useEffect } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import TabletAndroidIcon from '@mui/icons-material/TabletAndroid';
import StayCurrentPortraitIcon from '@mui/icons-material/StayCurrentPortrait';

const DEVICE_TYPES = [
    { type: 'Desktop', icon: <DesktopMacIcon /> },
    { type: 'Tablet', icon: <TabletAndroidIcon /> },
    { type: 'Mobile', icon: <StayCurrentPortraitIcon /> },
];

export const HeatmapDevice = ({ defaultSelect, devices = {}, onChange }) => {
    const [selected, setSelected] = useState(defaultSelect || 'Desktop');

    useEffect(() => {
        if (defaultSelect) {
            setSelected(defaultSelect);
        }
    }, [defaultSelect]);

    const handleSelect = (type) => {
        const next = selected === type ? null : type;
        setSelected(next);
        onChange?.(next);
    };

    return (
        <ButtonGroup size='small' variant='outlined' aria-label='device button group'>
            {DEVICE_TYPES.map(({ type, icon }) => (
                <Button
                    key={type}
                    startIcon={icon}
                    variant={selected === type ? 'contained' : 'outlined'}
                    onClick={() => handleSelect(type)}
                    disabled={!devices[type]}
                >
                    {devices[type] || 0}
                </Button>
            ))}
        </ButtonGroup>
    );
};
