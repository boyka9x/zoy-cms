import axios from 'axios';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    const res = await axios.post(`${process.env.SERVER_URL}/api/shops/login`, {
                        email: credentials?.email,
                        password: credentials?.password
                    });

                    if (!res || !res.data) {
                        throw new Error('Invalid credentials');
                    }

                    return res.data;
                } catch (err) {
                    console.error('Login error:', err.message);
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.accessToken;
                token.email = user.email;
                token.username = user.username;
                token.code = user.code;
                token.domain = user.domain;
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            session.email = token.email;
            session.username = token.username;
            session.code = token.code;
            session.domain = token.domain;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export default handler;
