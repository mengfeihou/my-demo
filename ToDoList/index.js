/*document.onkeyup = function(ee){
	var e = ee || event;
	if(e.keyCode==13){
		alert(e.keyCode);
	}
}*/

window.onload = function(){
	new Ch().getcok();
	count();
	
}

$(document).keyup(function(ee){
	var e = ee || event;
//	e.stopPropagation?e.stopPropagation():e.cancelBubble=true;
	var target = e.target || e.srcElement;
//	if(e.keyCode==13 && target.nodeName == "INPUT"){
	if(e.keyCode==13 && $("#txt").is(":focus")){
//		alert(e.keyCode); 
		if($("#txt").val()){
			var txt = $("#txt").val();
			var str = `<li>
						<input type="checkbox" class="ch"/>                              
						<p>${txt}</p>
						<a href="javascript:;"></a>
					  </li>`;
			var otxt =str+ $("#start").html();
			$("#start").html(otxt);
			$("#txt").val("");
			console.log(txt);
		}else{
			alert("您还没有输入内容");
		}
	}
//	console.log($("#start").children().length);
	new Ch().setcok($("li"));
	count();
})


$("#start").on("click","li>a",function(){
//	alert($(this).parent().index());
	new Ch().remov($(this));
	count();
//	alert($(".del"));
})
$("#end").on("click","li>a",function(){
//	alert($(this).parent().index());
	new Ch().remov($(this));
	count();
//	alert($(".del"));
})
$("ul").on("click","li>input",function(){
//	alert($(this).parent().index());
//	new Ch().nock($(this));
	new Ch().ck($(this)).nock($(this));
	new Ch().setcok($("li"));
	count(); 
})

function count(){
	var cStart = $("#start").children("li").size();
	var eStart = $("#end").children("li").size();
	$("#count_start").html(cStart);
	$("#count_end").html(eStart);
}
count();
function Ch(){
	this.start = $("#start");
	this.end = $("#end");
	this.arr = [];
	this.remov = function(rem){
		rem.parent().remove();
		this.setcok($("li"));
		return this;
	}
	this.ck = function(rem){
		if(rem.prop("checked")){
			rem.parent().prependTo($("#end"));//;
//			alert(rem.parent().html());
			this.setcok($("li"));
		}
		return this;
	}
	this.nock = function(rem){
		if(!rem.prop("checked")){
			rem.parent().appendTo($("#start"));
//			alert(rem.parent().html());
			this.setcok($("li"));
		}
	}
	this.setcok = function(obj){
		for( var i = 0 ;i<obj.length ;i++){
			var json={
				che : obj.eq(i).children("input").prop("checked"),
				txt : obj.eq(i).children("p").html()
			}
			this.arr.push(json); 
		}
		setCookie("list",JSON.stringify(this.arr),3);
	}
	    
	this.getcok = function(){
		var getc = getCookie("list");
		var str_start = "";
		var str_end = "";
		for(var i = 0 ; i < getc.length ; i++){
			if(!getc[i].che){
				str_start += `<li>
								<input type="checkbox" class="ch"/>                              
								<p>${getc[i].txt}</p>
								<a href="javascript:;"></a>
							  </li>`
			}else{
				str_end += `<li>
								<input type="checkbox" class="ch" checked = "checked"/>                              
								<p>${getc[i].txt}</p>
								<a href="javascript:;"></a>
							  </li>`
			}
		}
		this.start.html(str_start);
		this.end.html(str_end);
	}
}
