/* eslint-disable padded-blocks,object-curly-spacing */
import React, { Component } from 'react';
import EditingTools from '../EditingTools';
import BpmnModeler from '../Modeler'; //流程设计器
import customTranslate from '../workflow/customTranslate/customTranslate';
import propertiesPanelModule from '../workflow/properties-panel';
import propertiesProviderModule from '../workflow/properties-panel/provider/activiti';
import customControlsModule from '../workflow/customControls';

import activitiModdleDescriptor from '../Assets/activiti.json';
import { diagramXML } from '../Assets/diagram.js';

import { checkError, checkEdit, downloadBpmn } from 'utils';
import { requestJson } from 'utils/request';


import 'bpmn-js-properties-panel/styles/properties.less';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import styles from './index.less';



export default class App extends Component {

  state = {
    scale: 1, // 流程图比例
    cHeight: '560px',
  };

  componentDidMount() {
    this.initDesigner();
  }


  async componentWillReceiveProps(nextProps) {
    const { visible, status } = nextProps;
    if (visible) {
      this.initDesigner(status);
    }
  }

  initDesigner = (status) => {
    if (this.bpmnModeler) {
      this.bpmnModeler.detach();
    }

    let customTranslateModule = {
      translate: ['value', customTranslate],
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
        customControlsModule,
      ],
      moddleExtensions: {
        activiti: activitiModdleDescriptor,
      },
    });


    if (status === 'add') {
      this.renderDiagram(diagramXML);
    } else {
      // 通过字符生成 getProcessImg
      this.getDataModel();
    }
  };


  // 获取
  getDataService = () => {
    const { url, payload } = this.props;
    return requestJson(url, {
      method: 'GET',
      payload,
    });
  };


  getDataModel = async () => {
    this.setState({ loading: true });
    let result = await this.getDataService();
    let stateTemp = { loading: false };
    if (checkError(result, false)) {
      const { data } = result;
      this.renderDiagram(data, 'open');
    }
    this.setState(stateTemp);
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
      that.renderDiagram(data, 'open');
    };
  };

  // 保存
  handleSave = (data) => {
    this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
      console.log(data, xml);
    });
  };

  // 发布
  onPub = (data) => {
    this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
      console.log(data, xml);
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
      downloadBpmn('svg', data);
    });
  };

  // 下载XML格式
  handleDownloadXml = () => {
    this.bpmnModeler.saveXML({ format: true }, (err, data) => {
      downloadBpmn('xml', data);
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

  // 全屏
  onFullScreen = () => {
    this.setState({ cHeight: document.documentElement.clientHeight - 120 + 'px' });
    const { onFullScreen } = this.props;
    if (onFullScreen) {
      onFullScreen();
    }
  };

  // 退出全屏
  onFullScreenExit = () => {
    this.setState({ cHeight: '560px' });
    const { onFullScreenExit } = this.props;
    if (onFullScreenExit) {
      onFullScreenExit();
    }
  };


  render() {
    const { cHeight } = this.state;
    return (
      <div style={{ height: '100%', backgroundColor: '#f0f2f5' }}>

        <EditingTools
          {...this.props}
          onOpenFIle={this.handleOpenFile}
          onSave={this.handleSave}
          onPub={this.onPub}
          onUndo={this.handleUndo}
          onRedo={this.handleRedo}
          onDownloadSvg={this.handleDownloadSvg}
          onDownloadXml={this.handleDownloadXml}
          onZoomIn={() => this.handleZoom(0.1)}
          onZoomOut={() => this.handleZoom(-0.1)}
          onZoomReset={() => this.handleZoom()}
          onFullScreen={() => this.onFullScreen()}
          onFullScreenExit={() => this.onFullScreenExit()}
        />

        <div id="canvas" style={{ height: cHeight }}/>
        <div
          className={styles.propertiesPanelParent}
          id="js-properties-panel"
        />

      </div>
    );
  }
}
