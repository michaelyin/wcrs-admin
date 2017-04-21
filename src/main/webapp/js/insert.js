var insert=document.getElementById('insert');
var proSel=insert.getElementsByTagName('select')[0];
var inDelMoney=insert.getElementsByTagName('input')[0];
var nextBtn=document.getElementById("nextBtn");
var infoConfirm=document.getElementById("infoConfirm");
var productId=infoConfirm.getElementsByClassName("productId")[0];
var amount=infoConfirm.getElementsByClassName("amount")[0];
var cover=document.getElementById("cover");
var nextBtn=document.getElementById("nextBtn");
var confirmBtn=document.getElementById("confirmBtn");
var cancel = document.getElementById("cancel");

var zUnionID = document.getElementById("zUnionID");
var zPhone = document.getElementById("phone");
var zWechatname = document.getElementById("wechatname1");
var zUsername = document.getElementById("username1");

var json  = "";

nextBtn.onclick=function(){
 // 显示输入的信息
     var index=proSel.selectedIndex;
     productId.value=proSel.options[index].text;
     //获得产品的序号
     productId.num=proSel.options[index].value;
     amount.value=inDelMoney.value;
     amount.num=amount.value;
     //将文本框设为只读
     zPhone.readOnly=true;
     zWechatname.readOnly=true;
     zUsername.readOnly=true;
     productId.readOnly=true;
     amount.readOnly=true;
     cover.style.display='block';
     infoConfirm.style.display='block';
     document.documentElement.style.overflow='hidden';
     //获取url
     var url = window.location.href;
     //获得unionid                                                               
     var unionId = url.split("?")[1].split("=")[1]; 
     //获取phone                                                             
     var Phone = url.split("?")[2].split("=")[1];
     var Wechatname = url.split("?")[3].split("=")[1];
     var Username = url.split("?")[4].split("=")[1];
     zUnionID.value = unionId;
     zUnionID.num=unionId;
     zPhone.value = Phone;
     zWechatname.value = Wechatname;
     zUsername.value= decodeURI(Username);

     //获得确认表单中的input数组中
     var inputs=infoConfirm.getElementsByTagName("input");
     //转换成json字符串,key为className,value为对应input的value
     json="{";
       for(var i=0;i<inputs.length;i++){
        if(i!=1 && i!=2 && i!=3){
            json+="\"";
            json+=inputs[i].className+"\"";
            json+=":";
            json+="\"";
            json+=inputs[i].num+"\",";
        }
       }
     json=json.substring(0,json.length-1);
     json+="}";
     var locat1=json.indexOf('productId')+11;
     var locat2=json.indexOf(',\"amount');
     var json1=json.substring(0,locat1);
     var json2=json.substring(locat2);
     json=json1+productId.num+json2;
};
//确认按钮，点击提交信息
confirmBtn.onclick=function(){
    axios.post('http://59.110.113.110/secure/userproduct', JSON.parse(json))
            .then(function (res) {
              alert("提交成功");
              location.href="op-insert.html";
            }).catch(function (err) {
             alert("提交失败");
            });
    };
cancel.onclick=function(){
  	cover.style.display='none';
  	infoConfirm.style.display='none';
  	document.documentElement.style.overflow='auto';
};