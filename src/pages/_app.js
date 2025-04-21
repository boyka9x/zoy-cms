import { EmptyLayout } from "@/components/Layout";
import { SWRConfig } from 'swr';
import { Provider } from 'react-redux';
import { ToastContainer } from "react-toastify";
import { store } from "@/redux/store";
import "@/styles/globals.css";
import { axiosClient } from "@/api-client";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import AppTheme from "@/components/Theme/App";
import { chartsCustom, dataGridCustom, datePickersCustom, treeViewCustom } from "@/components/Theme/Custom/Layout";
import dynamic from 'next/dynamic';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { SessionProvider } from "next-auth/react";

const LocalizationProvider = dynamic(
  () => import('@mui/x-date-pickers-pro').then((mod) => mod.LocalizationProvider),
  { ssr: false }
);

const xThemeComponents = {
  ...chartsCustom,
  ...dataGridCustom,
  ...datePickersCustom,
  ...treeViewCustom,
};

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const Layout = Component.Layout ?? EmptyLayout;

  return (
    <Provider store={store}>
      <SWRConfig
        value={{
          fetcher: (url) => {
            if (Array.isArray(url)) {
              return axiosClient.get(url[0], { params: url[1] });
            } else {
              return axiosClient.get(url);
            }
          },
          shouldRetryOnError: false,
        }}
      >
        <StyledEngineProvider injectFirst>
          <AppTheme {...pageProps} themeComponents={xThemeComponents}>
            <CssBaseline enableColorScheme />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <SessionProvider session={session}>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </SessionProvider>
            </LocalizationProvider>
          </AppTheme>
        </StyledEngineProvider>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </SWRConfig>
    </Provider>
  );
}
