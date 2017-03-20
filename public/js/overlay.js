//为啥单独写一个，因为没当发送ajax请求，等待后台数据响应的时候可能需要改遮挡板的功能
define(["jquery","nprogress"],function ($,nprogress) {
    //遮罩层功能
    $(document).ajaxStart(function () {
        $(".overlay").show();
        console.log("start");
    });
    $(document).ajaxStop(function () {
        $(".overlay").hide();
        console.log("end");
    });
    //进度条功能
    nprogress.start();
    nprogress.done();
});

