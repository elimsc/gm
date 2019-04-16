export default {
  plugins: [
    [
      'umi-plugin-react',
      {
        dva: false,
        antd: true,
        dynamicImport: {
          webpackChunkName: true,
        },
      },
    ],
  ],
  runtimePublicPath: true,
  cssModulesWithAffix: true,
  extraBabelPresets: ['mobx'],
};
