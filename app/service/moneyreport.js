'use strict';

/**
 * 充值上报控制
 */

const BaseReqService = require('./basereq');

class MoneyreportService extends BaseReqService {
  // 充值上报控制
  async report({ part_id, mode, moneylist, uid_list }) {
    // if (mode == 0 || mode == 2 || mode == 3) {
    //   return {
    //     moneylist: [{ low: 10, high: 15 }, { low: 20, high: 25 }, { low: 30, high: 35 }],
    //     uid_list: [],
    //   };
    // } else {
    //   return {
    //     moneylist: [],
    //     uid_list: ["12313123", '2131313', '343434343', '45454545'],
    //   }
    // }

    console.log({ part_id, mode, moneylist, uid_list });
    const result = await this.request({ cmd: 3025 }, { part_id, mode, moneylist, uid_list }, ['mode']);
    console.log(result.data.body);
    try {
      return result.data.body;
    } catch (e) {
      return [];
    }
  }

}

module.exports = MoneyreportService;
