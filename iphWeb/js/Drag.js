/**
 * Created by Freddy on 2016/10/23.
 */
function EventEmitter(){}
EventEmitter.prototype.on=function(type,fn){
    if(!this['aEmitter'+type]){
        this['aEmitter'+type]=[];
    }
    var a=this['aEmitter'+type];
    for(var i=0;i< a.length;i++){
        if(a[i]==fn) return;
    }
    a.push(fn);
};
EventEmitter.prototype.fire=function(type,e){
    var a=this['aEmitter'+type];
    if(a&& a.length){
        for(var i=0;i< a.length;i++){
            if(typeof a[i]==='function'){
                a[i].call(this,e);
            }else{
                a.splice(i,1);
                i--;
            }
        }
    }
};
EventEmitter.prototype.off=function(type,fn){
    var a=this['aEmitter'+type];
    if(a&& a.length){
        for(var i=0;i< a.length;i++){
            if(a[i]==fn){
                a[i]=null;
                break;
            }
        }
    }
};
function Drag(ele){
    this.ele=ele;
    this.x=this.y=this.mx=this.my=null;
    this.MOVE=processThis(this.move,this);
    this.DOWN=processThis(this.down,this);
    this.UP=processThis(this.up,this);
    on(this.ele,'mousedown',this.DOWN);
}
Drag.prototype=new EventEmitter();
Drag.prototype.constructor=Drag;
Drag.prototype.down=function(e){
    this.x=this.ele.offsetLeft;
    this.y=this.ele.offsetTop;
    this.mx= e.clientX;
    this.my= e.clientY;
    if(this.ele.setCapture){
        this.ele.setCapture();
        on(this.ele,'mousemove',this.MOVE);
        on(this.ele,'mouseup',this.UP);
    }else{
        on(document,'mousemove',this.MOVE);
        on(document,'mouseup',this.UP);
        e.preventDefault();
    }
    this.fire('selfDown',e)
};
Drag.prototype.move=function(e){
    this.ele.style.left= e.clientX-this.mx+this.x+'px';
    this.ele.style.top= e.clientY-this.my+this.y+'px';
    this.fire('selfMove',e);
};
Drag.prototype.up=function(e){
    if(this.ele.releaseCapture){
        this.ele.releaseCapture();
        off(this.ele,'mousemove',this.MOVE);
        off(this.ele,'mouseup',this.UP);
    }else{
        off(document,'mousemove',this.MOVE);
        off(document,'mouseup',this.UP);
    }
    this.fire('selfUp',e);
};