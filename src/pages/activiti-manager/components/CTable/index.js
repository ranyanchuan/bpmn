import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Button, Modal, Table, message, Divider, Spin } from 'antd';

// import ActionModal from '../CModal';
import { checkError, delMore, checkEdit, numFixed, string2Moment } from 'utils';

const ruleDate = 'YYYY-MM-DD HH:mm';
const confirm = Modal.confirm;

@connect((state) => ({
  activitiManagerModel: state.activitiManagerModel,
}))

class OperationBaojiashangpin extends React.Component {
  state = {
    selectedRowKeys: [], //
    selectedRowObj: [],
    loading: false,
    visible: false,
    modalDataObj: {}, //  弹框数据
  };


  componentDidMount() {
    this.getChildData();
  }

  componentWillReceiveProps(nextProps) {
    // this.getChildData();
  }

  // 获取数据
  getChildData = (payload = {}) => {
    debugger;
    this.setState({ loading: true });
    const { childData } = this.props.activitiManagerModel;
    const { size } = childData;
    this.props.dispatch({
      type: 'activitiManagerModel/getChildData',
      payload: { size, pageIndex: 0, ...payload },
      callback: (data) => {
        let stateTemp = { loading: false };
        this.setState(stateTemp);
      },
    });
  };


  columns = [
    {
      title: '行号',
      dataIndex: 'hanghao',
      key: 'hanghao',
      // sorter: true,
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: '流程定义ID',
      dataIndex: 'id',
      key: 'id',
      // sorter: true,
    },
    {
      title: '定义名称',
      dataIndex: 'name',
      key: 'name',
      // sorter: true,
    },

    {
      title: '定义KEY',
      dataIndex: 'key',
      key: 'key',
      // sorter: true,
    },
    {
      title: '定义版本',
      dataIndex: 'version',
      key: 'version',
      // sorter: true,
    },

    {
      title: '部署ID',
      dataIndex: 'deploymentId',
      key: 'deploymentId',
      // sorter: true,
    },

    {
      title: '资源名称[bpmn]',
      dataIndex: 'resourceName',
      key: 'resourceName',
      // sorter: true,
    },
    {
      title: '资源名称[svg]',
      dataIndex: 'diagramResourceName',
      key: 'diagramResourceName',
    },
  ];

  // 关闭弹框
  onClickClose = () => {
    // this.setState({ visible: false, status: 'add' });
    this.setState({ visible: false });
  };
  // 单选框操作
  onSelectChange = (selectedRowKeys, selectedRowObj) => {
    this.setState({ selectedRowKeys, selectedRowObj });
  };
  // 展示弹框
  onShowModal = (status, record) => {
    this.setState({ visible: true, status, modalDataObj: record });
  };

  render() {
    const { loading, visible, status, modalDataObj } = this.state;
    const { pid, actionStatus } = this.props;

    const { childData } = this.props.activitiManagerModel;
    const { pageIndex, total, pageSize, rows, size } = childData;

    console.log('childData', childData, rows);


    return (
      <div>

        <Spin spinning={loading}>

          <Table
            rowKey={record => record.id.toString()}
            // rowSelection={rowSelection}
            columns={this.columns}
            size="small"
            dataSource={rows}
            pagination={{
              showSizeChanger: true,
              defaultPageSize: pageSize,
              pageSizeOptions: ['10', '20', '50', '100', '500'],
              current: pageIndex,
              total,
              pageSize: size,
            }}
            scroll={{ x: 'max-content' }}
            onChange={this.onChangePage}
          />
        </Spin>
      </div>
    );
  }
}

export default OperationBaojiashangpin;
