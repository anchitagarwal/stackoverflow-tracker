chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        var username = '';
        $.ajax({
            url: 'http://127.0.0.1:3000/user_data',
            type: 'get',
            dataType: 'json',
            success: function (data) {
                username = data.username
                request.user = username
                $.ajax({
                    url: 'http://127.0.0.1:3000/log',
                    type: 'post',
                    dataType: 'json',
                    data: request,
                    success: function (data) {
                        console.log(data)
                    }
                });
            },
            error: function(err) {
                console.log(err)
            }
        });
    }
);