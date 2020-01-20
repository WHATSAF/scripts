(function (doc, win) {
    var orientationChange = 'orientationchange';
    var resize = 'resize';
    var htmlEle = doc.documentElement;

    var resizeEvt = orientationChange in window ? orientationChange : resize;

    win.addEventListener('DOMContentLoaded', function () {
        calc();
    });

    win.addEventListener(resizeEvt, function () {
        calc();
    });

    function calc() {
        var clientWidth = htmlEle.clientWidth;

        htmlEle.style = 'font-size: ' + ((clientWidth * win.devicePixelRatio) / 750) * 100 + 'px;';
    }
})(document, window);
