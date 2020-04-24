import { requestJson } from 'utils/request';

const api = {
  getLeaveBill: '/api/leaveBill/select', // 查询
  addLeaveBill: '/api/leaveBill/insert', // 添加
  delLeaveBill: '/api/leaveBill/delete', // 删除
};

export async function getLeaveBill(payload) {
  return requestJson(api.getLeaveBill, {
    method: 'POST',
    payload,
  });
}
export async function addLeaveBill(payload) {
  return requestJson(api.addLeaveBill, {
    method: 'POST',
    payload,
  });
}
export async function delLeaveBill(payload) {
  return requestJson(api.delLeaveBill, {
    method: 'GET',
    payload,
  });
}
