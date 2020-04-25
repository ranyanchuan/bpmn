/* eslint-disable padded-blocks,object-curly-spacing */
import React, { Component } from 'react';
import { requestJson } from 'utils/request';

import EditingTools from '../EditingTools';
import BpmnModeler from '../Modeler'; //流程设计器
// import customTranslate from '../workflow/customTranslate/customTranslate';
// import propertiesPanelModule from '../workflow/properties-panel';
// import propertiesProviderModule from '../workflow/properties-panel/provider/activiti';
// import customControlsModule from '../workflow/customControls';

import activitiModdleDescriptor from '../Assets/activiti.json';
import { diagramXML } from '../Assets/diagram.js';

import { checkError, checkEdit, getPageParam } from 'utils';

// import 'bpmn-js-properties-panel/styles/properties.less';
// import 'bpmn-js/dist/assets/diagram-js.css';
// import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import styles from '../index.less';

export default class App extends Component {

  state = {
    scale: 1, // 流程图比例
  };

  componentDidMount() {

    // let customTranslateModule = {
    //   translate: ['value', customTranslate],
    // };


    this.bpmnModeler = new BpmnModeler({
      container: '#approveCanvas',
      moddleExtensions: {
        activiti: activitiModdleDescriptor,
      },
    });


    // this.renderDiagram(diagramXML);
    // 通过字符生成 getProcessImg
    // this.getProcessImg({ deploymentId: '15001' });
    this.getDataModel();



    // var d = document.getElementById( "t" );
    // document.addEventListener( "keyup", function() {
    //   d.innerHTML = d.innerHTML.replace( /<[^>]*>/g, "" );
    // } );
    //

  }


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
    if (checkError(result)) {
      const { data } = result;
      this.renderDiagram(data, 'open');
    }
    this.setState(stateTemp);

  };

  // todo 动态 判断
  // 获取流程图片
  // getProcessImg = (payload = {}) => {
  //   this.props.dispatch({
  //     type: 'activitiDesignerModel/getProcessImg',
  //     payload,
  //     callback: (result) => {
  //       let stateTemp = { loading: false };
  //       if (checkError(result)) {
  //         const { data } = result;
  //         this.renderDiagram(data, 'open');
  //       }
  //       this.setState(stateTemp);
  //     },
  //   });
  // };


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


        // this.bpmnModeler.off(event,callback);
        let eventBus = this.bpmnModeler.get('eventBus');



        this.bpmnModeler.triggerClickEvent();
        let events = [
          // 'element.click',
          'element.dblclick',
          // 'element.hover',
          // 'element.out',
          // 'element.mousedown',
          // 'element.mouseup'
        ];
        events.forEach(function(event) {
          eventBus.on(event, function(e) {
            // console.log(event, 'on', e.element);
            let editContent=document.getElementsByClassName('djs-direct-editing-content');
            if(editContent && editContent.length>0){
              editContent[0].setAttribute("contenteditable","false");
            }
            let editParent=document.getElementsByClassName('djs-direct-editing-parent');
            if(editParent && editParent.length>0){
              editParent[0].setAttribute("contenteditable","false");
            }
          });
        });



      }







    });
  };

  render() {

    return (
      <div style={{ height: '100%', backgroundColor: '#f0f2f5' }}>
        <EditingTools
          onDownloadSvg={this.handleDownloadSvg}
          onDownloadXml={this.handleDownloadXml}
          onZoomIn={() => this.handleZoom(0.1)}
          onZoomOut={() => this.handleZoom(-0.1)}
          onZoomReset={() => this.handleZoom()}
        />
        <div id="approveCanvas" style={{ height: '380px' }}/>
      </div>
    );
  }
}
