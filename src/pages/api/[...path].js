import httpProxy from 'http-proxy';

export const config = {
    api: {
        bodyParser: false,
        responseLimit: false,
    }
};

const proxy = httpProxy.createProxyServer();

export default function handler(req, res) {
    return new Promise((resolve, reject) => {
        try {
            req.headers.cookie = '';

            proxy.web(req, res, {
                target: process.env.SERVER_URL,
                changeOrigin: true,
                selfHandleResponse: false,
            });

            proxy.once('proxyRes', () => {
                resolve(true);
            });

        } catch (err) {
            resolve(false);
        }
    })
}