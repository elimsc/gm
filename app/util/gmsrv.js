'use strict';

const crypto = require('crypto');
const md5 = crypto.createHash('md5');

const PAYLOAD = {
  head: {
    cmd: 4097,
    ver: 1,
    token: '',
    ret: 0,
    errmsg: '',
  },
  body: {
    login_type: -1,
    pay_type: -1,
    part_id: -1,
  },
}

const GM_KEY = 'WmwcCCbA*f1gTc12aPcv3_#md5_key';

exports.genBody = (head = {}, body = {}, token_param_list = []) => {
  // 组合值
  const payload = {
    head: { ...PAYLOAD.head, ...head },
    body: { ...PAYLOAD.body, ...body },
  };

  // 计算token
  const token_param_value = token_param_list.map(v => payload.body[v]);
  const sign_data = payload.body.login_type + payload.body.pay_type + payload.body.part_id + token_param_value.join('') + GM_KEY;
  const token = md5.update(sign_data).digest('hex');

  payload.head.token = token;

  return payload;
}
