import React from 'react';
import { connect } from 'dva';
import { Table, Spin, Divider, Radio, Modal } from 'antd';
import { checkError, checkEdit, getPageParam } from 'utils';
import moment from 'moment';
import Search from './Search';
import ActionModal from './Modal';
import ApproveModal from './AModal';

const ruleTime = 'YYYY-MM-DD HH:mm:ss';
const ruleDate = 'YYYY-MM-DD';

import styles from './index.less';

const confirm = Modal.confirm;

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

  componentDidMount() {
    this.getData();
  }


  // 获取数据
  getData = (payload = {}) => {
    this.setState({ loading: true });
    this.props.dispatch({
      type: 'leaveBillModel/getMainData',
      payload,
      callback: (data) => {
        let stateTemp = { loading: false };
        this.setState(stateTemp);
      },
    });
  };

  //添加表格数据
  addData = (payload, callback) => {


    const { status, modalDataObj } = this.state;
    if (status === 'edit') { // 如果是编辑带上id
      payload.id = modalDataObj.id;
    }


    this.props.dispatch({
      type: 'leaveBillModel/addMainData',
      payload,
      callback: (value) => {
        let temp = false;
        if (checkError(value)) {
          temp = true;
          this.getData();
        }
        callback(temp);
      },
    });
  };

  // 删除表格数据
  delData = (payload) => {
    this.setState({ loading: true });
    this.props.dispatch({
      type: 'leaveBillModel/delMainData',
      payload,
      callback: (value) => {
        this.setState({ loading: false });
        if (checkError(value)) {
          this.getData();
        }
      },
    });
  };


  // 搜索面板值
  onSearchPanel = (param) => {
    this.getData({ ...param });
  };


  // 修改分页
  onChangePage = (data) => {
    const searchObj = this.child.getSearchValue();
    // 获取分页数据
    this.getData({ ...getPageParam(data), ...searchObj });
  };


  // 提交流程
  onClickSubmit = () => {

  };

  // 更新
  onClickUpd = (data) => {
    this.setState({ modalDataObj: data, status: 'edit', visible: true });
  };

  // 查看审批面板
  onClickApprove = () => {
    this.setState({ status: 'edit', approveVisible: true });
  };

  // 添加弹框
  onClickAddShow = () => {
    this.setState({ status: 'add', visible: true });
  };

  onClickClose = () => {
    this.setState({ visible: false, approveVisible: false });
  };


  // 删除弹框确认
  showDelCon = (payload) => {
    const _this = this;
    confirm({
      title: '您确定要删除吗',
      content: '',
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk() {
        // 删除数据
        _this.delData(payload);
      },
      onCancel() {
        console.log('取消删除');
      },
    });
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
          <a onClick={this.onClickUpd.bind(this, record)}>修改</a>
          <Divider type="vertical"/>
          <a onClick={this.showDelCon.bind(this, record)}>删除</a>
          <Divider type="vertical"/>
           <a onClick={this.onClickApprove.bind(this, record)}>撤回</a>
          <Divider type="vertical"/>
          <a onClick={this.onClickApprove.bind(this, record)}>审批面板</a>
          <Divider type="vertical"/>
          <a onClick={this.showDelCon.bind(this, record)}>打印预览</a>
       </span>
      ),
    },

  ];


  render() {

    const { loading, visible, approveVisible, modalDataObj, status } = this.state;
    const { mainData } = this.props.leaveBillModel;
    const { pageNumber, total, pageSize, rows } = mainData;


    return (
      <div>
        <Spin spinning={loading}>

          <Search
            onSearch={this.onSearchPanel}
            onRef={(value) => this.childSearch = value}
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


          {/*添加表单*/}
          <ActionModal
            visible={visible}
            onSave={this.addData}
            status={status}
            onClose={this.onClickClose}
            basicData={status !== 'add' ? modalDataObj : {}}
          />

          {/*查看审批*/}
          <ApproveModal
            visible={approveVisible}
            onSave={this.addData}
            status={status}
            onClose={this.onClickClose}
            basicData={status !== 'add' ? modalDataObj : {}}

          />

        </Spin>
      </div>
    );
  }
}

export default App;
