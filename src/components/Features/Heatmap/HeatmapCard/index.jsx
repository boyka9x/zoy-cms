import { Button, Paper, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useCallback } from 'react';
import styles from './HeatmapCard.module.css';

export const HeatmapCard = ({ index, selected, item, onChange, onSelect, onCopy, onView }) => {
    const handleCopyElement = useCallback(() => {
        if (!item?.selector) return;

        onCopy(item.selector);
    }, [item]);

    const handleMouseEnter = useCallback(() => {
        onChange(index, 'click');
    }, [index]);

    const handleMouseLeave = useCallback(() => {
        onChange(null);
    }, [index]);

    const handleCardClick = useCallback(
        (e) => {
            e.stopPropagation();
            onSelect(index, 'click');
        },
        [index]
    );

    const handleViewClick = useCallback(() => {
        if (!onView) return;

        onView(item);
    }, []);

    return (
        <div
            className={styles.container}
            data-card-rank={index}
            data-card-selected={selected === index}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleCardClick}
        >
            <Paper elevation={1} sx={{ p: 1 }}>
                <Stack direction='row' spacing={1} alignItems='center'>
                    <Typography variant='h6'>#{index}</Typography>
                    <Typography
                        sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: 400,
                        }}
                    >
                        {item?.textContent}
                    </Typography>
                </Stack>
                <Typography gutterBottom>
                    {item?.counts} clicks ({item?.rate}%)
                </Typography>

                <Stack direction='row' spacing={1}>
                    <Button variant='contained' size='small' onClick={handleViewClick}>
                        View recordings
                    </Button>
                    <Button size='small' onClick={handleCopyElement}>
                        Copy element
                    </Button>
                </Stack>
            </Paper>
        </div>
    );
};
