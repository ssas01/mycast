/**
 * Created by Administrator on 2017/3/21.
 */
define(["jquery","template","js/util","bootstrap","datepicker","language","validate","formsend"],function ($,template,util) {
    /*
    * js逻辑分析
    * 修改老师，有id，添加老师没有
    *
    * */
    //判断tc_id
    var tc_id=util.sq("tc_id");
    if (tc_id) {
        //如果有就是修改讲师
        $.ajax({
            url:"/api/teacher/edit",
            type:"GET",
            data:{
                tc_id:tc_id
            },
            dataType:"json",
            success:function (data) {
                //data修改一下，改变面包屑
                if (data.code==200){
                    data.result.pageName="修改讲师";
                    var htmlStr=template("teacherAddTpl",data.result);
                    $("#teacheraddForm").html(htmlStr);
                }
                //当页面加载完毕，在绑定事件
                $('#joinDate').datepicker({
                    format : 'yyyy-mm-dd',
                    language:'zh-CN',
                    endDate : '0d'
                });
                //当点击添加的时候，保存
                checkForm("/api/teacher/update");
            }
        });
    }else {
        //没有就是添加讲师
        var htmlStr=template("teacherAddTpl",{
            //传进去默认选项
            pageName:"添加讲师",
            tc_type:1
        });

        // console.log(htmlStr);
        $("#teacheraddForm").html(htmlStr);
        //当点击添加的时候，检查并且保存
        checkForm("/api/teacher/add");
    }
    function checkForm(url){

        $("#teacheraddFormId").validate({
            //不使用表单提交
            sendForm:false,
            valid:function () {
                //每个都通过检验时，没有检验默认通过
                $(this).ajaxSubmit({
                    //使用这个的好处：不用显式发送数据，有name的就会发送，如果显式写了数据么就是除了表单之外的其他数据
                    url:url,
                    type:"post",
                    dataType : 'json',
                    success:function (data) {
                        console.log(data);
                        if (data.code==200) {
                            //当提交数据成功的时候，跳转页面
                            location.href = '/teacher/teacher_list';
                        }
                    }
                });
            },
            //每一个是否通过都会经过下面的检验
            eachInvalidField:function () {
                $(this).closest(".form-group").removeClass("has-success").addClass("has-error");
            },
            eachValidField:function () {
                $(this).closest(".form-group").removeClass("has-error").addClass("has-success");
            },
            //自定义提示信息
            description:{
                //先分成每个提示信息的对象，在分提示信息的种类
                tcname:{
                    //提示信息分成四种： required pattern conditional valid
                    required:"请输入姓名"
                },
                tcpass: {
                    required:"请输入密码",
                    pattern:"密码格式不对!"
                },
                tcjoin:{
                    required:"请选择日期"
                }

            }
        });
    }
});