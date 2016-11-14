export function formatSeconds(s) {
    if (isNaN(s)) {
        return '00:00:00';
    }
    var h = s >= 3600 ? Math.floor(s / 3600) : 0;
    var m = s % 3600 >= 60 ? Math.floor(s % 3600 / 60) : 0;
    m = (m >= 10 ? m : ("0" + m));
    s = m >= 0 ? s % 3600 % 60 : s;
    s = (s >= 10 ? s : ("0" + s));
    return h > 0 ? ((h > 9 ? h : '0' + h) + ":" + m + ":" + s) : (m + ":" + s);
};

export function format(date,pattern){

	let pad = function(number,length){
        let pre = "",
            negative = (number < 0),
            string = String(Math.abs(number));

        if (string.length < length) {
            pre = (new Array(length - string.length + 1)).join('0');
        }
        return (negative ?  "-" : "") + pre + string;
    };

    if ('string' != typeof pattern) {
        return date.toString();
    }

    function replacer(patternPart, result) {
        pattern = pattern.replace(patternPart, result);
    }
    
    let year    = date.getFullYear(),
        month   = date.getMonth() + 1,
        date2   = date.getDate(),
        hours   = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds();

    replacer(/yyyy/g, pad(year, 4));
    replacer(/yy/g, pad(parseInt(year.toString().slice(2), 10), 2));
    replacer(/MM/g, pad(month, 2));
    replacer(/M/g, month);
    replacer(/dd/g, pad(date2, 2));
    replacer(/d/g, date2);

    replacer(/HH/g, pad(hours, 2));
    replacer(/H/g, hours);
    replacer(/hh/g, pad(hours % 12, 2));
    replacer(/h/g, hours % 12);
    replacer(/mm/g, pad(minutes, 2));
    replacer(/m/g, minutes);
    replacer(/ss/g, pad(seconds, 2));
    replacer(/s/g, seconds);

    return pattern;
};