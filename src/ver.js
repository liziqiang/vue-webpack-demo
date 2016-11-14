(function() {
	var node = document.createElement('script');
	var jsHeader = '{{jsHeader}}';
	// 此处维护版本号
	var version = '{{version}}';
	var jobName = window.jobName || 'app';
	node.setAttribute('src', jsHeader +'/' + jobName + version + '.js');
	var head= document.getElementsByTagName('head')[0];
	head.appendChild(node);
})();