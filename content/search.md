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
<script src="../js/search.js"></script>
<form id="form" action="" method="get">
<input type="text" id="q" name="q">
<input type="radio" id="and" name="op" value="and">
<label for="and">AND</label>
<input type="radio" id="or" name="op" value="or">
<label for="or">OR</label>
<input type="submit">
</form>
<div id="f"></div>
