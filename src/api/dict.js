import request from '@/utils/request'

export function getDictPageList(params) {
  return request({
    url: '/sys/dict/pageList',
    method: 'get',
    params
  })
}

export function dictAdd(data) {
  return request({
    url: '/sys/dict/add',
    method: 'post',
    data
  })
}

export function dictEdit(data) {
  return request({
    url: '/sys/dict/edit',
    method: 'post',
    data
  })
}

export function dictDel(id) {
  return request({
    url: `/sys/dict/edit/${id}`,
    method: 'post'
  })
}

//--------------

export function getDictItemPageList(params) {
  return request({
    url: '/sys/dict/item/pageList',
    method: 'get',
    params
  })
}

export function dictItemAdd(data) {
  return request({
    url: '/sys/dict/item/add',
    method: 'post',
    data
  })
}

export function dictItemEdit(data) {
  return request({
    url: '/sys/dict/item/edit',
    method: 'post',
    data
  })
}

export function dictItemDel(id) {
  return request({
    url: `/sys/dict/item/del/${id}`,
    method: 'post'
  })
}
