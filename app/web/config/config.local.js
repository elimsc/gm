export default {
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:7001/',
      changeOrigin: true,
    },
  },
};
