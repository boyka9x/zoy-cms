import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function CardAlert() {
    return (
        <Card variant='outlined' sx={{ m: 1.5, flexShrink: 0 }}>
            <CardContent>
                <AutoAwesomeRoundedIcon fontSize='small' />
                <Typography gutterBottom sx={{ fontWeight: 600 }}>
                    Have a good day!
                </Typography>
            </CardContent>
        </Card>
    );
}
