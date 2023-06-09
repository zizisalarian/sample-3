$(document).ready(function () {

    function setCookie(name, value, days) {
        var date, expires;
        if (days) {
            date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        } else {
            expires = "";
        }
        removeCookie(name);
        document.cookie = name + "=" + value + expires + "; path=/";
    }
    //  $('.topfooter').append('<div class="mtn_btn" id="Accessibility_toolbar" style="display: block;width: 100%;float: left;"><a class="ripple" >Accessibility Toolbar</a></div>')
    $("#Accessibility_toolbar").click(function () {
        $('#toolbar').removeClass('disable');
        $('#toolbar').show();
        setCookie("Toolbar", 'active', '30');
    })
    
    function CheckHeightCard() {
        if ($('.slick-slider').length > 0) {
            $(".slick-slider").slick('setPosition');
        }
    }
    $('.toolbar-icon').click(function () {
       // alert('1');
        if ($(this).closest('#toolbar').hasClass('open')) {
            $(this).closest('#toolbar').removeClass('open')
        } else {
        //    alert('2');
            $(this).closest('#toolbar').addClass('open')
        }
        $('.fontcolors').hide()
    })
    $('.closetoolbar').click(function () {
        $('.fontcolors').hide()
        $('#toolbar').removeClass('open')

    })
    
    $('.colorswp .close').click(function () {
        $('.colorswp').hide();
    })

    $('.icon-color').click(function () {
        $('.colorswp').show();
    })

    $('.fontcolors  p').append('<span style="float:left;"></span>')
    $('.fontcolors.links .colors a').click(function () {
        if (!$(this).hasClass("close")) {
            var Colorcode = $(this).css('backgroundColor')
            $('p a,div a,li a ,span a , h2 a , h3 a ,h4 a').css('color', Colorcode);
        }
    })

    $('.fontcolors.text .colors a').click(function () {
        if (!$(this).hasClass("close")) {
            var Colorcode = $(this).css('backgroundColor')
            $('body,table,ul,li,div,p,.tabtitle a,h1,h2,h3,h4,h5,h6,span').css('color', Colorcode)
        }
    })

    //easyview


    $.fn.easyView = function (option, value) {
        var selector = $(this.selector);
        if (typeof selector.data('easyView') == 'undefined') {
            /* First execution */
            if (typeof option == 'string') {
                option = {};
            }

            var plugin = {
                selector: selector,
                currentRatio: 100,
                normalContrast: true,
                defaults: {
                    container: 'body',
                    tags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'p', 'a', 'span', 'strong', 'em', 'ul', 'ol', 'li', 'section', 'table', 'tr', 'th', 'td'],
                    step: 10,
                    bootstrap: true,
                    // defaultMarkup: '<a href="#decrease" class="decrease-text">Decrease font size</a><a href="#normal" class="reset-text">Normal font size</a><a href="#increase" class="increase-text">Increase font size</a><a href="#contrast" class="contrast-text">Change contrast</a>',
                    increaseSelector: '.increase-text',
                    decreaseSelector: '.decrease-text',
                    normalSelector: '.reset-text',
                    contrastSelector: '.contrast-text'
                },
                options: {},
                affectedTags: new Array(),
                mergeOptions: function (option) {
                    $.extend(this.options, this.defaults, option)
                },
                storeDefaults: function () {
                    /* Store default values for each elements */
                    $.each(this.affectedTags, function (elIndex, elValue) {
                        $(elValue).each(function () {
                            var current_tag = $(this);
                            var font_size = current_tag.css('font-size');

                            var line_height = current_tag.css('line-height');
                            if (font_size.indexOf('%') > -1) {
                                /* Percentage */
                                current_tag.data('originalSize', parseInt(font_size.replace('%', '')));
                                current_tag.data('originalUnit', '%');
                                current_tag.data('originallineSize', parseInt(line_height.replace('%', '')));
                                current_tag.data('originallineUnit', '%');
                            } else {
                                /* Other units */
                                current_tag.data('originalSize', parseInt(font_size.replace(font_size.substr(-2), '')));
                                current_tag.data('originalUnit', font_size.substr(-2));
                                current_tag.data('originallineSize', parseInt(line_height.replace(line_height.substr(-2), '')));
                                current_tag.data('originallineUnit', line_height.substr(-2));
                            }

                            current_tag.data('originalBackground', current_tag.css('background-color'));
                            current_tag.data('originalColor', current_tag.css('color'));
                        });
                    });

                    /* Container default values */
                    $(this.options.container).data('originalBackground', $(this.options.container).css('background-color'));
                    $(this.options.container).data('originalColor', $(this.options.container).css('color'));
                },
                setActions: function () {
                    var self = this;
                    /* Decrease font size */
                    selector.find(this.options.decreaseSelector).click(function (ev) {
                        ev.preventDefault();
                        self.decreaseFont();
                    });

                    /* Reset font size */
                    selector.find(this.options.normalSelector).click(function (ev) {
                        ev.preventDefault();
                        self.resetFont();

                    });

                    /* Increase font size */
                    selector.find(this.options.increaseSelector).click(function (ev) {
                        ev.preventDefault();
                        self.increaseFont();
                    });

                    /* Change text contrast */
                    selector.find(this.options.contrastSelector).click(function (ev) {
                        ev.preventDefault();
                        self.changeContrast();
                    });
                },
                fetchTags: function () {
                    /* Fetching all tags to work */
                    var affectedTags = this.affectedTags;
                    var options = this.options;
                    $.each(this.options.tags, function (i, v) {
                        affectedTags.push(options.container + " " + v);
                    });
                },
                decreaseFont: function () {
                    if ((this.currentRatio - this.options.step) >= 10) {
                        this.currentRatio = this.currentRatio - this.options.step;
                    }
                    this.changeFontSize();
                },
                resetFont: function () {
                    /* Set default ratio */
                    this.currentRatio = 100;
                    this.changeFontSize();


                },
                increaseFont: function () {
                    this.currentRatio = this.currentRatio + this.options.step;

                    this.changeFontSize();
                    CheckHeightCard()
                },
                changeFontSize: function (ratio) {

                    if (typeof ratio != 'undefined' && parseInt(ratio) > 10) {
                        this.currentRatio = ratio;
                    }

                    var current_ratio = this.currentRatio;
                    //console.log( current_ratio )
                    if (current_ratio >= 80 && current_ratio <= 140) {
                        $('.toolbar-link.decrease-text').parent().removeClass('deactive');
                        $('.toolbar-link.increase-text').parent().removeClass('deactive');
                        $.each(this.affectedTags, function (elIndex, elValue) {
                            $(elValue).each(function () {
                                var current_tag = $(this);
                                current_tag.css('font-size', (current_tag.data('originalSize') * (current_ratio / 100)) + current_tag.data('originalUnit'));
                                if (!(current_tag.closest('header').length > 0 || current_tag.closest('.mobimenu').length > 0)) {
                                    //current_tag.css('line-height' ,'normal')
                                }
                            });
                        });
                    }
                    if (current_ratio >= 140) {
                        $('.toolbar-link.increase-text').parent().addClass('deactive');
                    }
                    if (current_ratio <= 80) {
                        $('.toolbar-link.decrease-text').parent().addClass('deactive');
                    }
                },
                changeContrast: function () {
                    var isNormalContrast = this.normalContrast;
                    $.each(this.affectedTags, function (elIndex, elValue) {
                        $(elValue).each(function () {
                            var current_tag = $(this);

                            if (!current_tag.hasClass('colors')) {
                                if (!current_tag.parent().hasClass('colors')) {
                                    if (!isNormalContrast) {
                                        current_tag.css('background-color', '');
                                        current_tag.css('color', '');
                                    } else {
                                        current_tag.css('background-color', '#000');
                                        current_tag.css('color', '#fff');
                                        if (current_tag.closest(".tabContent").length > 0) {
                                            current_tag.css('background-color', '#373737');

                                        }

                                    }
                                }
                            }
                            if (current_tag.closest("nav#toolbar").length > 0) {
                                current_tag.css('background-color', '');
                                current_tag.css('color', '');
                            }
                        });
                    });

                    $(this.options.container).css('background-color', (!isNormalContrast) ? $(this.options.container).data('originalBackground') : '#000');
                    $(this.options.container).css('color', (!isNormalContrast) ? $(this.options.container).data('originalColor') : '#fff');
                    this.normalContrast = !this.normalContrast;
                },
                startPlugin: function (option) {
                    this.mergeOptions(option);
                    this.fetchTags();
                    this.storeDefaults();
                    //  this.createDefaultMarkup();
                    this.setActions();
                },
                executeFunction: function (function_name, value) {
                    switch (function_name) {
                        case 'decrease':
                            this.decreaseFont();
                            break;
                        case 'reset':
                            this.resetFont();
                            break;
                        case 'increase':
                            this.increaseFont();
                            break;
                        case 'contrast':
                            if (typeof value != 'undefined') {
                                /* Change to specified value - true or false */
                                if (value) {
                                    /* Setting true, contrast will be applied */
                                    this.normalContrast = true;
                                } else {
                                    /* Setting false, will remove contrast */
                                    this.normalContrast = false;
                                }
                            }

                            this.changeContrast();
                            break;
                        case 'setRatio':
                            this.changeFontSize(ratio);
                            break;
                        default:
                            // alert("Called function does not exist!");
                            break;
                    }
                },
                destroy: function () {
                    /* Back all fonts to default size */
                    this.resetFont();

                    /* Remove contrast change */
                    this.normalContrast = false;
                    this.changeContrast();

                    /* Remove plugin data */
                    selector.removeData('easyView');
                }
            };

            plugin.startPlugin(option);

            /* Store plugin instance */
            selector.data('easyView', plugin);
        } else {
            /* Plugin is already initialized, execute existing function */
            var plugin = selector.data('easyView');
            if (typeof option == 'object') {
                /* Restart plugin */
                plugin.destroy();
                plugin.startPlugin(option);
            } else if (typeof option == 'string') {
                /* Execute specific function */
                plugin.executeFunction(option, value);
            } else {
                alert("Invalid params to start");
            }
        }
    }

    /////
    var currFFZoom = 1;
    var currIEZoom = 100;
    var zoomin = 0;
    var zoomout = 0;
    $('#zoom-in').on('click', function () {

        if ($('body[class*="zoomout"]').length > 0) {
            zoomout--; $('body')[0].className = $('body')[0].className.replace(/\zoomout.*?\b/g, '');
            $('body').addClass('zoomout' + zoomout);
            if (zoomout == '0') { $('body')[0].className = $('body')[0].className.replace(/\zoomout.*?\b/g, ''); }
        } else {
            $('body')[0].className = $('body')[0].className.replace(/\zoomin.*?\b/g, '');
            zoomin++;
            $('body').addClass('zoomin' + zoomin);
        }

        if ($.browser.mozilla) {

            var step = 0.04;
            if (currFFZoom < 1.08) {
                $('.toolbar-link.zoomout').parent().removeClass('deactive')
                currFFZoom += step;
            } else {
                $('.toolbar-link.zoomin').parent().addClass('deactive');
            }
            $('body').css('MozTransform', 'scale(' + currFFZoom + ')');
            $('body').css('-moz-transform-origin', 'center 0px');
            $(".slick-slider").slick('setPosition');

        }
        else {

            var step = 4;
            if (currIEZoom < 108) {
                $('.toolbar-link.zoomout').parent().removeClass('deactive')
                currIEZoom += step;
            } else {

                $('.toolbar-link.zoomin').parent().addClass('deactive');
            }
            $('body').css('zoom', ' ' + currIEZoom + '%');
            $(".slick-slider").slick('setPosition');

        }

    });

    $('#zoom-out').on('click', function () {

        if ($('body[class*="zoomin"]').length > 0) {
            zoomin--; $('body')[0].className = $('body')[0].className.replace(/\zoomin.*?\b/g, '');
            $('body').addClass('zoomin' + zoomin);
            if (zoomin == '0') { $('body')[0].className = $('body')[0].className.replace(/\zoomin.*?\b/g, ''); }
        } else {

            $('body')[0].className = $('body')[0].className.replace(/\zoomout.*?\b/g, '');
            zoomout++;
            $('body').addClass('zoomout' + zoomout);
        }

        if ($.browser.mozilla) {
            var step = 0.04;
            if (currFFZoom > 0.92) {
                $('.toolbar-link.zoomin').parent().removeClass('deactive')
                currFFZoom -= step;
            } else {

                $('.toolbar-link.zoomout').parent().addClass('deactive')
            }
            $('body').css('MozTransform', 'scale(' + currFFZoom + ')');
            $('body').css('-moz-transform-origin', 'center 0px');
            $(".slick-slider").slick('setPosition');
        }
        else {
            var step = 4;
            if (currIEZoom > 92) {
                $('.toolbar-link.zoomin').parent().removeClass('deactive')
                currIEZoom -= step;

            } else {
                $('.toolbar-link.zoomout').parent().addClass('deactive')
            }
            $('body').css('zoom', ' ' + currIEZoom + '%');
            $(".slick-slider").slick('setPosition');
        }

    });

    //////

    $('.toolbar-items').easyView({
        container: 'body',
        tags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'p', 'a', 'span', 'strong', 'em', 'ul', 'ol', 'li', 'table', 'td', 'tr', 'th', 'section'],
        step: 10,
        bootstrap: true,
        increaseSelector: '.increase-text',
        decreaseSelector: '.decrease-text',
        normalSelector: '.reset-text',
        contrastSelector: '.contrast-text'
    });


    $('.reset-text').click(function () {
        $('*').css('line-height', '_')
        $('#innerTab .slider-nav .slick-list ').height("-");
    })

    var Increase = 0;
    var IncreaseFont = 0;
    var DecreaseFont = 0;
    $('.increase-text').click(function (event) {
        event.stopImmediatePropagation();
        $('.decrease-text').removeClass('deactive')
        $(this).parent().addClass('on');
        Increase = Increase + 1;
        $(this).attr('cn', Increase)
        if (Increase == 0) {
            $('.deccrease-text').parent().removeClass('on');
            $(this).parent().removeClass('on');
        }

        if ($('body[class*="DecreaseFont"]').length > 0) {
            DecreaseFont--;
            $('body')[0].className = $('body')[0].className.replace(/\DecreaseFont.*?\b/g, '');
            $('body').addClass('DecreaseFont' + DecreaseFont);
            if (DecreaseFont == '0') { $('body')[0].className = $('body')[0].className.replace(/\DecreaseFont.*?\b/g, ''); }
        } else {
            $('body')[0].className = $('body')[0].className.replace(/\IncreaseFont.*?\b/g, '');
            IncreaseFont++;
            $('body').addClass('IncreaseFont' + IncreaseFont);
        }
    })

    $('.decrease-text').click(function (event) {
        event.stopImmediatePropagation();
        $('.increase-text').removeClass('deactive')
        $(this).parent().addClass('on');
        Increase = Increase - 1;
        $('.increase-text').attr('cn', Increase)
        //    $('#innerTab .slider-nav .slick-list ').height($('#innerTab .slider-nav .slick-track').height() - 2)
        if (Increase == 0) {
            $('.increase-text').parent().removeClass('on');
            $(this).parent().removeClass('on');

        }


        if ($('body[class*="IncreaseFont"]').length > 0) {
            IncreaseFont--; $('body')[0].className = $('body')[0].className.replace(/\IncreaseFont.*?\b/g, '');
            $('body').addClass('IncreaseFont' + IncreaseFont);
            if (IncreaseFont == '0') { $('body')[0].className = $('body')[0].className.replace(/\IncreaseFont.*?\b/g, ''); }
        } else {

            $('body')[0].className = $('body')[0].className.replace(/\DecreaseFont.*?\b/g, '');
            DecreaseFont++;
            $('body').addClass('DecreaseFont' + DecreaseFont);
        }


    })


    var LineHeight = 190;
    var Space = 1
    $('.linespacing').click(function () {
        $('body').addClass('textlinespacing')
        var step = 30;
        LineHeight += step;
        if (LineHeight < 190) {
            $(" * ").not(".tabtitle a").not('#nav-row *').css('line-height', LineHeight + "%")
        }
        Space++
        if (Space < 5) {
            $("*").css('word-spacing', Space + "px")
        }


        if (LineHeight >= 340) {
            $('.linespacing').parent().addClass('deactive');
        }
        CheckHeightCard();
    })
	
	
	
	
	
	    $('.unlinespacing').click(function () {
        $('body').addClass('textlinespacing')
        var step = 30;
        LineHeight -= step;
        if (LineHeight <= 140) {
            $(" * ").not(".tabtitle a").not('#nav-row *').css('line-height', LineHeight + "%")
        }
        Space--
		//alert(Space);
        if (Space >= 0) {
           $("*").css('word-spacing', Space + "px")
        }


        if (LineHeight >= 340) {
            $('.unlinespacing').parent().addClass('deactive');
        }
        CheckHeightCard();
    })


    $('.keyboardnav ').click(function (event) {

        if ($('body').hasClass('keyboard-nav')) {
            $('body').removeClass('keyboard-nav')
        } else {
            $('body').addClass('keyboard-nav')
        }

    })

    $('.contrast-text ').click(function () {

        if ($('body').hasClass('contrast')) {
            $('body').removeClass('contrast')
        } else {
            $('body').addClass('contrast')
        }

    })

    $('.fontcolors a.close').click(function () {

        $(this).parent().parent().hide()

    })


    /********reset**********/
    $(".rstbtn").click(function () {

        $('body').removeClass('gray').removeClass('invert')
        $('.toolbar-link.reset-text , body.contrast .contrast-text').click();

        //voice
        //  Stop();
        $('.toolbar-item').removeClass('on');
        $('.toolbar-item').removeClass('on');
        if ($.browser.mozilla) {
            $('body').css('MozTransform', 'scale(1)');
            //$(".slick-slider").slick('setPosition');
        }
        else {
            $('body').css('zoom', '100%');
           // $(".slick-slider").slick('setPosition');

        }
        LineHeight = 190;
        $("* ").not(".tabtitle a").css('line-height', "");
        $("*").css('word-spacing', "2px");
        $('.linespacing').parent().removeClass('deactive');
        $('body').removeClass()


    })

})

$(document).ready(function () {
    var KeyPress = 0
    function CheckShiftkey() {
        if (KeyPress == 0) {
            var dt = new Date();
            dttime = dt.getTime();
        }
        KeyPress++;
        if (KeyPress != "3") {
            var NewDate = new Date();
            var time2 = NewDate.getTime();
            var Counter = time2 - dttime;
            // console.log(Counter)
            if (Counter > 2000) {
                KeyPress = 0;
            }
        }

        if (KeyPress == "3") {
            var NewDate = new Date();
            var time2 = NewDate.getTime();
            var Counter = time2 - dttime;

            if (Counter < 4000) {
                if ($('#toolbar').hasClass('disable')) {
                    $('#toolbar').removeClass('disable');
                    $('#toolbar').show();
                    setCookie("Toolbar", 'active', '30');
                    $("#toolbar").addClass('open');

                } else {

                    $('#toolbar').addClass('disable');
                    $('#toolbar').hide();
                    removeCookie("Toolbar", 'active');

                }
            } else {
                KeyPress = 0;

            }

        }
    }

    $(document).keyup(function (event) {
        if (event.which == 16) {
            CheckShiftkey();
        } else {
            KeyPress = 0;

        }
    })

    // 37: "left",
    // 38: "up",
    // 39: "right",
    // 40: "down",

    // left: 37, up: 38, right: 39, down: 40,
    // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

    function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;
    }

    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }

    function disableScroll() {
        document.onkeydown = preventDefaultForScrollKeys;
    }

    function enableScroll() {
        document.onkeydown = null;
    }

    function openmenu() {

        var focused = $(':focus');
        if (focused.parent().hasClass('navitem')) {
            var t = focused.parent();
            Menu(t);
            disableScroll()
        }

        // if focuse not items of megamenu
        if (focused.closest('#mainMenu').length < 1) {

            enableScroll()
            $("#mainMenu div.sub-menu").removeClass("active");

            $('#mainMenu li.navitem').removeClass("active");
            $('#mainMenu li.navitem a').removeClass("active");
            $("#mainMenu ul.mainMenu div.sub-menu").stop(true, true).slideUp(400, function () {
                $("#secondaryNavBar .openmenu").slideUp(400, function () {
                    $("#secondaryNavBar").removeClass('active')
                });

            });

            var focused = $(':focus');
            if (focused.parent().hasClass('navitem')) {
                makeShort();

            }


        }

    }


    function closemenu() {

        $("#mainMenu div.sub-menu").removeClass("active");

        $('#mainMenu li.navitem').removeClass("active");
        $("#mainMenu ul.mainMenu div.sub-menu").stop(true, true).slideUp(400, function () {
            $("#secondaryNavBar .openmenu").slideUp(400, function () {
                $("#secondaryNavBar").removeClass('active')
            });

        });

        var focused = $(':focus');
        if (focused.parent().hasClass('navitem')) {
            makeShort();

        }
        enableScroll()
        $("#mainMenu li.navitem  a ").removeClass("active");
        $("#mainMenu li.navitem  a ").focusout();
        //  $('#mainMenu .navitem .sub-menu a').attr('tabindex', "-1");

    }


    $('#mainMenu .navitem ').each(function () {
        var i = 0;
        $(this).find('.sub-menu a').attr('tabindex', "-1");
        $(this).find('.sub-menu  a').each(function () {

            i++
            $(this).attr('index', i)

        })
        if ($(this).hasClass('item5')) {

            $(this).find('.sub-menu ul ul.main').addClass('col_menu')
        }


        else {


            $(this).find('.sub-menu ul').not('.main').children('.title').addClass('col_menu')

        }

    })

    $(document).keyup(function (event) {
        //esc
        if (event.which == 27) {

            closemenu();
            $('#mainMenu .navitem .sub-menu a').attr('tabindex', "-1");

        }

        //tab
        if (event.which == 9) {

            openmenu();
        }


    });


    var top_level_links = $("#mainMenu li.navitem a")

    $(top_level_links).keydown(function (event) {

        if (event.which == 37) {

            event.preventDefault();
            // This is the last item
            if ($(this).parent('li').next('li').length == 0) {
                $(this).parents('ul').find('> li').first().find('a').first().focus();
                openmenu();
            } else {
                $(this).parent('li').next('li').find('a').first().focus();

            }
            // openmenu();




        } else if (event.which == 38) {
            event.preventDefault();
            if ($(this).parent('li').find('ul').length > 0) {
                $(this).parent('li').find('ul')
                    .find('a').attr('tabIndex', 0)
                    .last().focus();

            }
            openmenu();
        } else if (event.which == 39) {
            event.preventDefault();
            // This is the first item
            if ($(this).parent('li').prev('li').length == 0) {
                $(this).parents('ul').find('> li').last().find('a').first().focus();
            } else {
                $(this).parent('li').prev('li').find('a').first().focus();
            }
            //	 openmenu();
        } else if (event.which == 40) {
            event.preventDefault();
            if ($(this).parent('li').find('ul').length > 0) {
                $(this).parent('li').find('ul')
                .find('a').attr('tabIndex', 0)
                    .first().focus();

            }
            openmenu();

        }

        else if (event.which == 13) {
            if ($(this).parent().hasClass('navitem')) {
                event.preventDefault();
                // console.log('test')
                openmenu();

            }


        }

    });


    var links = $(top_level_links).parent().find('  li  a');



    $(links).keydown(function (event) {
        if (event.which == 38) {
            event.preventDefault();
            // This is the first item

            var Index = $(this).attr('index');
            Index--;
            $(this).closest('li.navitem').find('a').each(function () {
                if ($(this).attr('index') == Index) { $(this).focus() };
            })


            if (Index == 0) { closemenu(); }

        } else if (event.which == 40) {
            event.preventDefault();

            var Index = $(this).attr('index');
            Index++;
            $(this).closest('li.navitem').find('a').each(function () {
                if ($(this).attr('index') == Index) { $(this).focus() };
            })



        }
        else if (event.which == 37) {
            event.preventDefault();


            if ($(this).closest('.col_menu').next('.col_menu').length != 0) {
                // console.log($(this).closest('.col_menu').prev('.col_menu').find('a').first().text())
                $(this).closest('.col_menu').next('.col_menu').find('a').first().focus()
            }


            else {
                $(this).closest('li.navitem').find('.sub-menu').find('a[index="1"]').focus();
            }


        }
        else if (event.which == 39) {
            event.preventDefault();
            if ($(this).closest('.col_menu').prev('.col_menu').length != 0) {
                //  console.log($(this).closest('.col_menu').prev('.col_menu').find('a').first().text())
                $(this).closest('.col_menu').prev('.col_menu').find('a').first().focus()
            }


            else {
                $(this).closest('li.navitem ').find('.sub-menu').find('a[index="1"]').focus();
            }

        }
    });



    ///keyboard on login
    $(document).keyup(function (event) {

        var focused = $(':focus')

        if (event.which == 9) {
            //  event.preventDefault();
            if (focused.closest('.login').length > 0) {
                $(".login .menu .submenu").css({
                    opacity: "1",
                    top: "44px",
                    visibility: "visible"


                })
            }

            else {

                $(".login .menu .submenu").removeAttr('style')
            }

            ///
            if (focused.closest('#toolbar').length > 0) {
                $('#toolbar').addClass('open');
            }


        }
        if (event.which == 27) {


            if (focused.closest('#toolbar').length > 0) {
                $('#toolbar').removeClass('open');
            }
        }


    })


});








(function ($) {
	"use strict";
	$(document).ready(function(){
        $(".ivo-color-1").click(function(){
            $("body").addClass("ivo-color-1").removeClass("ivo-color-2 ivo-color-3 ivo-color-4 ivo-color-5 ivo-color-6");
        });
        $(".ivo-color-2").click(function(){
            $("body").addClass("ivo-color-2").removeClass("ivo-color-1 ivo-color-3 ivo-color-4 ivo-color-5 ivo-color-6");
        });
        $(".ivo-color-3").click(function(){
            $("body").addClass("ivo-color-3").removeClass("ivo-color-1 ivo-color-2 ivo-color-4 ivo-color-5 ivo-color-6");
            document.getElementById("logo-img-header").src = "./imgs/headernewgreen.png"
            $("body").removeClass("contrast")
        });	
        $(".ivo-color-4").click(function(){
            $("body").addClass("ivo-color-4").removeClass("ivo-color-1 ivo-color-2 ivo-color-3 ivo-color-5 ivo-color-6");
            document.getElementById("logo-img-header").src = "./imgs/headernewblue.png"
            $("body").removeClass("contrast")
            
        });
        $(".ivo-color-5").click(function(){
            $("body").addClass("ivo-color-5").removeClass("ivo-color-1 ivo-color-2 ivo-color-3  ");
            document.getElementById("logo-img-header").src = "./imgs/headernewred.png"
            $("body").removeClass("contrast")
            
        });
        $(".default").click(function(){
            $("body").addClass("ivo-color-4").removeClass("ivo-color-1 ivo-color-2 ivo-color-3 ivo-color-5 ivo-color-6");
        document.getElementById("logo-img-header").src = "imgs/headernewblue.png"
        $("body").removeClass("contrast")
        });
        
        // $(".ivo-color-5").click(function(){
        //     $("body").addClass("ivo-color-5").removeClass("ivo-color-1 ivo-color-2 ivo-color-3 ivo-color-4 ivo-color-6");
        // });
        
        $(".ivo-color-6").click(function(){
            $("body").addClass("ivo-color-6").removeClass("ivo-color-1 ivo-color-2 ivo-color-3 ivo-color-4 ivo-color-5");
        });
	});

}(jQuery));	


