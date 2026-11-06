
(function(){
"use strict";

const defaults={
 skin:"#d99b72",
 hair:"#30201d",
 outfit:"#4169a9",
 accent:"#f4bd42"
};

const motions=[
 "idle","walk","run","wave","jump","talk",
 "cook","serve","shop","clean","write","dance"
];

function draw(ctx,character={},motion="idle",time=0,x=0,y=0,size=1){
 const c={...defaults,...character};
 const t=time;
 const w=ctx.canvas.width;
 const h=ctx.canvas.height;

 const unit=Math.max(0.3,Math.min(2,size));
 const cycle=t*5;

 let bob=0,armL=0,armR=0,legL=0,legR=0;
 let headTilt=0,bodyTilt=0;

 switch(motion){
  case "walk":
   bob=Math.abs(Math.sin(cycle))*5;
   armL=Math.sin(cycle)*32;
   armR=-Math.sin(cycle)*32;
   legL=-Math.sin(cycle)*28;
   legR=Math.sin(cycle)*28;
   break;

  case "run":
   bob=Math.abs(Math.sin(cycle*1.5))*11;
   armL=Math.sin(cycle)*65;
   armR=-Math.sin(cycle)*65;
   legL=-Math.sin(cycle)*48;
   legR=Math.sin(cycle)*48;
   bodyTilt=10;
   break;

  case "wave":
   armR=-Math.sin(t*5)*45-65;
   armL=5;
   break;

  case "jump":
   bob=Math.abs(Math.sin(t*4))*35;
   legL=-20;
   legR=20;
   armL=-45;
   armR=45;
   break;

  case "talk":
   headTilt=Math.sin(t*4)*5;
   armL=Math.sin(t*3)*12;
   armR=-Math.sin(t*3)*12;
   break;

  case "cook":
   armR=-Math.sin(t*6)*35-35;
   armL=Math.sin(t*6)*12;
   bodyTilt=3;
   break;

  case "serve":
   armR=-65;
   armL=-15;
   break;

  case "shop":
   armR=-Math.sin(t*4)*25-25;
   break;

  case "clean":
   bodyTilt=Math.sin(t*4)*9;
   armL=Math.sin(t*5)*35;
   armR=-Math.sin(t*5)*35;
   break;

  case "write":
   armR=-Math.sin(t*5)*10-55;
   headTilt=12;
   break;

  case "dance":
   bob=Math.abs(Math.sin(t*5))*12;
   armL=Math.sin(t*5)*70-35;
   armR=-Math.sin(t*5)*70+35;
   legL=Math.sin(t*5)*30;
   legR=-Math.sin(t*5)*30;
   bodyTilt=Math.sin(t*5)*12;
   break;
 }

 ctx.save();
 ctx.translate(x,y-bob*unit);
 ctx.scale(unit,unit);

 // Ground shadow
 ctx.fillStyle="rgba(0,0,0,.16)";
 ctx.beginPath();
 ctx.ellipse(0,145,48,10,0,0,Math.PI*2);
 ctx.fill();

 // Legs
 function leg(side,angle){
  ctx.save();
  ctx.translate(side*16,62);
  ctx.rotate(angle*Math.PI/180);
  ctx.fillStyle="#303c59";
  roundRect(ctx,-10,0,20,65,8);
  ctx.fillStyle="#202333";
  roundRect(ctx,-13,54,27,14,6);
  ctx.restore();
 }

 leg(-1,legL);
 leg(1,legR);

 // Body
 ctx.save();
 ctx.rotate(bodyTilt*Math.PI/180);
 ctx.fillStyle=c.outfit;
 ctx.beginPath();
 ctx.moveTo(-31,-35);
 ctx.quadraticCurveTo(-42,-30,-39,10);
 ctx.lineTo(-33,65);
 ctx.quadraticCurveTo(0,77,33,65);
 ctx.lineTo(39,10);
 ctx.quadraticCurveTo(42,-30,31,-35);
 ctx.closePath();
 ctx.fill();

 // Outfit detail
 ctx.fillStyle=c.accent;
 ctx.fillRect(-4,-25,8,80);
 ctx.restore();

 // Arms
 function arm(side,angle){
  ctx.save();
  ctx.translate(side*34,-25);
  ctx.rotate(angle*Math.PI/180);
  ctx.strokeStyle=c.skin;
  ctx.lineWidth=15;
  ctx.lineCap="round";
  ctx.beginPath();
  ctx.moveTo(0,0);
  ctx.lineTo(side*3,36);
  ctx.lineTo(side*5,62);
  ctx.stroke();

  ctx.fillStyle=c.skin;
  ctx.beginPath();
  ctx.arc(side*5,62,8,0,Math.PI*2);
  ctx.fill();
  ctx.restore();
 }

 arm(-1,armL);
 arm(1,armR);

 // Neck
 ctx.fillStyle=c.skin;
 roundRect(ctx,-9,-48,18,22,5);

 // Head
 ctx.save();
 ctx.translate(0,-70);
 ctx.rotate(headTilt*Math.PI/180);

 ctx.fillStyle=c.skin;
 ctx.beginPath();
 ctx.ellipse(0,0,31,37,0,0,Math.PI*2);
 ctx.fill();

 // Ears
 ctx.beginPath();
 ctx.arc(-30,2,6,0,Math.PI*2);
 ctx.arc(30,2,6,0,Math.PI*2);
 ctx.fill();

 // Hair
 ctx.fillStyle=c.hair;
 ctx.beginPath();
 ctx.arc(0,-12,32,Math.PI,Math.PI*2);
 ctx.quadraticCurveTo(32,-8,25,0);
 ctx.lineTo(20,-16);
 ctx.quadraticCurveTo(0,-30,-20,-15);
 ctx.lineTo(-25,0);
 ctx.quadraticCurveTo(-34,-8,-32,-15);
 ctx.closePath();
 ctx.fill();

 // Eyes
 ctx.fillStyle="#202333";
 ctx.beginPath();
 ctx.arc(-11,0,2.5,0,Math.PI*2);
 ctx.arc(11,0,2.5,0,Math.PI*2);
 ctx.fill();

 // Smile
 ctx.strokeStyle="#743e37";
 ctx.lineWidth=2;
 ctx.beginPath();
 ctx.arc(0,8,8,.15,Math.PI-.15);
 ctx.stroke();

 ctx.restore();
 ctx.restore();
}

function roundRect(ctx,x,y,w,h,r){
 ctx.beginPath();
 ctx.roundRect(x,y,w,h,r);
 ctx.fill();
}

window.AnimStudioRig={
 draw,
 motions,
 version:"1.0"
};

})();
