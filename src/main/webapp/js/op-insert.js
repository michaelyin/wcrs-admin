var searchbtn=document.getElementById("searchbtn");
var phone=document.getElementById('phone');
var insert= document.getElementById('insert');
var unionId= "";
var searchphone = "";
searchbtn.onclick=function(){
	searchphone=document.getElementById("searchphone").value;
	document.getElementById('wechatname').innerHTML = '';
	document.getElementById('username').innerHTML = '';
	document.getElementById('phone').innerHTML = '';
	document.getElementsByClassName('insert')[0].innerHTML='';
	if (searchphone!=0) {axios.get('http://59.110.113.110/secure/user/phone/'+searchphone, {})
        .then(function (res) {
        	if (res.data!=0) {
	          document.getElementById('wechatname').innerHTML = res.data.nickName;
	          document.getElementById('username').innerHTML = res.data.ticket;
	          document.getElementById('phone').innerHTML = res.data.phone;
	          document.getElementsByClassName('insert')[0].innerHTML='录入';
	          unionId = res.data.unionId;
	          wechatname = res.data.nickName;
	          username = res.data.ticket;
        	}else{
        		document.getElementsByClassName('insert')[0].innerHTML='';
        		alert("未查询到此人");
        	}
         })}
	else{
		alert("请输入手机号！");
	}
};
insert.onclick=function(){
	var url = "insert.html"; 
    searchphone=document.getElementById("searchphone").value;
	window.location.href=url + "?unionId=" + unionId+"?phone="+searchphone+"?wechatname="+wechatname+"?username="+username;
};