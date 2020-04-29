import React from 'react';
import { Table, Input, Button } from 'antd';

class ExpandProperties extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '名称',
        dataIndex: 'name',
        editable: true,
        width: 120,
        render: (text, record) => {
          return <Input placeholder="属性名称"/>;
        },
      },
      {
        title: '值',
        dataIndex: 'age',
        editable: true,
        width: 130,
        render: (text, record) => {
          return <Input placeholder="属性值"/>;
        },
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => {
          return <a>删除</a>;
        },
      },
    ];

    this.state = {
      dataSource: [
        {
          key: '0',
          name: 'Edward King 0',
          age: '32',
          address: 'London, Park Lane no. 0',
        },
        {
          key: '1',
          name: 'Edward King 1',
          age: '32',
          address: 'London, Park Lane no. 1',
        },
      ],
      count: 2,
    };
  }


  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: 32,
      address: `London, Park Lane no. ${count}`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };

  handleSave = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  };

  render() {
    const { dataSource } = this.state;
    return (
      <div>
        <div style={{ textAlign: 'right', marginBottom: 8, marginTop: -8 }}>
          <Button onClick={this.handleAdd}>添加属性</Button>
        </div>
        <Table
          size="small"
          rowClassName={() => 'editable-row'}
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
