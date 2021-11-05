import dayjs from 'dayjs'
const utils = {
  isPhone(str) {
    return /^1[3456789]{1}\d{9}$/.test(str)
  },

  /**
   * @desc: 节流函数
   * @param {Function} func 需要节流的函数
   * @param {number} wait 等待间隔 默认300ms
   * @return: void
   */
  throttle(func, wait = 300) {
    let previous = 0
    return function () {
      let now = Date.now()
      let context = this
      let args = arguments
      if (now - previous > wait) {
        func.apply(context, args)
        previous = now
      }
    }
  },

  /**
   * @desc: 防抖函数
   * @param {Function} func 需要防抖的函数
   * @param {number} wait 等待间隔 默认300ms
   * @param {Boolean} immediate true 表立即执行，false 表非立即执行
   * @return: void
   */
  debounce(func, wait = 300, immediate = false) {
    let timeout
    return function () {
      let context = this
      let args = arguments

      if (timeout) clearTimeout(timeout)
      if (immediate) {
        let callNow = !timeout
        timeout = setTimeout(() => {
          timeout = null
        }, wait)
        if (callNow) func.apply(context, args)
      } else {
        timeout = setTimeout(function () {
          func.apply(context, args)
        }, wait)
      }
    }
  },

  // 获取操作系统
  getOperateSystem() {
    let equipmentType = ''
    let agent = navigator.userAgent.toLowerCase()
    let android = agent.indexOf('android')
    let iphone = agent.indexOf('iphone')
    let ipad = agent.indexOf('ipad')
    if (android !== -1) {
      equipmentType = 'android'
    }
    if (iphone !== -1 || ipad !== -1) {
      equipmentType = 'ios'
    }
    return equipmentType
  },
  isLiuHai() {
    // iPhone X、iPhone XS
    let isIPhoneX = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.height === 812 && window.screen.width === 375;
    // iPhone XS Max
    let isIPhoneXSMax = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.height === 896 && window.screen.width === 414;
    // iPhone XR
    let isIPhoneXR = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 2 && window.screen.height === 896 && window.screen.width === 414;
    let h = (isIPhoneX || isIPhoneXSMax) ? 30 : (isIPhoneXR ? 33 : 0)
    return h
  },
  // 判断在那个容器
  getPlatform() {
    let pf = ''
    const ua = window.navigator.userAgent
    if (ua.indexOf('JYS_ANDROID') > 0) {
      pf = 'JYS_ANDROID'
    } else if (ua.indexOf('JYS_IOS') > 0) {
      pf = 'JYS_IOS'
    } else if (ua.indexOf('MicroMessenger') > 0) {
      pf = 'wechat'
    } else if (ua.indexOf('AlipayClient') > 0) {
      pf = 'alipay'
    } else if (ua.toLocaleLowerCase().match(/WeiBo/i) == "weibo") {
      pf = 'weibo'
    } else {
      pf = 'h5'
    }
    return pf
  },
  isApp() {
    const ua = window.navigator.userAgent
    return ua.indexOf('JYS_ANDROID') > 0 || ua.indexOf('JYS_IOS') > 0
  },
  showHeader() {
    let res = true
    let hides = ['wechat', 'alipay', 'weibo']
    if (hides.indexOf(utils.getPlatform()) > -1) {
      res = false
    }
    return res
  },
  getPagePt() {
    const pt = {
      'JYS_ANDROID': 'pd40',
      'JYS_IOS': 'pd40',
      'wechat': 'pd0',
      'alipay': 'pd0',
      'h5': 'pd40'
    }
    return pt[utils.getPlatform()]
  },
  //获取缩放/放大后的宽度，高度
  //flag w 宽度放大倍数)  h高度放大倍数(最大2倍)
  getPageMultiple(flag = 'h') {
    const w = document.getElementById('app').offsetWidth
    let multiple = w / 375
    flag == 'h' && (multiple = multiple >= 2 ? 2 : multiple)
    console.log(multiple)
    return multiple
  },
  // 格式化 直播人数 展示
  formatOnlineNum(n) {
    console.log(n)
    if (typeof n !== 'number') return 0
    let num = n < 10000 ? Math.abs(n) : `${(Math.ceil(n / 100) / 100).toFixed(2)}w`
    return num
  },
  // 格式化 直播人数 展示
  // formatOnlineNum(n) {
  //   if (typeof n !== 'number') return 0
  //   let num = `${(n / 100 / 100).toFixed(2)}w`
  //   return num
  // },
  // 格式化 阅读数 展示
  formatClickNum(n) {
    if (typeof n !== 'number') return 0
    // let num = n < 1000 ? Math.abs(n) : (n < 100000 ? `${(Math.ceil(n / 100) / 10).toFixed(1)}k` : '10w+')
    let num = n < 100000 ? Math.abs(n) : `${(Math.ceil(n / 100) / 100).toFixed(2)}万`
    return num
  },
  // 格式化新闻时间
  formatNewsDate(str) {
    if (typeof str !== 'string') return str
    let time = new Date(str.replace(/-/g, '/'))
    let today = dayjs().startOf('day').format("YYYY-MM-DD")
    // let yesterday = dayjs().subtract(1, "days").format("YYYY-MM-DD")
    let myTime = dayjs(time).format('MM-DD HH:mm')
    if (utils.isThisYear(time)) {
      myTime = dayjs(time).format("MM-DD HH:mm")
    } else {
      myTime = dayjs(time).format("YYYY-MM-DD HH:mm")
    }
    if (str.indexOf(today) > -1) {
      myTime = dayjs(time).format('[今日] HH:mm')
    }

    return myTime
  },
  isThisYear(val) {
    if (val) {
      return dayjs().year() === new Date(val).getFullYear()
    }
  },
  // 时间转换方法
  formatDate(time, format) {
    var t = new Date(time);
    var tf = function (i) {
      return (i < 10 ? '0' : '') + i
    };
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
      switch (a) {
        case 'yyyy':
          return tf(t.getFullYear());
        case 'MM':
          return tf(t.getMonth() + 1);
        case 'mm':
          return tf(t.getMinutes());
        case 'dd':
          return tf(t.getDate());
        case 'HH':
          return tf(t.getHours());
        case 'ss':
          return tf(t.getSeconds());
      }
    })
  },
  // 计算时间差
  getDiffTime(startTime, endTime) {
    let timeDiff = dayjs(endTime).diff(dayjs(startTime), 'days')
    return timeDiff
  },
  // 传入时间戳
  formatPushTime(time) {
    var now = new Date().getTime(),
      tmp = Math.floor((now - time) / 1000),
      txt = '';
    if (tmp < 60) {
      txt = '刚刚'
    } else if (tmp < 7200) {
      txt = '两小时前'
    } else {
      txt = utils.formatDate(time, 'yyyy/MM/dd HH:mm')
    }
    return txt
  },
  // 前端传值格式化
  getBase64UrlParams(base64) {
    let res = ''
    if (!utils.isBase64(base64)) return base64
    res = decodeURIComponent(atob(base64))
    return res
  },
  isBase64(str) {
    if (str === '' || str.trim() === '') {
      return false;
    }
    try {
      return btoa(atob(str)) == str;
    } catch (err) {
      return false;
    }
  },
  setBase64UrlParams(str) {
    let res = ''
    res = btoa(encodeURIComponent(str))
    return res
  },
  // 中文特殊字符校验
  isChineseChat(str) {
    return /^[\u4e00-\u9fa5]+$/.test(str)
  },
  //时间处理
  dealTime(time, format = 'YYYY-MM-DD') {
    if (time === '-') {
      return ''
    }
    return dayjs(time).format(format)
  },
  formt(dateTime, pattern) {
    var date = dateTime;
    var fmt = pattern;
    var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  },
  // 根据时间获取季度
  getQuarter(d) {
    var q = [4, 1, 2, 3];
    return q[(d + 3) / 3] + "季度";
  },
  //2位小数点格式化
  formatAmountFixed2(num) {
    return Number.isNaN(+num) ? 0 : (+num).toFixed(2)
  },
  formatAmountFixed1(num) {
    return Number.isNaN(+num) ? 0 : (+num).toFixed(1)
  },
  formatAmountFixed3(num) {
    return Number.isNaN(+num) ? 0 : (+num).toFixed(3)
  },
  formatAmountFixed4(num) {
    return Number.isNaN(+num) ? 0 : (+num).toFixed(4)
  },
  // 数字增加单位（元，万，亿）
  addNumUnit(num) {
    let myNum = Number.isNaN(+num) ? 0 : Number(num)
    if (Math.abs(myNum) >= 10000 && Math.abs(myNum) < 10000000) {
      return (myNum / 10000).toFixed(2) + '万'
    } else if (Math.abs(myNum) >= 10000000) {
      return (myNum / 100000000).toFixed(2) + '亿'
    }
    return myNum ? myNum + '元' : '--'
  },
  //数字增加加号,并保留n位小数
  numAddSign(x, n = 2) {
    x = Number(x); // convert to a number
    if (x > 0) {
      return '+' + x.toFixed(n)
    } else if (x < 0 || x === 0) {
      return x.toFixed(n)
    } else {
      return 0
    }
  },
  //获取颜色 红涨绿跌0默认色
  getNumColor(num) {
    let x = Number.isNaN(+num) ? 0 : Number(num)
    if (x > 0) {
      return 'red'
    } else if (x < 0) {
      return 'green'
    } else {
      return ''
    }
  },
  //给数据末尾添加%
  addSymbol(num) {
    return Number.isNaN(+num * 100) ? '' : (+num * 100).toFixed(2) + '%';
  },
  //转换成百分比
  parsePercentage(num) {
    if (num != 0 && num != undefined && typeof Math.floor(num * 100) == Number) {
      return Math.floor(num * 100);
    } else {
      return 0
    }
  },
  toPercent(point) {
    var str = Number(point * 100).toFixed(2);
    if (str === str) {
      str += "%";
    } else {
      str = '-'
    }
    return str;
  },
  changePercent(point) {
    var str = Number(point * 100).toFixed(2);
    if (str < 0) {
      str = -str
    }
    if (str > 100) {
      str = 100
    }
    return str;
  },
  //4位小数点格式化
  formatAmountFixed4(num) {
    return Number.isNaN(+num) ? '' : (+num).toFixed(4)
  },
  //获取总高度
  getTotal(sucessNum, failNum) {
    let total = parseFloat(sucessNum) + parseFloat(failNum);
    return total * 2;
  },
  // 主题配资换算成百分比
  parseConfigFund(sucessNum, failNum) {
    let total = parseFloat(sucessNum) + parseFloat(failNum);
    if (total > 0) {
      let percent = sucessNum / total;
      return Math.floor(percent * 100);
    } else {
      return 0;
    }
  },
  //获取内容的高度
  getProgressHeight(sucessNum, failNum) {
    const percent = this.parseConfigFund(sucessNum, failNum);
    if (percent / 100 * this.getTotal(sucessNum, failNum)) {}
    return percent / 100 * this.getTotal(sucessNum, failNum)
  },
  //截四个字
  splitFourText(item) {
    return item.substring(0, 4)
  },
  // 转换时间格式 
  generateTime(str) {
    if (str == "year") {
      return "今年"
    } else if (str == "since") {
      return "成立以来"
    } else {
      let txt = str.substr(str.length - 1, 1);
      let num = str.substring(0, str.length - 1)
      if (txt == "M") {
        return num + "月"
      } else if (txt == "Y") {
        return num + "年"
      } else if (txt == "W") {
        return num + "周"
      }
    }
  },

  generateTimeStr(str) {
    let newstr = str.replace(/^y(\d+)Rate$/g, str.split('')[1])
    return newstr;
  },
  //获取tag
  //60 不及格 60-75 及格 75-90良好 85+优秀
  getTag(cur, total) {

    if (total == 0) {
      return "优秀"
    }

    let num = 1 - (cur / total)
    let score = num * 100
    if (score < 60) {
      return "不及格"
    }

    if (score > 60 && score < 70) {
      return "及格"
    }
    if (score > 70 && score < 90) {
      return "良好"
    }
    if (score > 85) {
      return "优秀"
    }
  },
  // 定投收益
  //'20130204'.replace(/^(\d{4})(\d{2})(\d{2})$/g,'$1-$2-$3')
  replaceStr(str) {
    let a = str.replace(/^(\d{4})(\d{2})(\d{2})$/g, '$1-$2-$3')
    return a
  },

  // 随机32位字符
  getRandom32() {
    var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    var nums = ""
    for (var i = 0; i < 32; i++) {
      var id = parseInt(Math.random() * 61)
      nums += chars[id]
    }
    return nums
  },
  //是否交易日
  isTradingDay(timeStamp, tradingDayArr) {
    if (timeStamp == 'undefined' || timeStamp == '') {
      var timeStamp = new Date();
    }
    var isWeek = timeStamp.getDay();

    var y = timeStamp.getFullYear();
    var m = timeStamp.getMonth() + 1;
    m = m < 10 ? '0' + m : '' + m;
    var d = timeStamp.getDate() < 10 ? '0' + timeStamp.getDate() : '' + timeStamp.getDate();

    var ymd = y + m + d;
    //判断是否为调休日 必定是工作日
    if (tradingDayArr.indexOf(ymd) > -1) {
      return true;
    } else {
      return false;
    }
  },

  //当前时间是否在某一时间段
  timeRange(beginTime, endTime) {
    var strb = beginTime.split(":");
    if (strb.length != 2) {
      return false;
    }

    var stre = endTime.split(":");
    if (stre.length != 2) {
      return false;
    }

    var b = new Date();
    var e = new Date();
    var n = new Date();

    b.setHours(strb[0]);
    b.setMinutes(strb[1]);
    e.setHours(stre[0]);
    e.setMinutes(stre[1]);
    if (n.getTime() - b.getTime() >= 0 && n.getTime() - e.getTime() < 0) {
      return true;
    } else {
      return false;
    }
  },
  /**
   * 把时间序列(第几个交易分钟)的值转换为对应的时刻
   * @param x时间序列
   * @param type 1港股通, 2沪深通
   */
  convertXToTime(x) {
    function addZero(str, length) {
      return new Array(length - str.toString().length + 1).join('0') + str
    }
    var AM_MINUTES = 120 //沪深上午交易时间
    var startAm = new Date(1970, 1, 1, 9, 30, 0)
    var startPm = new Date(1970, 1, 1, 13, 0, 0)
    var endXAm = AM_MINUTES //上午交易时间段对应的最后一个x序列的值(2个小时,120分钟)
    if (x <= endXAm) {
      var time = new Date(+startAm + 60000 * x) //获得当前时间=起始时间 + 1分钟 * X
    } else {
      var time = new Date(+startPm + 60000 * (x - endXAm)) //获得当前时间=起始时间 + 1分钟 * (X - 上午最后一个X - 1)
    }
    return [addZero(time.getHours(), 2), addZero(time.getMinutes(), 2)].join(':')
  },
  //判断数组
  isArray(obj) {
    return (typeof obj === 'object') && obj.constructor === Array
  },
  //判断对象
  isString(str) {
    return (typeof str === 'string') && str.constructor === String
  },
  //判断字符串包含字母
  isLetter(str) {
    for (let i in str) {
      let asc = str.charCodeAt(i);
      if ((asc >= 65 && asc <= 90 || asc >= 97 && asc <= 122)) return true;
    }
    return false;
  },
  // 中文时间
  formatChinese(time, format) {
    let t = '';
    if (utils.getOperateSystem() == 'ios') {
      t = new Date(time.replace(/-/g, '/'));
    } else {
      t = new Date(time)
    }
    var tf = function (i) {
      return (i < 10 ? '0' : '') + i
    };
    const newTime = format.replace(/yyyy|MM|dd|cc|HH|mm|ss/g, function (a) {
      switch (a) {
        case 'yyyy':
          return tf(t.getFullYear()) + '年';
        case 'MM':
          return tf(t.getMonth() + 1) + '月';
        case 'mm':
          return tf(t.getMinutes()) + '分';
        case 'dd':
          return tf(t.getDate()) + '日';
        case 'cc':
          return '    周' + utils.formatWeek(t.getDay());
        case 'HH':
          return tf(t.getHours());
        case 'ss':
          return tf(t.getSeconds());
      }
    })
    return newTime.replace(/-/g, '')
  },
  // 周1转化成周一
  formatWeek(day) {
    switch (day) {
      case 1:
        return '一';
      case 2:
        return '二';
      case 3:
        return '三';
      case 4:
        return '四';
      case 5:
        return '五';
      case 6:
        return '六';
      case 0:
        return '日';
    }
  },

  // 年月日比较方式
  compareTime(newTime, lastTime) {
    if (utils.getOperateSystem() == 'ios') {
      newTime = new Date(newTime.replace(/-/g, '/'));
      lastTime = new Date(lastTime.replace(/-/g, '/'));
    }

    let newDay = new Date(newTime).getDate()
    let lastDay = new Date(lastTime).getDate()
    let newMonth = new Date(newTime).getMonth()
    let lastMonth = new Date(lastTime).getMonth()
    let newYear = new Date(newTime).getMonth()
    let lastYear = new Date(lastTime).getMonth()
    if (lastDay != newDay) {
      return true
    } else if (lastMonth != newMonth) {
      return true
    } else if (lastYear != newYear) {
      return true
    } else {
      return false
    }
  },
  // 
  getLastestDate(arr) {
    var dates = []
    arr.forEach((item) => {
      let date = utils.replaceStr(item.date)
      dates.push(new Date(date))
    })
    var maxDate = Math.max.apply(null, dates)
    // var minDate = new Date(Math.min.apply(null, dates))
    let latestDate = utils.dealTime(maxDate)
    let latestStr = latestDate.substr(0, 4) + latestDate.substr(5, 2) + latestDate.substr(8, 2)
    return latestStr
  },


  removeSH(str) {
    if (typeof str !== 'string') return false
    const path = str.replace(/^([A-Za-z]{2})(\d{6})/g, '$2')
    return path
  },

  // 诊股大资金单位转化(万, 亿)
  stockaddNumUnit(num) {
    // console.log(num)
    let myNum = Number.isNaN(+num) ? 0 : Number(num)
    if (Math.abs(myNum) >= 10000 && Math.abs(myNum) < 100000000) {
      return (myNum / 10000).toFixed(2) + '万'
    } else if (Math.abs(myNum) >= 10000000) {
      return (myNum / 100000000).toFixed(2) + '亿'
    }
    return myNum
    // // return myNum ? myNum + '元' : '--'
    // if (Math.abs(myNum)>=10000000) {
    //   return (myNum / 100000000).toFixed(2) + '亿'
    // }
    // return myNum ? myNum + '万' : '--'
  },
  //股票代码加SH SZ前缀
  dealStockCode(code) {
    let code1 = code.substring(0, 2)
    console.log(code1)
    if (code1 == '30' || code1 == '00') {
      return 'SZ' + code
    } else if (code1 == '60' || code1 == '68') {
      return 'SH' + code
    }
    return code
  },
  //自选股判断类型
  getStockType(market, code) {
    console.log(market,code)
    if (!code) {
      return false
    }
    if (market == 1) { //上证
      if (code.substring(0, 2) == '88') {
        return 'TYPE_PLATE'  //板块
      } else if (code.substring(0, 1) == '8' || code.substring(0, 3) == '000') {
        return 'TYPE_INDEX' //指数
      } else {
        return 'TYPE_STOCK' //个股
      }
    } else {
      return code.substring(0, 3) == '399' ? 'TYPE_INDEX' : 'TYPE_STOCK'
    }
  }
}
export default utils