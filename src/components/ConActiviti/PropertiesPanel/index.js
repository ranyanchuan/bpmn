import React, { Component } from 'react';

import { Tabs, Affix } from 'antd';
import styles from './index.less';
import CommonProperties from './CommonProperties.js';
import ExpandProperties from './ExpandProperties.js';
import ListenerProperties from './ListenerProperties.js';

const { TabPane } = Tabs;

class PropertiesPanel extends Component {

  state = {
    defaultActiveKey: '5',
  };

  // tab 页切换
  onChangeTab = (value) => {
    console.log('value', value);
    this.setState({ defaultActiveKey: value });
  };

  render() {
    const { defaultActiveKey } = this.state;
    return (
      <div className={styles.propertiesPanel}>

        <Tabs defaultActiveKey={defaultActiveKey} size={'small'} type="card" onChange={this.onChangeTab}>
          <TabPane tab="常规" key="1"/>
          <TabPane tab="表单" key="2"/>
          <TabPane tab="监听器" key="3"/>
          <TabPane tab="输入/输出" key="4"/>
          <TabPane tab="扩展" key="5"/>
        </Tabs>

        {/*tab*/}
        {defaultActiveKey == '1' &&
        <CommonProperties {...this.props}/>
        }
        {defaultActiveKey == '3' &&
        <ListenerProperties {...this.props}/>
        }
        {defaultActiveKey == '5' &&
        <ExpandProperties {...this.props}/>
        }
      </div>
    );
  }
}

export default PropertiesPanel;
