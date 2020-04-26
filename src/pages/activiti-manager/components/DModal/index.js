import React from 'react';
import { Form, Modal, Row, Col, Spin, Radio } from 'antd';
import { Designer } from 'components/ConActiviti';

import { footer, formatFormDate } from 'utils';


const titleObj = {
  add: '添加请假信息',
  edit: '编辑请假信息',
  desc: '查看请假信息',
};

@Form.create()

class ActionModal extends React.Component {

  state = {
    loading: false,
    width: '1200px',
    isFullScreen: false,
  };

  //  关闭添加信息弹框
  hideModal = (status) => {
    if (status) {
      this.props.onClose();
      this.props.form.resetFields();
    }
    this.setState({ loading: false });
  };
  //  提交form信息弹框
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        this.setState({ loading: true });
        this.props.onSave(formatFormDate(fieldsValue, ['leaveDate']), this.hideModal);
      }
    });
  };


  onFullScreen = () => {;
    this.setState({ isFullScreen: true });
  };

  onFullScreenExit=()=>{
    this.setState({ isFullScreen: false });
  }

  render() {
    const { loading, width, isFullScreen } = this.state;
    const { visible, form, status, basicData = {} } = this.props;
    const disabled = (status === 'desc') ? true : false;

    return (
      <Modal
        title={titleObj[status]}
        visible={visible}
        onOk={this.handleSubmit}
        onCancel={this.hideModal}
        maskClosable={false}
        confirmLoading={loading}
        okText="确认"
        cancelText="取消"
        {...footer(true)}
        width={isFullScreen ? '100%' : '1200px'}
        bodyStyle={{
          padding: 0,
        }}
        style={{
          top: isFullScreen ? 0 : 100,
        }}
      >
        {/*<Spin spinning={loading}>*/}
        <Designer
          url={'/api/bpm/select/processImg'}
          payload={{ deploymentId: '15001' }}
          onFullScreen={this.onFullScreen}
          onFullScreenExit={this.onFullScreenExit}
        />
        {/*</Spin>*/}
      </Modal>
    );
  }
}

export default ActionModal;
