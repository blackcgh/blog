// 省略字数
function omitCount(val) {
  if (val.length > 90) {
    return val.slice(0, 90) + '...';
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

// 获取博客图片
function getBlogImg(content) {
  const index = content.indexOf('<img src="');
  if(index != -1) {
    return content.substr(index + 10, 72)
  } else {
    return 'http://localhost/images/blog/blogimg.webp'
  }
}

export {
  omitCount,
  getRainbow,
  formatTime,
  getBlogImg
}
