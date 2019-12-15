/*
* @Author: D
* @Date:   2019-12-15 11:47:33
* @Last Modified by:   D
* @Last Modified time: 2019-12-15 11:49:31
*/
var top0=document.getElementById("top0");
	top0=function(){
		setInterval(function(){
			var now=parseInt(getStyle(top0,"right"));
			// console.log(now);
			if(now==50){
				clearInterval(timer);
			}
			box.style.right= now+2+'px';
		},50);
	}


	
	function getStyle(obj, attr){
		if(obj.currentStyle){
			return obj.currentStyle[attr];
		} else {
			return getComputedStyle(obj, null)[attr];
		}
	}
	function animate(obj,json,callback){
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			var isStop = true;
			for(var attr in json){
				var now = 0;
				if(attr == 'opacity'){
					now = parseInt(getStyle(obj,attr)*100);
				}else{
					now = parseInt(getStyle(obj,attr));
				}
				var speed = (json[attr] - now) / 8;
				speed = speed>0?Math.ceil(speed):Math.floor(speed);
				var cur = now + speed;
				if(attr == 'opacity'){
					obj.style[attr] = cur / 100;
				}else{
					obj.style[attr] = cur + 'px';
				}
				if(json[attr] !== cur){
					isStop = false;
				}
			}
			if(isStop){
				clearInterval(obj.timer);
				callback&&callback();
			}
		}, 30)
	}
	var box=document.getElementById("box");
	var oNavlist=document.getElementById("nav").children;
	var slider=document.getElementById("slider");
	var left=document.getElementById("left");
	console.log(slider);
	var right=document.getElementById("right");
	var index=1;
	var timer;
	var timer0;
	var isMoving=false;
	var top1=document.getElementById("top1");

	box.onmouseover=function(){
		animate(left, {opacity:50});
		animate(right, {opacity:50});
		clearInterval(timer);
	}
	function getStyle(obj,style) {  
		if(obj.currentStyle) 
		{  
		    return obj.currentStyle[style];  
		} 
		else 
		{  
		    return getComputedStyle(obj)[style];  
		}  
	}
	window.onload=function(){
		timer0 = setInterval(function(){
			var now=parseInt(getStyle(top1,"left"));
			// console.log(now);
			top1.style.left= now-1+'px';
			if(now<=-500){
				top1.style.left=1200+"px";
			}
		},10);
	}


	//鼠标滑出开定时器
	box.onmouseout=function(){
		animate(left, {opacity:0});
		animate(right, {opacity:0});
		timer=setInterval(next,3000);
	}
	right.onclick=next;
	left.onclick=prev;
	for(var i=0;i<oNavlist.length;i++){
		oNavlist[i].index=i;
		oNavlist[i].onclick=function(){
			index=this.index+1;
			navmove();
			animate(slider, {left:-1200*index});
		}
	}
	function next(){
		if(isMoving){
			return
		}
		isMoving=true;
		index++;
		navmove();
		animate(slider, {left:-1200*index},function(){
			if(index==6){
				slider.style.left="-1200px";
				index=1;
			}
			isMoving=false;
		});
	}
	function prev(){
		if(isMoving){
			return
		}
		isMoving=true;
		index--;
		navmove();
		animate(slider, {left:-1200*index},function(){
			if(index==0){
				slider.style.left="-6000px";
				index=5;
			}
			isMoving=false;
		});
	}
	function navmove(){
		for(var i=0;i<oNavlist.length;i++){
			oNavlist[i].id="";
		}
		if(index>5){
			oNavlist[0].id="active";
		}
		else if(index<=0){
			oNavlist[4].id="active";
		}
		else {
			oNavlist[index-1].id="active";
		}
	}
	timer=setInterval(next,3000);