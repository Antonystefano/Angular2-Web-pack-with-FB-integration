var g_TopPoint = 0;
var g_CurPoint = 0;
var g_TopArray = [];
var myAppId = "1128137727302786";
var myUserId;

function fbStart() {
    FB.init({
        appId: myAppId,
        xfbml: true,
        version: 'v2.8',
        scope: 'user_friends, email, public_profile, publish_actions, user_games_activity'
    });

    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            myUserId = response.authResponse.userID;
            var accessToken = response.authResponse.accessToken;
            console.log("start");
            fbReadScore(accessToken);

        } else {
            fbLogin();
        }
    });
    //load the JavaScript SDK

    var point = $('#mypoint').text();
    g_CurPoint = point * 1;
    //if (g_point == 1 && g_point2 > 1) g_CurPoint = g_point2;
}

function fbLogin() {
    FB.login(function(response) {
        if (response.authResponse) {
            myUserId = response.authResponse.userID;
            var accessToken = response.authResponse.accessToken;
            FB.api('/me', function(response) {
                fbReadScore();
            });
        } else {}
    }, { scope: 'user_friends, public_profile, publish_actions, user_games_activity' });
}

function fbUpdateScore(grand_score, token) {
    var url = '/' + myUserId + '/scores';
    FB.api(url, 'post', { score: grand_score, access_token: token }, function(response) {
        console.log(response);
        if (response.success == true) {
            fbReadScore(token);
        } else {}
    });
}

function fbReadScore(token) {
    var url = '/' + myAppId + '/scores';
    var arrAvatar = [];
    FB.api(url, 'get', function(response) {
        g_TopArray = [];
        g_point = 1;
        g_point2 = 1;
        console.log(response);
        for (var i = 0; i < 6; i++) {
            var objEach = response.data[i];

            if (objEach == null) continue;
            objEach.no = i + 1;
            var userName = objEach.user.name;
            var userId = objEach.user.id;

            objEach.avatar = "https://graph.facebook.com/" + userId + "/picture?width=30&height=30";

            g_TopArray.push(objEach);

            if (userId == myUserId) {
                g_TopPoint = objEach.score;
                if (g_TopPoint < g_CurPoint) fbUpdateScore(g_CurPoint, token);
            }
        }
    });
}

function fbShare() {
    FB.ui({
        method: 'share',
        display: 'popup',
        href: 'https://www.songtive.com',
    }, function(response) {});
}

function onReturn() {
    document.location = "./#/home";
}