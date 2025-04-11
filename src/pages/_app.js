import { EmptyLayout } from "@/components/Layout";
import { SWRConfig } from 'swr';
import { Provider } from 'react-redux';
import { ToastContainer } from "react-toastify";
import { store } from "@/redux/store";
import "@/styles/globals.css";
import { axiosClient } from "@/api-client";

export default function App({ Component, pageProps }) {
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
          revalidateOnFocus: false,
        }}
      >
        <Layout>
          <Component {...pageProps} />
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

        </Layout>
      </SWRConfig>
    </Provider>
  );
}
