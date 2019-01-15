---
title: "Search"
---
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
{{< script >}}
function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$(document).ready(function(){
    $("#words").val(getParam("words"));
    $("#op").val(getParam("op"));
	$("#d").text(getParam("words"));
	$.ajax({	
        url:"https://nowaiuqi8g.execute-api.ap-northeast-1.amazonaws.com/q",
		type:"GET",		// 使用するHTTPメソッド
		data:$("#form").serialize(), // 送信するデータ
		dataType:"json", // 応答のデータの種類 
						// (xml/html/script/json/jsonp/text)
		timespan:1000 		// 通信のタイムアウトの設定(ミリ秒)
		}).done(function(data1,textStatus,jqXHR) {
				var data2 = JSON.stringify(data1);
				// 3. キーを指定して値を表示 
				$("#q").text(data2);

		// 6. failは、通信に失敗した時に実行される
		}).fail(function(jqXHR, textStatus, errorThrown ) {
				$("#q").text(textStatus); //例：error
		// 7. alwaysは、成功/失敗に関わらず実行される
		}).always(function(){
				$("#d").text(getParam("words"));
				
	});
});
{{< /script >}}

<form id="form" action="" method="get">
<input type="text" id="words" name="words">
<input type="text" id="op" name="op">
<input type="submit">
</form>
<div id="q"></div>
<div id="d"></div>
