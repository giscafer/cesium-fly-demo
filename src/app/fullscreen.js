/**
 * 全屏显示
 */
var screenfull = require('screenfull');

function setFullScreen() {
    var fullscreen = screenfull;
    $('.fullscreen').click(function () {
        if (screenfull.isFullscreen == true) {
            screenfull.exit()
        } else {
            screenfull.request()
        }
    });
    if (fullscreen.enabled) {
        document.addEventListener(fullscreen.raw.fullscreenchange, function () {
            $('.fullscreen').html('<a href="javascript:void(0)" > ' + (fullscreen.isFullscreen ? '退出全屏' : '全屏') + '</a>')
        })
    }
    $(document).on('keydown', function (e) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode == 122) {
            e.preventDefault();
            var el = document.documentElement;
            var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;
            if (typeof rfs != "undefined" && rfs) {
                rfs.call(el)
            } else if (typeof window.ActiveXObject != "undefined") {
                var wscript = new ActiveXObject("WScript.Shell");
                if (wscript != null) {
                    wscript.SendKeys("{F11}")
                }
            }
            document.addEventListener("webkitfullscreenchange", function () {
                if (document.webkitIsFullScreen) {
                    $('.fullscreen').html('<a href="javascript:void(0)" >退出全屏</a>')
                } else {
                    $('.fullscreen').html('<a href="javascript:void(0)" >全屏</a>')
                }
            }, false);
            document.addEventListener("fullscreenchange", function () {
                if (document.fullscreen) {
                    $('.fullscreen').html('<a href="javascript:void(0)" >退出全屏</a>')
                } else {
                    $('.fullscreen').html('<a href="javascript:void(0)" >全屏</a>')
                }
            }, false);
            document.addEventListener("mozfullscreenchange", function () {
                if (document.mozFullScreen) {
                    $('.fullscreen').html('<a href="javascript:void(0)" >退出全屏</a>')
                } else {
                    $('.fullscreen').html('<a href="javascript:void(0)" >全屏</a>')
                }
            }, false);
            document.addEventListener("msfullscreenchange", function () {
                if (document.msFullscreenElement) {
                    $('.fullscreen').html('<a href="javascript:void(0)" >退出全屏</a>')
                } else {
                    $('.fullscreen').html('<a href="javascript:void(0)" >全屏</a>')
                }
            }, false)
        }
    })
}


module.exports = { setFullScreen };