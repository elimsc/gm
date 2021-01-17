import router from 'umi/router';


export async function pureGet(url) {
  const token = localStorage.getItem(window.location.href.split("/")[2]);
  const headers = {
    'Authorization': `Bearer ${token}`,
    'content-type': 'application/json',
  };
  localStorage.setItem(window.location.href.split("/")[2], token);
  return fetch(url, { headers });
}

export async function get(url) {
  const token = localStorage.getItem(window.location.href.split("/")[2]);
  const headers = {
    'Authorization': `Bearer ${token}`,
    'content-type': 'application/json',
  }
  return fetch(url, {
    headers,
  }).then(res => {
    return res.json();
  }).then(data => {
    if (data.code === -10) {
      router.replace('/login');
    } else if (data.code === -11) {
      router.replace('/404');
    }

    localStorage.setItem(window.location.href.split("/")[2], data.token);
    return data;
  });
}

export async function post(url, data = {}) {
  const token = localStorage.getItem(window.location.href.split("/")[2]);
  const req_url = localStorage.getItem('req_url');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'content-type': 'application/json',
  }

  const role_name = data.guid ? localStorage.getItem(data.guid) : ''; // 用于记录操作的角色的名字
  let bodyObj; // 请求的数据
  if (role_name) {
    bodyObj = { ...data, req_url, role_name };
  } else {
    bodyObj = { ...data, req_url };
  }

  return fetch(url, {
    headers,
    method: 'POST',
    body: JSON.stringify(bodyObj),
  }).then(res => {
    return res.json();
  }).then(data => {
    if (data.code === -10) {
      router.replace('/login');
    } else if (data.code === -11) {
      router.replace('/404');
    }

    localStorage.setItem(window.location.href.split("/")[2], data.token);
    return data;
  });
}

export async function del(url) {
  const token = localStorage.getItem(window.location.href.split("/")[2]);
  const headers = {
    'Authorization': `Bearer ${token}`,
    'content-type': 'application/json',
  }
  return fetch(url, {
    headers,
    method: 'DELETE',
  }).then(res => {
    return res.json();
  }).then(data => {
    if (data.code === -10) {
      router.replace('/login');
    } else if (data.code === -11) {
      router.replace('/404');
    }
    localStorage.setItem(window.location.href.split("/")[2], data.token);
    return data;
  });
}


