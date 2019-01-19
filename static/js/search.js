function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function initParam() {
	var q = getParam("q").split("　").join(" ");
    q = q.split(/ +/g).join(" ");
    q = q.split("\\").join("\\\\");
    q = q.split("\"").join("\\\"");
    q = q.trim();
    $("#q").val(q);
	if (getParam("op") == "or") {
		$("#or").prop("checked", true);
	}
	else {
		$("#and").prop("checked", true);
	}
}

function json2html(json) {
	for(var list of json.list){
		var r = list.res.split("-")[0]
		var stID = list.tID;
		var shandle = list.handle;
		var sqBody = list.qBody;
		var saBody = list.aBody;
		var qs = $("#q").val();
		for(q of qs.split(" ")) {
			stID = stID.split(q).join("<span class='match'>" + q + "</span>");
			shandle = shandle.split(q).join("<span class='match'>" + q + "</span>");
			sqBody = sqBody.split(q).join("<span class='match'>" + q + "</span>");
			saBody = saBody.split(q).join("<span class='match'>" + q + "</span>");
		}
		var h = '<div class="box"><div class="footnote">'
			+ '<a href="../posts/' + list.tID + '#' + r + '">' + stID + '杯目 ' + list.res + '</a>'
			+ ' '
			+ '<a href="./?q=' + list.handle + '&op=and">' + shandle + '</a>'
			+ ' '
			+ list.date
			+ '</div><div>'
			+ sqBody
			+ '</div><br><div class="footnote">解説</div><div>'
			+ saBody
			+ '</div></div></div>';
		$("#f").append(h);
	}
}

$(document).ready(function(){
	initParam();
	$.ajax({	
        url:"https://nowaiuqi8g.execute-api.ap-northeast-1.amazonaws.com/q",
		type:"GET",
		data:$("#form").serialize(),
		dataType:"json",
		timespan:1000
		}).done(function(json,textStatus,jqXHR) {
    		$("#q").val($("#q").val().split("\\\\").join("\\").split("\\\"").join("\""));
			json2html(json);
		}).fail(function(jqXHR, textStatus, errorThrown ) {
			$("#f").text(textStatus);
	});
});
