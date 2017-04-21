var select=document.getElementById("select");
var unionId ="";
select.onclick=function(){
	var message=document.getElementById("message").value;
	document.getElementsByClassName('id')[0].innerHTML = '';
	document.getElementsByClassName('productid')[0].innerHTML = '';
	document.getElementsByClassName('amount')[0].innerHTML = '';
	document.getElementsByClassName('createT')[0].innerHTML = '';
	//获得产品信息
	var products=['信息港包年产品','信息港包月产品','信息港包两次产品','用友云产品'];
	axios.get('http://59.110.113.110/secure/user/phone/'+message, {})
        .then(function (res) {
        	 unionId = res.data.unionId;
        	 if (message!=0) {
		axios.get('http://59.110.113.110/secure/userproduct/uid/'+unionId, {})
        .then(function (res) {
        	//获得表格元素和列数
			var mytable=document.getElementById("mytable");
			var tdNum=document.querySelector(".userinfo").cells.length;
			var trNum= mytable.rows.length;
			//动态创建行和列 mytable:表格元素  tdNum:列数  trNum:行数
			function createTable(mytable,tdNum,trNum){
				var clNames=new Array();
				var tds=mytable.rows[1].cells;
				for(var a=0;a<tdNum;a++){
					clNames.push(tds[a].className);
				}
		    	for(var i=0;i<res.data.length-1;i++){
		    		var newTr=mytable.insertRow(trNum);
		    		trNum+=1;
		    		newTr.setAttribute("class","userinfo");
		    		for(var j=0;j<tdNum;j++){
						var newTd=newTr.insertCell(newTr.length);
						newTd.setAttribute("class",clNames[j]);
					}
		    	}
			}
			if(trNum<res.data.length){
				createTable(mytable,tdNum,trNum);
			}
			pages();
			//隔行变色
			for(var i=1;i<mytable.rows.length;i++){
				if(i%2==0){
					mytable.rows[i].style.background="#eee";
				}
			}
        	if (res.data.length>0) {
    			for (var k = 0; k < res.data.length ; k++) {
    				document.getElementsByClassName('id')[k].innerHTML = res.data[k].id;
		    		 document.getElementsByClassName('productid')[k].innerHTML = products[(res.data[k].productId)-1];
			         document.getElementsByClassName('amount')[k].innerHTML = res.data[k].amount;
			         document.getElementsByClassName('createT')[k].innerHTML = stampTodate(res.data[k].createT);
          		}
          }else{
    		alert("未查询到此人");
    		}
          })
	    }
		else{
				alert("请输入电话");
			}
          })	
};
//时间戳转换成日期
function stampTodate(stamp){
			var date = new Date(stamp);
			var Y = date.getFullYear();
			var M = date.getMonth()+1;
			var D = date.getDate();
			if(M<10){
				M='0'+M;
			}
			if(D<10){
				D='0'+D;
			}
			var d2 = Y+'-'+M+'-'+D;
			return  d2;
		}
