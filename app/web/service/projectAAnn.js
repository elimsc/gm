import { post, get } from "../utils/request";

// ann type
export async function createType({ identity, name }) {
  return post(`/api/projecta/ann/create-type`, { identity, name })
}

export async function updateType({id, identity, name }) {
  return post(`/api/projecta/ann/update-type`, {id, identity, name })
}

export async function listType() {
  return get(`/api/projecta/ann/list-type`)
}

export async function deleteType({id}) {
  return post(`/api/projecta/ann/delete-type`, {id})
}

// ann
export async function createAnn({pic, title, label, content, type, order, start_time, end_time}) {
  return post(`/api/projecta/ann/create-ann`, {pic, title,label, content, order, type, start_time, end_time})
}

export async function updateAnn({id, pic, title, label, content, type, start_time, end_time, order}) {
  return post(`/api/projecta/ann/update-ann`, {id, pic, title, label, content, type, start_time, end_time, order})
}

export async function listAnn({id, type}) {
  return get(`/api/projecta/ann/list-ann?id=${id}&type=${type}`)
}

export async function deleteAnn({id}) {
  return post(`/api/projecta/ann/delete-ann`, {id})
}

// ann subcontent
export async function createAnnSubcontent({title, content, ann_id, order, start_time, end_time}) {
  return post(`/api/projecta/ann/create-subcontent`, {title, content, ann_id, order, start_time, end_time})
}

export async function updateAnnSubcontent({id, title, content, ann_id, order, start_time, end_time}) {
  return post(`/api/projecta/ann/update-subcontent`, {id, title, content, ann_id, order, start_time, end_time})
}

export async function listAnnSubcontent({id, ann_id}) {
  return get(`/api/projecta/ann/list-subcontent?id=${id}&ann_id=${ann_id}`)
}

export async function deleteAnnSubcontent({id}) {
  return post(`/api/projecta/ann/delete-subcontent`, {id})
}
