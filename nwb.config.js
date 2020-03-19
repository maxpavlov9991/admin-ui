module.exports = {
    type: 'react-app',
    webpack: {
        define: {
            'process.env.VERSION': JSON.stringify(require('./package.json').version),
            'process.env.API_URL': JSON.stringify(require('./package.json').api_url),
        },
    },
};
