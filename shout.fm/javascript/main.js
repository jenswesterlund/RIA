var main = {
	/**
	 * @object
	 * @name dom
	 * @description Holds references to the dom-objects in application
	 */
	dom: {
		resultTitle: ".results",
		info: ".info",
		disco: ".disco",
		events: ".events",
		similar: ".similar",
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
		this.dom.foo
		this.dom.searchField.click(function(){
			main.dom.searchField.val("");
		});
		
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
		$.mobile.pageLoading();
		lastfm.search(encodeURIComponent(this.dom.searchField.val()), this.searchCallback);
	},
	
	/**
	 * @function
	 * @name searchCallback
	 * @param {Object} artist
	 * @description Searchcallback. Recieves data and call renderNewArtist with it 
	 */
	searchCallback: function(artist){
		if(artist != null){
			main.renderNewArtist(artist);
			$.mobile.pageLoading(true);
			$.mobile.changePage('#singleArtist', 'slide', false, true);
		}
		else{
			$.mobile.pageLoading(true);
			$.mobile.changePage('#error', 'slide', false, true);
		}
	},
	
	/**
	 * @function
	 * @name renderNewArtist
	 * @param {Object} artist
	 * @description Renders a new artist and set click-handlers on artist navigation menu
	 */
	renderNewArtist: function(artist){
		lastfm.getInfo(encodeURIComponent(artist.getName()), this.showSingleArtistInfo, artist);
		this.dom.artistInfo.trigger("expand");
		
		this.dom.artistInfo.live("expand", function(){
			main.showSingleArtistInfo(artist);
		});
		
		this.dom.artistDisco.live("expand", function(){
			main.dom.disco.text("");
			if(artist.getDisco() == "unset"){
				lastfm.getAlbums(encodeURIComponent(artist.getName()), main.showSingleArtistDisco, artist);
			}
			else{
				main.showSingleArtistDisco(artist);
			}
		});
		
		this.dom.artistEvent.live("expand", function(){
			main.dom.events.text("");
			if(artist.getEvents() == "unset"){
				lastfm.getEvents(encodeURIComponent(artist.getName()), main.showSingleArtistEvents, artist);
			}
			else{
				main.showSingleArtistEvents(artist);
			}
		});
		
		this.dom.artistSimilar.live("expand", function(){
			main.dom.similar.text("");
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
		this.dom.info.text(artist.getInfo());
	},
	
	/**
	 * @function
	 * @name showSingleArtistDisco
	 * @param {Object} artist
	 * @description Shows artist discography
	 */
	showSingleArtistDisco: function(artist){
		var arr = artist.getDisco();
		if(arr != null){
			for(var i=0; i <= (arr.length - 1); i++){
				$('<li>' + arr[i] + '</li>').appendTo(this.dom.disco);
			}
		}
		else{
			this.dom.disco.text("Couldnt find any albums");
		}
	},
	
	/**
	 * @function
	 * @name showSingleArtistEvents
	 * @param {Object} artist
	 * @description Shows artist eventlist
	 */
	showSingleArtistEvents: function(artist){
		var arr = artist.getEvents();
		if(arr != null){
			for(var i=0; i <= (arr.length - 1); i++){
				//$("<li>" + arr[i] + "</li>").appendTo(this.dom.events);
				$(arr[i]).appendTo(this.dom.events);
			}
		}
		else{
			this.dom.events.text("No upcoming events");
		}
	},
	
	/**
	 * @function
	 * @name showSingleArtistSimilar
	 * @param {Object} artist
	 * @description Shows similar artists to the selected artist, making them clickable aswell
	 */
	showSingleArtistSimilar: function(artist){
		var arr = artist.getSimilar();
		for(var i=0; i <= (arr.length - 1); i++){
			$("<a href='" + arr[i] + "' data-role='button' data-inline='true'>" + arr[i] + '</a>')
			.appendTo(this.dom.similar)
			.click(function(){
				var name = $(this).attr("href");				
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