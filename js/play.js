let StatitIndex=0;
function Statit(dz, t, cat, id, end, ids) {
    //  layer.load(2);
    if (StatitIndex==0) {
        $("#playlist1 ul").html("");
    }
    //  $("#playlist1 ul").html("");
    let pageindex=Math.ceil(parseInt(end)/200);
    if (pageindex>StatitIndex) {
        StatitIndex++;
    }else{
        StatitIndex=0;
        return;
    }
       let ends=StatitIndex*200;
       let starts=(StatitIndex-1)*200+1;
       if(ends>parseInt(end)){
           ends=parseInt(end);
       }
      $.ajax({
        type: 'GET',
        url: 'https://api.web.360kan.com/v1/detail',
        data: {
            "cat": cat,
            "id": id,
            "site": dz,
            "start": starts,
            "end": ends
        },
        dataType: 'jsonp',
        async: false,
        success: function(data) {
            let html="";
            for (let i = 0; i < data.data.allepidetail[dz].length; i++) {
                let v=data.data.allepidetail[dz][i];
                html+= '<li><a id="' + v.playlink_num + '" p_name="第 ' + v.playlink_num + ' 集" href="javascript:void(0)" onclick="bofang(\'' + v.url + '\',\'' + v.playlink_num + '\')">' + v.playlink_num + '</a></li>';
            }
                // $.each(data.data.allepidetail, function(i, va) {
                //     $.each(va, function(i, v) {
                //         html+= '<li><a id="' + v.playlink_num + '" p_name="第 ' + v.playlink_num + ' 集" href="javascript:void(0)" onclick="bofang(\'' + v.url + '\',\'' + v.playlink_num + '\')">' + v.playlink_num + '</a></li>';
                //     })
                // })
            $("#playlist1 ul").append(html);
            Statit(dz, t, cat, id, end, ids) 
        },
        error: function() {
            // layer.msg('网络连接异常');
        }
    });
    // $("#playlist1 ul").html(html_);
    // layer.msg('获取列表成功');
    // layer.closeAll('loading');
//   $("#playlist1 ul").html(html_);
};
function getData(cat,id,dz,starts,ends){
    $.ajax({
        type: 'GET',
        url: 'https://api.web.360kan.com/v1/detail',
        data: {
            "cat": cat,
            "id": id,
            "site": dz,
            "start": starts,
            "end": ends
        },
        dataType: 'jsonp',
        async: false,
        success: function(data) {
            let html="";
            for (let i = 0; i < data.data.allepidetail[dz].length; i++) {
                let v=data.data.allepidetail[dz][i];
                html+= '<li><a id="' + v.playlink_num + '" p_name="第 ' + v.playlink_num + ' 集" href="javascript:void(0)" onclick="bofang(\'' + v.url + '\',\'' + v.playlink_num + '\')">' + v.playlink_num + '</a></li>';
            }
                // $.each(data.data.allepidetail, function(i, va) {
                //     $.each(va, function(i, v) {
                //         html+= '<li><a id="' + v.playlink_num + '" p_name="第 ' + v.playlink_num + ' 集" href="javascript:void(0)" onclick="bofang(\'' + v.url + '\',\'' + v.playlink_num + '\')">' + v.playlink_num + '</a></li>';
                //     })
                // })
            
            $("#playlist1 ul").append(html);
            getData(cat,id,dz,starts,ends);
        },
        error: function() {
            layer.msg('网络连接异常');
        }
    });
}
function hqzy(cat, id, ysyz, year) {
    var html_ = '';
    layer.load(2)
    $.ajax({
        type: 'GET',
        url: 'https://api.web.360kan.com/v1/detail',
        data: {
            "cat": cat,
            "id": id,
            "site": ysyz,
            "year": year
        },
        dataType: 'jsonp',
        cache: false,
        async: true,
        success: function(data) {
            $.each(data, function(i, val) {
                $.each(val.defaultepisode, function(i, v) {
                    html_ += '<li><a id="' + v.pubdate + '" p_name="' + v.pubdate + '" href="javascript:void(0)" onclick="bofang(\'' + v.url + '\',\'' + v.pubdate + '\')">' + v.pubdate + '</a></li>';
                })
            })
            $("#playlist1 ul").html(html_);
            layer.closeAll('loading');
        },
        error: function() {
            layer.msg('网络连接异常');
            layer.closeAll('loading');
        }
    });
}
function tbgf(title) {
    // var reg=/\s+/g;
    // title=title.replace(reg,"").replace("普通话","");
    title=title.split(" ")[0]
    var bfdz=$("#videourlgo").attr("href");
    var html_ = '';
   layer.load(2);
    $.ajax({
        type: 'post',
        url: '/data/gz.php',
        data: {
            url: bfdz,
            title:title
        },
        dataType: 'json',
        cache: false,
        async: true,
        success: function(data) {
            console.log(data);
            if (data.state == 1) {
                layer.msg('同步列表成功');
                $.each(data.data, function(i, val) {
                    html_ += '<li><a id="' + val.id + '" p_name="' + val.title + '" href="javascript:void(0)" onclick="bofang(\'' + val.url + '\',\'' + val.id + '\')">' + val.title + '</a></li>';
                })
                $("#playlist10 ul").html(html_);
            } else {
                layer.msg(data.data);
            }
            layer.closeAll('loading');
        },
        error: function() {
            layer.msg('网络连接异常');
            layer.closeAll('loading');
        }
    });
}

$(function() {
    if ($.cookie("historyy") == null) {
        var yycms = 'yycms';
    } else {
        var yycms = $.cookie("historyy");
    }
    hrefdeal();
    if (yycms.indexOf(window.location.pathname) != -1) {
        var json = eval("(" + $.cookie("historyy") + ")");
        $.each(json, function(i, n) {
            if (n.vod_url == location.pathname) {
                layer.msg("您上次观看到_" + n.vod_name + "_" + n.vod_partt + "");
                if (parseInt(n.vod_part)>=2000) {
                    tbgf(n.vod_urll)
                    $('#mytab a:last').tab('show');
                }else{
                    jiazainame(n.vod_part);
                }
                // jiazainame(n.vod_part);
                document.getElementById('jishu').innerHTML = n.vod_partt;
                var xuanjk = $(".xianlucss");
                document.getElementById('videourlgo').href = n.vod_urll;
                document.getElementById('video').src = xuanjk.attr("data-url") + n.vod_urll;
            }
        });
    } else {
        var url = $("#videourlgo").attr("href");
        var name = $("#timutitle").text();
        if (url) {
            jiazainame(1);
            yycmslsjl(name, url, '1', $("#1").attr("p_name"));
            return;
        }
    }
});

function hrefdeal() {
    document.getElementById('xlu').style.display = 'block';
}

function bofang(mp4url, jiid) {
    jiazainame(jiid)
    var xuanjk = $(".xianlucss");
    yycmslsjl($("#timutitle").text(), mp4url, jiid, $("#" + jiid).attr("p_name"));
    document.getElementById('videourlgo').href = mp4url;
    document.getElementById('video').src = xuanjk.attr("data-url") + mp4url;
};

function jiazainame(jiid) {
    // console.log(jiid);
    var shang = "btn-prevv";
    var xia = "btn-next";
    var name = $("#" + jiid).attr("p_name");
    document.getElementById('jishu').innerHTML = name;
    $(".btn-play-active").attr("style", "");
    $(".btn-play-active").removeClass("btn-play-active");
    $("#" + jiid).addClass("btn-play-active");
    $("#" + jiid).attr("style", "background: #00a0e9;color: #ffffff;border:1px solid #00a0e9;");
    if (!IsPC()) {
        shang = "btn-prev-m";
        xia = "btn-next-m";
    }
    if (jiid != 1) {
        $("#" + shang).show();
    } else {
        $("#" + shang).hide();
    }
    var jitotal = $(".lipbtn").length;
    if (jiid != jitotal) {
        $("#" + xia).show();
    } else {
        $("#" + xia).hide();
    }
}

function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"
    ];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

function btnnext() {
    var obj = $(".btn-play-active");
    if (obj != null) {
        $(".btn-play-active").attr("style", "");
        $(".btn-play-active").removeClass("btn-play-active");
        obj.parent().next().children(0).click();
        //$(this).focus();
        $("#" + xia).focus();
    }
}

function btnprev() {
    var obj = $(".btn-play-active");
    if (obj != null) {
        $(".btn-play-active").attr("style", "");
        $(".btn-play-active").removeClass("btn-play-active");
        obj.parent().prev().children(0).click();
        $("#" + shang).focus();
    }
}
function UpError(name){
    layer.open({
        btn:['切换试试','留言反馈'],
        title: '视频无法播放',
        content: '视频无法播放可以尝试一下解决方案<br/><span style="color:red;font-weight:bold">1.切换线路（线路1、线路2等）<br/>2.切换播放源（腾讯、爱奇艺、芒果等）</span>',
        yes:function(){
            layer.msg('好嘞！')
        },
        btn2:function(){
            layer.msg('正在进行反馈...',{time:2000});
            var xl=$(".xianlucss").html();
            var site=$("#jishu").html();
            var url=window.location.pathname;
            var str="《"+name+"》"+site+xl+"线路无法播放，播放地址:<a href='"+url+"' target='_blank'>"+url+"</a>";
            $.ajax({
				cache: false,
				async: true,
				type: "POST",
				url: "/sava/action.php",
				dataType: "json",
				data: {"yycms":"lyfk","gbook_content":str},
			     success: function (r) {
					 layer.msg(r.msg);
				},
			});
        }
    });     
}
if (playerhigh == 1) {
    $(".MacPlayer").addClass("embed-responsive embed-responsive-16by9").css({
        "padding-bottom": "60%",
        "z-index": "99"
    });
    $("#playleft,.dplayer-video-wrap").css({
        "position": "inherit",
        "overflow": "initial"
    });
}
var PlayerHeight = $(".MacPlayer").outerHeight();
$(".stui-player__video").css("height", PlayerHeight);
var playli = $(".stui-content__playlist:first li").length;
if (playcolumn > 1) {
    if (playli > 5) {
        $(".stui-content__playlist").addClass("column" + playcolumn);
    }
}
if (playli > 30) {
    $(".stui-content__playlist").css({
        "max-height": " 300px",
        "overflow-y": "scroll"
    });
}