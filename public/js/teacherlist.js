define(["jquery","tempalte","bootstrap"],function ($,template) {
    //页面加载后就发送ajax，请求
    $.ajax({
        url:"/api/teacher",
        type:"get",
        dataType:"json",
        success:function (data) {
            if (data.code==200) {
                //渲染
                var html=template("teacherTpl",data);
                $("#teacherlistTbody").html(html);
                //为查看按钮添加事件
                $("#teacherlistTbody tr").find("a:eq(0)").click(function () {
                    var tc_id=$(this).closest("td").data("tcid");
                    $.ajax({
                        url:"/api/teacher/view",
                        type:"get",
                        data:{
                            tc_id:tc_id
                        },
                        dataType:"json",
                        success:function (data) {
                            console.log(data);
                            if(data.code==200){
                                //使用前将数据改变
                                data.result.tc_hometown=data.result.tc_hometown.replace(/\|/g," ");
                                //使用模板渲染
                                var html=template("teacherModelTpl",data.result);
                                $("#teacherlistModelTable").html(html);
                                //模态框弹出
                                $("#teacherModal").modal();
                            }
                        }
                    })
                });
                //为注销田间事件
                $("#teacherlistTbody tr").find("a:eq(2)").click(function () {
                    var tc_id=$(this).closest("td").data("tcid");
                    var tc_status=$(this).closest("td").data("status");
                    var that=this;
                    $.ajax({
                        url:"/api/teacher/handle",
                        type:"POST",
                        data:{
                            tc_id:tc_id,
                            tc_status:tc_status
                        },
                        dataType:"json",
                        success:function (data) {
                            if (data.result.tc_status == 1) {
                                $(that).html("注销");
                            }else {
                                $(that).html("启用");
                            }
                            $(that).closest("td").data("status",data.result.tc_status)
                        }
                    })
                });
            }
        }
    });
});
