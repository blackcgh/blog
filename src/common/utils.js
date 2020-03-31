// 省略字数
function omitCount(val) {
  let random = [100, 105, 110, 115, 120, 125, 130, 135, 140, 145];
  let r = Math.floor(Math.random() * 10);
  if (val.length > 120) {
    return val.slice(0, random[r]) + '...';
  } else {
    return val;
  }
}

// 随机生成背景颜色
function getRainbow(el) {
  let r, g, b;
  do {
    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);
  } while (Math.abs(r - g) > 20 && Math.abs(r - b) > 20 && Math.abs(g - b) > 20)
  const color = 'rgb(' + r + ',' + g + ',' + b + ')';
  el.style.backgroundColor = color;
}

// 时间格式化
function formatTime(date, confirm) {
  date = new Date(date);

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  // let second = date.getSeconds();
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;
  hour = hour < 10 ? '0' + hour : hour;
  minute = minute < 10 ? '0' + minute : minute;
  // second = second < 10 ? '0' + second : second;

  if (confirm) {
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
  }
  return year + '-' + month + '-' + day;
}

export {
  omitCount,
  getRainbow,
  formatTime
}
