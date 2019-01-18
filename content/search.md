---
title: "Search"
---
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<style>
	.box {
		background-color: #fafafa;
		border: solid 1px #aaa;
		margin: 1.5em 0.2em;
		padding: 2em 1em;
	}
	.match {
		background-color: yellow;
		color: black;
	}
</style>
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
    $("#q").val(getParam("q"));
	if (getParam("op") == "or") {
		$("#or").prop("checked", true);
	}
	else {
		$("#and").prop("checked", true);
	}
	$.ajax({	
        url:"https://nowaiuqi8g.execute-api.ap-northeast-1.amazonaws.com/q",
		type:"GET",
		data:$("#form").serialize(),
		dataType:"json",
		timespan:1000
		}).done(function(json,textStatus,jqXHR) {
			for(var i in json.list){
				var r = json.list[i].res.split("-")[0]
				var stID = json.list[i].tID;
				var shandle = json.list[i].handle;
				var sqBody = json.list[i].qBody;
				var saBody = json.list[i].aBody;
				var qs = getParam("q").replace("　", " ");
				for(q of qs.split(" ")) {
					stID = stID.split(q).join("<span class='match'>" + q + "</span>");
					shandle = shandle.split(q).join("<span class='match'>" + q + "</span>");
					sqBody = sqBody.split(q).join("<span class='match'>" + q + "</span>");
					saBody = saBody.split(q).join("<span class='match'>" + q + "</span>");
				}
				var h = '<div class="box"><div class="footnote">'
					+ '<a href="../posts/' + json.list[i].tID + '#' + r + '">' + stID + '杯目 ' + json.list[i].res + '</a>'
					+ ' '
					+ '<a href="./?q=' + json.list[i].handle + '&op=and">' + shandle + '</a>'
					+ ' '
					+ json.list[i].date
					+ '</div><div>'
					+ sqBody
					+ '</div><br><div class="footnote">解説</div><div>'
					+ saBody
					+ '</div></div></div>';
				$("#f").append(h);
			}
		}).fail(function(jqXHR, textStatus, errorThrown ) {
			$("#f").text(textStatus);
	});
});
{{< /script >}}

<form id="form" action="" method="get">
<input type="text" id="q" name="q">
<input type="radio" id="and" name="op" value="and">
<label for="and">AND</label>
<input type="radio" id="or" name="op" value="or">
<label for="or">OR</label>
<input type="submit">
</form>
<div id="f"></div>
