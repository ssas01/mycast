/**
 * Created by Administrator on 2017/3/23.
 */
define(["jquery","template","js/util"],function ($,template,util) {
    //为侧边栏添加样式
    util.asideCss();
    //单击的时候，获取值，使用接口，成功之后，跳转页面
    $("#courseBulid").click(function () {
        var cs_name=$("#courseName").val();
        $.ajax({
            url:"/api/course/create",
            type:"post",
            data:{
                cs_name:cs_name
            },
            dataType:"json",
            success:function (data) {
                if (data.code == 200) {
                    var cs_id=data.result.cs_id;
                    location.href="/course/course_add_step1?cs_id="+cs_id;
                }
            }
        })
    });
});