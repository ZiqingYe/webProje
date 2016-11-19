/**
 * Created by Freddy on 2016/11/15.
 */
var music = document.querySelector(".music");
var cocoon = document.querySelector("#cocoon");
//背景音乐
window.setTimeout(function(){
    cocoon.play();
    cocoon.addEventListener("canplay",function(){
        music.className = "music musicCur";
    })
},1000);
music.addEventListener("click",function(){
    //paused属性判断音频文件是播放的还是停止 cocoon.paused=true说明音频文件目前是停止播放
    //让音频文件播放play(),让音频文件停止是pause();
    if(cocoon.paused){//停止
        cocoon.play();
        music.className = "music musicCur";
    }else{
        cocoon.pause();
        music.className = "music";
        music.style.opacity = 1;
    }
},false);
//swiper滑动
var mySwiperV = new Swiper(".swiper-container-v",{
    direction:"vertical",
    pagination:".swiper-pagination-v",
    paginationType:"bullets",
    paginationClickable:"true",

    onTransitionEnd:function(swiper){
        var curIndex = swiper.activeIndex;//当前显示的滑块的索引
        var slides = swiper.slides;//获得所有的滑块
        [].forEach.call(slides,function(item,index){
            item.id="";//把所有滑块的索引去掉
            if(index ==curIndex ){
                item.id = "page"+(curIndex+1);
            }
        })
    },
    onInit : function(swiper){
        //对第一个滑块初始化
        var slides = swiper.slides;
        slides[0].id = "page1";
    }

});

var mySwiperH = new Swiper(".swiper-container-h",{
    direction:"horizontal",
    pagination:".swiper-pagination-h",
    paginationType:"bullets",
    paginationClickable:"true",
    effect:'flip',
    onTransitionEnd:function(swiper){
        var curIndex = swiper.activeIndex;//当前显示的滑块的索引
        var slides = swiper.slides;//获得所有的滑块
        [].forEach.call(slides,function(item,index){
            item.id="";//把所有滑块的索引去掉
            if(index ==curIndex ){
                item.id = "_page"+(curIndex+1);
            }
        })
    },
    onInit : function(swiper){
        //对第一个滑块初始化
        var slides = swiper.slides;
        slides[0].id = "_page1";
    }

});
//首页 选项卡
var oTab=document.querySelector('#tab');
var aBtn=oTab.querySelectorAll('.button');
var aDiv=oTab.querySelectorAll('.content');
for(var i=0; i<aBtn.length; i++){
    (function(index){
        aBtn[i].onclick=function(){
            for(var i=0; i<aBtn.length; i++){
                aBtn[i].className='button';
                aDiv[i].className='content';
            }
            aBtn[index].className='on button';
            aDiv[index].className='show content';
        }
    })(i);
}
