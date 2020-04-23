/* eslint-disable padded-blocks,object-curly-spacing */
import React, { Component } from 'react';
// import propertiesPanelModule from 'bpmn-js-properties-panel';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';
// import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';
import EditingTools from './EditingTools';
import BpmnModeler from './Modeler'; //流程设计器
// import { diagramXML } from '../../assets/xml';
import { diagramXML } from './newDiagram.js';

import customTranslate from './workflow/customTranslate/customTranslate';
import propertiesPanelModule from './workflow/properties-panel';
import propertiesProviderModule from './workflow/properties-panel/provider/activiti';
import customControlsModule from './workflow/customControls';
import activitiModdleDescriptor from './activiti.json';

import 'bpmn-js-properties-panel/styles/properties.less';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import styles from './index.less';




export default class Bpmn extends Component {

  state = {
    scale: 1, // 流程图比例
  };

  componentDidMount() {

    let customTranslateModule = {
      translate: ['value', customTranslate]
    };


    this.bpmnModeler = new BpmnModeler({
      container: '#canvas',
      propertiesPanel: {
        parent: '#js-properties-panel',
      },
      additionalModules: [
        propertiesPanelModule,
        propertiesProviderModule,
        customTranslateModule,
        customControlsModule
      ],
      moddleExtensions: {
        // camunda: camundaModdleDescriptor,
        activiti: activitiModdleDescriptor
      },
    });

    this.renderDiagram(diagramXML);
  }



  /**
   * 下载xml/svg
   *  @param  type  类型  svg / xml
   *  @param  data  数据
   *  @param  name  文件名称
   */
  download = (type, data, name) => {
    let dataTrack = '';
    const a = document.createElement('a');

    switch (type) {
      case 'xml':
        dataTrack = 'bpmn';
        break;
      case 'svg':
        dataTrack = 'svg';
        break;
      default:
        break;
    }

    name = name || `diagram.${dataTrack}`;

    a.setAttribute('href', `data:application/bpmn20-xml;charset=UTF-8,${encodeURIComponent(data)}`);
    a.setAttribute('target', '_blank');
    a.setAttribute('dataTrack', `diagram:download-${dataTrack}`);
    a.setAttribute('download', name);

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // 导入xml文件
  handleOpenFile = (e) => {
    const that = this;
    const file = e.target.files[0];
    const reader = new FileReader();
    let data = '';
    reader.readAsText(file);
    reader.onload = function(event) {
      data = event.target.result;
      that.renderDiagram(test, 'open');
    };
  };

  // 保存
  handleSave = () => {
    this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
      console.log(xml);
    });
  };

  // 前进
  handleRedo = () => {
    this.bpmnModeler.get('commandStack').redo();
  };

  // 后退
  handleUndo = () => {
    this.bpmnModeler.get('commandStack').undo();
  };

  // 下载SVG格式
  handleDownloadSvg = () => {
    this.bpmnModeler.saveSVG({ format: true }, (err, data) => {
      this.download('svg', data);
    });
  };

  // 下载XML格式
  handleDownloadXml = () => {
    this.bpmnModeler.saveXML({ format: true }, (err, data) => {
      this.download('xml', data);
    });
  };

  // 流程图放大缩小
  handleZoom = (radio) => {
    const newScale = !radio
      ? 1.0 // 不输入radio则还原
      : this.state.scale + radio <= 0.2 // 最小缩小倍数
        ? 0.2
        : this.state.scale + radio;

    this.bpmnModeler.get('canvas').zoom(newScale);
    this.setState({
      scale: newScale,
    });
  };


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
    return (
      <div style={{ height: '100%' }}>
        <div id="canvas" style={{ height: '680px' }}/>
        <div
          className={styles.propertiesPanelParent}
          style={{ height: '100%',}}
          id="js-properties-panel"
        />
        <EditingTools
          onOpenFIle={this.handleOpenFile}
          onSave={this.handleSave}
          onUndo={this.handleUndo}
          onRedo={this.handleRedo}
          onDownloadSvg={this.handleDownloadSvg}
          onDownloadXml={this.handleDownloadXml}
          onZoomIn={() => this.handleZoom(0.1)}
          onZoomOut={() => this.handleZoom(-0.1)}
          onZoomReset={() => this.handleZoom()}
        />
      </div>
    );
  }
}
