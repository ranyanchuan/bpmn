import React from 'react';
import {Form, Modal, Row, Col, Spin} from 'antd';

import ConInput from 'components/ConInput';
import ConSelect from 'components/ConSelect';
import ConInputNumber from 'components/ConInputNumber';
import ConTextArea from 'components/ConTextArea';
import ConDate from 'components/ConDate';

import {footer,formatFormDate} from 'utils';

const titleObj = {
  add: '添加请假信息',
  edit: '编辑请假信息',
  desc: '查看请假信息',
};

@Form.create()

class ActionModal extends React.Component {

  state = {
    loading: false,
  };

  //  关闭添加信息弹框
  hideModal = (status) => {
    if (status) {
      this.props.onClose();
      this.props.form.resetFields();
    }
    this.setState({loading: false});
  };
  //  提交form信息弹框
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        this.setState({loading: true});
        this.props.onSave(formatFormDate(fieldsValue, ['leaveDate']), this.hideModal);
      }
    });
  };


  render() {
    const {loading} = this.state;
    const {visible, form, status, basicData = {}} = this.props;
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
        {...footer(disabled)}
        width="400px"
      >
        <Spin spinning={loading}>
          <Form onSubmit={this.handleSubmit}>
            <Row>


              <Col span={24}>
                <ConSelect
                  form={form}
                  id="title"
                  label="请假类型"
                  placeholder="请选择类型"
                  message='请选择类型'
                  data={['婚假','病假','事假','年假','其他']}
                  required={true}
                  disabled={disabled}
                  defValue={basicData.title}
                />
              </Col>
              <Col span={24}>
                <ConInputNumber
                  form={form}
                  id="days"
                  label="请假天数"
                  placeholder="请输入请假天数"
                  message='请输入请假天数'
                  required={true}
                  disabled={disabled}
                  defValue={basicData.days}
                />
              </Col>

              <Col span={24}>
                <ConDate
                  form={form}
                  id="leaveDate"
                  label="离开日期"
                  placeholder="请选择离开日期"
                  message='请选择离开日期'
                  required={true}
                  disabled={disabled}
                  defValue={basicData.leaveDate}
                />
              </Col>

              <Col span={24}>
                <ConTextArea
                  formItemLayout = {{
                    labelCol: { sm: { span: 6 } },
                    wrapperCol: { sm: { span: 18 } },
                  }}
                  form={form}
                  id="content"
                  label="请假描述"
                  placeholder="请输入请假描述"
                  message='请输入请假描述'
                  required={true}
                  disabled={disabled}
                  defValue={basicData.content}
                  height={60}
                />
              </Col>

            </Row>
          </Form>
        </Spin>
      </Modal>
    );
  }
}

export default ActionModal;
