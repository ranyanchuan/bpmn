import React from 'react';
import { connect } from 'dva';
import { Button, Modal, Table, Divider, Spin } from 'antd';
import { checkError, checkEdit, getPageParam } from 'utils';
import ActionModal from './Modal';
import DesignerModal from './DModal';
// import CTable from './CTable';
import Search from './Search';

const confirm = Modal.confirm;
import styles from './index.less';


@connect((state) => ({
  activitiManagerModel: state.activitiManagerModel,
}))

class App extends React.Component {

  state = {
    rowId: '', //  当前行 id
    loading: false,
    visible: false,
    dVisible: false,
    status: 'add',
    processImg: '',
    modalDataObj: {}, //  弹框数据
  };


  componentDidMount() {
    this.getMainData();
  }

  columns = [
    {
      title: '序号',
      dataIndex: 'order',
      key: 'order',
      render: (text, record, index) => {
        return index + 1;
      },
    },
    // {
    //   title: '部署ID',
    //   dataIndex: 'id',
    //   key: 'id',
    // },
    {
      title: '流程定义ID',
      dataIndex: 'processDefinitionId',
      key: 'processDefinitionId',  //   流程定义key+流程定义version+部署ID
    },

    {
      title: '部署名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '流程名称',
      dataIndex: 'processDefinitionName',
      key: 'processDefinitionName',
    },

    {
      title: '流程KEY',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: '流程版本',
      dataIndex: 'version',
      key: 'version',
    },

    {
      title: '资源名称[bpmn]',
      dataIndex: 'resourceName',
      key: 'resourceName',
    },
    {
      title: '资源名称[svg]',
      dataIndex: 'diagramResourceName',
      key: 'diagramResourceName',
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
           <a onClick={this.onDesignerProcess.bind(this, record)}>设计</a>
       </span>
      ),
    },

  ];


  // 获取数据
  getMainData = (payload = {}) => {
    this.setState({ loading: true });
    const searchObj = this.childSearch.getSearchValue();
    // 获取分页数,分页数量
    const { pageNumber, pageSize } = this.props.activitiManagerModel.mainData;
    this.props.dispatch({
      type: 'activitiManagerModel/getMainData',
      payload: { pageNumber, pageSize, ...searchObj, ...payload },
      callback: (data) => {
        let stateTemp = { loading: false };
        this.setState(stateTemp);
      },
    });
  };


  // 删除表格数据
  delMainData = (payload) => {
    this.props.dispatch({
      type: 'activitiManagerModel/delMainData',
      payload: { deploymentId: payload.id },
      callback: (value) => {
        if (checkError(value)) {
          this.getMainData();
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
          this.getMainData();
        }
        callback(temp);
      },
    });
  };


  // 获取流程图片
  getProcessImg = (payload = {}) => {
    this.props.dispatch({
      type: 'activitiManagerModel/getProcessImg',
      payload,
      callback: (result) => {
        let stateTemp = { loading: false };
        if (checkError(result)) {
          const { data } = result;
          console.log('data', data);
          stateTemp.processImg = data;
        }
        this.setState(stateTemp);
      },
    });
  };


  //  onShowProcess
  onShowProcess = (data) => {
    this.getProcessImg({ deploymentId: data.id });
  };


  // 搜索面板值
  onSearchPanel = (param) => {
    this.getMainData({ ...param });
  };


  // 展示弹框
  onShowModal = (status, record) => {
    this.setState({ visible: true, status, modalDataObj: record });
  };


  // 修改分页
  onChangePage = (data) => {
    // 获取分页数据
    this.getMainData({ ...getPageParam(data) });
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
        _this.delMainData(payload);
      },
      onCancel() {
        console.log('取消删除');
      },
    });
  };


  // 关闭弹框
  onClickClose = () => {
    this.setState({ visible: false, dVisible: false, status: 'add' });
  };


  // 流程设计
  onDesignerProcess = () => {
    this.setState({ dVisible: true, status: 'add' });
  };

  render() {
    const { loading, visible, status, modalDataObj, processImg, dVisible } = this.state;
    const { mainData } = this.props.activitiManagerModel;
    const { pageNumber, total, pageSize, rows } = mainData;
    return (
      <div className={styles.home}>
        <Spin spinning={loading}>
          {processImg &&
          <img src={processImg} alt=""/>
          }
          <Search
            onSearch={this.onSearchPanel}
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

          {/*流程设计*/}
          <DesignerModal
            visible={dVisible}
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
              showSizeChanger: true,
              defaultPageSize: pageSize,
              pageSizeOptions: ['10', '20', '50', '100', '500'],
              current: pageNumber,
              total,
              pageSize: pageSize,
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
