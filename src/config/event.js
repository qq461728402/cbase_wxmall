/**
 * Created by dx on 18/2/27.
 */
function $id(id) {
  return document.getElementById(id);
}
function bindEvent() {
  var sea = $id("my_search");
  /*banner对象*/
  var banner = $id("my_banner");
  /*高度*/
  var height = banner.offsetHeight?banner.offsetHeight:0;
  document.getElementById("scrollView").addEventListener('scroll',()=>{
    height = banner.offsetHeight;
    var top = document.getElementById("scrollView").scrollTop;
    if(top==0) {
      sea.style.background = "rgba(212,29,15,0)";
    }
    /*当滚动高度大于banner的高度时候颜色不变*/
    if (top > height) {
      sea.style.background = "rgba(212,29,15,0.85)";
    } else {
      var op = top / height * 0.85;
      sea.style.background = "rgba(201,21,35," + op + ")";
    }
  });
}

module.exports = {
  bindEvent
}
