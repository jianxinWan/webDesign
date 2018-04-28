
var mobile = {};

// Magic Number
var defaultConfig = {
    maxWidth: 1500,                    // 最大宽度(配合body{margin: 0 auto;} 在pc下正常显示)
    remScale: 25,                     // 1rem对应设计稿100px
    designWidth: 750,                  // 设计稿宽度默认750
    dpr: 1,                            // dpr默认1
    supportOrientationchange: false,   // 默认不支持横屏自动旋转
}

mobile.maxWidth = defaultConfig.maxWidth;
mobile.remScale = defaultConfig.remScale;
mobile.supportOrientationchange = defaultConfig.supportOrientationchange;

// 计算和初始化参数，并插入viewport
(function () {
    // querySelector选择出来的是静态的，不能再做修改
    var viewportEl = document.querySelector('meta[name="viewport"]'); // 获取name为vieport的meta
    var mobileEl = document.querySelector('meta[name="pangu-mobile"]'); // 获取name为mobile的meta

    var designWidth = defaultConfig.designWidth; // 获取默认宽度

    var dpr = defaultConfig.dpr;  // 获取默认dpr

    // 允许通过自定义name为mobile的meta头，通过initial-dpr, design-width定义页面缩放
    if (mobileEl) {
        // getAttribute() 方法返回指定属性名的属性值
        // meta的属性提供了名称/值对中的值。该值可以是任何有效的字符串
        var mobileCon = mobileEl.getAttribute('content');
        // 这里检测是否设置了允许横屏旋转content="supportOrientationchange=true"
        // 如果允许转成横屏
        if (mobileCon) {
            // 获取dpr的设置值 initial-dpr的值可为auto或者数字
            var initialDprMatch = mobileCon.match(/initial\-dpr=([auto\d\.]+)/);
            // 如果初始的值为auto
            if (initialDprMatch) {
                // 如果为auto
                if (initialDprMatch[1] === 'auto') {
                    // 获取手机的dpr，如果获取不到则为1
                    dpr = window.devicePixelRatio || 1;
                    // dpr>3 为3  3>dpr>2 为2 2>dpr>1 为1
                    dpr = dpr >= 3 ? 3 : (dpr >= 2 ? 2 : 1);
                } else {
                    // 如果dpr已设置则置为整数
                    dpr = parseFloat(initialDprMatch[1]);
                }
            }
            // design-width为设计稿宽度，默认750 1rem对应设计稿100px
            var designWidthMatch = mobileCon.match(/design\-width=([\d\.]+)/);
            // 如果设置了设计稿宽度就使用，没有设置就为默认的750px
            if (designWidthMatch) {
                // 赋值使用
                designWidth = parseFloat(designWidthMatch[1]);
            }
            // 判断如果设置了支持屏幕旋转，默认是不支持旋转
            var supportOrientationchange = mobileCon.match(/supportOrientationchange=([true]+)/);
            if (supportOrientationchange) {
                // 赋值，可旋转属性为false
                supportOrientationchange = (/^true$/i).test(supportOrientationchange[1]);
                mobile.supportOrientationchange = supportOrientationchange;
            }
        }
    }

    // 以上是检测用户是否自定义了一些属性，如果没有就选择默认的，下面是设置到html文档中

    // 设置dpr
    document.documentElement.setAttribute('data-dpr', dpr);
    mobile.dpr = dpr;
    // 设置设计稿宽度
    document.documentElement.setAttribute('design-width', designWidth);
    mobile.designWidth = designWidth;
    // 设置是否旋转
    document.documentElement.setAttribute('data-supportOrientationchange', mobile.supportOrientationchange);
    
    var scale = 1 / dpr;
    // 添加
    // 设置viewport，width=device-width ：表示宽度是设备屏幕的宽度
    // initial-scale：表示初始的缩放比例
    // minimum-scale：表示最小的缩放比例
    // maximum-scale：表示最大的缩放比例
    // user-scalable=no：表示用户是否可以调整缩放比例
    var content = 'width=device-width, initial-scale=' + scale + ', minimum-scale=' + scale + ', maximum-scale=' + scale + ', user-scalable=no';
    if (viewportEl) {
        viewportEl.setAttribute('content', content);
    } else {
        // 没有就创建
        viewportEl = document.createElement('meta');
        viewportEl.setAttribute('name', 'viewport');
        viewportEl.setAttribute('content', content);
        document.head.appendChild(viewportEl);
    }

})();

// 手机内的px值转为rem
mobile.px2rem = function (px) {
    return parseInt(px, 10) / mobile.innerWidth * mobile.designWidth / mobile.remScale;
};

// rem转为手机内的px值
mobile.rem2px = function (rem) {
    return parseInt(rem * mobile.remScale / mobile.designWidth * mobile.innerWidth, 10);
};

// 核心方法了，给HTML设置font-size。
mobile.mresize = function () {
    // Element.getBoundingClientRect()方法返回元素的大小及其相对于视口的位置
    var innerWidth = document.documentElement.getBoundingClientRect().width || window.innerWidth;

    if (!innerWidth) {
        return false;
    }
    // 获取到元素宽度
    mobile.innerWidth = innerWidth;
    // 如果支持旋转
    if (mobile.supportOrientationchange) {
        // 获取屏幕宽度
        var innerHeight = window.innerHeight;
        if (innerWidth > innerHeight) {
            // 横屏 宽度大于高度
            mobile.innerWidth = innerHeight;
            // classList 属性返回元素的类名,classList只读，但是可以通过add，remove方法修改它
            // 通过了css提前写好的class样式直接添加
            document.body.classList.add('mb-rotate');
            // body宽度设为设计稿宽度除以100的rem
            document.body.style.width = mobile.designWidth / 100 + 'rem';
            // 高度设为获取到的之前定的宽度
            document.body.style.height = innerWidth + 'px';
            // 设置为已经竖屏
            mobile.isCrossScreen = true;
        } else {
            // 回到正常的情况
            document.body.classList.remove('mb-rotate');
            document.body.style.width = '';
            document.body.style.height = '';
            mobile.isCrossScreen = false;
        }
    }
    // 如果本身宽度除以dpr大最大宽度 增加最大宽度
    if (mobile.maxWidth && (mobile.innerWidth / mobile.dpr > mobile.maxWidth)) {
        mobile.innerWidth = mobile.maxWidth * mobile.dpr;
    }
    document.documentElement.style.fontSize = (mobile.innerWidth * mobile.remScale / mobile.designWidth ) + 'px';
};

// 直接调用一次
mobile.mresize();

// 某些app场景进入页面后webview宽度会变化，绑定resize的时候调用解决bug
window.addEventListener('resize', function () {
    // 节流
    clearTimeout(mobile.tid);
    mobile.tid = setTimeout(mobile.mresize, 33 );
}, false);

// 防止不明原因的bug。load之后再调用一次。
window.addEventListener('load', mobile.mresize, false);

setTimeout(function () {
    // 防止某些机型怪异现象，异步再调用一次
    mobile.mresize(); 
}, 333);

// 判断手机当前环境相关
(function () {
    var ua = window.navigator.userAgent.toLowerCase();
    var isIOS = (function () {
        return /iPhone|iPad|iPad/i.test(ua);
    })();
    var isMobile = (function () {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    })();
    var isGPhone = isMobile && !isIOS;
    var isWeiXin = (function () {
        return ua.match(/MicroMessenger/i) == 'micromessenger';
    })();

    // 普通浏览器
    var isBrowser = !isWeiXin;

    if (isIOS) {
        document.documentElement.classList.add('mb-iphone');
    }
    if (isGPhone) {
        document.documentElement.classList.add('mb-gphone');
    }
    if (isWeiXin) {
        document.documentElement.classList.add('mb-wx');
    }
    if (isBrowser) {
        document.documentElement.classList.add('mb-browser');
    }

    // 暴露变量
    mobile.isIOS = isIOS;
    mobile.isMobile = isMobile;
    mobile.isGPhone = isGPhone;
    mobile.isWeiXin = isWeiXin;
    mobile.isBrowser = isBrowser;
})();

