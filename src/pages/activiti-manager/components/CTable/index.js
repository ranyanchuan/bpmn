import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Button, Modal, Table, message, Divider, Spin } from 'antd';

// import ActionModal from '../CModal';
import { checkError, delMore, checkEdit,numFixed,string2Moment } from 'utils';

const ruleDate = 'YYYY-MM-DD HH:mm';
const confirm = Modal.confirm;

@connect((state) => ({
  baojiadanModel: state.baojiadanModel,
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
    const { pid } = this.props;
    if (pid) {
      this.getBaojiashangpinData({ pid });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { pid } = nextProps;
    if (pid !== this.props.pid) {
      this.getBaojiashangpinData({ pid });
    }
  }


  // 获取数据
  getBaojiashangpinData = (payload = {}) => {
    this.setState({ loading: true });
    const { pid } = this.props;
    if (!payload.pid) {
      payload.pid = pid;
    }

    const { baojiashangpinData } = this.props.baojiadanModel;
    const { size } = baojiashangpinData;

    this.props.dispatch({
      type: 'baojiadanModel/getBaojiashangpin',
      payload:{size,pageIndex: 1,...payload},
      callback: (data) => {
        let stateTemp = { loading: false };
        this.setState(stateTemp);
      },
    });
  };
  // 删除表格数据
  delBaojiashangpinData = (payload) => {

    this.setState({ loading: true });
    this.props.dispatch({
      type: 'baojiadanModel/delBaojiashangpin',
      payload: delMore(payload),
      callback: (value) => {
        if (checkError(value)) {
          this.getBaojiashangpinData();
        } else {
          this.setState({ loading: false });
        }
      },
    });
  };

  //添加表格数据
  addBaojiashangpinData = (payload, call) => {
    const { pid } = this.props;
    const { status, modalDataObj } = this.state;
    this.props.dispatch({
      type: 'baojiadanModel/addBaojiashangpin',
      payload: checkEdit(status, modalDataObj, { ...payload, pid }),
      callback: (value) => {

        let status = false;
        if (checkError(value)) {
          this.getBaojiashangpinData();
          status = true;
        }
        call(status);
      },
    });
  };

  // 搜索面板值
  onSearchPannel = (param) => {
    this.getBaojiashangpinData({ ...param });
  };

  // 展示弹框
  onShowModal = (status, record) => {
    this.setState({ visible: true, status, modalDataObj: record });
  };

  // 修改分页
  onChangePage = (data,filters, sorter) => {
    const { order, field } = sorter;
    const orderTemp = order === 'ascend' ? 'asc' : 'desc';
    const orderby=`${field} ${orderTemp}`;

    const { current, pageSize } = data;
    const param = {
      pageIndex: current,
      size: pageSize,
    };
    if(field){
      param.orderby=orderby;
    }

    // 获取分页数据
    this.getBaojiashangpinData({ ...param });
  };

  // 删除弹框确认
  showDelCon = () => {
    const _this = this;

    const { selectedRowObj } = this.state;
    if (selectedRowObj.length === 0) {
      message.warning('未选中数据');
      return;
    }
    confirm({
      title: '您确定要删除吗',
      content: '',
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk() {
        // 删除数据
        _this.delBaojiashangpinData(selectedRowObj);
      },
      onCancel() {
        console.log('取消删除');
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
      dataIndex: 'leixingname',
      key: 'leixingname',
      // sorter: true,
    },
    {
      title: '定义名称',
      dataIndex: 'bianma',
      key: 'bianma',
      sorter: true,
    },

    {
      title: '定义KEY',
      dataIndex: 'mingcheng',
      key: 'mingcheng',
      sorter: true,
    },
    {
      title: '定义版本',
      dataIndex: 'guige',
      key: 'guige',
      // sorter: true,
    },

    {
      title: '部署ID',
      dataIndex: 'pinpai',
      key: 'pinpai',
      // sorter: true,
    },

    {
      title: '资源名称[bpmn]',
      dataIndex: 'danweiname',
      key: 'danweiname',
      // sorter: true,
    },
    {
      title: '资源名称[svg]',
      dataIndex: 'danjia',
      key: 'danjia',
      align: 'right',
      sorter: true,
      render: text => numFixed(text),
    },
    {
      title: '市场价',
      dataIndex: 'shichangjia',
      key: 'shichangjia',
      align: 'right',
      sorter: true,
      render: text => numFixed(text),
    },
    // {
    //   title: '折扣',
    //   dataIndex: 'zhekou',
    //   key: 'zhekou',
    //   render: text => numFixed(text),
    // },
    {
      // width: 100,
      title: '税率',
      dataIndex: 'shuilv',
      align: 'right',
      key: 'shuilv',
      sorter: true,
      render: text => numFixed(text),
    },

    {
      title: '价格生效日期',
      dataIndex: 'shengxiaoriqi',
      key: 'shengxiaoriqi',
      sorter: true,
      render: text => string2Moment(text, 'YYYY-MM-DD'),

    },
    {
      title: '价格失效日期',
      dataIndex: 'shixiaoriqi',
      key: 'shixiaoriqi',
      sorter: true,
      render: text => string2Moment(text, 'YYYY-MM-DD'),

    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      sorter: true,
    },
    // {
    //   title: '备注',
    //   dataIndex: 'beizhu',
    //   key: 'beizhu',
    // },
    // {
    //   title: '操作',
    //   dataIndex: 'action',
    //   key: 'action',
    //   fixed: 'right',
    //   render: (text, record) => {
    //     const { pid, actionStatus } = this.props;
    //     return (
    //       <span>
    //         {/*{true ? '编辑' : <a onClick={this.onShowModal.bind(this, 'edit', record)}>编辑</a>}*/}
    //         {/*<Divider type="vertical"/>*/}
    //        <a onClick={this.onShowModal.bind(this, 'desc', record)}>查看</a>
    //   </span>);
    //   },
    // },
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

    const { baojiashangpinData } = this.props.baojiadanModel;
    const { pageIndex, total, pageSize, rows,size } = baojiashangpinData;
    const rowSelection = {
      onChange: this.onSelectChange,
    };
    return (
      <div>
        {/*<Search*/}
        {/*onSearch={this.onSearchPannel}*/}
        {/*// 设置ref属性*/}
        {/*onRef={(ref) => {*/}
        {/*this.child = ref;*/}
        {/*}}*/}
        {/*/>*/}
        <Spin spinning={loading}>

          {/*<div className="table-operations">*/}
          {/*<Button*/}
          {/*disabled={!pid || actionStatus}*/}
          {/*onClick={this.onShowModal.bind(this, 'add')}>添加</Button>*/}
          {/*<Button*/}
          {/*onClick={this.showDelCon}*/}
          {/*disabled={rows.length < 1 || actionStatus}*/}
          {/*>删除</Button>*/}
          {/*</div>*/}

          {/*弹框*/}
          {/*<ActionModal*/}
            {/*visible={visible}*/}
            {/*onSave={this.addBaojiashangpinData}*/}
            {/*status={status}*/}
            {/*onClose={this.onClickClose}*/}
            {/*basicData={status !== 'add' ? modalDataObj : {}}*/}
          {/*/>*/}

          <Table
            rowKey={record => record.id.toString()}
            // rowSelection={rowSelection}
            columns={this.columns}
            size="small"
            dataSource={pid ? rows : []}
            pagination={{
              showSizeChanger: true,
              defaultPageSize: pageSize,
              pageSizeOptions:['10','20','50','100','500'],
              current: pageIndex,
              total,
              pageSize:size,
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
