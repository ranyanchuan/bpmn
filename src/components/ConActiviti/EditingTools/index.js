import React, { Component } from 'react';

import { Form, Radio, Icon, Tooltip, Input } from 'antd';
import styles from './index.less';

@Form.create()
class EditingTools extends Component {
  state = {
    deploymentName: '',
  };

  async componentWillReceiveProps(nextProps) {
    const { visible } = nextProps;
    if (visible && nextProps.basicData) {
      const deploymentName = nextProps.basicData.name;
      this.setState({ deploymentName });
    }
  }

  handleOpen = () => {
    this.file.click();
  };

  onChangeName = (value) => {
    this.setState({ deploymentName: value.target.value });
  };

  // 保存
  onSave = () => {
    const { deploymentName } = this.state;
    this.props.onSave(deploymentName);
  };
  //  发布
  onPub = () => {
    const { deploymentName } = this.state;
    this.props.onPub(deploymentName);
  };


  render() {
    const {
      disabled = true,
      onOpenFIle,
      onZoomIn,
      onZoomOut,
      onZoomReset,
      onUndo,
      onRedo,
      onDownloadXml,
      onDownloadSvg,
      onFullScreen,
      onFullScreenExit,
    } = this.props;

    const { deploymentName } = this.state;

    console.log('this.props.basicData', this.props.basicData);

    return (
      <div className={styles.editingTools}>
        <ul className={styles.controlList}>
          {/*导入*/}
          {onOpenFIle &&
          <li className={`${styles.control} ${styles.line}`}>
            <input
              ref={(file) => {
                this.file = file;
              }}
              className={styles.openFile}
              type="file"
              onChange={onOpenFIle}
            />
            <Tooltip placement="top" title="bpmn 文件上传">
              <Icon type="folder-open" onClick={this.handleOpen} className={styles.controlIcon}/>
            </Tooltip>
          </li>
          }

          {/*撤销流程*/}
          {onUndo &&
          <li className={styles.control}>
            <Tooltip placement="top" title="撤销流程">
              <Icon type="undo" className={styles.controlIcon} onClick={onUndo}/>
            </Tooltip>
          </li>
          }

          {/*重做流程*/}
          {onRedo &&
          <li className={`${styles.control} ${styles.line}`}>
            <Tooltip placement="top" title="重做流程">
              <Icon type="redo" className={styles.controlIcon} onClick={onRedo}/>
            </Tooltip>
          </li>
          }

          {/*重置缩放*/}
          {onZoomReset &&
          <li className={styles.control}>
            <Tooltip placement="top" title="重置缩放">
              <Icon type="search" className={styles.controlIcon} onClick={onZoomReset}/>
            </Tooltip>
          </li>
          }

          {/*放大*/}
          {onZoomIn &&
          <li className={styles.control}>
            <Tooltip placement="top" title="放大">
              <Icon type="zoom-in" className={styles.controlIcon} onClick={onZoomIn}/>
            </Tooltip>
          </li>
          }

          {/*缩小*/}
          {onZoomOut &&
          <li className={`${styles.control} ${styles.line}`}>
            <Tooltip placement="top" title="缩小">
              <Icon type="zoom-out" onClick={onZoomOut} className={styles.controlIcon}/>
            </Tooltip>
          </li>
          }


          {/*bpmn文件下载*/}
          {onDownloadXml &&
          <li className={styles.control}>
            <Tooltip placement="top" title="bpmn文件下载">
              <Icon type="download" onClick={onDownloadXml} className={styles.controlIcon}/>
            </Tooltip>
          </li>
          }

          {/*图片下载*/}
          {onDownloadSvg &&
          <li className={`${styles.control} ${styles.line}`}>
            <Tooltip placement="top" title="图片下载">
              <Icon type="picture" className={styles.controlIcon} onClick={onDownloadSvg}/>
            </Tooltip>
          </li>
          }

          {onFullScreen &&
          <li className={styles.control}>
            <Tooltip placement="top" title="全屏">
              <Icon type="fullscreen" onClick={onFullScreen} className={styles.controlIcon}/>
            </Tooltip>
          </li>
          }

          {onFullScreenExit &&
          <li className={styles.control}>
            <Tooltip placement="top" title="退出全屏">
              <Icon type="fullscreen-exit" onClick={onFullScreenExit} className={styles.controlIcon}/>
            </Tooltip>
          </li>
          }
        </ul>
        {!disabled &&
        <ul className={styles.controlList}>
          <li className={styles.control}>
            <Form layout="inline">
              <Form.Item validateStatus={deploymentName ? 'success' : 'error'}>
                <Input
                  allowClear
                  placeholder="部署名称"
                  onChange={this.onChangeName}
                  value={deploymentName}
                />
              </Form.Item>

              <Form.Item>
                <Radio.Group value={'pub'}>
                  <Radio.Button
                    value="save"
                    size={'small'}
                    onClick={this.onSave}
                    disabled={!deploymentName}
                  >保存</Radio.Button>
                  <Radio.Button
                    value="pub"
                    size={'small'}
                    onClick={this.onPub}
                    disabled={!deploymentName}
                  >发布</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Form>
          </li>
        </ul>
        }
      </div>
    );
  }
}

export default EditingTools;
