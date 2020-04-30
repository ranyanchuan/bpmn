import React from 'react';
import { Table, Input, Button, Form } from 'antd';
import styles from './index.less';

@Form.create()

class ExpandProperties extends React.Component {

  state = {};

  columns = [
    {
      title: '名称',
      dataIndex: 'name',
      width: 120,
      render: (text, record, index) => {
        return (
          <Form.Item>
            {this.props.form.getFieldDecorator(`name${record.id}`, {
              initialValue: record.value,
              onChange: (e) => {
                this.setShapeExtensionElements('name', index, e.target.value);
              },
            })(
              <Input placeholder="扩展名称"/>,
            )}
          </Form.Item>
        );
      },
    },
    {
      title: '值',
      dataIndex: 'value',
      width: 130,
      render: (text, record, index) => {
        return (
          <Form.Item>
            {this.props.form.getFieldDecorator(`value${record.id}`, {
              initialValue: record.value,
              onChange: (e) => {
                this.setShapeExtensionElements('value', index, e.target.value);
              },
            })(
              <Input placeholder="扩展值"/>,
            )}
          </Form.Item>
        );

      },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record, index) => {
        return <a onClick={() => this.onDel(index)}>删除</a>;
      },
    },
  ];

  // 生成唯一id
  uuid = () => {
    const s = [];
    const hexDigits = '0123456789abcdef';
    for (let i = 0; i < 36; i += 1) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = '4';
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = '-';
    s[13] = '-';
    s[18] = '-';
    s[23] = '-';
    return s.join('');
  };

  // 删除
  onDel = (index) => {
    const { bpmnModeler, shape } = this.props;

    let extensionElements = shape.businessObject.extensionElements;
    const { values } = extensionElements;
    values[0].values.splice(index, 1);
    bpmnModeler.get('modeling').updateProperties(shape, {
      extensionElements: extensionElements,
    });
    this.setState({ date: new Date() });
  };

  // 添加
  onAdd = () => {
    const { bpmnModeler, shape } = this.props;
    const v1 = bpmnModeler.get('moddle').create('activiti:Property', { name: '', value: '', id: this.uuid() });
    let extensionElements = shape.businessObject.extensionElements;
    if (extensionElements) { // 已经存在扩展字段
      const { values } = extensionElements;
      values[0].values.unshift(v1);
    } else {
      const v2 = bpmnModeler.get('moddle').create('activiti:Properties', { values: [v1] });
      extensionElements = bpmnModeler.get('moddle').create('bpmn:ExtensionElements', { values: [v2] });
    }

    bpmnModeler.get('modeling').updateProperties(shape, {
      extensionElements: extensionElements,
    });
    this.setState({ date: new Date() });

  };

  // 设置元素属性
  setShapeExtensionElements = (key, index, data) => {
    const { bpmnModeler, shape } = this.props;
    const { extensionElements } = shape.businessObject;
    const { values } = extensionElements;
    values[0].values[index][key] = data;
    bpmnModeler.get('modeling').updateProperties(shape, {
      extensionElements: extensionElements,
    });
  };


  render() {
    const { shape } = this.props;
    let dataSource = [];
    if (shape && shape.businessObject.extensionElements) {
      dataSource = shape.businessObject.extensionElements.values[0].values;
    }
    return (
      <div className={styles.expandProperties}>
        <div style={{ textAlign: 'right', marginBottom: 8, marginTop: -8 }}>
          <Button onClick={this.onAdd}>添加属性</Button>
        </div>
        <Table
          rowKey={(record, index) => index.toString()}
          size="small"
          bordered
          dataSource={dataSource}
          columns={this.columns}
          pagination={false}
        />
      </div>
    );
  }
}

export default ExpandProperties;
