var Snake = function(ele,scoreele,speedele,x,y){

	this.cellWidth = 15;//??????С
	this.ele = document.getElementById(ele);
	this.cxt = this.ele.getContext("2d");
	this.x=x;
	this.y=y;
	this.scoreele = document.getElementById(scoreele);
	this.speedele = document.getElementById(speedele);

	//????canvas??С?????
	this.ele.width = this.cellWidth * this.x;
	this.ele.height = this.cellWidth * this.y;
	this.ele.style.border ="2px solid #000";

	this.changeDiretion();//??????????
}

Snake.prototype = {

	init:function(){
		//??????????á????js???????dom??

		this.direction = 1;//????  2?? 3??  4 ??
		this.nextDirection = '';
		this.snakeArr = [[0,parseInt(this.y/2)],[1,parseInt(this.y/2)]];
		this.speed = 1;
		this.score = 0;

		this.cxt.fillStyle ='#fff';
		this.cxt.fillRect(0,0,this.cellWidth*this.x,this.cellWidth*this.y);
		this.scoreele.innerHTML="我的得分：0";
		this.speedele.innerHTML="当前速度：1";

		this.createCoolPoint();
		this.drawCell(this.coolPoint,2);
		this.drawSnake();
		this.setTimer();
	},
	getCellArea:function(pos){//?????????????????????????[32,666];
		return [(pos[0]-1)*this.cellWidth+1,(pos[1]-1)*this.cellWidth+1];
	},
	setTimer:function(){
		var speedArr = [180,160,140,120,100,80,60,40,20];
		var speed = this.speed;
		if(speed>8){
			speed = 8;
		}
		(function(theThis){
			var that = theThis;
			that.timer = setTimeout(function() {
				that.moveSnake();
			}, speedArr[speed]);
		})(this);

	},
	moveSnake:function(){
		//??????????????鴦??

		this.direction = this.nextDirection == ''?this.direction:this.nextDirection;//???????????????????????????????????????bug.
		var direction = this.direction;
		var snakeArr = this.snakeArr;
		var snakeHead = snakeArr[snakeArr.length-1];
		switch(direction){
			case 1 ://????
			snakeHead = [snakeHead[0]+1,snakeHead[1]];
			break;
			case 2 ://????
			snakeHead = [snakeHead[0],snakeHead[1]+1];
			break;
			case 3 ://????
			snakeHead = [snakeHead[0]-1,snakeHead[1]];
			break;
			case 4 ://????
			snakeHead = [snakeHead[0],snakeHead[1]-1];
			break;
		}

		//???磬???????????????????á?
		if(in_array(snakeHead,snakeArr) || snakeHead[0]<0 || snakeHead[0]>this.x || snakeHead[1]<0 || snakeHead[1]>this.y){
			window.clearInterval(this.timer);
			alert('?????????????????????????????????????÷??'+this.score);
			this.init();
			return;
		}

		 snakeArr.push(snakeHead);//?????????????


		 this.drawCell(snakeHead,1);
		 if(snakeHead.toString() != this.coolPoint.toString()){
			var tail = snakeArr.shift();//?????β??
			this.drawCell(tail,0);

		}else{//???coolPoint
			this.createCoolPoint();
			this.drawCell(this.coolPoint,2);
			this.score = this.score + 10;
			this.scoreele.innerHTML="我的得分"+this.score;
			this.speed =  Math.ceil((this.score + 1)/100);
			this.speedele.innerHTML="当前速度"+this.speed;
		}

		this.setTimer();

	},

	createCoolPoint:function(){//???????coolPoint,???????snakeArr???????С?
		do{
			this.coolPoint = [getRandom(this.x),getRandom(this.y)];
		}while(in_array(this.coolPoint,this.snakeArr));
	},
	changeDiretion:function(){
		//?????????????????????????
		var that = this;
		document.onkeydown=function(event){
			var e = event || window.event || arguments.callee.caller.arguments[0];
			var direction = that.direction;
			var keyCode = e.keyCode;

			switch(keyCode){
				case 39://??
				if(direction!=1 && direction !=3){
					that.nextDirection = 1;
				}

				break;
				case 40://??
				if(direction!=2 && direction !=4){
					that.nextDirection = 2;
				}
				break;
				case 37://??
				if(direction!=1 && direction !=3){
					that.nextDirection = 3;
				}
				break;
				case 38://??
				if(direction!=2 && direction !=4){
					that.nextDirection = 4;
				}
				break;

				default:
				break;
			}
		};
	},
	drawSnake:function(){
		//??????С???
		var snakeArr = this.snakeArr;
		for (var i = 0,sLen=snakeArr.length; i < sLen; i++) {
			this.drawCell(snakeArr[i],1);
		};

	},
	drawCell:function(pos,type){//?????????????????????

		var colorArr = ['#fff','rgb(0, 0, 0)',"red"];
		var cxt = this.cxt;
		var area;
		cxt.fillStyle = colorArr[type];
		area = this.getCellArea(pos);
		cxt.fillRect(area[0],area[1],this.cellWidth-1,this.cellWidth-1);
	}
}

function moveClock() {
    moveSnake(head.d);
}
var isMove = false;
function beginGame() {
    !isMove && setInterval(moveClock, 300);
    isMove = true;
}
//????????????? 1??n???
function getRandom(n){
	return Math.floor(Math.random()*n+1)
}

//?ж???????????????????????С????toString()
function in_array(stringToSearch, arrayToSearch) {
	for (s = 0; s < arrayToSearch.length; s++) {
		thisEntry = arrayToSearch[s].toString();
		if (thisEntry == stringToSearch.toString()) {
			return true;
		}
	}
	return false;
}