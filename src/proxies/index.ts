import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

export function createProxy() {
    const app = express();

    app.use('/api', createProxyMiddleware({
        target: 'https://external-api.com', // Replace with your target API
        changeOrigin: true,
        pathRewrite: {
            '^/api': '', // Remove /api prefix when forwarding to the target
        },
    }));

    return app;
}