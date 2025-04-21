import httpProxy from 'http-proxy';
import { getToken } from 'next-auth/jwt';

export const config = {
    api: {
        bodyParser: false,
        responseLimit: false,
    }
};

const proxy = httpProxy.createProxyServer();

export default async function handler(req, res) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    return new Promise((resolve, reject) => {
        try {
            req.headers.cookie = '';

            if (token?.accessToken) {
                req.headers.authorization = `Bearer ${token.accessToken}`;
            }

            proxy.web(req, res, {
                target: process.env.SERVER_URL,
                changeOrigin: true,
                selfHandleResponse: false,
            });

            proxy.once('proxyRes', (proxyRes) => {
                if (proxyRes.statusCode === 401 || proxyRes.statusCode === 403) {
                    res.writeHead(302, { Location: '/login' });
                    res.end();
                    return resolve(false);
                }

                resolve(true);
            });

        } catch (err) {
            resolve(false);
        }
    })
}