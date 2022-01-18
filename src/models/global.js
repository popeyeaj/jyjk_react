const takeLatest = { type: 'takeLatest' };
const GlobalModel = {
  namespace: 'global',
  state: {
    title: 'Welcome Myapp',
  },
  effects: {
    *yearlyCheck({ payload }, { call, put }) {
      const res = yield call(yearlyCheck, payload);
      if (res.status === 200) {
        yield put({
          type: 'setState',
          payload: {
            annualInspect: res.data,
          },
        });
      }
    },
  },

  reducers: {
    initialState() {
      return {
        ...GlobalModel.state,
      };
    },
    setState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
export default GlobalModel;
