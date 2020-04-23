import * as services from '../services';


const initTable = {
  rows: [],
  pageNumber: 0,
  total: 0,
  pageSize: 20,
};

export default {
  namespace: 'activitiManagerModel',

  state: {

    mainData: {
      ...initTable,
    },
    childData: {
      ...initTable,
    },
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

    //  获取主表数据
    * getMainData({ payload, callback }, { call, put, select }) {
      const { data } = yield call(services.getDeployment, payload);
      let mainData = initTable;
      if (data) {
        mainData = data;
        yield put({ type: 'updateState', res: { mainData } });
      }
      if (callback) {
        callback(data);
      }
    },


    // 删除一条主表数据
    * delMainData({ payload, callback }, { call, put, select }) {
      const data = yield call(services.delDeployment, payload);
      if (callback) {
        callback(data);
      }
    },



    //  获取子表数据
    * getChildData({ payload, callback }, { call, put, select }) {
      const { data } = yield call(services.getDefinition, payload);

      let childData = initTable;
      if (data) {
        childData = data;
        yield put({ type: 'updateState', res: { childData } });
      }
      if (callback) {
        callback(data);
      }
    },







  },


};

