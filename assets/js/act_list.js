$(function () {
    let form = layui.form
    let layer = layui.layer
    let laypage = layui.laypage
    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function (value) {
        return moment(value).format('YYYY年MM月DD日 HH时mm分ss秒')
    };

    let q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    initTable()
    function initTable() {
        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: q,
            success: function (res) {

                if (res.status !== 0) return layer.msg('获取失败')

                let htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                renderPage(res.total)
            },

        })

    }
    //初始化文章分类
    initCate()
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) return layer.msg('获取分类数据失败')
                let htmlstr = template('tpl-cate', res)

                $('[name=cate_id]').html(htmlstr)
                form.render()
            }
        })
    }

    function renderPage(total) {
        laypage.render({
            elem: 'pageBox', // 分页容器的 Id
            count: total, // 总数据条数
            limit: q.pagesize, // 每页显示几条数据
            curr: q.pagenum, // 设置默认被选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            // 分页发生切换的时候，触发 jump 回调
            // 触发 jump 回调的方式有两种：
            // 1. 点击页码的时候，会触发 jump 回调
            // 2. 只要调用了 laypage.render() 方法，就会触发 jump 回调
            jump: function (obj, first) {
                // first值是undefined,说明是用户点击的操作
                if (first == undefined) {
                    // 把最新的页码值，赋值到 q 这个查询参数对象中
                    q.pagenum = obj.curr
                    // 把最新的条目数，赋值到 q 这个查询参数对象的 pagesize 属性中
                    q.pagesize = obj.limit
                    initTable()
                }
            }
        })
    }
    $('#btn-delete').on('click', function () {
        let id = $(this).attr('data-id')
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'get',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章失败！')
                    }
                    layer.msg('删除文章成功')
                }
            })

            layer.close(index)
        })
    })


})