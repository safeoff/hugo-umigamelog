---
title: "オカルト板ウミガメのスープ保管庫"
date: 2019-01-05T12:44:18+09:00
---
過去問から全文検索ができます。出題されたスレッドの杯数・出題者名・レスの本文が検索対象です。  
 「kameokun」で亀夫君問題、「mikaiketsu」で未解決問題が検索できます。  

<form id="form" action="search" method="get">
<input type="text" id="words" name="words">
<input type="text" id="op" name="op">
<input type="submit">
</form>
<div id="q"></div>
<div id="d"></div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js" ></script>
{{< script >}}
$( function() {

$("#button1").click(
function(){
	$("#span6").text("データ取得中です");

	// 1.$.ajaxメソッドで通信を行います。
	//  20行目のdataは、フォームの内容をserialize()している
	//  →serialize()の内容は、cs1=custom1&cs2=custom2
	$.ajax({	
        url:"https://nowaiuqi8g.execute-api.ap-northeast-1.amazonaws.com/q",
		type:"GET",		// 使用するHTTPメソッド
		data:$("#form1").serialize(), // 送信するデータ
		dataType:"json", // 応答のデータの種類 
						// (xml/html/script/json/jsonp/text)
		timespan:1000 		// 通信のタイムアウトの設定(ミリ秒)

		// 2. doneは、通信に成功した時に実行される
		//  引数のdata1は、通信で取得したデータ
		//  引数のtextStatusは、通信結果のステータス
		//  引数のjqXHRは、XMLHttpRequestオブジェクト
		}).done(function(data1,textStatus,jqXHR) {
				$("#span1").text(jqXHR.status); //例：200
				$("#span2").text(textStatus); //例：success

				// 4. JavaScriptオブジェクトをJSONに変換
				var data2 = JSON.stringify(data1);
				// 3. キーを指定して値を表示 
				$("#span4").text(data2);
				console.log(data2); //コンソールにJSONが表示される

		// 6. failは、通信に失敗した時に実行される
		}).fail(function(jqXHR, textStatus, errorThrown ) {
				$("#span1").text(jqXHR.status); //例：404
				$("#span2").text(textStatus); //例：error
				$("#span3").text(errorThrown); //例：NOT FOUND

		// 7. alwaysは、成功/失敗に関わらず実行される
		}).always(function(){
				$("#span6").text("complete");
				
	});
});
});
{{< /script >}}
<p>jqXHR.statusを表示：<span id="span1"></span></p>
<p>textStatusを表示：<span id="span2"></span></p>
<p>errorThrownを表示：<span id="span3"></span></p>
<p>表示1：<span id="span4"></span></p>
<p>表示2：<span id="span5"></span></p>
<p>表示3：<span id="span6"></span></p>

<p>ボタンを押すと通信が始まります</p>

<form id="form1">
<input type="button" id="button1" value="ボタン1">
<p>テキストボックス１</p>
<input type="text" name="words" maxlength="10">
<p>テキストボックス２</p>
<input type="text" name="op" maxlength="10">
</form>
