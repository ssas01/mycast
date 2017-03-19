define(["jquery","echarts","cookie"],function ($,echarts) {
	//实现状态栏左边的效果
	$('.navs ul').prev('a').on('click', function () {
		$(this).next().slideToggle();
	});
	//实现检查登录状态，直接在地址栏跳过登录页面输入其他页面，可以通过检查sessionID的方式实现检查，具体名字可以登录的时候，检查请求文档
	var flag=$.cookie("PHPSESSID");
	var pathname=location.pathname;
	if (!flag && pathname.indexOf("login")==-1) {
		//重新定位到login页面
		location.href="/login";
	}
	//渲染登陆信息
	//从cookie中获取数据并使用
	var str=$.cookie("result");
	var obj=JSON.parse(str);
	$(".aside .profile img").attr("src",obj.tc_avatar);
	$(".aside .profile h4").html(obj.tc_name);

	//退出，除了login都有头部
	$("#logoutId").on("click",function () {
		//当点击的时候发送请求
		$.ajax({
			url:"/api/logout",
			type:"POST",
			success:function (data) {
				if (data.code==200) {
					location.href="/index/login";
				}
			}
		});
	})
})

