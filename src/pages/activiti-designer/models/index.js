import * as services from '../services';

export default {
  namespace: 'activitiDesignerModel',

  state: {

  },


  reducers: {

    updateState(state, { res }) { //更新state
      return {
        ...state,
        ...res,
      };
    },
  },


  effects: {


    // 获取流程图片
    * getProcessImg({ payload, callback }, { call, put, select }) {
      const data = yield call(services.getProcessImg, payload);
      if (callback) {
        callback(data);
      }
    },


  },


};

