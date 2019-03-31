/**
 * Created by lovo_bdk on 15-12-17.
 */
!(function(win, doc){
    function setFontSize() {
        // 获取window 宽度
        // zepto实现 $(window).width()就是这么干的
        var winWidth =  window.innerWidth;       
        if(winWidth<=1260){
            doc.documentElement.style.fontSize = (1260 / 1920) * 100 + 'px' ;
        }else{
            doc.documentElement.style.fontSize = (winWidth / 1920) * 100 + 'px' ;
        }
    }

    var evt = 'onorientationchange' in win ? 'orientationchange' : 'resize';

    var timer = null;

    win.addEventListener(evt, function () {
        clearTimeout(timer);

        timer = setTimeout(setFontSize, 300);
    }, false);

    win.addEventListener("pageshow", function(e) {
        if (e.persisted) {
            clearTimeout(timer);

            timer = setTimeout(setFontSize, 300);
        }
    }, false);

    //初始化
    setFontSize();

}(window, document));