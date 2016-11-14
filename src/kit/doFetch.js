const MODE = [
    'same-origin', // 同源
    'no-cors', // 默认
    'cors' // 跨域
];

// 序列化
function serialize(params, needEncode) {
    params = params || {};
    if (typeof params === 'string') {
        return params;
    } else if (needEncode) {
        let u = new URLSearchParams();
        for (let k in params) {
            u.set(k, params[k]);
        }
        return u.toString();
    } else {
        let query = '';
        let count = 0;
        for (let k in params) {
            if (count > 0) {
                query += '&';
            }
            query += [k, '=', params[k]].join('');
            count++;
        }
        return query;
    }
}

// 进行fetch
function doFetch(opt) {
    opt = opt || {};
    let url = opt.url || '';
    let method = opt.method || 'get';
    let params = opt.params || {};
    let mode = opt.mode || 'cors';
    let needEncode = opt.needEncode || true; // 是否需要转译
    let credentials = opt.credentials || ''; // 为'inlcude'时带cookie
    let contentType = opt.contentType || '';

    let paramsSeq = serialize(params, needEncode);
    let sendObj = {
        method,
        mode // 跨域标识
    };

    // 是否需要转译
    if (contentType === 'json') {
        sendObj['headers'] = {
            'Content-type': 'application/json'
        };
    } else if (contentType === 'text') {
        sendObj['headers'] = {
            'Content-type': 'text/plain'
        }
    } else if (contentType === 'multipart') {
        sendObj['headers'] = {
            'Content-type': 'multipart/form-data'
        }
    } else {
        sendObj['headers'] = {
            'Content-type': 'application/x-www-form-urlencoded'
        }
    }
    // 是否带cookie
    if (credentials) {
        sendObj['credentials'] = credentials;
    }
    // 是否为get请求
    if (method === 'get') {
        url = paramsSeq ? url + '?' + paramsSeq : url;
    } else {
        sendObj.body = paramsSeq;
    }
    return fetch(url, sendObj)
        .then((res) => {
            if (res.ok && res.json) {
                return res.json();
            } else {
                return {
                    code: 'E00000',
                    data: 'Request Error!',
                    msg: '返回出错！'
                };
            }
        });
}

export default doFetch;