import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useColorScheme } from '@mui/material/styles';

export const ColorModeSelect = (props) => {
    const { mode, setMode } = useColorScheme();
    if (!mode) {
        return null;
    }
    return (
        <Select
            value={mode}
            onChange={(event) => setMode(event.target.value)}
            SelectDisplayProps={{
                'data-screenshot': 'toggle-mode',
            }}
            {...props}
        >
            <MenuItem value='system'>System</MenuItem>
            <MenuItem value='light'>Light</MenuItem>
            <MenuItem value='dark'>Dark</MenuItem>
        </Select>
    );
};
