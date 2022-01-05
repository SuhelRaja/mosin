// create by SAN 
// game instructions written by @kapama

"use strict";
let H, W, san, {PI, hypot, random, round, atan2, sin, cos} = Math,ad1,ad2,Clvl=0,isStart=false;
let boxs=[],LvlArr=[],Hold=false,Cxy,far=[],Count=0;
let bgboxs=[];
let isable=false;
let Levels = `
200
2~2~2,0~0~0,0~0~0
~1~,200,~0~
~~1~1~1~,40000000
~~~0~,03002,~0~0~,30000,~0~3~
~3~1~,~0002,~0~~~,~0~~~,001~~
~1~,10~,~01,10~,~01,10~,~01,~0~
~~2~~~~,~~01~~~,~~0~~~~,2200000
1000~,~010~,~0021,~2~~~
101~101,0~0~0~0,101~101,~~~~~~~,6000000,~00004~,~~200~~
2000,~011,~200,2200,~~00
~~112~,01000~,0~~~0~,000004,2~~~~~
~223~~,~1001~,~0001~,200000,~~00~~
~0~4~~,~40000,~0~0~~,300000,~0~0~~,~00003,~4~~~~
~10201,500000,200000,~~101~
~~5~~~,~~0002,~~0~0~,~~0~0~,~~0~0~,~~0~01,30000~,01014~
~~01~~,~3000~,000040,2~~~~0,0~01~0,0~10~3,500000
~~~201~,~~~0003,~~~000~,20000~~,~0~~2~~,~0~~~~~,~3~~~~~
~2~~~~,~00003,~0100~,10011~
~1111~,100001,100001,100001,100001,~1111~`;

const LevelDataToArray = (data) => {
    let levels = [];
    data.substring(1).split('\n').forEach(v => {
        let lvlArr = v.split(',').map(v => v.split(''))
        levels.push({
            x:lvlArr[0].length,
            y:lvlArr.length,
            a:lvlArr,
            p:false
        })        
    })  
    Levels = levels;
}
class Bgbox {
    constructor() {
        this.x=random()*W;
        this.y=random()*H;
        this.t=round(random());
        this.o=.2;
        this.a=random()*6-3;
        this.r=random()*10+10;
        this.vx=random()*1-.5;
        this.vy=random()*1-.5;
        
    }
    draw(){
        this.a+=.01;
        this.o=sin(this.a)*.2;
        if(this.x<-20) this.x=W+20;
        if(this.y<-20) this.y=H+20;
        if(this.x>W+20) this.x=-20;
        if(this.y>H+20) this.y=-20;
        this.x+=this.vx;
        this.y+=this.vy;
        san.lineWidth=3;
        san.fillStyle=`rgba(300,300,300,${this.o})`;
        san.strokeStyle=`rgba(300,300,300,${this.o})`;
        san.beginPath();
        san.arc(this.x,this.y,this.r,0,PI*2)
        san.closePath();   
        this.t==1?san.fill():san.stroke();    
    }
}
class Box {
    constructor(x,y,s,op,tx,cd) {
        this.x = x;
        this.y = y;   
        this.s = s; 
        this.s2 = op==0?s*.7:s;
        this.c = [300,300,300];
        this.p = s;   
        this.e = .7;
        this.e2 = .5;
        this.v = .02
        this.f = random()*60;
        this.ct = 0;
        this.op = op;
        this.o = [0,0,0];
        this.in = true;
        this.tx = tx;
        this.fl = op==0?false:true;
        this.nf = tx!="0"?true:false;
        this.cd = cd;
    }
    draw() {
        this.anime();
        san.beginPath();
        san.fillStyle = `rgba(${this.c[0]}, ${this.c[1]}, ${this.c[2]}, ${this.o[0]})`;
        san.rect(this.x-this.s/2, this.y-this.s/2, this.s, this.s);
        san.fill();
        san.closePath();
        
        san.beginPath();
        san.fillStyle = `rgba(${this.c[0]}, ${this.c[1]}, ${this.c[2]}, ${this.o[2]})`;
        san.rect(this.x-this.s2/2, this.y-this.s2/2, this.s2, this.s2);
        san.fill();
        san.closePath();
        
        if(this.tx!="0") {
            san.fillStyle = `rgba(300, 300, 300, ${this.o[1]})`;
            san.textAlign="center";
            san.font=(40*this.e)+"px Areil";
            san.fillText(this.tx,this.x,this.y+13, this.s,this.s);
        }
        
    }
    anime() {        
        if(this.ct++>this.f&&this.in){
            this.o=[.2,1,this.op];
            this.e+=this.v;
            if(this.e>1.1) this.v=-this.v;
            if(this.v<0&&this.e<1) this.in=false;
            this.s=this.p*this.e;   
            //console.log(this.ct)         
        }
        if(!this.fl&&this.e2<1&&this.nf) {
            this.o[2]=.3;
            this.e2+=.02;
            this.s2=this.p*this.e2;
            
        }
    }
}

const SetLevel=n=>{    
    boxs = [];
    let lvl=Levels[n]
    LvlArr=lvl.a;
    for(let i=0;i<lvl.y;i++)
        for(let j=0;j<lvl.x;j++){
            let op = lvl.a[i][j]!="0"?.3:0;
            if(lvl.a[i][j]!='~') boxs.push(new Box(
                30+(W/2-(lvl.x*60)/2)+j*60,
                30+(H/2-(lvl.y*60)/2)+i*60,60,op,lvl.a[i][j],{x:j,y:i}))
        }            
}

const TextF=()=>{
    san.lineWidth=120;
    san.lineCap="round";
    san.strokeStyle="rgba(300,300,300,.2)";
    san.fillStyle="rgba(300,300,300,.7)";
    san.beginPath();
    san.moveTo(200,H-150);
    san.lineTo(W-200,H-150);
    san.stroke();
    san.font="50px Areil"
    san.fillText("R E S E T",W/2,H-135)
    san.closePath();
    san.fillStyle="rgba(300,300,300,.4)";
    san.beginPath();
    san.arc(W/4,82,30,0,PI*2)
    san.fill();
    san.closePath();
    san.beginPath();
    san.arc(W-W/4,82,30,0,PI*2);
    san.fill();
    san.closePath();    
    san.fillStyle="white";
    san.fillText((Clvl+1)+"  of  "+Levels.length,W/2,100)
    san.lineWidth=3;
    san.strokeStyle="white";
    san.beginPath();
    san.moveTo(W/4+5,82-15);
    san.lineTo(W/4-5,82);
    san.lineTo(W/4+5,82+15);
    san.stroke();
    san.closePath(); 
    san.beginPath();
    san.moveTo(W-W/4-5,82-15);
    san.lineTo(W-W/4+5,82);
    san.lineTo(W-W/4-5,82+15);
    san.stroke();
    san.closePath();
    san.font="20px Areil";
    san.fillText("copyright SAN",W/2,H-10);
    san.fillStyle="rgba(0,0,0,.8)"
    if(!isStart){
    san.fillRect(0,0,W,H);    
    san.fillStyle="white";
    san.font="120px Areil";
    san.fillText("Orixo",W/2,200,400,50);
    san.font="50px Areil";
    san.fillText("Game instructions",W/2,450);
    //san.textAlign="start";
    san.font="25px Areil";
    san.fillText("● Each number represents the number of box to fill",W/2,600);
    san.fillText("● Understand the pattern, press and hold the number",W/2,650);
    san.fillText("then drag it to fill the box(es).",W/2,700);
    
    san.fillText("● Finish the present level to proceed to another level.",W/2,750);
    san.fillText("● I hope you'll like it 🥰 and Good luck 👍",W/2,800);
    san.font="50px Areil";
    san.textAlign="center"
    san.beginPath();
    san.fillStyle="white"
    san.arc(W/2,H-150,100,0,PI*2);
    san.fill();
    san.closePath();
    san.fillStyle="black"
    san.fillText("START",W/2,H-130)
    }
}



const Ots = e => {
    if(e.cancelable) e.preventDefault();
    let x = e.touches[0].pageX*2;
    let y = e.touches[0].pageY*2;
    if(isStart){
    for(let v of boxs){
        if(hypot(v.x-x,v.y-y)<30&&v.tx!="0"){
            Cxy=v;
            v.c=[100,300,100]    
            Hold=true;        
        }
    }
    }
}

const Otm = e => {
    if(e.cancelable) e.preventDefault();
    let x = e.touches[0].pageX*2;
    let y = e.touches[0].pageY*2;
    if(isStart){
    if(Hold) if(hypot(x-Cxy.x,y-Cxy.y)<30) Cxy.c=[0,300,0];
    if(Hold) if(hypot(x-Cxy.x,y-Cxy.y)>30){
    let d=[0,0];
    let a = atan2(y-Cxy.y,x-Cxy.x)*180/Math.PI;
    //console.log(a)
    if(a<=45&&a>=-45) d=[1,0];
    if(a<=135&&a>=45) d=[0,1]; 
    if(a<=-45&&a>=-135) d=[0,-1];
    if(a<=-135||a>=135) d=[-1,0];
    far=[];    
    for(let v of boxs) v.c=[300,300,300];
    
    for(let i=1;i<=10;i++){
        let brk=false;
        for(let v of boxs) if(hypot(Cxy.x+(60*(i-1)*d[0])-v.x,Cxy.y+(60*(i-1)*d[1])-v.y)<2) brk=true;
        for(let v of boxs){
            if(hypot(Cxy.x+(60*i*d[0])-v.x, Cxy.y+ (60*i*d[1])-v.y)<2&&!v.nf && far.length< parseFloat(Cxy.tx)){
                if(brk) far.push(v);  
            }        
        }        
    }
     
    Cxy.c=(far.length==parseFloat(Cxy.tx))?[0,300,0]:[300,0,0];
    for(let e of far) e.c=(far.length==parseFloat(Cxy.tx))?[0,300,0]:[300,0,0]; 
    }   
    }
}

const Ote = e => {
    if(e.cancelable) e.preventDefault();
    let x = e.changedTouches[0].pageX*2;
    let y = e.changedTouches[0].pageY*2;
    if(isStart){
    let allnf=true;    
        if(Hold){
        
        for(let e of far){
        if(far.length==parseFloat(Cxy.tx)){
            e.nf=true;
            ad1.currentTime=0;
            ad1.play();
        } 
        //console.log(far.length)
        }
        for(let v of boxs){
            v.c=[300,300,300]
            allnf=allnf&&v.nf
        } 
    if(far.length==parseFloat(Cxy.tx)) Cxy.tx="0"
    far=[];
    Hold=false;
    Count=0;
    if(allnf) isable = true;
    //console.log(Count,isable)
    }
    if(150<=x+1-1&&150+W-300-1>=x&&H-200<=y+1-1&&H-200+100-1>=y) SetLevel(Clvl);
    if(hypot(x-W/4,y-82)<30){
        if(Clvl>0) SetLevel(--Clvl);
    }
    if(hypot(x-(W-W/4),y-82)<30){
        if(Clvl<Levels.length-1&&Levels[Clvl+1].p)SetLevel(++Clvl);
    }
  // start 
    }
   if(hypot(x-W/2,y-(H-150))<100){
       ad2.play();
       isStart=true;
    }
    
}

const Loop=()=>{ 
    san.clearRect(0,0,W,H);
    bgboxs.forEach(v=>v.draw())
    boxs.forEach((v,i)=>{
        v.draw();
        if(v.d) boxs.splice(i,1);
    })
    TextF();
    Count++;
    if(isable&&Count>30){
        if(Clvl<Levels.length-1){
            SetLevel(++Clvl);
            Levels[Clvl].p=true;
        } 
        isable=false;
    }
    webkitRequestAnimationFrame(Loop);
}

//____________ canvas setup ____________

const init=()=>{
    document.body.style.margin=0;
    let c=document.createElement("canvas");
    document.body.appendChild(c);
    c.style.position="fixed";
    c.style.background= "linear-gradient(rgb(254,173,130),rgb(117,15,61))";
    c.style.width="100vw",c.style.height="100vh";
    H=c.height=innerHeight*2,W=c.width=innerWidth*2;
    san=c.getContext('2d');  
    ad1=document.createElement("audio");
    ad1.src= "https://www.dropbox.com/s/q1wc99m2262s0x9/mixkit-plastic-bubble-click-1124.wav?dl=0&raw=1";
    ad2=document.createElement("audio");
    ad2.src= "https://www.dropbox.com/s/z9u2zfs73fesaz3/soft-piano-song.mp3?dl=0&raw=1";
    ad2.onended=()=>{
        ad2.play();
    }
    for(let i=0;i<40;i++) bgboxs.push(new Bgbox());
    LevelDataToArray(Levels);
    SetLevel(Clvl);
    Loop();
    c.ontouchstart=Ots;
    c.ontouchmove=Otm;
    c.ontouchend=Ote;
};
onload = init;
