import { Box } from '@mui/material';
import styles from './Content.module.css';

export const HeatmapContent = ({ device }) => {
    const getWidth = () => {
        switch (device) {
            case 'Tablet':
                return 1024;
            case 'Mobile':
                return 412;
            case 'Desktop':
            default:
                return '100%';
        }
    };

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                margin: '0 auto',
                borderRadius: 2,
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                transition: 'box-shadow 0.3s ease',
                '&:hover': {
                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                },
                display: 'flex',
                justifyContent: 'center',
                bgcolor: 'background.paper',
            }}
        >
            <iframe
                id='frame-heatmap'
                width={getWidth()}
                height='100%'
                className={styles.iframe}
            ></iframe>
        </Box>
    );
};
