;(function($, window, undefined){
    function replaceByObj(templateStr,obj){
        var result=templateStr;
        for(var prop in obj){
            var temp = "\\$" + prop, reg = new RegExp(temp, "g");
            result=result.replace(reg,obj[prop]);
        }
        return result;
        //return this.replace(/\$href/g,obj["href"]).replace(/\$target/g,obj["target"]).replace(/\$text/g,obj["text"]);
    }
    $.fn.addHeader = function(opts,optdata) {
        var defaults = {
            current: 1,//当前标签在默认json数组中的索引值,设置后将出现在导航中的第一个位置，from 1 to end
            active: 1//当前处于活跃状态的导航项，from 1 to end
        },
        defaultData = [{
                text: "TrackMaster",
                href: "http://www.trackmaster.com.cn/",
                target: "_blank"
            },{
                text: "BuzzMaster",
                href: "http://www.buzzmaster.com.cn",
                target: "_blank"
            },{
                text: "SurveyMaster",
                href: "http://www.surveymaster.com.cn",
                target: "_blank"
            },{
                text: "SiteMaster",
                href: "http://www.sitemaster.com.cn",
                target: "_blank"
            },{
                text: "ReviewMaster",
                href: "http://www.reviewmaster.com.cn",
                target: "_blank"
            },{
                text: "CSRMaster",
                href: "http://www.csrmaster.com",
                target: "_blank"
            }];

        // 使用用户的选项缺省值来扩展缺省选项，这个会有问题么???
        //var options = $.extend(defaults, opts || {});
        var options = $.extend({},defaults,opts),
            data = optdata||defaultData;
            options.current=(options.current-1);//减一操作
            options.active=(options.active-1);

        //实现current作为导航中第一个位置
        var curPos=options.current,dataLength=data.length;//curPos: from 0 to end
        if(curPos>0 && curPos<dataLength){
            var curData=data[curPos];
            data.splice(curPos,1);
            data.unshift(curData);
        }

        //定义模板
        var header='<nav class="navbar"><div class="navbar-inner"><ul class="nav">$lis</ul></div></nav>',
            headerLi='<li class="$active"><a href="$href" target="$target">$text</a></li>',//header,headerLi的值不可改变
            headerLis="",results="";

        function aac(obj, obj2) {
        }
        //将json数据放到template里
        $.each(data,function(indx,obj){
            var headerLiTemp="";
            if(options.active<1){//对当前active选项处理
                if(indx==0){
                    headerLiTemp=headerLi.replace(/\$active/g,"active");
                }else{
                    headerLiTemp=headerLi.replace(/\$active/g,"");
                }
            }else{
                if(indx==options.active){
                    headerLiTemp=headerLi.replace(/\$active/g,"active");
                }else{
                    headerLiTemp=headerLi.replace(/\$active/g,"");
                }
            }
            headerLis+=replaceByObj(headerLiTemp,obj);
        });

        results=header.replace(/\$lis/g,headerLis);//把所有li字符串放到最终结果里面
        return this.append(results);
    }
    $.fn.addFooter = function(optdata) {
        var defaultData = [{
                text: "服务条款",
                href: "xxx",
                target: "_blank"
            },{
                text: "与我们联系",
                href: "xxxx",
                target: "_blank"
            },{
                text: "商标权利",
                href: "xxxx",
                target: "_blank"
            },{
                text: "停用Cookie",
                href: "xxxxx",
                target: "_blank"
            }];

        var  data = optdata||defaultData;

        var footer='<footer id="footer" style="text-align: center;"><div class="modal-footer"><span>©2012 AdMaster Inc.保留所有权利 </span>&nbsp;&nbsp;&nbsp;&nbsp;$links</div></footer>';
            footerA='&nbsp;&nbsp;<a href="$href" target="$target">$text</a>&nbsp;&nbsp;|',//header,headerLi的值不可改变
            footerAs="",results="";

        $.each(data,function(indx,obj){
            footerAs+=replaceByObj(footerA,obj);
        });
        footerAs=footerAs.substring(0,footerAs.length-1);
        results=footer.replace(/\$links/g,footerAs);
        return this.append(results);
    }
})(jQuery, window);
