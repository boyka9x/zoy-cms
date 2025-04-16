import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import SmartphoneRoundedIcon from '@mui/icons-material/SmartphoneRounded';
import MuiAvatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MuiListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import MenuItem from '@mui/material/MenuItem';
import Select, { selectClasses } from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import * as React from 'react';

const Avatar = styled(MuiAvatar)(({ theme }) => ({
    width: 28,
    height: 28,
    backgroundColor: (theme.vars || theme).palette.background.paper,
    color: (theme.vars || theme).palette.text.secondary,
    border: `1px solid ${(theme.vars || theme).palette.divider}`,
}));

const ListItemAvatar = styled(MuiListItemAvatar)({
    minWidth: 0,
    marginRight: 12,
});

export default function SelectContent() {
    const [company, setCompany] = React.useState('');

    const handleChange = (event) => {
        setCompany(event.target.value);
    };

    return (
        <Select
            labelId='company-select'
            id='company-simple-select'
            value={company}
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Select company' }}
            fullWidth
            sx={{
                maxHeight: 56,
                width: 215,
                '&.MuiList-root': {
                    p: '8px',
                },
                [`& .${selectClasses.select}`]: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px',
                    pl: 1,
                },
            }}
        >
            <ListSubheader sx={{ pt: 0 }}>Site</ListSubheader>
            <MenuItem value=''>
                <ListItemAvatar>
                    <Avatar alt='Sitemark web'>
                        <DevicesRoundedIcon sx={{ fontSize: '1rem' }} />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary='Sitemark-web' secondary='Website' />
            </MenuItem>
            <Divider sx={{ mx: -1 }} />
            <MenuItem value={40}>
                <ListItemIcon>
                    <AddRoundedIcon />
                </ListItemIcon>
                <ListItemText primary='Add site' secondary='Website' />
            </MenuItem>
        </Select>
    );
}
