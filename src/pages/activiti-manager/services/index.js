import { requestJson } from 'utils/request';

const api = {
  getDeployment: '/api/bpm/select/deployment', // 查看流程部署
  delDeployment: '/api/bpm/delete/deployment', // 查看流程定义
  getDefinition: '/api/bpm/select/definition', // 查看流程定义
};


export async function getDeployment(payload) {
  return requestJson(api.getDeployment, {
    method: 'POST',
    payload,
  });
}


export async function delDeployment(payload) {
  return requestJson(api.delDeployment, {
    method: 'GET',
    payload,
  });
}


export async function getDefinition(payload) {
  return requestJson(api.getDefinition, {
    method: 'POST',
    payload,
  });
}
