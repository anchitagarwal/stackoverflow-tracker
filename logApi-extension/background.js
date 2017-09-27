chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        var username = '';
        $.ajax({
            url: 'http://54.67.1.228/user_data',
            type: 'get',
            dataType: 'json',
            success: function (data) {
                username = data.username
                request.user = username
                $.ajax({
                    url: 'http://54.67.1.228/log',
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