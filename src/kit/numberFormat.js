// 大数格式化
/*设X
        X＜10000，显示实际数字，如123；
        1万≤X＜1亿，显示单位为万，小数点后保留1位，如1.2万；
        X≥1亿，显示单位为亿，且显示整数，如1亿。
*/
export function formatBigNumber(count, format){
        let num;
        format = format || {
            hMillion: '亿',
            tThousand: '万'
        };
        if(count < 10000){
            return count;
        }
        if(count < 100000000){
            num = count/10000;
            num = (Math.round(num * 10) / 10).toString().replace(/\.0$/,"");
            return  num + format.tThousand;
        }
        if (count >= 100000000) {
            num = count / 100000000;
            num = num.toFixed(0).replace(/\.0$/,"");
            return num + format.hMillion;
        }
    };