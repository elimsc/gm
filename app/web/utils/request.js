import router from 'umi/router';



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
  return fetch(url, {
    headers,
    method: 'POST',
    body: JSON.stringify({ ...data, req_url }),
  }).then(res => {
    return res.json();
  }).then(data => {
    if (data.code === -10) {
      router.replace('/login');
    } else if (data.code === -11) {
      router.replace('/404');
    }
    console.log(data)

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


