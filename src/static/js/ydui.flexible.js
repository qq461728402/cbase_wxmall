/**
 * YDUI 鍙几缂╁竷灞�鏂规
 * rem璁＄畻鏂瑰紡锛氳璁″浘灏哄px / 100 = 瀹為檯rem  渚�: 100px = 1rem
 */
!function (window) {

  /* 璁捐鍥炬枃妗ｅ搴� */
  var docWidth = 750;

  var doc = window.document,
    docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

  var recalc = (function refreshRem () {
    var clientWidth = docEl.getBoundingClientRect().width;

    /* 8.55锛氬皬浜�320px涓嶅啀缂╁皬锛�11.2锛氬ぇ浜�420px涓嶅啀鏀惧ぇ */
    docEl.style.fontSize = Math.max(Math.min(20 * (clientWidth / docWidth), 11.2), 8.55) * 5 + 'px';

    return refreshRem;
  })();

  /* 娣诲姞鍊嶅睆鏍囪瘑锛屽畨鍗撳�嶅睆涓�1 */
  docEl.setAttribute('data-dpr', window.navigator.appVersion.match(/iphone/gi) ? window.devicePixelRatio : 1);

  if (/iP(hone|od|ad)/.test(window.navigator.userAgent)) {
    /* 娣诲姞IOS鏍囪瘑 */
    doc.documentElement.classList.add('ios');
    /* IOS8浠ヤ笂缁檋tml娣诲姞hairline鏍峰紡锛屼互渚跨壒娈婂鐞� */
    if (parseInt(window.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1], 10) >= 8)
      doc.documentElement.classList.add('hairline');
  }

  if (!doc.addEventListener) return;
  window.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);

}(window);
