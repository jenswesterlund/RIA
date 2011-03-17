var main = {
	/**
	 * @object
	 * @name dom
	 * @description Holds references to the dom-objects in application
	 */
	dom: {
		title: "title",
		header: ".header",
		resultTitle: ".results",
		info: ".info",
		performSearch: "#performSearch",
		searchField: "#searchField",
		artistClick: "#artistClick",
		resultLink: "#resultLink",
		artistInfo: "#artistInfo",
		artistDisco: "#artistDisco",
		artistEvent: "#artistEvent",
		artistSimilar: "#artistSimilar"
	},
	
	/**
	 * @object
	 * @name api
	 * @description Contains lastfm-apikey
	 */
	api: {
		key: "29ef8ab233fd9e3b09457c6c16c2aa01"
	},
	
	/**
	 * @function
	 * @name setup
	 * @description Sets up application and sets references to the dom-objects, then initializes application
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
	 * @description Initalizes the application
	 */
	init: function(){
		this.dom.performSearch.click(function(){
			main.search();
		});
	},
	
	/**
	 * @function
	 * @name search
	 * @description The applications searchfunction
	 */
	search: function(art){
		lastfm.api_key = this.api.key;
		lastfm.search(encodeURIComponent(this.dom.searchField.val()), this.searchCallback);
	},
	
	/**
	 * @function
	 * @name searchCallback
	 * @param {Object} artist
	 * @description Searchcallback. Recieves data and call renderNewArtist with it 
	 */
	searchCallback: function(artist){
		this.dom.header.text("shout.fm - Searchresults");
		this.dom.resultLink.text(artist.getName());
		this.dom.resultLink.click(function(){
			main.renderNewArtist(artist);
		});
	},
	
	/**
	 * @function
	 * @name renderNewArtist
	 * @param {Object} artist
	 * @description Renders a new artist and set click-handlers on artist navigation menu
	 */
	renderNewArtist: function(artist){
	
		lastfm.getInfo(encodeURIComponent(artist.getName()), this.showSingleArtistInfo, artist);
		
		this.dom.artistInfo.click(function(){
			main.dom.info.text("");
			main.showSingleArtistInfo(artist);
		});
		
		this.dom.artistDisco.click(function(){
			main.dom.info.text("");
			if(artist.getDisco() == "unset"){
				lastfm.getAlbums(encodeURIComponent(artist.getName()), main.showSingleArtistDisco, artist);
			}
			else{
				main.showSingleArtistDisco(artist);
			}
		});
		
		this.dom.artistEvent.click(function(){
			main.dom.info.text("");
			if(artist.getEvents() == "unset"){
				lastfm.getEvents(encodeURIComponent(artist.getName()), main.showSingleArtistEvents, artist);
			}
			else{
				main.showSingleArtistEvents(artist);
			}
		});
		
		this.dom.artistSimilar.click(function(){
			main.dom.info.text("");
			if(artist.getSimilar() == "unset"){
				lastfm.getSimilar(encodeURIComponent(artist.getName()), main.showSingleArtistSimilar, artist);
			}
			else{
				main.showSingleArtistSimilar(artist);
			}
		});
	},
	
	/**
	 * @function
	 * @name showSingleArtistInfo
	 * @param {Object} artist
	 * @description Shows info about selected artist
	 */
	showSingleArtistInfo: function(artist){
		this.dom.header.text(artist.getName() + " - Biography");
		this.dom.info.text(artist.getInfo());
	},
	
	/**
	 * @function
	 * @name showSingleArtistDisco
	 * @param {Object} artist
	 * @description Shows artist discography
	 */
	showSingleArtistDisco: function(artist){
		this.dom.header.text(artist.getName() + " - Discography");
		var arr = artist.getDisco();
		if(arr != null){
			for(var i=0; i <= (arr.length - 1); i++){
				$('<li>' + arr[i] + '</li>').appendTo(this.dom.info);
			}
		}
		else{
			this.dom.info.text("Couldnt find any albums");
		}
	},
	
	/**
	 * @function
	 * @name showSingleArtistEvents
	 * @param {Object} artist
	 * @description Shows artist eventlist
	 */
	showSingleArtistEvents: function(artist){
		this.dom.header.text(artist.getName() + " - Events");
		var arr = artist.getEvents();
		if(arr != null){
			for(var i=0; i <= (arr.length - 1); i++){
				$("<li>" + arr[i] + "</li>").appendTo(this.dom.info);
			}
		}
		else{
			this.dom.info.text("No upcoming events");
		}
	},
	
	/**
	 * @function
	 * @name showSingleArtistSimilar
	 * @param {Object} artist
	 * @description Shows similar artists to the selected artist, making them clickable aswell
	 */
	showSingleArtistSimilar: function(artist){
		this.dom.header.text(artist.getName() + " - Similar Artists");
		var arr = artist.getSimilar();
		for(var i=0; i <= (arr.length - 1); i++){
			$("<li><a href='" + arr[i] + "' data-role='button' data-inline='true'>" + arr[i] + '</a></li>')
			.appendTo(this.dom.info)
			.click(function(){
				var name = $(this).find("a").attr("href");
				artist = new Artist(name);
				main.renderNewArtist(artist);
				return false;
			});
		}
		$("a[data-role='button']").button();
	}
};

var f;
for(f in main){ // set scope of all app funcs
	if ($.isFunction(main[f])){
		main[f] = $.proxy(main[f],main);
	}
}

$(document).ready(function() {main.setup();}); // Run application when DOM is ready