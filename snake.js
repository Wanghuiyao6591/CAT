$(function() {
  $('.start1').addClass('kaishi',function(){
  })
  $('.play').addClass('kaishi',function(){
  })
  $('.play').on('click',function(){
    $('.play.kaishi').attr('style','display:none');
    start();
    $('.zan').on('click',function(e){
      e.preventDefault();
      if($('.zan').text()=='继续'){
        $('.tishi').attr('style','display:none');
        start();
        $('.zan').text('暂停');
      }else{
        pause();
        $('.tishi').attr('style','display:block').text('休息一下等你回来');
        $('.zan').text('继续');
      }
    })
  })
	//画场景  规划坐标
  	for (var i = 0; i < 20; i++) {
    	for (var j = 0; j < 20; j++) {
      		$('<div>')
      		.addClass('block')
      		.attr('id', i + '-' + j)
      		.appendTo('.changjing');
    	}
  	}
  	//数据
  	var mao = [
  		{x: 0,y: 0} 
  	];
  	var shu = {
  		x:8,
  		y:8
  	};
  	var maoBiao={
  		'0-0':true,
  	};

  	//初始化函数
  	var dian = function(pos) {
  		return $('#' + pos.x + '-' + pos.y);
  	}
  	var init = function() {
  		for (var i = 0; i < mao.length; i++) {
    		dian(mao[i]).addClass('mao');
  		}
  		dian(shu).addClass('shu');
  	}


  	//放老鼠
  	function fangshiwu() {
    	do{
    		var x = Math.floor(Math.random() * 20);
    		var y = Math.floor(Math.random() * 20);
    	}while(maoBiao[x+'-'+y]);
    	$('#' + x + '-' + y).addClass('shu');
    	return {
      		x: x,
      		y: y
    	};
  	}
  	var shu = fangshiwu();
  
  	//移动
  	fangxiang = 'right';
  	function move() {
    	var old = mao[mao.length - 1];
    	if (fangxiang === 'right') {
      		var newH = {
        		x: old.x,
        		y: old.y + 1
      		};
    	}
    	if (fangxiang === 'left') {
      		var newH = {
        		x: old.x,
        		y: old.y - 1
      		};
    	}
    	if (fangxiang === 'down') {
      		var newH = {
        		x: old.x + 1,
        		y: old.y
      		};
    	}
    	if (fangxiang === 'up') {
      		var newH = {
        		x: old.x - 1,
        		y: old.y
      		};
    	}
    	mao.push(newH);
    	maoBiao[newH.x + '-' +newH.y] = true;
    	$('#' + newH.x + '-' + newH.y).addClass('mao');

    	if(newH.y > 19 || newH.y < 0 || newH.x < 0 || newH.x >19) {
    	  $('.tishi').attr('style','display:block').text('啊哦，要再来一次嘛');
    		pause();
    		return;
    	}
    
    	if (newH.x === shu.x && newH.y === shu.y) {
      		$('#' + shu.x + '-' + shu.y).removeClass('shu');
      		shu = fangshiwu();
    	} else {
      		var weiba = mao.shift();
      		$('#' + weiba.x + '-' + weiba.y).removeClass('mao');
      		delete maoBiao[weiba.x + '-' +weiba.y];
    	}
  	}


  	$(document).on('keydown',function(e){
  		e.preventDefault();
  		var biao={
  			'left':37,
  			'right':39,
  			'up':38,
  			'down':40,
  		}
  		if(Math.abs(e.keyCode-biao[fangxiang])===2){
  			return;
  		}
  		if (e.keyCode === 37) {
      		fangxiang = 'left';
    	}
    	if (e.keyCode === 39) {
      		fangxiang = 'right';
    	}
    	if (e.keyCode === 38) {
      		fangxiang = 'up';
    	}
    	if (e.keyCode === 40) {
     		fangxiang = 'down';
    	}
  	})
    	

  	//开始
  	var timeID;
  	function start(){
  		timeID=setInterval(move, 500);
  	}
  	//暂停
  	function pause(){
  		clearInterval(timeID);
  	}
    $('.tishi').on('click',function(){
      $('.tishi').attr('style','display:none');
      location.reload();
    })
})