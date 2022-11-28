$(function () {
    let form = layui.form
    form.verify({
        nickname: () => {
            if (value.length > 6) {
                return '昵称长度应该是1-6位之间'
            }
        }
    })
    initUserInfo()


    let layer = layui.layer
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                console.log(res);
                form.val('formUserInfo', res.data)



            }
        })
    }
})