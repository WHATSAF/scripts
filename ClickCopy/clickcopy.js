var ClickCopy = (function () {
    var _bind = function (selector) {
        var els = document.querySelectorAll(selector);
        for (var i = 0; i < els.length; i++) {
            els[i].addEventListener('click', function (ev) {
                _selectText(ev.target);
            })
        }
    }

    var _selectText = function (element) {
        if (document.body.createTextRange) {
            var range = document.body.createTextRange();

            range.moveToElementText(element);
            range.select();
        } else if (window.getSelection) {
            var selection = window.getSelection();
            var range = document.createRange();

            range.selectNodeContents(element);
            selection.removeAllRanges();
            selection.addRange(range);
        } else {
            _showMsg('复制失败，请手动复制！');
            return;
        }

        _copyCommand();
    }

    var _copyCommand = function () {
        var isCopied = document.execCommand('copy');
        if (isCopied) {
            _showMsg('已复制！');
        } else {
            _showMsg('复制失败，请手动复制！');
        }
    }

    var _showMsg = function (msg) {
        var msgExisted = document.body.getElementsByClassName('.msg-container');
        if (0 != msgExisted.length) {
            document.body.removeChild(msgExisted);
        }

        var msgContainer = document.createElement('div');
        msgContainer.setAttribute('class', 'msg-container');

        var msgContent = document.createElement('div');
        msgContent.setAttribute('class', 'msg-content');
        msgContent.innerHTML = msg;

        msgContainer.appendChild(msgContent);

        document.body.appendChild(msgContainer);

        setTimeout(function () {
            document.querySelector('.msg-container').setAttribute('style', 'opacity:.6;');
        }, 100)

        setTimeout(function () {
            msgContainer.setAttribute('style', 'opacity: 0;');

            setTimeout(function () {
                document.body.removeChild(msgContainer);
            }, 1000)
        }, 2000)
    }

    return {
        bind: _bind
    }
})();
