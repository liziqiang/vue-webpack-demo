export default function (url) {
    let _isArray = Array.isArray || function(arg){
        return Object.prototype.toString.call(arg) == '[object Array]';
    };
    let query   = url.substr(url.lastIndexOf('?') + 1),
        params  = query.split('&'),
        len     = params.length,
        result  = {},
        i       = 0,
        key, value, item, param;

    for (; i < len; i++) {
        if(!params[i]){
            continue;
        }
        param   = params[i].split('=');
        key     = param.shift();
        value   = param.join('=');

        item = result[key];
        if ('undefined' == typeof item) {
            result[key] = value;
        }
        else if (_isArray(item)) {
            item.push(value);
        }
        else {
            result[key] = [item, value];
        }
    }

    return result;
};