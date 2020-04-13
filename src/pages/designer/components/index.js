import React from 'react';
import {connect} from 'dva';
import {Input, Table} from 'antd';
import {checkError, checkEdit, getPageParam} from 'utils';
import moment from 'moment';

const ruleDate = 'YYYY-MM-DD HH:mm:ss';
import styles from './index.less';


const {Search} = Input;

@connect((state) => ({
  designerModel: state.designerModel,
}))

class Designer extends React.Component {

  state = {
    loading: false,
    visible: false,
    status: 'add',
    modalDataObj: {}, //  弹框数据
  };

  componentDidMount() {

  }

  render() {

    const {blockData} = this.props.designerModel;
    const {pageIndex, total, pageSize} = blockData;
    return (
      <div>
        <div>xxsdddd</div>
      </div>
    );
  }
}

export default Designer;
