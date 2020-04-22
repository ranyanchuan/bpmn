import {requestJson} from 'utils/request';

const api = {
  getDeployment: '/api/bpm/select/deployment', // 查看流程部署
  getDefinition: '/api/bpm/select/definition', // 查看流程定义
};


export async function getDeployment(payload) {
  return requestJson(api.getDeployment, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

// 添加区块
export async function getDefinition(payload) {
  return requestJson(api.getDefinition, {
    method: 'POST',
    body:JSON.stringify(payload),
  });
}
