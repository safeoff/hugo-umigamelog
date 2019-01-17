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
    $("#op").val(getParam("op"));
	$("#d").text(getParam("q"));
	$.ajax({	
        url:"https://nowaiuqi8g.execute-api.ap-northeast-1.amazonaws.com/q",
		type:"GET",
		data:$("#form").serialize(),
		dataType:"json",
		timespan:1000
		}).done(function(json,textStatus,jqXHR) {
			for(var i in json.list){
				var r = json.list[i].res.split("-")[0]
				var h = '<div class="box"><div class="footnote">'
					+ '<a href="../posts/' + r + '">' + json.list[i].tID + '杯目 ' + json.list[i].res + '</a>'
					+ ' '
					+ '<a href="./?q=' + json.list[i].handle + '&op=and">' + json.list[i].handle + '</a>'
					+ ' '
					+ json.list[i].date
					+ '</div><div>'
					+ json.list[i].qBody
					+ '</div><br><div class="footnote">解説</div><div>'
					+ json.list[i].aBody
					+ '</div></div></div>';
				if (getParam("q") != "") {
					h = h.split(getParam("q")).join("<span class='match'>" + getParam("q") + "</span>");
				}
				$("#f").append(h);
			}
		}).fail(function(jqXHR, textStatus, errorThrown ) {
			$("#f").text(textStatus);
	});
});
{{< /script >}}

<form id="form" action="" method="get">
<input type="text" id="q" name="q">
<input type="hidden" id="op" name="op">
<input type="submit">
</form>
<div id="f"></div>
