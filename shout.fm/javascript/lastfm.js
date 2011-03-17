/**
 * @class lastfm
 * @property url		-	url to last.fm-api
 * @property api_key	-	api-key to use when communicating with api
 * @property format		-	specify the format the data is returned in. (json/xml) 
 */

var lastfm = {

	url: "http://ws.audioscrobbler.com/2.0/?method=",
	api_key: "",
	format: "format=json",
	
	/**
	 * @function
	 * @name lastfm.search
	 * @description Search for an artist by name. Returns artist matches sorted by relevance.
	 * @param {String} query - The searchquery
	 * @param {Function} callback - Reference to the callback function
	 * @return {Void}
	 * @returns {Void}
	 */
	search: function(query, callback){
		var method = "artist.search&artist=" + query;
		var _op = 1;
		this.call(method, callback, _op);
	},
	/**
	 * @function
	 * @name lastfm.getInfo
	 * @description Get the metadata for an artist. Includes biography.
	 * @param {String} artistName - The artist name
	 * @param {Function} callback - Reference to the callback function
	 * @param {Object} artist - Reference to the artist-object
	 * @return {Void}
	 * @returns {Void}
	 */	
	getInfo: function(artistName, callback, artist){
		var method = "artist.getInfo&artist=" + artistName;
		var _op = 2;
		this.call(method, callback, _op, artist);
	},
	
	/**
	 * @function
	 * @name lastfm.getAlbums
	 * @description Get the top albums for an artist on Last.fm, ordered by popularity.
	 * @param {String} artistName - The artist name
	 * @param {Function} callback - Reference to the callback function
	 * @param {Object} artist - Reference to the artist-object
	 * @return {Void}
	 * @returns {Void}
	 */
	getAlbums: function(artistName, callback, artist){
		var method = "artist.getTopAlbums&artist=" + artistName;
		var _op = 3;
		this.call(method, callback, _op, artist);
	},
	
	/**
	 * @function
	 * @name lastfm.getEvents
	 * @description Get a list of upcoming events for this artist.
	 * @param {String} artistName - The artist name
	 * @param {Function} callback - Reference to the callback function
	 * @param {Object} artist - Reference to the artist-object
	 * @return {Void}
	 * @returns {Void}
	 */
	getEvents: function(artistName, callback, artist){
		var method = "artist.getEvents&artist=" + artistName;
		var _op = 4;
		this.call(method, callback, _op, artist);
	},
	
	/**
	 * @function
	 * @name lastfm.getSimiliar
	 * @description Get all the artists similar to this artist 
	 * @param {String} artistName - The artist name
	 * @param {Function} callback - Reference to the callback function
	 * @param {Object} artist - Refrence to the artist-object
	 * @return {Void}
	 * @returns {Void}
	 */
	getSimilar: function(artistName, callback, artist){
		var method = "artist.getSimilar&artist=" + artistName;
		var _op = 5;
		this.call(method, callback, _op, artist);
	},
	
	/**
	 * @function
	 * @name lastfm.call
	 * @param {String} method - The apimethod requested
	 * @param {Function} callback - Reference to the callback function
	 * @param {Int} option - Hold information on what function has called lastfm.call
	 * @param {Object} artist - The reference to an artistobject
	 * @return {Void}
	 * @returns {Void}
	 */
	call: function(method, callback, option, artist){
		$.yql(
				"SELECT * FROM json WHERE url = @lastfmUrl",
				{
					lastfmUrl: lastfm.url + method + "&api_key=" + lastfm.api_key + "&" + lastfm.format
				},
				function(data){
					switch(option){
						case 1:
							art = new Artist(data.query.results.results.artistmatches.artist[0].name);
							break;
						case 2:
							var art = artist;
							art.setInfo(data.query.results.artist.bio.summary);
							break;
						case 3:
							var art = artist;
							art.setDisco(data.query.results.topalbums);
							break;
						case 4:
							var art = artist;
							art.setEvents(data.query.results.events);
							break;
						case 5:
							var art = artist;
							art.setSimilar(data.query.results.similarartists);
							break;
						default:
							var art = new Artist(data.query.results.results.artistmatches.artist[0].name);
					}
					
					if($.isFunction(callback)){
						callback.call( this, art );
					}					
				}
		);
	}
};