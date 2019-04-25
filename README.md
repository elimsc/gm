# Example for building frontend app with [umi](https://github.com/umijs/umi)

## Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deployment

Build assets with umi that will be generated to `app/public` which served by egg.

And `manifest.json` will be generated to `config`

```bash
$ npm run build
```

Start server

```bash
$ npm start
```

### code 说明
0 一般成功
1 一般错误
-10 没有登陆
-11 没有权限