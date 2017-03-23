/**
 * Created by Administrator on 2017/3/23.
 */
define(["jquery","template","js/util","ckeditor","validate","formsend"],function ($,template,util,CKEDITOR) {
    //侧边栏的效果
    util.asideCss("/course/course_add");
    //当页面加载的时候，发送ajax请求获取数据之后，进行处理
    var cs_id=util.sq("cs_id");
    $.ajax({
        url:"/api/course/basic",
        type:"get",
        data:{
            cs_id:cs_id
        },
        dataType:"json",
        success:function (data) {
            //使用获取数据渲染引擎，比如已经有的
            var htmlStr=template("stepsTpl",data.result);
            $("#stepsInfo").html(htmlStr);
            //使用富文本
            CKEDITOR.replace("ckeditor",{
                toolbarGroups:[
                    { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] }
                ]
            });
            //当分类的第一项改变的时候，发送请求
            $("#classifyParent").on("change",function () {
                //当改变的时候，发送请求，该请求需要参数
                var cg_id=$(this).val();
                $.ajax({
                    url:"/api/category/child",
                    type:"get",
                    data:{
                        cg_id:cg_id
                    },
                    dataType:"json",
                    success:function (data) {
                        var str='{{each list as item}} ' +
                            '<option value="{{item.cg_id}}">{{item.cg_name}}</option>' +
                            '{{/each}}'
                        var render=template.compile(str);
                        var htmlStr=render({list:data.result});
                        //根据获取的数据填充二级区域
                        $("#classifyChild").html(htmlStr);
                    }
                })
            });
            //表单的验证和发送---submit
            $("#courseAddForm01").validate({
                onKeyup:true,
                sendForm:false,
                valid:function () {
                    //当都通过验证的时候，发送请求
                    $(this).ajaxSubmit({
                        url:"/api/course/update/basic",
                        type:"POST",
                        dataType:"json",
                        success:function (data) {
                            if (data.code == 200) {
                                location.href="/course/course_add_step2?cs_id="+cs_id;
                            }
                        }
                    })
                   
                },
                eachInvalidField:function () {
                    //每个需要被检查的
                    $(this).closest(".form-group").removeClass("has-success").addClass("has-error");
                },
                eachValidField:function () {
                    $(this).closest(".form-group").removeClass("has-error").addClass("has-success");
                }
            });
        }
    })
});