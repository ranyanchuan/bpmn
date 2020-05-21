import React from 'react';
import { connect } from 'dva';
import { checkError, checkEdit, getPageParam } from 'utils';
import { Greeter } from 'react-npm-01';
import "react-npm-01/public/index.css";

@connect((state) => ({
  leaveBillModel: state.leaveBillModel,
}))

class App extends React.Component {

  state = {
    loading: false,
    visible: false,
    approveVisible: false,
    status: 'add',
    modalDataObj: {}, //  弹框数据
  };


  render() {

    // console.log(mainList());

    return (
      <div>
        <Greeter/>
      </div>
    );
  }
}

export default App;
