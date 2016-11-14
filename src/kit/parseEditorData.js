import $ from 'jquery';

export default{
	getType(node) {
		if(!node) {
			return null;
		}
		 var type = node.attr("data-widget") || (node.find("img") ? node.find("img").attr("data-widget") : "");
		 return type;
	},
	parseToJson(html){
		var doms = $(html),node = doms.first();
		var cards = [],content = [];
		var index = 0;

		//依次遍历doms,parse节点数据
		while(node.length) {
			node = $(node);
			var text =  node.text();
			var type = this.getType(node);
			var isHasContent = type || (!type && text != ''); //是否有内容

			if(isHasContent) {
				cards[index] = cards[index] ? cards[index] : {};
				var card = cards[index];
				if(!type) {
					text =  node.text();
					content.push( node.text() );
					card.type = "text";
					card.content = content.join("");
					card.order = index;
					content = [];
					index++;	
				} 
				else if(type == "video") {
					card.content = node.attr("data-val");
					card.type = type;
					card.order = index;
					index++;
				} else if(type == "img"){
					//有可能一个p下面有多个img和文字
					var tmpNode = node[0].childNodes;
					var tmpLen = tmpNode.length;
					for(var i=0; i < tmpLen;i++) {
						cards[index] = cards[index] ? cards[index] : {};
						card = cards[index];
						var ele = tmpNode[i];
						if(ele.getAttribute && ele.nodeName == "IMG"){
							card.content = ele.getAttribute("src");
							card.type = type;
							card.order = index;
							index++;
						} else if (ele.nodeName == "#text"){
							card.content = ele.nodeValue;
							card.type = "text";
							card.order = index;
							index++;
						}
					}
				}
			}
			node = node.next();
		}

		return cards;
	}
}