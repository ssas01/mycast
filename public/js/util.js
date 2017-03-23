/**
 * Created by Administrator on 2017/3/19.
 */
define(["jquery"],function ($) {
    var util={};
    util.asideCss=function (pathname) {
        //传入地址，如果没有样式，就获取样式
        if (!pathname) {
            pathname=location.pathname;
        }
        //使用jquery中属性选择器，选择元素，添加样式
        $(".navs a[href='"+pathname+"']").addClass("active")
            .closest("ul").show();
    }
    util.sq=function (key) {
        var search=location.search;
        search=search.slice(1);
        var arr=search.split("&");
        var obj={};
        if(search) {
            for (var i=0;i<arr.length;i++) {
                var kv=arr[i].split("=");
                obj[kv[0]]=kv[1];
            }
        }
        return obj[key];
    }
    return util;
});