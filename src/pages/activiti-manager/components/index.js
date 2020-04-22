import React from 'react';
import { connect } from 'dva';
import { Button, Modal, Table, Divider, Spin } from 'antd';
import { checkError, checkEdit, getPageParam } from 'utils';
import ActionModal from './Modal';
import CTable from './CTable';
import moment from 'moment';
import router from 'umi/router';

import Search from './Search';

const ruleDate = 'YYYY-MM-DD HH:mm:ss';
const confirm = Modal.confirm;
import styles from './index.less';
import ProductApp from '../../find/components';


@connect((state) => ({
  activitiManagerModel: state.activitiManagerModel,
}))

class App extends React.Component {

  state = {
    rowId: '', //  当前行 id
    loading: false,
    visible: false,
    status: 'add',
    modalDataObj: {}, //  弹框数据
  };

  componentDidMount() {
    this.getData();
  }

  // 获取数据
  getData = (payload={}) => {
    this.setState({ loading: true });
    this.props.dispatch({
      type: 'activitiManagerModel/getMainData',
      payload,
      callback: (data) => {
        let stateTemp = { loading: false };
        this.setState(stateTemp);
      },
    });
  };


  // 删除表格数据
  delAppData = (payload) => {
    this.props.dispatch({
      type: 'activitiManagerModel/delApp',
      payload,
      callback: (value) => {
        if (checkError(value)) {
          this.getData();
        }
      },
    });
  };

  //添加表格数据
  addData = (payload, callback) => {
    this.props.dispatch({
      type: 'activitiManagerModel/addData',
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


  // 搜索面板值
  onSearchPannel = (param) => {
    this.getData({ ...param });
  };


  // 展示弹框
  onShowModal = (status, record) => {
    this.setState({ visible: true, status, modalDataObj: record });
  };


  // 修改分页
  onChangePage = (data) => {
    const searchObj = this.child.getSearchValue();
    // 获取分页数据
    this.getData({ ...getPageParam(data), ...searchObj });
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
        _this.delAppData(payload);
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
      title: '部署ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '部署名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '部署时间',
      dataIndex: 'deploymentTime',
      key: 'deploymentTime',
    },


    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <span>
           <a onClick={this.showDelCon.bind(this, record)}>删除</a>
           <Divider type="vertical"/>
            <a onClick={this.onShowModal.bind(this, 'edit', record)}>查看流程</a>
       </span>
      ),
    },

  ];

  // 关闭弹框
  onClickClose = () => {
    this.setState({ visible: false, status: 'add' });
  };

  // 搜索面板值
  onSearchPannel = (param) => {
    this.getData({ ...param });
  };

  // 展示弹框
  onShowModal = (status, record) => {
    this.setState({ visible: true, status, modalDataObj: record });
  };

  // 修改分页
  onChangePage = (data) => {
    const searchObj = this.child.getSearchValue();
    // 获取分页数据
    this.getBd_diquData({ ...getPageParam(data), ...searchObj });
  };


  render() {
    const { loading, visible, status, modalDataObj, activeKey, rowId, auditVisible } = this.state;


    const { mainData } = this.props.activitiManagerModel;
    const { pageIndex, total, pageSize, rows } = mainData;

    console.log("mainData",mainData);

    return (
      <div className={styles.home}>
        <Spin spinning={false}>

          <Search
            onSearch={this.onSearchPannel}
            onRef={(value) => this.childSearch = value}
          />
          <div className="table-operations">
            <Button type={'primary'} onClick={this.onShowModal.bind(this, 'add')}>添加</Button>
          </div>

          {/*添加表单*/}
          <ActionModal
            visible={visible}
            onSave={this.addData}
            status={status}
            onClose={this.onClickClose}
            basicData={status !== 'add' ? modalDataObj : {}}
          />

          {/*查看流程部署*/}
          <Table
            className={styles.table}
            rowKey={record => record.id.toString()}
            // rowSelection={rowSelection}
            columns={this.columns}
            size="small"
            dataSource={rows}
            pagination={{
              current: pageIndex,
              total,
              pageSize,
            }}
            // loading={loading}
            onChange={this.onChangePage}
          />

          {/*查看流程定义*/}
          {/*<CTable pid={rowId} pObj={modalDataObj} actionStatus={true}/>*/}
          {/*<CTable pid={rowId} pObj={modalDataObj} actionStatus={true}/>*/}

        </Spin>
      </div>
    );
  }
}

export default App;
