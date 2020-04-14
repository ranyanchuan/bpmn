import React from 'react';
import {connect} from 'dva';
import {checkError, checkEdit, getPageParam} from 'utils';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import propertiesPanelModule from 'bpmn-js-properties-panel';
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';
// import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';
import { diagramXML } from 'assets/xml.js';
import './common.sass';
import styles from './bpmn.module.scss';


@connect((state) => ({
  designerModel: state.designerModel,
}))

class Designer extends React.Component {

  state = {
    loading: false,
    visible: false,
    status: 'add',
    modalDataObj: {}, //  弹框数据
  };

  componentDidMount() {


    console.log("diagramXML")

    this.bpmnModeler = new BpmnModeler({
      container: '#canvas',
      propertiesPanel: {
        parent: '#properties-panel'
      },
      additionalModules: [propertiesPanelModule, propertiesProviderModule],
      // moddleExtensions: {
      //   camunda: camundaModdleDescriptor
      // }
    });

    this.renderDiagram(diagramXML);
  }

  renderDiagram = (xml) => {
    this.bpmnModeler.importXML(xml, (err) => {
      if (err) {
        console.log('导入失败');
      } else {
        console.log('导入成功');
      }
    });
  };

  render() {

    const {blockData} = this.props.designerModel;
    const {pageIndex, total, pageSize} = blockData;
    return (
      <div>
        <div className={styles.canvas} id="canvas" />
        <div
          className={`properties-panel-parent ${styles.panel}`}
          id="properties-panel"
          style={{ height: '100%' }}
        />
      </div>
    );
  }
}

export default Designer;
