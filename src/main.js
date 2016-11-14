(function() {
	var node = document.createElement('script');
	var jsHeader = '{{jsHeader}}';
	node.setAttribute('src', jsHeader  + '/ver.js?ver=' + Math.random());
	var head= document.getElementsByTagName('head')[0];
	head.appendChild(node);
})();