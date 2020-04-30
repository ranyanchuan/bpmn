import React, { Component } from 'react';

import { Form, Radio, Icon, Tooltip, Input, Row, Col, Checkbox, Tabs, Divider } from 'antd';

import styles from './index.less';


@Form.create()
class CommonProperties extends Component {

  state = {
    deploymentName: '',
  };

  // 获取重试时间周期
  getAIndex = (extensionElements) => {
    let isNew = false;
    let aIndex = 0;
    let values = null;
    if (extensionElements && extensionElements.values) { // 已经存在扩展字段
      values = extensionElements.values;
      for (let [vIndex, item] of extensionElements.values.entries()) {
        if (item['$type'] === 'activiti:FailedJobRetryTimeCycle') {
          isNew = true;
          aIndex = vIndex;
          break;
        }
      }
    }
    return { isNew, aIndex, values };
  };

  setRetryTimeCycleValue = (data) => {
    const { bpmnModeler, shape } = this.props;
    let extensionElements = shape.businessObject.extensionElements;
    let { isNew, aIndex, values } = this.getAIndex(extensionElements);

    if (isNew) { // 已经存在扩展字段
      values[aIndex].body = data;
    } else {

      const v2 = bpmnModeler.get('moddle').create('activiti:FailedJobRetryTimeCycle', { body: data });
      if (values) {
        values.push(v2);
      } else {
        values = [v2];
      }
      extensionElements = bpmnModeler.get('moddle').create('bpmn:ExtensionElements', { values });
    }
    bpmnModeler.get('modeling').updateProperties(shape, {
      extensionElements: extensionElements,
    });


  };


  // 获取 businessObject 的值
  getShapeValue = (key) => {
    const { shape } = this.props;
    if (shape && shape.businessObject) {
      // 防止值为 false 这种情况
      return shape.businessObject.hasOwnProperty(key) ? shape.businessObject[key] : null;
    }
    return null;
  };


  // 设置 businessObject 的值
  setShapeValue = (key, data) => {
    const { bpmnModeler, shape } = this.props;
    bpmnModeler.get('modeling').updateProperties(shape, {
      [key]: data,
    });
  };

  // 设置元素属性
  setShapeDocumentation = (key, data) => {
    const { bpmnModeler, shape } = this.props;
    bpmnModeler.get('modeling').updateProperties(shape, {
      documentation: [{
        $type: 'bpmn:Documentation',
        text: data,
      }],
    });
  };


  render() {

    const { form, shape } = this.props;

    let retryTimeCycle = '';
    if (shape) {
      if (shape && shape.businessObject.extensionElements) {
        const { isNew, aIndex } = this.getAIndex(shape.businessObject.extensionElements);
        retryTimeCycle = shape.businessObject.extensionElements.values[aIndex].body;
      }
    }

    const { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 6,
        },
      },
    };

    if (shape) {
      console.log(shape.businessObject);
      // debugger;
    }

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit} className={styles.commonProperties}>
        {/*通用属性*/}
        {shape &&
        <span>
          <Form.Item label="节点编号">
          {getFieldDecorator('id', {
            initialValue: this.getShapeValue('id'),
            onChange: (e) => {
              const { value } = e.target;
              if (value.length > 0) {
                this.setShapeValue('id', value);
              }
            },
            rules: [
              { required: true, message: '节点编号必须是有效的QName' },
            ],
          })(
            <Input placeholder="节点编号必须是有效的QName"
                   suffix={
                     <Tooltip title="节点编号必须是有效的QName">
                       <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }}/>
                     </Tooltip>
                   }/>,
          )}
        </Form.Item>
          <Form.Item label="节点名称">
          {getFieldDecorator('name', {
            initialValue: this.getShapeValue('name'),
            onChange: (e) => this.setShapeValue('name', e.target.value),
          })(
            <Input placeholder="请输入节点名称"/>,
          )}
          </Form.Item>
        </span>
        }


        {/*开始事件 bpmn:StartEvent*/}
        {shape && ['bpmn:StartEvent'].includes(shape.type) &&
        <span>
          {/*详情*/}
          <Divider orientation="left">详情信息</Divider>

          <Form.Item label="创建者">
          {getFieldDecorator('initiator', {
            initialValue: this.getShapeValue('initiator'),
            onChange: (e) => this.setShapeValue('initiator', e.target.value),
          })(
            <Input placeholder="请输入创建者"/>,
          )}
          </Form.Item>

          {/*持续异步*/}
          <Divider orientation="left">持续异步</Divider>
          <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('asyncBefore', {
            valuePropName: 'checked',
            initialValue: this.getShapeValue('asyncBefore'),
            onChange: (e) => this.setShapeValue('asyncBefore', e.target.checked),
          })(<Checkbox>异步前</Checkbox>)}
        </Form.Item>
          <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('asyncAfter', {
            valuePropName: 'checked',
            initialValue: this.getShapeValue('asyncAfter'),
            onChange: (e) => this.setShapeValue('asyncAfter', e.target.checked),
          })(<Checkbox>异步后</Checkbox>)}
        </Form.Item>

          <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('exclusive', {
            valuePropName: 'checked',
            initialValue: this.getShapeValue('exclusive'),
            onChange: (e) => this.setShapeValue('exclusive', e.target.checked),

          })(<Checkbox>排除</Checkbox>)}
        </Form.Item>

          {/*工作配置*/}
          {(this.getShapeValue('asyncAfter') || this.getShapeValue('asyncBefore')) &&
          <span>
            <Divider orientation="left">工作配置</Divider>
            <Form.Item label="工作优先级">
            {getFieldDecorator('jobPriority', {
              initialValue: this.getShapeValue('jobPriority'),
              onChange: (e) => this.setShapeValue('jobPriority', e.target.value),
            })(
              <Input placeholder="请输入工作优先级"
              />,
            )}
            </Form.Item>
            <Form.Item label="重试时间周期">
            {getFieldDecorator('retryTimeCycle', {
              initialValue: retryTimeCycle,
              onChange: (e) => this.setRetryTimeCycleValue(e.target.value),
            })(
              <Input placeholder="请输入重试时间周期"
              />,
            )}
            </Form.Item>
          </span>
          }

        </span>
        }


        {/*用户任务bpmn:UserTask*/}
        {shape && ['bpmn:UserTask'].includes(shape.type) &&
        <span>
          {/*详情*/}
          <Divider orientation="left">详情信息</Divider>
          <Form.Item label="审批人">
          {getFieldDecorator('assignee', {
            initialValue: this.getShapeValue('assignee'),
            onChange: (e) => this.setShapeValue('assignee', e.target.value),
          })(
            <Input placeholder="请输入审批人"/>,
          )}
          </Form.Item><Form.Item label="候选用户">
          {getFieldDecorator('candidateUsers', {
            initialValue: this.getShapeValue('candidateUsers'),
            onChange: (e) => this.setShapeValue('candidateUsers', e.target.value),
          })(
            <Input placeholder="请输入候选用户"/>,
          )}
          </Form.Item>

          <Form.Item label="候选组">
          {getFieldDecorator('candidateGroups', {
            initialValue: this.getShapeValue('candidateGroups'),
            onChange: (e) => this.setShapeValue('candidateGroups', e.target.value),
          })(
            <Input placeholder="请输入候选组"/>,
          )}
          </Form.Item>

          <Form.Item label="到期时间">
          {getFieldDecorator('dueDate', {
            initialValue: this.getShapeValue('dueDate'),
            onChange: (e) => this.setShapeValue('dueDate', e.target.value),
          })(
            <Input placeholder="请输入到期时间"
                   suffix={
                     <Tooltip title="到期时间必须符合EL表达式，如： ${someDate} ,或者一个ISO标准日期，如：2015-06-26T09:54:00">
                       <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }}/>
                     </Tooltip>
                   }
            />,
          )}
          </Form.Item>
          <Form.Item label="跟踪日期">
          {getFieldDecorator('followUpDate', {
            initialValue: this.getShapeValue('followUpDate'),
            onChange: (e) => this.setShapeValue('followUpDate', e.target.value),
          })(
            <Input placeholder="请输入跟踪日期"
                   suffix={
                     <Tooltip title="跟踪日期必须符合EL表达式，如： ${someDate} ,或者一个ISO标准日期，如：2015-06-26T09:54:00">
                       <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }}/>
                     </Tooltip>
                   }
            />,
          )}
          </Form.Item>
          <Form.Item label="优先级">
          {getFieldDecorator('priority', {
            initialValue: this.getShapeValue('priority'),
            onChange: (e) => this.setShapeValue('priority', e.target.value),
          })(
            <Input placeholder="请输入优先级"
            />,
          )}
          </Form.Item>
        </span>
        }


        {/*流程属性*/}
        {shape && ['bpmn:Process'].includes(shape.type) &&
        <span>
          {/*版本标签*/}
          <Form.Item label="版本标签">
          {getFieldDecorator('versionTag', {
            initialValue: this.getShapeValue('versionTag'),
            onChange: (e) => this.setShapeValue('versionTag', e.target.value),
          })(
            <Input placeholder="请输入版本标签"/>,
          )}
          </Form.Item>

          {/*可执行文件*/}
          <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('isExecutable', {
            valuePropName: 'checked',
            initialValue: this.getShapeValue('isExecutable'),
            onChange: (e) => this.setShapeValue('isExecutable', e.target.checked),
          })(<Checkbox>可执行文件</Checkbox>)}
        </Form.Item>


          {/*扩展任务配置*/}
          <Divider orientation="left">任务配置</Divider>
          <Form.Item label="任务优先级">
          {getFieldDecorator('taskPriority', {
            initialValue: this.getShapeValue('taskPriority'),
            onChange: (e) => this.setShapeValue('taskPriority', e.target.value),
          })(
            <Input placeholder="请输入任务优先级"/>,
          )}
          </Form.Item>

          {/*工作配置*/}
          <Divider orientation="left">工作配置</Divider>
          <Form.Item label="工作优先级">
          {getFieldDecorator('jobPriority', {
            initialValue: this.getShapeValue('jobPriority'),
            onChange: (e) => this.setShapeValue('jobPriority', e.target.value),
          })(
            <Input placeholder="请输入工作优先级"/>,
          )}
          </Form.Item>

          {/*候选开始配置*/}
          <Divider orientation="left">候选配置</Divider>

          <Form.Item label="开始用户">
          {getFieldDecorator('candidateStarterUsers', {
            initialValue: this.getShapeValue('candidateStarterUsers'),
            onChange: (e) => this.setShapeValue('candidateStarterUsers', e.target.value),
          })(
            <Input placeholder="指定多个用户,用逗号分隔"/>,
          )}
          </Form.Item>
          <Form.Item label="开始组">
          {getFieldDecorator('candidateStarterGroups', {
            initialValue: this.getShapeValue('candidateStarterGroups'),
            onChange: (e) => this.setShapeValue('candidateStarterGroups', e.target.value),
          })(
            <Input placeholder="指定多个组,用逗号分隔"/>,
          )}
          </Form.Item>


          {/*历史配置*/}
          <Divider orientation="left">历史配置</Divider>
          <Form.Item label="生存时间">
          {getFieldDecorator('historyTimeToLive', {
            initialValue: this.getShapeValue('historyTimeToLive'),
            onChange: (e) => this.setShapeValue('historyTimeToLive', e.target.value),
          })(
            <Input placeholder="请输入历史生存时间"/>,
          )}
          </Form.Item>

          {/*任务列表配置*/}
          {/*<Divider orientation="left">任务列表配置</Divider>*/}
          {/*<Form.Item {...tailFormItemLayout}>*/}
          {/*{getFieldDecorator('isStartableInTasklist', {*/}
          {/*valuePropName: 'checked',*/}
          {/*initialValue: this.getShapeValue('isStartableInTasklist'),*/}
          {/*onChange: (e) => this.setShapeValue('isStartableInTasklist', e.target.checked),*/}
          {/*})(<Checkbox>启动</Checkbox>)}*/}
          {/*</Form.Item>*/}

        </span>
        }


        {shape &&
        <span>
          <Divider orientation="left">文档信息</Divider>
          <Form.Item label="元素文档">
          {getFieldDecorator('text', {
            initialValue: shape.documentation && shape.documentation.length > 0 ? shape.documentation[0].text : '',
            onChange: (e) => {
              this.setShapeDocumentation('text', e.target.value);
            },
          })(
            <Input placeholder="请输入节点名称"/>,
          )}
          </Form.Item>
        </span>
        }


      </Form>
    );
  }
}

export default CommonProperties;
