import React from 'react';
import { Table, Form, Select, Radio, Input } from 'antd';
import styles from './index.less';

let evenTypeObj = {
  'expression': '表达式',
  'script': '脚本',
  'class': 'Java类',
  'delegateExpression': '代理表达式',
};

@Form.create()
class ListenerProperties extends React.Component {

  state = {};

  columns = [
    {
      title: '事件',
      dataIndex: 'event',
      width: 80,
      render: (text, record, index) => {
        return (
          <Form.Item>
            {this.props.form.getFieldDecorator(`event${record.id}`, {
              initialValue: record.event,
              rules: [{ required: true, message: '请选择事件类型' }],
            })(
              <Select placeholder="请选择事件类型" style={{ width: '100%' }}>
                <Option value="start">start</Option>
                <Option value="end">end</Option>
              </Select>,
            )}
          </Form.Item>
        );
      },
    },
    {
      title: '监听器',
      dataIndex: 'operation',
      render: (text, record, index) => {
        const { key } = this.getEventKeyValue(record);
        return (
          <Form.Item>
            {this.props.form.getFieldDecorator(`key${record.id}`, {
              initialValue: key,
              rules: [{ required: true, message: '请选择监听器类型' }],
            })(
              <Select placeholder="请选择监听器类型" style={{ width: '100%' }}>
                <Option value="expression">表达式</Option>
                <Option value="script">脚本</Option>
                <Option value="class">Java类</Option>
                <Option value="delegateExpression">代理表达式</Option>
              </Select>,
            )}
          </Form.Item>
        );
      },
    },
    {
      title: '值',
      dataIndex: 'operation',
      render: (text, record, index) => {
        const { value } = this.getEventKeyValue(record);
        return (
          <Form.Item>
            {this.props.form.getFieldDecorator(`value${record.id}`, {
              initialValue: value,
            })(
              <Input placeholder="请输入值"/>,
            )}
          </Form.Item>
        );
      },
    },
  ];



  columnsTask = [
    {
      title: '任务',
      dataIndex: 'name',
      width: 120,
      render: (text, record, index) => {
        console.log('record', record);
        let value = record.event;
        // 获取 监听器类型 和 值
        for (let item in record) {
          if (evenTypeObj[item]) {
            value += ':' + evenTypeObj[item];
            break;
          }
        }
        return (<span>{value}</span>);
      },
    },
    {
      title: '监听器',
      dataIndex: 'operation',
      render: (text, record, index) => {
        let value = '';
        for (let item in record) {
          if (evenTypeObj[item]) {
            value = evenTypeObj[item];
            break;
          }
        }
        return (<span>{value}</span>);
      },
    },
    {
      title: '值',
      dataIndex: 'operation',
      render: (text, record, index) => {
        return <a onClick={() => this.onDel(index)}>删除</a>;
      },
    },
  ];


  columnsField = [
    {
      title: '字段',
      dataIndex: 'name',
      width: 120,
      render: (text, record, index) => {
        console.log('record', record);
        let value = record.event;
        // 获取 监听器类型 和 值
        for (let item in record) {
          if (evenTypeObj[item]) {
            value += ':' + evenTypeObj[item];
            break;
          }
        }
        return (<span>{value}</span>);
      },
    },
    {
      title: '类型',
      dataIndex: 'operation',
      render: (text, record, index) => {
        let value = '';
        for (let item in record) {
          if (evenTypeObj[item]) {
            value = evenTypeObj[item];
            break;
          }
        }
        return (<span>{value}</span>);
      },
    },
    {
      title: '值',
      dataIndex: 'operation',
      render: (text, record, index) => {
        return <a onClick={() => this.onDel(index)}>删除</a>;
      },
    },
  ];


  getEventKeyValue = (record) => {
    let result = {};
    for (let item in record) {
      if (evenTypeObj[item]) {
        result.key2value = evenTypeObj[item];
        result.key = item;
        result.value = record[item];
        break;
      }
    }
    return result;
  };


  getAIndex = (extensionElements) => {
    let isNew = false;
    let aIndex = 0;
    let values = null;
    if (extensionElements && extensionElements.values) { // 已经存在扩展字段
      values = extensionElements.values;
      for (let [vIndex, item] of extensionElements.values.entries()) {
        if (item['$type'] === 'activiti:ExecutionListener') {
          isNew = true;
          aIndex = vIndex;
          break;
        }
      }
    }
    return { isNew, aIndex, values };
  };


  render() {
    const { shape } = this.props;
    let executeData = [];
    if (shape && shape.businessObject.extensionElements) {
      const { isNew, aIndex, values } = this.getAIndex(shape.businessObject.extensionElements);
      console.log('values', values);
      executeData = values;
      debugger;
    }


    return (
      <div className={styles.expandProperties}>


        {/*执行监听*/}

        <div style={{ textAlign: 'right', marginBottom: 8, marginTop: -8 }}>
          <Radio.Group>
            <Radio.Button value="add" size='small' onClick={this.onSave}>添加</Radio.Button>
            <Radio.Button value="del" size='small' onClick={this.onPub}>删除</Radio.Button>
          </Radio.Group>
        </div>
        <Table
          rowKey={(record, index) => index.toString()}
          size="small"
          bordered
          dataSource={executeData}
          columns={this.columns}
          pagination={false}
        />


        {/*任务监听器*/}
        <div style={{ textAlign: 'right', marginBottom: 8, marginTop: 35 }}>
          <Radio.Group>
            <Radio.Button value="add" size='small' onClick={this.onSave}>添加</Radio.Button>
            <Radio.Button value="del" size='small' onClick={this.onPub}>删除</Radio.Button>
          </Radio.Group>
        </div>
        <Table
          rowKey={(record, index) => index.toString()}
          size="small"
          bordered
          dataSource={executeData}
          columns={this.columnsTask}
          pagination={false}
        />

        {/*字段注入*/}
        <div style={{ textAlign: 'right', marginBottom: 8, marginTop: 35 }}>
          <Radio.Group>
            <Radio.Button value="add" size='small' onClick={this.onSave}>添加</Radio.Button>
            <Radio.Button value="del" size='small' onClick={this.onPub}>删除</Radio.Button>
          </Radio.Group>
        </div>
        <Table
          rowKey={(record, index) => index.toString()}
          size="small"
          bordered
          dataSource={executeData}
          columns={this.columnsField}
          pagination={false}
        />


      </div>
    );
  }
}

export default ListenerProperties;
