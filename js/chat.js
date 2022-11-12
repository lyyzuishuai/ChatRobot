$(function () {
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui()

    // 为发送按钮绑定鼠标点击事件
    $('#btnsend').on('click', function () {
        var text = $('#ipt').val().trim()
        if (text.length <= 0) {
            return $('#ipt').val('')
        }
        // 如果用户输入聊议案内容 将内容追加到聊天页面上
        $('#talk_list').append(' <li class="right_word"><img src="img/person02.png" /> <span>' + text + '</span> </li>')
        $('#ipt').val('')
        // 重置滚动条
        resetui();
        getMsg(text);
    })

    // 获取聊天机器人发送回来的消息
    function getMsg(text) {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3006/api/robot',
            data: {
                spoken: text
            },
            success: function (res) {
                if (res.message === 'success') {
                    var msg = res.data.info.text
                    $('#talk_list').append('<li class="left_word"><img src="img/person01.png"/> <span>' + msg + '</span></li>')
                    resetui()
                    // TODO: 发起请求，将机器人的聊天消息转为语音格式
                    getVoice(msg);
                }
            }
        })
    }

    // 把文字转语音
    function getVoice(text) {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3006/api/synthesize',
            data: {
                text: text
            },
            success: function (res) {
                // 如果请求成功，则 res.voiceUrl 是服务器返回的音频 URL 地址
                if (res.status === 200) {
                    $('#voice').attr('src', res.voiceUrl)
                }
            }
        })
    }

    $('#ipt').on('keyup', function (e) {
        if (e.keyCode === 13) {
            $('#btnsend').click()
        }
    })
})
