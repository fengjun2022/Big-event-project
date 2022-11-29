$(function () {


    let layer = layui.layer
    getUserInfo()
    $('#btnLogout').on('click', function () {
        //提示用户是否退出
        layer.confirm('退出账号?', { icon: 3, title: '提示' },
            function (index) {
                //do something
                localStorage.removeItem('token')
                location.href = `./login.html`
                layer.close(index);


            });
    })

})


//ajax接口
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {

            if (res.status !== 0) { return layui.layer.msg('获取用户信息失败，请重试！') }
            layui.layer.msg('获取成功！')
            returnderAvatar(res.data)
            //渲染用户函数接口
        },


    })


}
//渲染用户头像
function returnderAvatar(user) {
    //判断是否有头像，有头像渲染头像，没有头像渲染用户首字母
    let name = user.nickname || user.username
    $('#welcome').html('欢迎 ' + name)
    if (user.user_pic) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()

    } else {
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
        $('.layui-nav-img').hide()
    }

}
window.addEventListener('message', function (msg) {
    console.log(msg.data);
})