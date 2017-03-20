/**
 * Created by Administrator on 2017/3/19.
 */
define(["jquery"],function ($) {
    var util={};
    util.asideCss=function () {
        //获取地址栏的路径
        var pathname=location.pathname;
        //使用jquery中属性选择器，选择元素，添加样式
        $(".navs a[href='"+pathname+"']").addClass("active");
    }
    return util;
});