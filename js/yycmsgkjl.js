function yycmslsjl(name, urll, part, partt) {
    var vod_name = name,
        vod_url = window.location.pathname,
        vod_urll = urll,
        vod_part = part,
        vod_partt = partt;
    var history = $.cookie("historyy");
    var len = 0;
    var canadd = true;
    if (history) {
        history = eval("(" + history + ")");
        len = history.length;
        $(history).each(function() {
            if (vod_name == this.vod_name) {
                canadd = false;
                var json = "[";
                $(history).each(function(i) {
                    var temp_name, temp_url, temp_urll, temp_part, temp_partt;
                    if (this.vod_name == vod_name) {
                        temp_name = vod_name;
                        temp_url = vod_url;
                        temp_urll = vod_urll;
                        temp_part = vod_part;
                        temp_partt = vod_partt;
                    } else {
                        temp_name = this.vod_name;
                        temp_url = this.vod_url;
                        temp_urll = this.vod_urll;
                        temp_part = this.vod_part;
                        temp_partt = this.vod_partt;
                    }
                    json += "{\"vod_name\":\"" + temp_name + "\",\"vod_url\":\"" + temp_url + "\",\"vod_urll\":\"" + temp_urll + "\",\"vod_part\":\"" + temp_part + "\",\"vod_partt\":\"" + temp_partt + "\"}";
                    if (i != len - 1)
                        json += ",";
                })
                json += "]";
                $.cookie("historyy", json, { path: "/", expires: (2) });
                return false;
            }
        });
    }
    if (canadd) {
        var json = "[";
        var start = 0;
        var isfirst = "]";
        isfirst = !len ? "]" : ",";
        json += "{\"vod_name\":\"" + vod_name + "\",\"vod_url\":\"" + vod_url + "\",\"vod_urll\":\"" + vod_urll + "\",\"vod_part\":\"" + vod_part + "\",\"vod_partt\":\"" + vod_partt + "\"}" + isfirst;
        if (len > 9)
            len -= 1;
        for (i = 0; i < len - 1; i++) {
            json += "{\"vod_name\":\"" + history[i].vod_name + "\",\"vod_url\":\"" + history[i].vod_url + "\",\"vod_urll\":\"" + history[i].vod_urll + "\",\"vod_part\":\"" + history[i].vod_part + "\",\"vod_partt\":\"" + history[i].vod_partt + "\"},";
        }
        if (len > 0) {
            json += "{\"vod_name\":\"" + history[len - 1].vod_name + "\",\"vod_url\":\"" + history[len - 1].vod_url + "\",\"vod_urll\":\"" + history[len - 1].vod_urll + "\",\"vod_part\":\"" + history[len - 1].vod_part + "\",\"vod_partt\":\"" + history[len - 1].vod_partt + "\"}]";
        }
        $.cookie("historyy", json, { path: "/", expires: (2) });
    }
}
var YYCMS = {
    'Cookie': {
        'Set': function(name, value, days) {
            var expires;
            if (days) {
                expires = days;
            } else {
                expires = "";
            }
            $.cookie(name, value, { expires: expires, path: '/' });
        },
        'Get': function(name) {
            var styles = $.cookie(name);
            return styles;
        },
        'Del': function(name, tips) {
            if (window.confirm(tips)) {
                $.cookie(name, null, { expires: -1, path: '/' });
                location.reload();
            } else {
                return false;
            }
        }
    }
};