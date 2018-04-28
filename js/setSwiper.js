window.onload=function(){
    var swiperV = new Swiper('.swiper-container', {
        direction:'horizontal',
        on: {
            slideChangeTransitionEnd: function(){
                animating(this.activeIndex);//根据页面索引动态加载css
                showHeader(this.activeIndex);
            },
            slideChange: function(){
                // animating(this.activeIndex);
            }
        },
        threshold :30,
        // effect : 'fade',//渐变效果
        // effect : 'coverflow',//翻页效果
        // centeredSlides: true,
        // coverflowEffect: {
        //     rotate: 30,
        //     stretch: 10,
        //     depth: 60,
        //     modifier: 2,
        //     slideShadows : true
        // },
        // effect : 'cube',//方块效果
        // cubeEffect: {
        //     slideShadows: true,
        //     shadow: true,
        //     // shadowOffset: 100,
        //     shadowScale: 0.6
        // },
    });
    var swiperH = new Swiper('.swiper-containerH', {
        direction: 'vertical',
        // effect : 'fade',
        on: {
            slideChangeTransitionEnd: function(){
                addMsgAnimated(this.activeIndex);
            },
        },
    });
    //横屏分页创建实例
    pageLink(swiperV);
    msgLinkNav(swiperH);
    // getMsgInfo();
    showMsgInfo();
};
function RandomNumBoth(Min,Max){
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.round(Rand * Range); //四舍五入
    return num;
}
function showMsgInfo(){
    getMsgInfo(function(r){
        if(r){
            var len=r.msgInfo.length;
            var msgList = $(".RightMsg span");
            var nameList = $(".userName span");
            var imgSrc = $(".userPhoto img");
            var start = len-3;
            var imgNum = 1;
            for(var i=start,j=0;i<len;i++){
                msgList[j].innerHTML = r.msgInfo[i].msg;
                nameList[j].innerHTML = r.msgInfo[i].username;
                imgNum =RandomNumBoth(1,8);
                imgSrc[j].setAttribute("src","images/tripSight"+imgNum+".webp");
                j++;
                if(j==3){
                    break;
                }
            }
        }
    });
}
function pageLink(swiperObj){
    $(".indexLink").click(function(){
        swiperObj.slideTo(0,1000,false);
        animating(0);
        showHeader(0);
    });
    $(".historyLink").click(function(){
        swiperObj.slideTo(1,1000,false);
        animating(1);
    });
    $(".foodLink").click(function(){
        swiperObj.slideTo(2,1000,false);
        animating(2);
    });
    $(".tripLink").click(function(){
        swiperObj.slideTo(3,1000,false);
        animating(3);
        showHeader(3);
    });
    $(".messageLink").click(function(){
        swiperObj.slideTo(4,1000,false);
        animating(4);
    });
}
function showHeader(index){
    if($("#slide1").hasClass("swiper-slide-active")||index==0){
        $(".slide1-header").css("visibility", "visible");
        $(".slide1-header").addClass("animated slideInDown");
        $(".historyBlock").css("visibility","hidden");
    }else{
        $(".slide1-header").removeClass("animated slideInDown");
        $(".slide1-header").addClass("animated fadeOutUp");
        $(".headerFix").mouseenter(function () {
            $(".slide1-header").css("visibility", "visible");
            $(".slide1-header").removeClass("animated fadeOut");
            $(".slide1-header").addClass("animated slideInDown");
        });
        $(".headerFix").mouseleave(function () {
            $(".slide1-header").removeClass("animated slideInDown");
            $(".slide1-header").addClass("animated fadeOutUp");
        });
    }
}
function msgLinkNav(msgObject){
    $("#msgPage1Link").click(function(){
        msgObject.slideTo(0,1000,false);
        addMsgAnimated(0);
    });
    $("#msgPage2Link").click(function(){
        msgObject.slideTo(1,1000,false);
        addMsgAnimated(1);
        showMsgInfo();
    });
}
function addMsgAnimated(index){
    $(".contact").css("visibility","hidden");
    $(".msgContent").css("visibility","hidden");
    if(index==0){
        setTimeout(function(){
            $(".contact").addClass("animated fadeIn");
            $(".contact").css("visibility","visible");
            $(".msgContent").removeClass("animated fadeIn");
        },300);
    }else{
        setTimeout(function(){
            $(".msgContent").addClass("animated fadeIn");
            $(".msgContent").css("visibility","visible");
            $(".contact").removeClass("animated fadeIn");
        },300);
    }
}
