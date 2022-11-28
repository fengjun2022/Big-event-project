$(function () {
    // login立即执行函数
    // 注册与正则
    (function () {
        // 点击切换注册
        $('#login-box').click(() => {
            $('.login-box').hide()
            $('.reg-box').show()
        })
        //  点击切换登录
        $('#reg-box').click(() => {
            $('.reg-box').hide()
            $('.login-box').show()
        })
        //从layui中获取form对象
        let form = layui.form
        form.verify({
            pwd: [/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]/, ',密码长度应该为6-16位']
            , user: [/^[A-Za-z0-9]+$/],
            repow: function (value) {
                let pwd = $('#reg-pow').val()

                if (pwd !== value) {
                    return '两次输入密码不一致'
                }
            }

        })

    }());

    // 注册与登录立即执行函数

    (function () {
        let layer = layui.layer

        // 监听注册表单提交事件
        $('#form_reg').on('submit', (e) => {
            e.preventDefault()
            let data = {
                username: $('.reg-box [name=username]').val(), password: $('#reg-pow').val()
            }
            $.post('/api/reguser', data, (res) => {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功')
                $('#reg-box').click()
                $('#form_reg input').val('')

            })

        })

        // 监听表单登录事件

        $('#form_login').on('submit', function (e) {
            e.preventDefault()
            $.ajax({
                url: '/api/login',
                method: 'POST',
                data: $(this).serialize(),
                success: res => {
                    if (res.status !== 0) return layer.msg('登录失败')
                    localStorage.setItem('token', res.token
                    )
                    layer.msg('登录成功')
                    location.href = './index.html'
                }

            })


        })

    }())
});
