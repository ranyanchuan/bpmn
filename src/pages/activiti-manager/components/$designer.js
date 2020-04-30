import React from 'react';
import { connect } from 'dva';
import { Spin, Tabs, Card, Icon, Button } from 'antd';

import { checkError, delMore, checkEdit, string2Moment } from 'utils';
import router from 'umi/router';
import { Designer } from 'components/ConActiviti';


const { TabPane } = Tabs;

@connect((state) => ({
  caigoudingdanModel: state.caigoudingdanModel,
}))


class ActivitiDesigner extends React.Component {
  state = {
    selectedRowKeys: [], //
    selectedRowObj: [],
    loading: false,
    visible: false,
    rowId: '',
    modalDataObj: {}, //  弹框数据
  };

  componentDidMount() {

  }

  onBack = () => {
    router.push(`/activiti-manager`);
  };


  render() {
    const { loading } = this.state;

    return (
      <Spin spinning={loading}>
        <div className="desc-card">
          <Card
            // size="small"
            title={<Icon type="left" style={{ color: '#1890ff' }} onClick={this.onBack}/>}
            // extra={<Link to={`/caigoudingdan/`}>返回1</Link>}
            // extra={<Button size={'small'} onClick={this.onBack}>返回</Button>}
            style={{ width: '100%' }}
            bodyStyle={{ padding: 0}}
          >

            <Designer
              url={'/api/bpm/select/processImg'}
              payload={{ deploymentId: '2501' }}
              // onFullScreen={this.onFullScreen}
              // onFullScreenExit={this.onFullScreenExit}
              basicData={{}}
              status={'edit'}
              disabled={false}
            />

          </Card>


        </div>
      </Spin>

    );
  }
}

export default ActivitiDesigner;
