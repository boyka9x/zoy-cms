'use client';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
    margin: theme.spacing(1, 0),
    [`& .${breadcrumbsClasses.separator}`]: {
        color: (theme.vars || theme).palette.action.disabled,
        margin: 1,
    },
    [`& .${breadcrumbsClasses.ol}`]: {
        alignItems: 'center',
    },
}));

const breadcrumbMap = {
    '/': [{ title: 'Dashboard', href: '/' }, { title: 'Home' }],
    '/replays': [{ title: 'Dashboard', href: '/dashboard' }, { title: 'Session Replays' }],
    '/heatmap': [{ title: 'Dashboard', href: '/dashboard' }, { title: 'Heatmap' }],
    '/visitors': [{ title: 'Dashboard', href: '/dashboard' }, { title: 'Visitors' }],
    '/analytics': [{ title: 'Dashboard', href: '/dashboard' }, { title: 'Analytics' }],
    '/settings': [{ title: 'Settings' }],
    '/about': [{ title: 'About' }],
    '/feedback': [{ title: 'Feedback' }],
};

export default function NavbarBreadcrumbs() {
    const pathname = usePathname();

    const breadcrumbItems = breadcrumbMap[pathname] ?? [{ title: 'Home' }];

    return (
        <StyledBreadcrumbs
            aria-label='breadcrumb'
            separator={<NavigateNextRoundedIcon fontSize='small' />}
        >
            {breadcrumbItems.map((item, idx) =>
                item.href ? (
                    <Typography
                        key={idx}
                        variant='body1'
                        component={Link}
                        href={item.href}
                        sx={{ textDecoration: 'none', color: 'text.secondary' }}
                    >
                        {item.title}
                    </Typography>
                ) : (
                    <Typography
                        key={idx}
                        variant='body1'
                        sx={{ color: 'text.primary', fontWeight: 600 }}
                    >
                        {item.title}
                    </Typography>
                )
            )}
        </StyledBreadcrumbs>
    );
}
