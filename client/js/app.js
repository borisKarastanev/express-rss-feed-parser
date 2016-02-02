/**
 * Created by boris on 1/29/16.
 */


$(document).ready(function () {
    var rssFeed = $('#rss-link');
    var getFeedBtn = $('#get-rss');
    var container = $('#rss-feed');

    var App = {};

    App.getFeed = function (e) {
        e.preventDefault();
        var _feedLink = rssFeed.val();
        $.post('/feeds', _feedLink, function (res) {
            var rssFeed = JSON.parse(res);
            console.log(rssFeed);
            container.empty();
            $.each(rssFeed, function (i, key) {
                container.append(
                        '<h4>' + key.title + '</h4>'+
                        '<a href="' + key.link + '">' + key.link + '</a>'+
                        '<article>' + key.content + '</article>'
                );
            });
        }).error(function (err) {
            console.log(err.responseText);
            container.empty();
            container.append(err.responseText);
        });
    };

    getFeedBtn.click(App.getFeed);
});