function animating(index){
    //0是添加1是移除
    switch (index){
        case 0:
            slide2AnimateClass(1);
            slide3AnimateClass(1);
            slide4AnimateClass(1);
            slide1AnimateClass(1);
            slide0AnimateClass(0);
            break;
        case 1:
            slide0AnimateClass(1);
            slide2AnimateClass(1);
            slide3AnimateClass(1);
            slide4AnimateClass(1);
            slide1AnimateClass(0);
            break;
        case 2:
            slide0AnimateClass(1);
            slide1AnimateClass(1);
            slide3AnimateClass(1);
            slide4AnimateClass(1);
            slide2AnimateClass(0);
            break;
        case 3:
            slide0AnimateClass(1);
            slide1AnimateClass(1);
            slide2AnimateClass(1);
            slide4AnimateClass(1);
            slide3AnimateClass(0);
            break;
        case 4:
            slide0AnimateClass(1);
            slide1AnimateClass(1);
            slide2AnimateClass(1);
            slide3AnimateClass(1);
            slide4AnimateClass(0);
            break;
    }
}
function slide0AnimateClass(act) {
    if(act==0){
        $(".slide-title").addClass("animated bounceInLeft");
        $(".slide-title").css("visibility","visible");
        setTimeout(function(){
            $(".right-tang").addClass("animated fadeIn");
            $(".right-tang").css("visibility","visible");

        },1000);
    }
    if(act==1){
        $(".slide-title").removeClass("animated bounceInLeft");
        $(".right-tang").removeClass("animated fadeIn");
        $(".slide-title").css("visibility","hidden");
        $(".right-tang").css("visibility","hidden");
    }
}
function slide1AnimateClass(act){
    if(act==0){
        $(".historyTit").addClass("animated slideInDown");
        $(".historyTit").css("visibility","visible");
        $(".HistoryRightFont").addClass("animated slideInUp");
        $(".HistoryRightFont").css("visibility","visible");
        setTimeout(function () {
            $(".historyBlock").addClass("animated fadeIn");
            $(".historyBlock").css("visibility","visible");
        },600);
    }else{
        $(".historyTit").removeClass("animated slideInDown");
        $(".historyTit").css("visibility","hidden");
        $(".HistoryRightFont").removeClass("animated slideInUp");
        $(".HistoryRightFont").css("visibility","hidden");
        $(".historyBlock").removeClass("animated fadeIn");
        $(".historyBlock").css("visibility","hidden");
    }
}
function slide2AnimateClass(act){
    if(act==0){
        $(".food-leftTit").addClass("animated slideInLeft fadeIn");
        $(".food-leftTit").css("visibility","visible");
        setTimeout(function () {
            $(".foodTitWarp").addClass("animated  fadeIn");
            $(".foodTitWarp").css("visibility","visible");
            setTimeout(function(){
                $(".poem").addClass("animated  fadeIn");
                $(".poem").css("visibility","visible");
                setTimeout(function(){
                    $(".food-all-picture").addClass("animated  fadeIn");
                    $(".food-all-picture").css("visibility","visible");
                    // setTimeout(function () {
                        $("#content").addClass("animated  fadeIn");
                        $("#content").css("visibility","visible");
                    // },500)
                },500)
            },400);
        },600);
    }else{
        $(".food-leftTit").removeClass("animated slideInLeft fadeOut");
        $(".food-leftTit").css("visibility","hidden");
        $(".food-all-picture").removeClass("animated slideInRight fadeOut");
        $(".food-all-picture").css("visibility","hidden");
        $(".foodTitWarp").removeClass("animated fadeIn");
        $(".foodTitWarp").css("visibility","hidden");
        $(".poem").removeClass("animated  fadeIn");
        $(".poem").css("visibility","hidden");
        $(".food-all-picture").removeClass("animated  fadeIn");
        $(".food-all-picture").css("visibility","hidden");
        $("#content").removeClass("animated  fadeIn");
        $("#content").css("visibility","hidden");
    }
}
function  slide3AnimateClass(act){
    if(act==0){
        $(".tripLeftTit").addClass("animated slideInDown");
        $(".tripLeftTit").css("visibility","visible");
        setTimeout(function () {
            $(".tripRightTop").addClass("animated slideInRight");
            $(".tripRightTop").css("visibility","visible");
            setTimeout(function(){
                $(".tripRightSights").addClass("animated  fadeIn");
                $(".tripRightSights").css("visibility","visible");
            },400);
        },600);
    }else{
        $(".tripLeftTit").removeClass("animated slideInDown");
        $(".tripLeftTit").css("visibility","hidden");
        $(".tripRightTop").removeClass("animated slideInRight");
        $(".tripRightTop").css("visibility","hidden");
        $(".tripRightSights").removeClass("animated  fadeIn");
        $(".tripRightSights").css("visibility","hidden");
    }
}
function slide4AnimateClass(act){
    if(act==0){
        $(".msgRightLink").addClass("animated slideInRight");
        $(".msgRightLink").css("visibility","visible");
        $(".swiper-containerH").addClass("animated fadeIn");
        $(".swiper-containerH").css("visibility","visible");
    }else{
        $(".msgRightLink").removeClass("animated slideInRight");
        $(".msgRightLink").css("visibility","hidden");
        $(".swiper-containerH").removeClass("animated fadeIn");
        $(".swiper-containerH").css("visibility","hidden");
    }
}