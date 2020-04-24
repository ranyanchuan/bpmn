import React from 'react';
import { connect } from 'dva';
import { Input, Table, Spin, Divider, Radio } from 'antd';
import { checkError, checkEdit, getPageParam } from 'utils';
import moment from 'moment';
import Search from './Search';
import ActionModal from './Modal';

const ruleTime = 'YYYY-MM-DD HH:mm:ss';
const ruleDate = 'YYYY-MM-DD';

import styles from './index.less';


@connect((state) => ({
  leaveBillModel: state.leaveBillModel,
}))

class App extends React.Component {

  state = {
    loading: false,
    visible: false,
    status: 'add',
    modalDataObj: {}, //  弹框数据
  };

  componentDidMount() {
    this.getMainData();
  }


  // 获取数据
  getMainData = (payload = {}) => {
    this.setState({ loading: true });
    const _this = this;
    this.props.dispatch({
      type: 'leaveBillModel/getMainData',
      payload,
      callback: (data) => {
        let stateTemp = { loading: false };
        _this.setState(stateTemp);
      },
    });
  };


  // 搜索面板值
  onSearchPanel = (param) => {
    this.getMainData({ ...param });
  };


  // 修改分页
  onChangePage = (data) => {
    const searchObj = this.child.getSearchValue();
    // 获取分页数据
    this.getMainData({ ...getPageParam(data), ...searchObj });
  };


  // 提交流程
  onClickSubmit = () => {

  };

  // 删除提示
  showDelCon = () => {

  };


  columns = [
    {
      title: '序号',
      dataIndex: 'order',
      key: 'order',
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: '请假人',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: '请假天数',
      dataIndex: 'days',
      key: 'days',
    },

    {
      title: '请假描述',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '离开日期',
      dataIndex: 'leaveDate',
      key: 'leaveDate',
      render: (text) => {
        return text ? moment(text).format(ruleDate) : '';
      },
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text) => {
        return text ? moment(text).format(ruleTime) : '';
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <span>
           <a onClick={this.onClickSubmit.bind(this, record)}>提交</a>
          <Divider type="vertical"/>
          <a onClick={this.showDelCon.bind(this, record)}>修改</a>
          <Divider type="vertical"/>
          <a onClick={this.showDelCon.bind(this, record)}>删除</a>
          <Divider type="vertical"/>
           <a onClick={this.showDelCon.bind(this, record)}>撤回</a>
          <Divider type="vertical"/>
          <a onClick={this.showDelCon.bind(this, record)}>审批面板</a>
          <Divider type="vertical"/>
          <a onClick={this.showDelCon.bind(this, record)}>打印预览</a>
       </span>
      ),
    },

  ];


  onClickAddShow = () => {
    // console.log("value",e,e.target.value );
    this.setState({ status: 'add', visible: true });

  };

  onClickClose = () => {
    this.setState({ visible: false });
  };

  render() {

    const { loading, visible, modalDataObj,status } = this.state;
    const { mainData } = this.props.leaveBillModel;
    const { pageNumber, total, pageSize, rows } = mainData;


    return (
      <div>
        <Spin spinning={loading}>

          <Search
            onSearch={this.onSearchPanel}
            onRef={(value) => this.childSearch = value}
          />


          {/*添加表单*/}
          <ActionModal
            visible={visible}
            onSave={this.addData}
            status={status}
            onClose={this.onClickClose}
            basicData={status !== 'add' ? modalDataObj : {}}
          />

          <div className="table-header-btn">
            <Radio.Group>
              <Radio.Button value="add" onClick={this.onClickAddShow}>添加</Radio.Button>
              {/*<Radio.Button value="del">删除</Radio.Button>*/}
              <Radio.Button value="">刷新</Radio.Button>
              <Radio.Button value="export">导出</Radio.Button>
              <Radio.Button value="set">设置</Radio.Button>
            </Radio.Group>
          </div>


          <Table
            className={styles.table}
            rowKey={record => record.id.toString()}
            columns={this.columns}
            size="small"
            dataSource={rows}
            pagination={{
              showQuickJumper: true,
              showSizeChanger: true,
              defaultPageSize: pageSize,
              pageSizeOptions: ['10', '20', '50', '100', '500'],
              current: pageNumber,
              total,
              pageSize: pageSize,
              showTotal: total => `总共 ${total} 条`,
            }}
            // loading={loading}
            onChange={this.onChangePage}
          />
        </Spin>
      </div>
    );
  }
}

export default App;
