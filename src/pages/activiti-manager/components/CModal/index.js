// import React from 'react';
// import moment from 'moment/moment';
//
// import { Form, Modal, Row, Col, Spin } from 'antd';
//
// import ConInput from 'components/ConInput';
// import ConDate from 'components/ConDate';
// import ConTextArea from 'components/ConTextArea';
// import ConInputNumber from 'components/ConInputNumber';
// import ConInputNumberMoney from 'components/ConInputNumberMoney';
//
// import { footer } from 'utils';
//
//
// import styles from './index.less';
// // 标题对象
// const titleObj = {
//   add: '添加报价单商品',
//   edit: '编辑报价单商品',
//   desc: '查看报价单商品',
// };
// const ruleDate = 'YYYY-MM-DD HH:mm:ss';
//
//
// @Form.create()
// class ActionModal extends React.Component {
//   state = {
//     confirmLoading: false,
//     basicData: {},
//   };
//
//   //  关闭添加信息弹框
//   hideModal = (status) => {
//     if (status) {
//       this.props.form.resetFields();
//       this.props.onClose();
//     }
//     this.setState({ confirmLoading: false });
//   };
//
//   //  提交form信息弹框
//   handleSubmit = (e) => {
//     e.preventDefault();
//     this.props.form.validateFields((err, fieldsValue) => {
//       if (!err) {
//         this.setState({ confirmLoading: true });
//
//         if (fieldsValue.shixiaoriqi) {
//           fieldsValue.shixiaoriqi = moment(fieldsValue.shixiaoriqi).format(ruleDate);
//         }
//         if (fieldsValue.shengxiaoriqi) {
//           fieldsValue.shengxiaoriqi = moment(fieldsValue.shengxiaoriqi).format(ruleDate);
//         }
//         this.props.onSave(fieldsValue, this.hideModal);
//       }
//     });
//   };
//
//   fromDateSelect = (rule, fromMoment, callback) => {
//     const timeEnd = this.props.form.getFieldValue('shixiaoriqi');
//     if (timeEnd && timeEnd.isBefore(fromMoment)) {
//       callback('生效时间必须小于失效时间');
//     } else {
//       callback();
//       this.props.form.validateFields(['shixiaoriqi']);
//     }
//   };
//
//
//   toDateSelect = (rule, toMoment, callback) => {
//     const timeStart = this.props.form.getFieldValue('shengxiaoriqi');
//     if (timeStart && timeStart.isAfter(toMoment)) {
//       callback('失效时间必须生效时间');
//     } else {
//       this.props.form.validateFields(['shengxiaoriqi']);
//       callback();
//     }
//   };
//
//   disabledDate = (current) => {
//     // return current && current < moment().endOf('day');
//     return current && current < moment().startOf('day');
//   };
//
//
//   render() {
//     const { visible, form, status, basicData = {} } = this.props;
//     const { confirmLoading } = this.state;
//
//     const formItemLayout = {
//       labelCol: { sm: { span: 6 } },
//       wrapperCol: { sm: { span: 18 } },
//     };
//
//     const disabled = (status === 'desc') ? true : false;
//     return (
//       <Modal
//         title={titleObj[status]}
//         visible={visible}
//         onOk={this.handleSubmit}
//         onCancel={this.hideModal}
//         confirmLoading={confirmLoading}
//         maskClosable={false}
//         okText="确认"
//         cancelText="取消"
//         {...footer(disabled)}
//         width="900px"
//       >
//         <Spin spinning={confirmLoading}>
//           <Form onSubmit={this.handleSubmit}>
//             <Row>
//
//               <Col span={12}>
//                 <ConInput
//                   form={form}
//                   formItemLayout={formItemLayout}
//                   id="leixing"
//                   defValue={basicData.leixingname}
//                   label="类型"
//                   placeholder="请输入类型"
//                   required={true}
//                   disabled={disabled}
//                   message={'请输入类型'}
//                 />
//               </Col>
//
//
//               <Col span={12}>
//                 <ConInput
//                   form={form}
//                   formItemLayout={formItemLayout}
//                   id="bianma"
//                   defValue={basicData.bianma}
//                   label="编码"
//                   placeholder="请输入编码"
//                   required={true}
//                   disabled={disabled}
//                   message={'请输入编码'}
//                 />
//               </Col>
//
//
//
//             </Row>
//             <Row>
//
//
//               <Col span={12}>
//                 <ConInput
//                   form={form}
//                   formItemLayout={formItemLayout}
//                   id="mingcheng"
//                   defValue={basicData.mingcheng}
//                   label="名称"
//                   placeholder="请输入名称"
//                   required={true}
//                   disabled={disabled}
//                   message={'请输入名称'}
//                 />
//               </Col>
//
//
//               <Col span={12}>
//                 <ConInput
//                   form={form}
//                   formItemLayout={formItemLayout}
//                   id="guige"
//                   defValue={basicData.guige}
//                   label="规格"
//                   placeholder="请输入规格"
//                   required={true}
//                   disabled={disabled}
//                   message={'请输入规格'}
//                 />
//               </Col>
//             </Row>
//             <Row>
//
//               <Col span={12}>
//                 <ConInput
//                   form={form}
//                   formItemLayout={formItemLayout}
//                   id="pinpai"
//                   defValue={basicData.pinpai}
//                   label="品牌"
//                   placeholder="请输入品牌"
//                   required={true}
//                   disabled={disabled}
//                   message={'请输入品牌'}
//                 />
//               </Col>
//
//
//
//               <Col span={12}>
//                 <ConInput
//                   form={form}
//                   formItemLayout={formItemLayout}
//                   id="danwei"
//                   defValue={basicData.danweiname}
//                   label="计量单位"
//                   placeholder="请输入计量单位"
//                   required={true}
//                   disabled={disabled}
//                   message={'请输入计量单位'}
//                 />
//               </Col>
//
//             </Row>
//             <Row>
//
//
//
//               <Col span={12}>
//                 <ConInputNumberMoney
//                   form={form}
//                   formItemLayout={formItemLayout}
//                   id="danjia"
//                   defValue={basicData.danjia}
//                   label="单价"
//                   placeholder="请输入单价"
//                   required={true}
//                   disabled={disabled}
//                   message={'请输入单价'}
//                 />
//               </Col>
//               <Col span={12}>
//                 <ConInputNumberMoney
//                   form={form}
//                   formItemLayout={formItemLayout}
//                   id="shichangjia"
//                   defValue={basicData.shichangjia}
//                   label="市场价"
//                   placeholder="请输入市场价"
//                   required={true}
//                   disabled={disabled}
//                   message={'请输入市场价'}
//                 />
//               </Col>
//
//               {/*<Col span={12}>*/}
//                 {/*<ConInputNumberMoney*/}
//                   {/*form={form}*/}
//                   {/*formItemLayout={formItemLayout}*/}
//                   {/*id="zhekou"*/}
//                   {/*defValue={basicData.zhekou}*/}
//                   {/*label="折扣"*/}
//                   {/*placeholder="请输入折扣"*/}
//                   {/*required={true}*/}
//                   {/*disabled={disabled}*/}
//                   {/*message={'请输入折扣'}*/}
//                 {/*/>*/}
//               {/*</Col>*/}
//
//             </Row>
//             <Row>
//
//               <Col span={12}>
//                 <ConInputNumber
//                   form={form}
//                   formItemLayout={formItemLayout}
//                   id="shuilv"
//                   defValue={basicData.shuilv}
//                   label="税率"
//                   placeholder="请选择税率"
//                   // required={true}
//                   disabled={disabled}
//                   message={'请选择价税率'}
//                   // validator={this.fromDateSelect}
//                   // disabledDate={this.disabledDate}
//                 />
//               </Col>
//
//               <Col span={12}>
//                 <ConDate
//                   form={form}
//                   formItemLayout={formItemLayout}
//                   id="shengxiaoriqi"
//                   defValue={basicData.shengxiaoriqi}
//                   label="价格生效日期"
//                   placeholder="请选择价格生效日期"
//                   required={true}
//                   disabled={disabled}
//                   message={'请选择价格生效日期'}
//                   validator={this.fromDateSelect}
//                   disabledDate={this.disabledDate}
//                 />
//               </Col>
//             </Row>
//             <Row>
//               <Col span={12}>
//                 <ConDate
//                   form={form}
//                   formItemLayout={formItemLayout}
//                   id="shixiaoriqi"
//                   defValue={basicData.shixiaoriqi}
//                   label="价格失效日期"
//                   placeholder="请选择价格失效日期"
//                   required={true}
//                   disabled={disabled}
//                   message={'请选择价格失效日期'}
//                   validator={this.toDateSelect}
//                   disabledDate={this.disabledDate}
//                 />
//               </Col>
//
//
//               <Col span={12}>
//                 <ConInput
//                   form={form}
//                   formItemLayout={formItemLayout}
//                   id="state"
//                   defValue={basicData.state}
//                   label="状态"
//                   placeholder="请输入状态"
//                   // required={true}
//                   disabled={disabled}
//                   message={'请输入状态'}
//                 />
//               </Col>
//
//             </Row>
//
//             {/*<Row>*/}
//               {/*<Col span={24}>*/}
//                 {/*<ConTextArea*/}
//                   {/*form={form}*/}
//                   {/*id="beizhu"*/}
//                   {/*label="备注"*/}
//                   {/*placeholder="请输入备注"*/}
//                   {/*defValue={basicData.beizhu}*/}
//                   {/*disabled={disabled}*/}
//                   {/*message={'请输入备注'}*/}
//                   {/*height={'60px'}*/}
//                 {/*/>*/}
//               {/*</Col>*/}
//             {/*</Row>*/}
//
//
//             {/*<Col span={12}>*/}
//             {/*<ConInput*/}
//             {/*form={form}*/}
//             {/*formItemLayout={formItemLayout}*/}
//             {/*id="gysid"*/}
//             {/*defValue={basicData.gysid}*/}
//             {/*label="所属供应商"*/}
//             {/*placeholder="请输入所属供应商"*/}
//             {/*required={false}*/}
//             {/*disabled={disabled}*/}
//             {/*message={'请输入所属供应商'}*/}
//             {/*/>*/}
//             {/*</Col>*/}
//
//
//           </Form>
//         </Spin>
//       </Modal>
//     );
//   }
// }
//
// export default ActionModal;
