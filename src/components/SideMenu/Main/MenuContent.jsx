'use client';

import {
    AutoAwesome,
    FormatIndentIncrease,
    HomeOutlined,
    LocalAtmRounded,
    PictureInPicture,
    SupervisorAccount,
} from '@mui/icons-material';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';

import { usePathname, useRouter } from 'next/navigation';

const mainListItems = [
    { text: 'Home', icon: <HomeOutlined />, path: '/' },
    { text: 'Session Replays', icon: <FormatIndentIncrease />, path: '/replays' },
    { text: 'Heatmaps', icon: <PictureInPicture />, path: '/heatmaps' },
    { text: 'Visitors', icon: <SupervisorAccount />, path: '/visitors' },
    { text: 'Analytics', icon: <AnalyticsRoundedIcon />, path: '/analytics' },
    { text: 'Integrations', icon: <AutoAwesome />, path: '/integrations' },
];

const secondaryListItems = [
    { text: 'Settings', icon: <SettingsRoundedIcon />, path: '/settings' },
    { text: 'Pricing plans', icon: <LocalAtmRounded />, path: '/pricing-plans' },
];

export default function MenuContent() {
    const router = useRouter();
    const pathname = usePathname();

    const renderListItems = (items) =>
        items.map((item, index) => {
            const selected = pathname === item.path;
            return (
                <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton selected={selected} onClick={() => router.push(item.path)}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                </ListItem>
            );
        });

    return (
        <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
            <List dense>{renderListItems(mainListItems)}</List>
            <List dense>{renderListItems(secondaryListItems)}</List>
        </Stack>
    );
}
