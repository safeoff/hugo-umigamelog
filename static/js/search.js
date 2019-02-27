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

function highlight(arr, str1) {
	var str2 = str1;
	for(var q of arr) {
		str2 = str2.replace(new RegExp(q, 'g'), '靆' + q + '皰');
	}
	return str2;
}

function highlightActivate(str1) {
	str2 = str1;
	str2 = str2.replace(new RegExp('靆', 'g'), '<mark>');
	str2 = str2.replace(new RegExp('皰', 'g'), '</mark>');
	return str2;
}

function json2html(json) {
	var li = [];
	var qs = $("#q").val().split(" ");
	for(var list of json.list) {
		var r = list.res.split("-")[0]
		var stID = highlight(qs, list.tID);
		var shandle = highlight(qs, list.handle);
		var sqBody = highlight(qs, list.qBody);
		var saBody = highlight(qs, list.aBody);
		var h = '<div class="box qa"><div class="footnote">'
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
	$("#f")[0].innerHTML = highlightActivate($("#f")[0].innerHTML)
}

function searchCount(json) {
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
