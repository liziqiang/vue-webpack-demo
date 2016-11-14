export default {
    /**
     * 获取当前时间毫秒数
     */
    getCurrentMsTime: function() {
        var myDate = new Date();
        return myDate.getTime();
    },
    /**
     * 毫秒转时间格式
     */
    longMsTimeConvertToDateTime: function(time) {
        var myDate = new Date(time);
        return this.formatterDateTime(myDate);
    },
    /**
     * 时间格式转毫秒
     */
    dateToLongMsTime: function(date) {
        var myDate = new Date(date);
        return myDate.getTime();
    },
    /**
     * 格式化日期（不含时间）
     */
    formatterDate: function(date) {
        var datetime = date.getFullYear() +
            "-" // "年"
            +
            ((date.getMonth() + 1) < 10 ? "0" +
                (date.getMonth() + 1) : (date.getMonth() + 1)) +
            "-" // "月"
            +
            (date.getDate() < 10 ? "0" + date.getDate() : date
                .getDate());
        return datetime;
    },
    /**
     * 格式化日期（含时间"00:00:00"）
     */
    formatterDate2: function(date) {
        var datetime = date.getFullYear() +
            "-" // "年"
            +
            ((date.getMonth() + 1) < 10 ? "0" +
                (date.getMonth() + 1) : (date.getMonth() + 1)) +
            "-" // "月"
            +
            (date.getDate() < 10 ? "0" + date.getDate() : date
                .getDate()) + " " + "00:00:00";
        return datetime;
    },
    /**
     * 格式化去日期（含时间）
     */
    formatterDateTime: function(date) {
        var datetime = date.getFullYear() +
            "-" // "年"
            +
            ((date.getMonth() + 1) < 10 ? "0" +
                (date.getMonth() + 1) : (date.getMonth() + 1)) +
            "-" // "月"
            +
            (date.getDate() < 10 ? "0" + date.getDate() : date
                .getDate()) +
            " " +
            (date.getHours() < 10 ? "0" + date.getHours() : date
                .getHours()) +
            ":" +
            (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
                .getMinutes()) +
            ":" +
            (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
                .getSeconds());
        return datetime;
    },
    /**
     * 格式化去日期（含时分）
     */
    formatterDateTime2: function(date) {
        var datetime = date.getFullYear() +
            "/" // "年"
            +
            ((date.getMonth() + 1) < 10 ? "0" +
                (date.getMonth() + 1) : (date.getMonth() + 1)) +
            "/" // "月"
            +
            (date.getDate() < 10 ? "0" + date.getDate() : date
                .getDate()) +
            " " +
            (date.getHours() < 10 ? "0" + date.getHours() : date
                .getHours()) +
            ":" +
            (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
                .getMinutes());
        return datetime;
    },
    /**
     * 格式化去日期（含时间）
     */
    formatterTime: function(date) {
        var formatterTime = (date.getHours() < 10 ? "0" + date.getHours() : date
                .getHours()) +
            ":" +
            (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
                .getMinutes()) +
            ":" +
            (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
                .getSeconds());
        return formatterTime;
    },
    /**
     * 判断是否为今天、昨天
     */
    isRightDay: function(day, checkTime) {
        var daymsTime = 24 * 60 * 60 * 1000;
        var tomorrowDatsmsTime = this.getCurrentMsTime() + daymsTime;
        var cTime = this.longMsTimeConvertToDateTime(checkTime);
        var termorrowTime = this.longMsTimeConvertToDateTime(tomorrowDatsmsTime);
        var nowDate = this.formatterDate2(new Date(cTime));
        var tomorrowDate = this.formatterDate2(new Date(termorrowTime));
        var sms = this.dateToLongMsTime(nowDate);
        var ems = this.dateToLongMsTime(tomorrowDate);
        var tDayms = day * 24 * 60 * 60 * 1000;
        if (ems - sms === tDayms) {
            return true;
        }
        return false;
    }
}