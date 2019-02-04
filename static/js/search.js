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
    q = q.split("'").join("''");
    q = q.trim();
    $("#q").val(q);
	if (getParam("op") == "or") {
		$("#or").prop("checked", true);
	}
	else {
		$("#and").prop("checked", true);
	}
}

function escapehtml(s) {
	  return s.replace(/[&'`"<>]/g, function(match) {
    return {
      '&': '&amp;',
      "'": '&#x27;',
      '`': '&#x60;',
      '"': '&quot;',
      '<': '&lt;',
      '>': '&gt;',
    }[match]
  });
}

function json2html(json) {
	var li = [];
	for(var list of json.list){
		var r = list.res.split("-")[0]
		var stID = list.tID;
		var shandle = list.handle;
		var sqBody = list.qBody;
		var saBody = list.aBody;
		var qs = $("#q").val();
		for(q of qs.split(" ")) {
			q = escapehtml(q);
			stID = escapehtml(stID).split(q).join("<span class='match'>" + q + "</span>");
			shandle = escapehtml(shandle).split(q).join("<span class='match'>" + q + "</span>");
			sqBody = escapehtml(sqBody).split(q).join("<span class='match'>" + q + "</span>");
			saBody = escapehtml(saBody).split(q).join("<span class='match'>" + q + "</span>");
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
		li.push(h);
	}
	$("#f")[0].innerHTML += li.join("");
}

function searchCount (json){
	var l = 0;
	if (json.list != null) {
		l = json.list.length;	
	}
	var s = '<div class="footnote">「' + escapehtml($("#q").val()) + '」の検索結果 - ' + l + '件'
	if (l >= 1000) {
		s += '以上（1000件まで表示）'
	}
	s += '</div>'
	$("#f").append(s);
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
    		$("#q").val($("#q").val().split("\\\\").join("\\").split("\\\"").join("\"").split("''").join("'"));
			searchCount(json);
			json2html(json);
		}).fail(function(jqXHR, textStatus, errorThrown ) {
			$("#f").text(textStatus);
	});
});
