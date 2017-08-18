/**
 * Created by json(610330335@qq.com) .
 */
var bgmusic = document.getElementById('bgmusic');
document.addEventListener("WeixinJSBridgeReady", function() {
    bgmusic.play();
    bgmusic.pause();
}, false);
var url = document.location.href;
var type = url.indexOf("again");
if (type != -1) {
    document.addEventListener("WeixinJSBridgeReady", function() {
        bgmusic.pause();
    }, false);
} else {
    document.addEventListener("WeixinJSBridgeReady", function() {
        bgmusic.play();
    }, false);
}
$(".u-btn-play").on('click', function() {
    if (bgmusic.paused) {
        bgmusic.play();
        $(this).removeClass("zanting")
    } else {
        bgmusic.pause();
        $(this).addClass("zanting")
    }
})
$(function() {
    //加载图
    var imgarr = ['images/bg1.jpg', 'images/hook3.png'];
    //app初始化
    var h5 = new PageSlider({
        pages: $('.page-wrap .page'),
        dev: 0, //
        // musicUrl: 'music/bg.mp3',
        baseUrl: 'http://lt.weiyihui.cn/unicom_qixi',
        onchange: function() { //每一屏切换完成时的回调   
        }
    });



    h5._loadimg(imgarr, function() {
        setTimeout(function() {
            var url = document.location.href;
            var type = url.indexOf("again");
            if (type != -1) {
                h5.moveTo(1, true);
            } else {
                h5.moveTo(0, true);
            }
            smallScreen();
            $('.loading').addClass('none');
            $('.page1').removeClass('none');
            game.init();
        }, 200);
    });
    $('.btn_close').on('tap', function() {
        $(this).closest('.tk').addClass('none');
    });
    $('.tk-tips-play .btn_close').on('tap', function() {
        $(this).closest('.tk').removeClass('none');
        var ran = Math.random();
        setTimeout(function() {
            window.location.href = "main.html?again" + ran;
        }, 2000)
    });
    $('.btn_rule').on('tap', function(ev) {
        ev.stopPropagation();
        $('.tk').addClass('none');
        $('.tk-rule').removeClass('none');
    });
    $('.btn_join').on('tap', function(ev) {
        ev.stopPropagation();
        h5.moveTo(1, false);
        bgmusic.pause();
    });
    //分享弹层
    $('.btn_share').on('tap', function(ev) {
        ev.stopPropagation();
        $('.tk').addClass('none');
        $('.tk-share').removeClass('none');
    });
    $(document).on('tap', function() {
        $('.tk-share').addClass('none')
    });
    var game = (function() {
        var $hook = $('.hook1>img'),
            $hook1 = $('.hook2>img'),
            btnLeft = $('.btn_left'),
            btnRight = $('.btn_right'),
            btnGo = $('.btn_go'),
            left = 35,
            left1 = 35,
            num = 6,
            ru1 = null,
            ru2 = null;

        function init() {
            btnLeft.on('touchstart', function(e) {
                e.stopPropagation();
                e.preventDefault();
              gamemusci();  
                left -= num;
                left1 -= num;
                $hook.css({
                    'left': left + '%'
                });
                $hook1.css({
                    'left': left1 + '%'
                });
                if (left <= -1) {
                    clearInterval(ru1);
                    left = 0;
                    left1 = 0;
                    $hook.css({
                        'left': left + '%'
                    });
                    $hook1.css({
                        'left': left1 + '%'
                    });
                }
            });
            btnLeft.on('touchend', function(e) {
               // sound.pause();
            });
            btnRight.on('touchstart', function(e) {
                e.stopPropagation();
                e.preventDefault();
                gamemusci(); 
                left += num;
                left1 += num;
                $hook.css({
                    'left': left + '%'
                });
                $hook1.css({
                    'left': left1 + '%'
                });
                if (left >= 71) {
                    clearInterval(ru2);
                    left = 70;
                    left1 = 70;
                    $hook.css({
                        'left': left + '%'
                    });
                    $hook1.css({
                        'left': left1 + '%'
                    });
                }
            });
            btnRight.on('touchend', function(e) {
                // sound.pause();
            });
            var isclick = false;
            btnGo.on('touchstart', function() {
                var encrypted = $('.encrypted').val();
                console.log('encrypted:' + encrypted);
               gamemusci(); 
                if (!isclick) {
                    isclick = true;
                    $hook1.css({
                        'top': 0
                    });
                    setTimeout(function() {
                        $('.gifts').css({
                            'top': '358px'
                        });
                    }, 400);
                    /*  setTimeout(function() {
                        $hook1.css({
                            'top': '-204px'
                        });
                        $('.gifts').css({
                            'top': '348px'
                        });
                        $hook1.attr({
                            'src': 'images/hook3.png'
                        });
                    }, 1200);*/
                    $.ajax({
                        url: 'index.php?mod=prize&ac=prize',
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            encrypted: encrypted
                        },
                        beforeSend: function() {
                           // $('.tk-load').removeClass('none');
                        },
                        success: function(data) {
                           // $('.tk-load').addClass('none');
                            if (data.result == true) {
                                setTimeout(function() {
                                    $hook1.attr({
                                        'src': 'images/hook3.png'
                                    });
                                    $hook1.css({
                                        'top': '-204px'
                                    });
                                    $('.gifts').css({
                                        'top': '348px'
                                    });
                                }, 1000);
                                if (data.pid == 1) {
                                    //100M省内流量
                                    setTimeout(function() {
                                        $('.tk,.liuliangfive').addClass('none');
                                        $('.tk-prize-liuliang,.liuliangone').removeClass('none');
                                    }, 2000);
                                } else if (data.pid == 2) {
                                    //500M省内流量
                                    setTimeout(function() {
                                        $('.tk,.liuliangone').addClass('none');
                                        $('.tk-prize-liuliang,.liuliangfive').removeClass('none');
                                    }, 2000);
                                } else if (data.pid == 3) {
                                    //30元联通话费
                                    setTimeout(function() {
                                        $('.tk').addClass('none');
                                        $('.tk-prize-huafei').removeClass('none');
                                    }, 2000);
                                } else if (data.pid == 4) {
                                    //唯品会优惠券
                                    setTimeout(function() {
                                        $('.tk').addClass('none');
                                        $('.tk-prize-wei').removeClass('none');
                                    }, 2000);
                                } else if (data.pid == 5) {
                                    //示爱靓号
                                    setTimeout(function() {
                                        $('.tk').addClass('none');
                                        $('.tk-prize-num').removeClass('none');
                                    }, 2000);
                                } else if (data.pid == 6) {
                                    //新学期办新卡
                                    setTimeout(function() {
                                        $('.tk').addClass('none');
                                        $('.tk-prize-study').removeClass('none');
                                    }, 2000);
                                } else if (data.pid == 7) {
                                    //生日号卡
                                    setTimeout(function() {
                                        $('.tk').addClass('none');
                                        $('.tk-prize-birthnum').removeClass('none');
                                    }, 2000);
                                } else if (data.pid == 8) {
                                    //上网卡
                                    setTimeout(function() {
                                        $('.tk').addClass('none');
                                        $('.tk-prize-birthnum').removeClass('none');
                                    }, 2000);
                                } else if (data.pid == 9) {
                                    //畅视卡
                                    setTimeout(function() {
                                        $('.tk').addClass('none');
                                        $('.tk-prize-vedio').removeClass('none');
                                    }, 2000);
                                } else if (data.pid == 10) {
                                    //冰激凌卡
                                    setTimeout(function() {
                                        $('.tk').addClass('none');
                                        $('.tk-prize-icecream').removeClass('none');
                                    }, 2000);
                                } else if (data.pid == 11) {
                                    //菁英王卡
                                    setTimeout(function() {
                                        $('.tk').addClass('none');
                                        $('.tk-prize-king').removeClass('none');
                                    }, 2000);
                                } else if (data.pid == 12) {
                                    //沃派卡
                                    setTimeout(function() {
                                        $('.tk').addClass('none');
                                        $('.tk-prize-woo').removeClass('none');
                                    }, 2000);
                                } else if (data.pid == 13) {
                                    //4g
                                    setTimeout(function() {
                                        $('.tk').addClass('none');
                                        $('.tk-prize-four').removeClass('none');
                                    }, 2000);
                                } else {
                                    alert('网络异常');
                                    var ran = Math.random();
                                    setTimeout(function() {
                                        window.location.href = "index.php?again" + ran;
                                    }, 3000)
                                }
                            } else {
                                setTimeout(function() {
                                    $hook1.attr({
                                        'src': 'images/hook3.png'
                                    });
                                    $hook1.css({
                                        'top': '-204px'
                                    });
                                    $('.gifts').css({
                                        'top': '348px'
                                    });
                                }, 800);
                                if (data.error == 1) {
                                    alert('参数不全');
                                    var ran = Math.random();
                                    setTimeout(function() {
                                        window.location.href = "index.php?again" + ran;
                                    }, 2000)
                                } else if (data.error == 2) {
                                    alert('请求超时');
                                    var ran = Math.random();
                                    setTimeout(function() {
                                        window.location.href = "index.php?again" + ran;
                                    }, 2000)
                                } else if (data.error == 404) {
                                    //未关注
                                    setTimeout(function() {
                                        $('.tk').addClass('none');
                                        $('.tk-tips').removeClass('none');
                                        $('.tk-tips').addClass('tk-tips-play')
                                    }, 500);
                                } else {
                                    alert('抱歉，未中奖');
                                    var ran = Math.random();
                                    setTimeout(function() {
                                        window.location.href = "index.php?again" + ran;
                                    }, 2000)
                                }
                            }
                        }
                    });
                }
            });
            btnGo.on('touchend', function(e) {
                 //sound.pause();
            });
        }
        return {
            init: init
        };
    })();
    //留资
    $('.tk-info .btn_sub').on('tap', function(ev) {
        ev.stopPropagation();
        var username = $('.tk-info .username').val();
        var tel = $('.tk-info .phone').val();
        if (username == '姓名：') {
            alert('请输入您的姓名!');
            return false;
        } else if (tel == '电话：' || !checkMobile(tel)) {
            alert('请输入正确的手机号码!');
            return false;
        } else {
            $.ajax({
                url: 'index.php?mod=prize&ac=info',
                type: 'POST',
                data: {
                    username: username,
                    phone: tel
                },
                dataType: 'json',
                beforeSend: function() {
                    $('.tk-load').removeClass('none');
                },
                success: function(data) {
                    $('.tk-load').addClass('none');
                    if (data.result == true) {
                        //alert('prizeType:' + prizeType);
                        switch (prizeType) {
                            case 'liu':
                                $('.tk').addClass('none');
                                $('.tk-liuliang-again').removeClass('none');
                                break;
                            case 'num':
                                $('.tk').addClass('none');
                                $('.tk-prize-step').removeClass('none');
                                break;
                            default:
                                alert('提交信息成功！');
                                var ran = Math.random();
                                setTimeout(function() {
                                    window.location.href = "main.html?again" + ran;
                                }, 500)
                        }
                    } else {
                        if (data.error == 1) {
                            alert('参数不全');
                            var ran = Math.random();
                            setTimeout(function() {
                                window.location.href = "main.html?again" + ran;
                            }, 500)
                        } else if (data.error == 2) {
                            alert('手机号格式不正确');
                            var ran = Math.random();
                            setTimeout(function() {
                                window.location.href = "main.html?again" + ran;
                            }, 500)
                        } else if (data.error == 3) {
                            alert('入库失败');
                            var ran = Math.random();
                            setTimeout(function() {
                                window.location.href = "main.html?again" + ran;
                            }, 500)
                        } else if (data.error == 4) {
                            alert('此手机号已中奖留资，建议更换手机号');
                            $('.phone,.username').val('');
                        } else if (data.error == 404) {
                            alert('非法请求');
                            var ran = Math.random();
                            setTimeout(function() {
                                window.location.href = "main.html?again" + ran;
                            }, 500)
                        }
                    }
                }
            })
        }
    });
    function gamemusci() {
        $(".soundbox").html("");
        var htm = document.createElement("audio");
        $(".soundbox").append(htm);
        htm.id = "sound";
        htm.src = "music/sound.mp3";
        var gamemusic = document.getElementById('sound');
        gamemusic.play();
        //ios兼容处理
        document.addEventListener("WeixinJSBridgeReady", function() {
            gamemusic.play();
        }, false);
    }
    var prizeType = '';
    //唯品会优惠券,靓号领取
    $('.tk-prize-wei .btn_take,.tk-prize-step .btn_lingqu,.tk-prize-couplenum .btn_link,.tk-prize-birthnum .btn_link,.tk-prize-vedio .btn_link,.tk-prize-icecream .btn_link,.tk-prize-king .btn_link,.tk-prize-four .btn_link,.tk-prize-woo .btn_link,.tk-prize-study .btn_link').on('tap', function(ev) {
        ev.stopPropagation();
        $('.tk').addClass('none');
        var href = $(this).attr('data-href');
        setTimeout(function() {
            window.location.href = href;
        }, 200)
    });
    //省内流量
    $('.tk-prize-liuliang .btn_take').on('tap', function(ev) {
        ev.stopPropagation();
        prizeType = 'liu';
        $('.tk').addClass('none');
        $('.tk-info').removeClass('none');
    });
    //30元联通话费
    $('.tk-prize-huafei .btn_take').on('tap', function(ev) {
        ev.stopPropagation();
        prizeType = 'huafei';
        $('.tk').addClass('none');
        $('.tk-info').removeClass('none');
    });
    //示爱靓号
    $('.tk-prize-num .btn_take').on('tap', function(ev) {
        ev.stopPropagation();
        prizeType = 'num';
        $('.tk').addClass('none');
        $('.tk-info').removeClass('none');
    });
    //再来一次
    $('.btn_again').on('tap', function(ev) {
        ev.stopPropagation();
        var ran = Math.random();
        setTimeout(function() {
            window.location.href = "main.html?again" + ran;
        }, 200)
    });

    function smallScreen() {
        var hei = parseInt($(window).height());
        document.title = hei
        if (hei < 1000) {
            $('.btns').css('transform', 'scale(0.8)').css('WebkitTransform', 'scale(0.8)');
            $('.btns').css('marginTop', '-10px');
            //滚动效果
            (function() {
                var box = document.querySelector('#box');
                var inner = box.querySelector('#inner');
                setScroll();

                function setScroll() {
                    mScroll({
                        el: box,
                        offBar: false
                    });
                }

                function mScroll(init) {
                    if (!init.el) {
                        return;
                    }
                    var wrap = init.el;
                    var inner = init.el.children[0];
                    var scrollBar = document.createElement("div");
                    var startPoint = 0;
                    var startEl = 0;
                    var lastY = 0;
                    var lastDis = 0;
                    var lastTime = 0;
                    var lastTimeDis = 0;
                    var isMove = true;
                    var isFirst = true;
                    var back = 0;
                    var maxTranslate = wrap.clientHeight - inner.offsetHeight;
                    scrollBar.id = "scrollBar";
                    if (!init.offBar) {
                        var scale = wrap.clientHeight / inner.offsetHeight;
                        inner.style.minHeight = "100%";
                        scrollBar.style.cssText = "width:4px;background:rgba(0,0,0,.5);position:absolute;right:0;top:0;border-radius:2px;opacity:0;transition:.3s opacity;";
                        wrap.appendChild(scrollBar);
                    }
                    css(inner, "translateZ", 0.01);
                    inner.addEventListener('touchstart', function(e) {
                        maxTranslate = wrap.clientHeight - inner.offsetHeight;
                        // console.log('clientHeight:'+wrap.clientHeight)
                        // console.log('offsetHeight:'+inner.offsetHeight)
                        // console.log('maxTranslate:'+maxTranslate)
                        if (!init.offBar) {
                            if (maxTranslate >= 0) {
                                scrollBar.style.display = "none";
                            } else {
                                scrollBar.style.display = "block";
                            }
                            scale = wrap.clientHeight / inner.offsetHeight;
                            scrollBar.style.height = wrap.clientHeight * scale + "px";
                        }
                        clearInterval(inner.timer);
                        startPoint = {
                            pageY: e.changedTouches[0].pageY,
                            pageX: e.changedTouches[0].pageX
                        };
                        startEl = css(inner, "translateY");
                        lastY = startEl;
                        lastTime = new Date().getTime();
                        lastTimeDis = lastDis = 0;
                        (init.offBar) || (scrollBar.style.opacity = 1);
                        init.start && init.start.call(box, e);
                        isMove = true;
                        isFirst = true;
                    });
                    inner.addEventListener('touchmove', function(e) {
                        if (!isMove) {
                            return;
                        }
                        var nowPoint = e.changedTouches[0];
                        var disX = nowPoint.pageX - startPoint.pageX;
                        var disY = nowPoint.pageY - startPoint.pageY;
                        if (isFirst) {
                            isFirst = false;
                            if (Math.abs(disY) < Math.abs(disX)) {
                                isMove = false;
                                return;
                            }
                        }
                        var nowTime = new Date().getTime();
                        //   var nowPoint = e.changedTouches[0].pageY;
                        var dis = nowPoint.pageY - startPoint.pageY;
                        var translateY = startEl + dis;
                        if (translateY > back) {
                            translateY = back
                        } else if (translateY < maxTranslate - back) {
                            translateY = maxTranslate - back;
                        }
                        css(inner, "translateY", translateY);
                        (init.offBar) || css(scrollBar, "translateY", -translateY * scale);
                        lastDis = translateY - lastY;
                        lastY = translateY;
                        lastTimeDis = nowTime - lastTime;
                        lastTime = nowTime;
                        init.move && init.move.call(box, e);
                    });
                    inner.addEventListener('touchend', function(e) {
                        var type = "easeOut";
                        var speed = Math.round(lastDis / lastTimeDis * 10);
                        speed = lastTimeDis <= 0 ? 0 : speed;
                        var target = Math.round(speed * 30 + css(inner, "translateY"));
                        if (target > 0) {
                            target = 0;
                            type = "backOut";
                        } else if (target < maxTranslate) {
                            target = maxTranslate;
                            type = "backOut";
                        }
                        MTween({
                            el: inner,
                            target: {
                                translateY: target
                            },
                            time: Math.round(Math.abs(target - css(inner, "translateY")) * 0.8),
                            type: type,
                            callBack: function() {
                                (init.offBar) || (scrollBar.style.opacity = 0);
                                init.over && init.over.call(box, e); //滚动结束监听
                            },
                            callIn: function() {
                                var translateY = css(inner, "translateY");
                                init.offBar || css(scrollBar, "translateY", -translateY * scale);
                                init.move && init.move.call(box, e); //并发执行 滚动监听
                            }
                        });
                        init.end && init.end.call(box, e);
                    });
                }
            })();
        }
    }

    function checkMobile(s) {
        if (s.length != 11) return false;
        var partten = /(^13\d{9}$)|(^14)[5,7]\d{8}$|(^15\d{9}$)|(^17\d{9}$)|(^18\d{9}$)/g;
        return partten.test(s);
    }
    document.addEventListener('touchmove', stopSlide, false);
    $('input,select').on('touchstart', function() { //释放默认事件
        document.removeEventListener('touchmove', stopSlide, false);
    }).on('touchend', function() {
        document.addEventListener('touchmove', stopSlide, false);
    });

    function stopSlide(e) { //阻止页面默认行为
        var e = window.event || e;
        e.stopPropagation();
        e.preventDefault();
    };
    /**安卓input输入 **/
    $(document).ready(function() {
        $('body').height($('body')[0].clientHeight);
    });
    if (/Android [4-6]/.test(navigator.appVersion)) {
        window.addEventListener("resize", function() {
            if (document.activeElement.tagName == "INPUT" || document.activeElement.tagName == "TEXTAREA") {
                window.setTimeout(function() {
                    document.activeElement.scrollIntoViewIfNeeded();
                }, 0);
            }
        })
    }
});