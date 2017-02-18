
// 立即执行函数
var playInit=(function(){
	var btnPre=$('.pre'),
		btnNext=$('.next'),
		btnPlay=$('.play'),
		liList=$('.pic-box li');
	var picAll=createImg([
		['img/01.jpg','img/02.jpg','img/03.jpg','img/04.jpg'],
		['img/05.jpg','img/06.jpg','img/07.jpg','img/08.jpg'],
		['img/09.jpg','img/10.jpg','img/11.jpg','img/12.jpg'],
		['img/13.jpg','img/15.jpg','img/14.jpg','img/16.jpg']
	]);
	var picIndex=0;
	var picAng=80;
	var picTime=200;
	var autoTimer=null;

  // 主函数
	function init(){
		configer();
		setEvent();
	}

  // 定义configer函数
	function configer(){
		var deg=6,
			intdeg=-7;
		liList.each(function(index){
			$(this).css({rotate:intdeg+(deg*index)+'deg'});
		})
		liList.css({'origin':['125px','500px']});
	}

  // 定义绑定事件的函数
	function setEvent(){
		btnPre.bind('click',function(){	
			 anigo(-1); //绑定切换图片函数，向右
			 return false; //阻止a链接跳转
		});
		btnNext.bind('click',function(){					
			anigo(1); //绑定切换图片函数，向左
			return false;
		});
		btnPlay.bind('click',function(){
		  // 如果当前按钮内容为play，点击后显示为pause，并执行auto函数
			if($(this).text()=='Play')	{
				$(this).text('Pause');
				autoGo();
			}else{
			  // 否则点击后显示为play，并执行auto函数
				$(this).text('Play');
				autoStop();
			}
			return false;
		});
	}

  // 创建图片对象
	function createImg(arr){
		var imgArr=[]; //创建一个空数组
		for(var k in arr){ //遍历参数中的每一项
			imgArr[k]=[]; //参数中的每一项都是一个数组
			for(var i in arr[k]){ //便利每一项中的每一项
				imgArr[k][i]=new Image(); //定义二维数组的每一项都是一个Image对象
				imgArr[k][i].src=arr[k][i]; //设置图片对象的src的值
			}
		}
		return imgArr;
	}
  // 定义切换图片的函数
	function anigo(d){
		picIndex+=d; //图片序列号没执行一次加1或者减1

		// 定义边界范围,实现首尾循环
		if(picIndex>picAll.length-1){ 
			picIndex=0; //超出最大值时重置为最小值
		}else if(picIndex<0){
			picIndex=picAll.length-1; //超出最小值时重置为最大值
		}
	  // 遍历所有的图片容器li
		liList.each(function(i){			
			var thisPic=$(this).find('img'), //获取当前li下的图片元素
				targetPic=$(picAll[picIndex][i]);  //获取上一组或者下一组图片中的第i张
				
				// 通过判断参数的值，掩饰时间赋值：
				//d=1时图片组从左至右每张延迟时间：以picTime为基准每张+picTime秒；
				//d=1时图片组从左至右每张延迟时间：以（picTime*最后一张的index）为基准每张-picTime秒；
			var thisTime=(d===1)?picTime*i:picTime*(liList.length-1-i); 
			// 将新图片插入当前的li
			$(this).append(targetPic);			
		  // 启动定时器，实现每一张延时
			setTimeout(function(){
				targetPic.css({origin:['-30px','500px'],rotate:(0-d)*picAng+'deg'});//改变图片初始角度
				thisPic.animate({rotate:d*picAng+'deg'}); //当前图片动画
				targetPic.animate({rotate:'0deg'},500,function(){ //下一组图片动画
					thisPic.remove(); //移除当前图片
				});
			},thisTime);
		 });
	}
  // 定义自动播放的函数
	function autoGo(){
		clearInterval(autoTimer);
		anigo(1);
		autoTimer=setInterval(function(){
			anigo(1);
		},3000);
	}
  // 定义停止播放的函数
	function autoStop(){
		clearInterval(autoTimer);
	}

	return init;//返回主函数
})();

playInit(); //调用立即执行函数

