import React from 'react';
import { Form, Modal } from 'antd';
import { Designer } from 'components/ConActiviti';
import ConDragTitle from 'components/ConDragTitle';

import { footer, formatFormDate } from 'utils';

const titleObj = {
  add: '添加流程信息',
  edit: '编辑流程信息',
  desc: '查看流程信息',
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

  onFullScreen = () => {
    this.setState({ isFullScreen: true });
  };

  onFullScreenExit = () => {
    this.setState({ isFullScreen: false });
  };

  render() {
    const { loading, isFullScreen } = this.state;
    const { visible, status, basicData = {} } = this.props;
    const title = <ConDragTitle title={titleObj[status]}/>;
    return (
      <Modal
        title={title}
        visible={visible}
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
          basicData={basicData}
          status={status}
          visible={visible}
        />
        {/*</Spin>*/}
      </Modal>
    );
  }
}

export default ActionModal;
