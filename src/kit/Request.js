/**
 * 请求工具
 * fetch,ajax,form
 * author: zhanghao
 * date: 2016/09/22
 */
import $ from 'jquery';
/**
 * 序列化参数
 */
function serialize( params, shutEncode ) {
    params = params || {};
    if ( typeof params === 'string' ) {
        return params;
    } else if ( !shutEncode ) { // 对"[","]"等进行转译
        let u = new URLSearchParams();
        for ( let k in params ) {
            u.set( k, params[ k ] );
        }
        return u.toString();
    } else {
        let query = '';
        let count = 0;
        for ( let k in params ) {
            if ( count > 0 ) {
                query += '&';
            }
            query += [ k, '=', params[ k ] ].join( '' ); // 不对"["等进行转译
            count++;
        }
        return query;
    }
}
/**
 * restful 风格序列化
 */
function restfulSerialize( params, shutEncode ) {
    params    = params || {};
    let query = '';
    for ( let k in params ) {
        let val = params[ k ];
        if ( val || val === 0 ) {
            query += '/' + encodeURI( k ) + '/' + encodeURI( val );
        }
    }
    return query;
}
/**
 * fetch
 */
function doFetch( url, sendData ) {
    return fetch( url, sendData )
    .then( res => {
        if ( res.ok && res.json ) {
            return res.json();
        } else {
            return {
                code : 'E00000',
                data : 'Request Error!',
                msg  : '返回出错！'
            };
        }
    } )
    .catch( err => {
        console.error( '请求失败！', err );
        return {
            code : 'ERRERR',
            data : err,
            msg  : 'Request Error!'
        }
    } );
}
/**
 * jquery ajax
 */
function doAjax( sendData ) {
    let sendObj     = {};
    let headers     = sendData.headers || {};
    let url         = sendData.url || '';
    let data        = sendData.data || null;
    let type        = sendData.method || '';
    type            = type.toLowerCase();
    let dataType    = sendData.dataType || 'json';
    let contentType = sendData.contentType || '';
    let credentials = sendData.credentials && sendData.credentials.toLowerCase() === 'include' ? true : false;
    if ( url ) {
        sendObj[ 'url' ] = url;
    }
    if ( data ) {
        sendObj[ 'data' ] = data;
    }
    if ( type ) {
        sendObj[ 'type' ] = type;
        // if(type !== 'get' || type !== 'post') {
        //     // restful api
        //     if(!$.isEmptyObject(sendObj['data'])) {
        //         sendObj['url'] += restfulSerialize(sendObj['data']);
        //     }
        // }
    }
    if ( dataType ) {
        sendObj[ 'dataType' ] = dataType;
    }
    if ( contentType ) {
        sendObj[ 'contentType' ] = contentType;
    }
    if ( credentials === true || credentials === false ) {
        sendObj[ 'xhrFields' ] = {
            withCredentials : credentials
        };
    }
    return $.ajax( sendObj ).catch( err => {
        console.log( 'Jquery Ajax Error!', err, sendObj );
        return {
            code : 'E00000',
            data : err,
            msg  : 'Request Error!'
        };
    } );
}
/**
 * params参数说明：
 * url:         string          请求地址
 * data:        object          请求数据
 * method:      string          请求方式(get,post,delete,put...)
 * needEncode:  string          是否关闭转译'[',']'等...(默认false, true)
 * credentials: string          是否带cookie访问(默认'include',带cookie)
 * contentType: string          内容编码类型
 * dataType:    string          返回数据类型
 * mode:        string          访问模式(默认'cors','no-cors','same-origin')
 */
export default function Request( params ) {
    params          = params || {};
    let url         = params.url || '';
    let method      = params.method || 'get';
    method          = method.toLowerCase();
    let data        = params.data || {};
    let mode        = params.mode || 'cors';
    let needEncode  = params.shutEncode || false; // 是否关闭转译
    let credentials = params.credentials || 'include'; // 为'inlcude'时带cookie
    let contentType = params.contentType || '';
    let dataType    = params.dataType || 'json';
    dataType        = dataType.toLowerCase();
    let dataSeq     = serialize( data, needEncode );
    let sendObj     = {
        method,
        mode // 跨域标识
    };
    // 头信息
    let headers     = {};
    if ( contentType ) {
        headers[ 'Content-Type' ] = contentType;
    } else {
        headers[ 'Content-Type' ] = 'application/x-www-form-urlencoded';
        // if(method === 'get') {
        //     headers['Content-Type'] = 'application/x-www-form-urlencoded';
        // }
        // else if(method === 'post') {
        //     headers['Content-Type'] = 'application/json; charset=utf-8';
        // }
    }
    sendObj[ 'headers' ] = headers;
    // 是否带cookie
    if ( credentials && credentials.toLowerCase() === 'include' ) {
        sendObj[ 'credentials' ] = credentials;
    } else {
        sendObj[ 'credentials' ] = '';
    }
    let originObj = {
        url,
        method,
        data,
        mode,
        credentials,
        contentType,
        dataType
    };
    return doAjax( originObj );
    // 是否为get或post请求
    // if ((method === 'get' || method === 'post') && dataType !== 'jsonp') {
    //     if (method === 'get') {
    //         url = dataSeq ? url + '?' + dataSeq : url;
    //     } else {
    //         sendObj.body = dataSeq;
    //     }
    //     return doFetch(url, sendObj);
    // } else {
    //     return doAjax(originObj);
    // }
}