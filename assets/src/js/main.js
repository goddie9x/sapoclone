$(function() {
    var offT = $('.income').outerHeight();
    $('.arrow-down').on('click', function() {
        var dataH = $(this).data('href');
        $('html, body').animate({
            scrollTop: $(dataH).offset().top
        }, 500);
    });
    var wS = $(document);
    if (wS.scrollTop() >= offT && wS.scrollTop() < $('.register-bottom').offset().top) {
        $('.menu-fixed').show();
    } else {
        $('.menu-fixed').hide();
    }
    $('.menu-fixed ul li a:not(.open-popup)').on('click', function() {
        $(document).off("scroll");
        var a = $(this),
            b = a.attr('data-item'),
            c = $(b).offset().top;
        $('.menu-fixed ul li a:not(.open-popup)').removeClass('active');
        a.addClass('active');
        $('html, body').animate({
            scrollTop: c
        }, 500, 'swing', function() {
            $(document).on("scroll", onScroll);
        });
    });
    onScroll();
    $(document).on("scroll", onScroll);

    function onScroll() {
        if (wS.scrollTop() >= offT && wS.scrollTop() < $('.register-bottom').offset().top) {
            $('.menu-fixed').show();
        } else {
            $('.menu-fixed').hide();
        }
        $('.menu-fixed ul li a:not(.open-popup)').each(function() {
            var a = $(this),
                b = a.attr('data-item'),
                c = $(b).offset().top;
            if (wS.scrollTop() >= c && wS.scrollTop() < c + $(b).outerHeight()) {
                a.addClass('active');
            } else {
                a.removeClass('active');
            }
        });
    }


    $(document).on("click", ".open-popup-lead", function() {
        loadLeadPopup();
    });
    var swiper = new Swiper('.introduce .take .swiper-container', {
        slidesPerView: 4,
        spaceBetween: 30,
        autoplay: 8000,
        autoplayDisableOnInteraction: false,
        pagination: false,
        loop: false,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            1: {
                slidesPerView: 1
            },
            575: {
                slidesPerView: 1
            },
            991: {
                slidesPerView: 2
            }
        }
    });
});


function loadPublisherSuccess(type) {
    $('.modal-register').html('');
    $('#myModal-tuvan').modal('hide');
    $('#modalRegisterSuccess').html(data);
    if (type == 1) {
        $('#modalRegisterSuccess b.email').html(publisherEmail);
    } else {
        $('#modalRegisterSuccess span.note').hide();
    }
    setTimeout(function() {
        $('#modalRegisterSuccess').modal('show');
    }, 1000);
    $('#modalRegisterSuccess .close-btn').click(function() {
        $('#modalRegisterSuccess').modal('hide');
    });
}

function submitPublisher() {
    var $form = $('form#register-publisher');
    var type = $("#myModal-tuvan #rbt-have-bizweb").val();
    if (type == 1) {
        if ($form.find('#PublisherWebsite').val() == '' || $form.find('#PublisherWebsite').val() == null) {
            $form.find('span.field-validation-valid[data-valmsg-for="PublisherWebsite"]').html('Nh???p v??o t??n mi???n c???a b???n');
            return;
        }
        $form.find('span.field-validation-valid[data-valmsg-for="PublisherWebsite"]').html('');
    } else {
        var validate = false;
        if ($form.find('#PublisherEmail').val() != '') {
            $form.find('span.field-validation-valid[data-valmsg-for="PublisherEmail"]').html('');
            if ($form.find('#PublisherEmail').val().match(mailformat)) {
                $form.find('span.field-validation-valid[data-valmsg-for="PublisherEmail"]').html('');
            } else {
                $form.find('span.field-validation-valid[data-valmsg-for="PublisherEmail"]').html("Sai ?????nh d???ng email")
                validate = true;
            }
        } else {
            $form.find('span.field-validation-valid[data-valmsg-for="PublisherEmail"]').html('Nh???p v??o email c???a b???n');
            validate = true;
        }
        if ($form.find('#PublisherName').val() != '') {
            $form.find('span.field-validation-valid[data-valmsg-for="PublisherName"]').html('');
        } else {
            $form.find('span.field-validation-valid[data-valmsg-for="PublisherName"]').html('Nh???p v??o h??? t??n c???a b???n');
            validate = true;
        }
        if ($form.find('#PublisherPhone').val() != '') {
            $form.find('span.field-validation-valid[data-valmsg-for="PublisherPhone"]').html('');
        } else {
            $form.find('span.field-validation-valid[data-valmsg-for="PublisherPhone"]').html('Nh???p v??o s??? ??i???n tho???i c???a b???n');
            validate = true;
        }
        if (validate) return;
        $.post($form.attr('action'), $form.serialize(), function(data, status) {
            if (status == 'success') {
                if (data.status == "Ok") {
                    publisherEmail = $form.find('#PublisherEmail').val();
                    loadPublisherSuccess(2);
                } else if (data.status == 3) {
                    loadViewPopupFail(1);
                } else {
                    loadViewPopupFail(3);
                }
            }
        });
    }
}

function loadLeadPopup() {
    $('#modalRegisterSuccess').modal('hide');
    $('.modal-register').html('');
    $('#myModal-tuvan').html(data);
    $('#myModal-tuvan #PublisherEmail').val(publisherEmail);
    $('#myModal-tuvan #LeadPhone').val($('input[name="customerPhone"]').val());
    setTimeout(function() {
        $('#myModal-tuvan').modal('show');
    }, 1000);
    $('#myModal-tuvan .close-btn').click(function() {
        $('#myModal-tuvan').modal('hide');
    });
}

function submitLead() {
    var validate = false;
    var $form = $('form#register-lead');
    if ($form.find('#LeadEmail').val() != '') {
        $form.find('span.field-validation-valid[data-valmsg-for="LeadName"]').html('');
        if ($form.find('#LeadEmail').val().match(mailformat)) {
            $form.find('span.field-validation-valid[data-valmsg-for="LeadEmail"]').html('');
        } else {
            $form.find('span.field-validation-valid[data-valmsg-for="LeadEmail"]').html("Sai ?????nh d???ng email")
            validate = true;
        }
    }
    if ($form.find('#LeadName').val() != '') {
        $form.find('span.field-validation-valid[data-valmsg-for="LeadName"]').html('');
    } else {
        $form.find('span.field-validation-valid[data-valmsg-for="LeadName"]').html('Nh???p v??o h??? t??n ng?????i ???????c gi???i thi???u');
        validate = true;
    }
    if ($form.find('#LeadPhone').val() != '') {
        $form.find('span.field-validation-valid[data-valmsg-for="LeadPhone"]').html('');
    } else {
        $form.find('span.field-validation-valid[data-valmsg-for="LeadPhone"]').html('Nh???p v??o s??? ??i???n tho???i ng?????i ???????c gi???i thi???u');
        validate = true;
    }
    if (validate) return;
    $.post($form.attr('action'), $form.serialize(), function(data, status) {
        if (status == 'success') {
            console.log(data.status);
            if (data.status == "Ok") {
                loadLeadSuccess();
            } else {
                loadViewPopupFail(3);
            }
        }
    });
}

function loadLeadSuccess() {
    $('.modal-register').html('');
    $('#myModal-tuvan').modal('hide');
    $('#modalRegisterSuccess').html(data);
    setTimeout(function() {
        $('#modalRegisterSuccess').modal('show');
    }, 1000);
    $('#modalRegisterSuccess .close-btn').click(function() {
        $('#modalRegisterSuccess').modal('hide');
    });
}

function loadViewPopupFail(type) {
    $('.modal-register').html('');
    $('#myModal-tuvan').modal('hide');
    $('#modalRegisterFail').html(data);
    if (type == 1) {
        $('#modalRegisterFail .affiliate-form-fail p').html("?????a ch??? email c???a b???n ???? t???n t???i <br /> Vui l??ng ????ng nh???p t??i kho???n ????? gi???i thi???u kh??ch h??ng");
    } else if (type == 2) {
        $('#modalRegisterFail .affiliate-form-fail p').html("T??n mi???n c???a b???n ???? ???????c d??ng ????? t???o t??i kho???n <br /> Vui l??ng ????ng nh???p t??i kho???n ????? gi???i thi???u kh??ch h??ng");
    } else {
        $('#modalRegisterFail .affiliate-form-fail p').hide();
        $('#modalRegisterFail .affiliate-form-fail h2').html("C?? l???i x???y ra! <br /> Vui l??ng th??? l???i!");
    }
    setTimeout(function() {
        $('#modalRegisterFail').modal('show');
    }, 1000);
}

$(function() {
    var checkHide = sessionStorage.getItem("hide_banner");
    if (checkHide == null) {
        $(".Tam-advertiser").show();
    }
    $(".Tam-advertiser .popup-adv .hide-popup").click(function() {
        $(".Tam-advertiser").hide();
        sessionStorage.setItem("hide_banner", "true");
    });
});

var images = document.querySelectorAll('source, img');
if ('IntersectionObserver' in window) {
    var onChange = function onChange(changes, observer) {
        changes.forEach(function(change) {
            if (change.intersectionRatio > 0) {
                loadImage(change.target);
                observer.unobserve(change.target);
            }
        });
    };
    var config = {
        root: null,
        threshold: 0.1
    };
    var observer = new IntersectionObserver(onChange, config);
    images.forEach(function(img) {
        return observer.observe(img);
    });
} else {
    images.forEach(function(image) {
        return loadImage(image);
    });
}

function loadImage(image) {
    image.classList.add('fade', 'show');
    if (image.dataset && image.dataset.src) {
        image.src = image.dataset.src;
    }
    if (image.dataset && image.dataset.srcset) {
        image.srcset = image.dataset.srcset;
    }
}
$(function() {
    $(window).scroll(function() {
        if ($(window).scrollTop() > 700) {
            $('.scroll-top').show();
        } else {
            $('.scroll-top').hide();
        }
    });
    $('.scroll-top').click(function() {
        $("html, body").animate({
            scrollTop: 0
        }, "slow");
    });
    if ($(window).width() < 768) {
        $('.scroll-top').css({
            'bottom': '90px',
            'right': '8px'
        });
    }
});
var __lc = {};
__lc.license = 13015365;

$(function() {
    setTimeout(function() {
        (function() {
            var lc = document.createElement('script');
            lc.type = 'text/javascript';
            lc.async = true;
            lc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.livechatinc.com/tracking.js';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(lc, s);
        })();
    }, 3000);
});

function openMenu() {
    $('body').css('overflow', 'hidden');
    $('.overlay-menu').fadeIn(300);
    $('.menu-mobile').addClass('show');
}

function closeMenu() {
    $('body').css('overflow', '');
    $('.overlay-menu').fadeOut(300);
    $('.menu-mobile').removeClass('show');
}
$(function() {});