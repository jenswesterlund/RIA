var main = {
	/**
	 * @object
	 * @name dom
	 */
	dom: {
		title: "title",
		header: ".header",
		resultTitle: ".results",
		performSearch: "#performSearch",
		searchField: "#searchField"
	},
	
	/**
	 * @function
	 * @name setup
	 */
	setup: function(){
		var key;
		for(key in this.dom){ // jQuerify all DOM-refs
			this.dom[key] = $(this.dom[key]);
		}
		this.init();
	},
	
	/**
	 * @function
	 * @name init
	 */
	init: function(){
		var art = new Artist();
		this.dom.performSearch.click(function(){
			main.search();
		});
	},
	
	/**
	 * @function
	 * @name search
	 */
	search: function(){
		this.dom.resultTitle.text(lastfm.search(this.dom.searchField.val()))
	}
};

var f;
for(f in main){ // set scope of all app funcs
	if ($.isFunction(main[f])){
		main[f] = $.proxy(main[f],main);
	}
}

$(document).ready(function() {main.setup();}); // Run application when DOM is ready