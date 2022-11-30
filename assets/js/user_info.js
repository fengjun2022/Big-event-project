$(function () {
    let form = layui.form
    form.verify({
        nickname: (value) => {
            if (value.length > 6) {
                return '昵称长度应该是1-6位之间'
            }
        }
    })
    initUserInfo()

    //重置表单数据

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
    //监听用户点击事件
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()

    })

    //监听表单提交事件
    $('.layui-form').on('submit', function (e) {
        console.log($(this).serialize());
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: form.val('formUserInfo'),
            success: function (res) {
                if (res.status !== 0) { return layer.msg('提交失败，请重试') }
                layer.msg('更新用户信息成功')
                console.log(window.parent);
                window.parent.getUserInfo()

            }


        })


    })

})
