import { MainNavbar } from '@/components/Navbar';
import { MainSideMenu } from '@/components/SideMenu';
import { Box, Stack } from '@mui/material';
import NavbarBreadcrumbs from './Breadcrumb';
import { ColorModeIconDropdown } from '@/components/Theme/Mode';
import { MenuButton } from '@/components/Common';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import Head from 'next/head';

export const MainLayout = ({ children }) => {
    return (
        <>
            <Head>
                <title>Record & Heatmap</title>
                <meta name='description' content='Record session and heatmap' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Box sx={{ display: 'flex' }}>
                <MainSideMenu />
                <MainNavbar />

                {/* Main content */}
                <Box
                    component='main'
                    sx={(theme) => ({
                        flexGrow: 1,
                        backgroundColor: theme.vars
                            ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                            : alpha(theme.palette.background.default, 1),
                        overflow: 'auto',
                    })}
                >
                    <Stack
                        spacing={2}
                        sx={{
                            alignItems: 'center',
                            mx: 3,
                            pb: 5,
                            mt: { xs: 8, md: 0 },
                        }}
                    >
                        <Stack
                            direction='row'
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                width: '100%',
                                alignItems: { xs: 'flex-start', md: 'center' },
                                justifyContent: 'space-between',
                                maxWidth: { sm: '100%', md: '1700px' },
                                pt: 1.5,
                            }}
                            spacing={2}
                        >
                            <NavbarBreadcrumbs />
                            <Stack direction='row' sx={{ gap: 1 }}>
                                <MenuButton showBadge aria-label='Open notifications'>
                                    <NotificationsRoundedIcon />
                                </MenuButton>
                                <ColorModeIconDropdown />
                            </Stack>
                        </Stack>
                        {children}
                    </Stack>
                </Box>
            </Box>
        </>
    );
};
