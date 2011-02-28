/**
 * @class lastfm
 * @property url		-	url to last.fm-api
 * @property api_key	-	api-key to use when communicating with api
 * @property format		-	specify the format the data is returned in. (json/xml) 
 */

var lastfm = {

	url: "http://ws.audioscrobbler.com/2.0/",
	api_key: "",
	format: "format=json",
	
	/**
	 * @function
	 * @name lastfm.search
	 * @description Search for an artist by name. Returns artist matches sorted by relevance.
	 * @param {String} query
	 * @return {String}
	 * @returns {String}
	 */
	search: function(query){
		return "Your search for " + query + " generated 1 result";
	},
	/**
	 * @function
	 * @name lastfm.getInfo
	 * @description Get the metadata for an artist. Includes biography.
	 * @param {String} artist - (Required) : The artist name
	 * @return {String}
	 * @returns {String}
	 */	
	getInfo: function(artist){
		return "to be implemented";
	},
	
	/**
	 * @function
	 * @name lastfm.getAlbums
	 * @description Get the top albums for an artist on Last.fm, ordered by popularity.
	 * @param {String} artist - (Required) : The artist name
	 * @return {String}
	 * @returns {String}
	 */
	getAlbums: function(artist){
		return "to be implemented";
	},
	
	/**
	 * @function
	 * @name lastfm.getEvents
	 * @description Get a list of upcoming events for this artist.
	 * @param {String} artist - (Required) : The artist name
	 * @return {String}
	 * @returns {String}
	 */
	getEvents: function(artist){
		return "to be implemented";
	},
	
	/**
	 * @function
	 * @name lastfm.getSimiliar
	 * @description Get all the artists similar to this artist 
	 * @param {String} artist - (Required) : The artist name
	 * @return {String}
	 * @returns {String}
	 */
	getSimilar: function(artist){
		return "to be implemented";
	}
};