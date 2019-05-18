'use strict';

exports.request = (app, token = '') => {
  return app.httpRequest().field('Authorization', 'Bearer ' + token);
};

exports.get = (app, url, token = '') => {
  return app.httpRequest().get(url).set('Authorization', 'Bearer ' + token);
};

exports.post = (app, url, token = '') => {
  return app.httpRequest().post(url).set('Authorization', 'Bearer ' + token);
};
