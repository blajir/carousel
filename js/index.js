/* global jQuery, setInterval, setTimeout, clearInterval */

// JavaScript Document
// UTF-8

(function ($) {
  'use strict';
  $.fn.slide = function (params) {
    // デフォルト値
    var defs = {
      speed: 800,
      button: true,
      pager: true
    };

    // 渡されたオプションとデフォルト値をマージ
    var config = $.extend({}, defs, params);

    // 要素を退避
    var element = this;

    var slideSpeed = config.speed;
    var pageCurrent = 0;
    var MAX_LENGTH = $(this).find('li').length;
    var MAX_WIDTH = 0;
    var MAX_HEIGHT = 0;
    var slideTimer;

    // 最大画像サイズをelemntに代入
    function imageWidth () {
      // 最も大きい画像の高さと横幅を取得
      for (var i = 0; i < MAX_LENGTH; i++) {
        var width = element.find('li').eq(i).outerWidth();
        var height = element.find('li').eq(i).outerHeight();
        if (width >= MAX_WIDTH) {
          MAX_WIDTH = width;
        }
        if (height >= MAX_HEIGHT) {
          MAX_HEIGHT = height;
        }
      }
      // .slideに最大横幅と最大高さを代入
      element.css({
        'width': MAX_WIDTH,
        'height': MAX_HEIGHT
      });
    }

    // ボタンセット関数
    function button () {
      if (config.button) {
        element.prepend('<button class="button-prev"></button>');
        element.append('<button class="button-next"></button>');
      }
      // 次の画像ボタンをクリック
      var $buttonNext = $('.button-next');
      var $buttonPrev = $('.button-prev');
      $buttonNext.on('click', function () {
        stopTimer();
        slide(pageCurrent);
        slider(pageCurrent);
      });
      $buttonPrev.on('click', function () {
        stopTimer();
        slidePrev(pageCurrent);
      });
    }

    // ページャーセット関数
    function pager () {
      if (config.pager) {
        var pagerTemplate = '<ul class="pager"><li class="is-current"></li>';
        for (var i = 1; i < MAX_LENGTH; i++) {
          pagerTemplate += '<li></li>';
        }
        pagerTemplate += '</ul>';
        element.append(pagerTemplate);
      }
    }

    // スライダー関数
    function slide (number) {
      $('button').prop('disabled', true);
      // 次のスライドを取得
      var pageNext = number + 1;

      // 現在位置が最後のスライドの場合
      if (pageNext >= MAX_LENGTH) {
        pageNext = 0;
      }
      var now = element.find('li').eq(number);
      var next = element.find('li').eq(pageNext);

      // 次の画像をスライドする準備
      next.css({
        'display': 'block',
        'transform': 'translate3d(100%, 0%, 0px)'
      });

      // 画像をスライドする
      setTimeout(function () {
        now.css({
          'transform': 'translate3d(-100%, 0%, 0px)'
        });
        next.css({
          'transform': 'translate3d(0%, 0%, 0px)'
        });
      }, 800);
      setTimeout(function () {
        now.css({
          'display': 'none'
        });
        $('button').prop('disabled', false);
      }, 1800);

      // 次のスライドをセット
      pageCurrent += 1;

      // 現在位置が最後のスライドの場合
      if (pageCurrent >= MAX_LENGTH) {
        pageCurrent = 0;
      }
    }

    // スライダープレビュー関数
    function slidePrev (number) {
      $('button').prop('disabled', true);
      // 次のスライドを取得
      var pagePrev = number - 1;

      // 現在位置が最後のスライドの場合
      if (pagePrev < 0) {
        pagePrev = MAX_LENGTH - 1;
      }
      var now = element.find('li').eq(number);
      var next = element.find('li').eq(pagePrev);

      // 次の画像をスライドする準備
      next.css({
        'display': 'block',
        'transform': 'translate3d(-100%, 0%, 0px)'
      });

      // 画像をスライドする
      setTimeout(function () {
        now.css({
          'transform': 'translate3d(100%, 0%, 0px)'
        });
        next.css({
          'transform': 'translate3d(0%, 0%, 0px)'
        });
      }, 800);
      setTimeout(function () {
        now.css({
          'display': 'none'
        });
        $('button').prop('disabled', false);
      }, 1800);

      // 現在のスライドを更新
      pageCurrent = pagePrev;

      // 現在位置が最後のスライドの場合
      if (pageCurrent >= MAX_LENGTH) {
        pageCurrent = 0;
      }
      slider(pageCurrent);
    }

    // スライドタイマー関数
    function slider (number) {
      slideTimer = setInterval(function () {
        slide(pageCurrent);
      }, slideSpeed);
    }

    // スライドタイマー停止関数
    function stopTimer () {
      clearInterval(slideTimer);
    }

    // スライダーを実行
    (function init () {
      slider(pageCurrent);
      button();
      pager();
      imageWidth();
    }());

    // 要素を返す
    return this;
  };
}(jQuery));
