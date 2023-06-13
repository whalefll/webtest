function changeActionn(){
var url = document.getElementById('search_fromm').value;
    $("#search").attr("action", url);
}
function GetData(t){
        var type=$(t).attr("data-id");
        var total=parseInt($(t).attr("data-count"));
        var wd=$(t).attr("data-wd");
        var zdyurl=$(t).attr("data-zdy");
        var page=parseInt($(t).attr("data-page"));
        var totalpage=Math.ceil(total/35.0);
        if(totalpage>=page){
            $(".pageitemselect").removeClass("pageitemselect");
            $(t).addClass("pageitemselect");
            $.ajax({
                url:'https://api.so.360kan.com/index?pageno='+page+'&tab='+type+'&kw='+wd,
                type:'get',
                success:function(res){
                   var ulhtml=""
                   $.each(res.data.video[type].data, function(i,val){     
                      var fgurl=val.url.split("/");
	            	  ulhtml+= '<li class="col-md-7 col-sm-4 col-xs-3"><div class="stui-vodlist__box">';
	            	  ulhtml+='<a class="stui-vodlist__thumb lazyload" href="/'+zdyurl+fgurl[3]+"/"+fgurl[4]+'" target="_blank" title="'+val.title+'"';
	            	  ulhtml+=' data-original="'+val.cover+'" style="background-image: url('+val.cover+');"';
	            	  ulhtml+=' <span class="play hidden-xs"></span><span class="pic-text text-right">'+val.coverInfo[Object.keys(val.coverInfo)[0]]+'</span></a>';
	            	  ulhtml+='<div class="stui-vodlist__detail"><h4 class="title text-overflow"><a href="/'+zdyurl+fgurl[3]+"/"+fgurl[4]+'">'+val.title+'</a></h4>';
	            	  ulhtml+='<p class="text text-overflow text-muted hidden-xs">'+val.comment+' </p></div></div></li>';
                  });   
                   $("#playul"+type).html(ulhtml);
                }
            })
        }
        if (page==0) {
             $("#getgengduo").remove();
             if(totalpage>=2&&$("#listpage").length<=0){
                var html="<div id='listpage'>";
                for(var i=1;i<=totalpage;i++){
                 html+="<a class='pageitem ";
                 if(i==1){
                     html+="pageitemselect";
                 }
                 html+="' href='javascript:void(0)' data-wd='"+wd+"' data-page='"+i+"' data-zdy='"+zdyurl+"' data-count='"+total+"' data-id='"+type+"'  onclick='GetData(this)'>第"+i+"页</a>";
                }
                html+="</div>";
                $("#pages").html(html);
              }
              page++;
        }
}
function submit12(){
	var str = document.getElementById('wd').value;
		if (str==""||str==null){
			alert("请输入影片关键词")
		}else{
			var s=$('#wd').val();
			var ss=$('#search').attr("action");
            s=s.replace(/\s/g,"");
			window.location.href=""+ss+"-"+s+".html";

		}
}
 $(document).ready(function(){
        $(".up-ul1 a").each(function(){
            $this = $(this);
            if($this[0].href==String(window.location)){
                $(".up-ul1 a").removeClass("active");
                $this.addClass("active");  
            } 
        });  
	        $(".up-ul2 a").each(function(){
            $this = $(this);
            if($this[0].href==String(window.location)){  
                $(".up-ul2 a").removeClass("active");
                $this.addClass("active");  
            }  
        }); 
	        $(".up-ul3 a").each(function(){
            $this = $(this);
            if($this[0].href==String(window.location)){  
                $(".up-ul3 a").removeClass("active");
                $this.addClass("active");  
            }  
        }); 
       $(".up-ul4 a").each(function(){
            $this = $(this);
            if($this[0].href==String(window.location)){  
                $(".up-ul4 a").removeClass("active");
                $this.addClass("active");  
            }  
        }); 
		$(".up-ul5 a").each(function(){
            $this = $(this);
            if($this[0].href==String(window.location)){  
                $(".up-ul5 a").removeClass("active");
                $this.addClass("active");  
            }  
        });
		$(".up-ul6 a").each(function(){
            $this = $(this);
            if($this[0].href==String(window.location)){  
                $(".up-ul6 a").removeClass("active");
                $this.addClass("active");  
            }  
        });
		$(".up-ul7 a").each(function(){
            $this = $(this);
            if($this[0].href==String(window.location)){  
                $(".up-ul7 a").removeClass("active");
                $this.addClass("active");  
            }  
        });
    });