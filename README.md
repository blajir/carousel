# carousel
シンプルなカルーセルのプラグイン

## 概要
自動スライドするカルーセル用のプラグインです。

## 使い方
### HTML
    <div class="slide">
      <ul class="slide-inner">
        <li class="current">
          ...
        </li>
        <li>
          ...
        </li>
        <li>
          ...
        </li>
      </ul>
    </div>

  
### script
    $('.slide').slide({ //対象のDOM
      speed: '5000',
      button: true,
      pager: true
    });

対象のDOM要素に対して、実行します。
## 必要とするもの
・jQuery 1.7以上
## プラグインオプション
```speed: 800 ```

カルーセルが切り替わる速度。デフォルト値は800
***

```button: 'true' ```

カルーセルを切り替える矢印ボタンの表示。デフォルト値は'true'
***

```pager: true ```

カルーセルの現在位置を表すページャーの表示。デフォルト値は'true'
※ページャークリックは調整中
***
```pager: true ```

## デモページ
[基本サンプル](https://blajir.github.io/carousel/)
