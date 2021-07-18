const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

<<<<<<< HEAD
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
=======
  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
>>>>>>> 6a42697d90f759d53197fd435ec742605962f179
}

const formatNumber = n => {
  n = n.toString()
<<<<<<< HEAD
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}

Date.prototype.format = function (fmt) {  
  var o = {
      "M+": this.getMonth() + 1, 
      "d+": this.getDate(), 
      "h+": this.getHours(), 
      "m+": this.getMinutes(), 
      "s+": this.getSeconds(),
      "q+": Math.floor((this.getMonth() + 3) / 3),
      "S": this.getMilliseconds() 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
=======
  return n[1] ? n : `0${n}`
}

module.exports = {
  formatTime
>>>>>>> 6a42697d90f759d53197fd435ec742605962f179
}
