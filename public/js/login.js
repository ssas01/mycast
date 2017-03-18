define(["jquery","cookie"],function ($) {
    //页面登陆，当单击登陆的是否，发送请求
    $("#itcastLoginForm").submit(function () {
        //页面中是submit按钮，会调用form的提交。因此阻止form的提交，使用ajax提交。
        var data=$(this).serialize();
        $.ajax({
            //按照参考文献发送请求
            url:"/api/login",
            type:"post",
            data:data,
            dataType:"json",
            success:function (data) {
                if (data.code==200) {
                    //需要的数据都存储在result中，使用JSON.stringfy将json对象化成字符串
                    var str=JSON.stringify(data.result);
                    //将字符串存储在cookie中
                    $.cookie('result', str, { expires: 7, path: '/' });

                    location.href="/index/index";

                }
            }
        });
        return false;
    });
})
