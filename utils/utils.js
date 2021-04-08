export function fixD(num, precision) {
    // num初始化
    if (num + '' === '0') {
        return '0.'.padEnd(precision + 2, '0');
    }
    if (!num) {
        return '--';
    }
    let newnum = parseFloat(num) + '';
    if (newnum === 'NaN') {
        return '--';
    }
    let fixNum = newnum;
    // 科学计数法计算
    if (newnum.toLowerCase().indexOf('e') > -1) {
        let a = newnum.toLowerCase().split('e');
        let b = a[0];
        let c = Math.abs(parseFloat(a[1]));
        let d = '';
        let h = b.length;
        let i;
        if (a[0].split('.')[1]) {
            b = a[0].split('.')[0] + a[0].split('.')[1];
            h = a[0].split('.')[0].length;
        }
        for (i = 0; i < c - h; i++) {
            d = d + '0';
        }
        fixNum = '0.' + d + b;
    }
    // 精度格式化
    // precision初始化
    if (precision + '' !== '0' && !precision) {
        return fixNum;
    }
    if (parseFloat(num) + '' === 'NaN') {
        return fixNum;
    }
    let fNum = fixNum.split('.');
    if (precision === 0) {
        fixNum = parseInt(fixNum);
    } else if (precision > 0 && fNum[1]) {
        if (fNum[1].length > precision) {
            if (fNum[1].indexOf('999999999') > -1) {
                let s = parseFloat(fixNum).toFixed(precision + 1);
                fixNum = s.slice(0, s.length - 1);
            } else {
                fixNum = fNum[0] + '.' + fNum[1].slice(0, precision);
            }
        } else {
            fixNum = parseFloat(fixNum).toFixed(precision);
        }
    } else {
        fixNum = parseFloat(fixNum).toFixed(precision);
    }
    return fixNum;
}
