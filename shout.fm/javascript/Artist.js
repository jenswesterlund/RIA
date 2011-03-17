/**
 * @author Jens Westerlund
 * @class Artist
 * @description Holds all information to one single artist
 * @param {String} name		-	The selected artists name from resultslist
 * @property name			-	The name of the artist
 * @property info			-	Information about the artist
 * @property disco			-	Discography from the artist
 * @property events			-	Events featuring the artist
 * @property similar		-	Similar artist to the selected artist
 */

function Artist(name) {

	this.name = name;
	this.info = "unset";
	this.disco = "unset";
	this.events = "unset";
	this.similar = "unset";

}
/**
 * @function
 * @name Artist.setName
 * @param {String} _name
 * @return {Void}
 * @returns {Void}
 */
Artist.prototype.setName = function(_name){
	this.name = _name;
};

/**
 * @function
 * @name Artist.getName
 * @return {String}
 * @returns {String}
 */
Artist.prototype.getName = function(){
	return this.name;
};

/**
 * @function
 * @name Artist.setInfo
 * @param {JSON} data - JSONdata from the apicall
 * @return {Void}
 * @returns {Void}
 */
Artist.prototype.setInfo = function(data){
	var str = data.replace(/(<([^>]+)>)/ig,"");
	this.info = str;
};


/**
 * @function
 * @name Artist.getInfo
 * @return {String}
 * @returns {String}
 */
Artist.prototype.getInfo = function(){
	return this.info;
};

/**
 * @function
 * @name Artist.setDisco
 * @param {JSON} data - JSON-data from the apicall
 * @return {Void}
 * @returns {Void}
 */
Artist.prototype.setDisco = function(data){
	if(data != null || data != undefined){
		if(data._attr.total != 0){
			var arr = new Array();
			var max = data._attr.total;
			if(max > 15){
				max = 15;
			}
			
			for(var i=0; i < max; i++){
				arr[i] = data.album[i].name;
			}
			
			this.disco = arr;
		}
		else{
			this.disco = null;
		}
	}
	else{
		this.disco = null;
	}
	
};

/**
 * @function
 * @name Artist.getDisco
 * @return {Array}
 * @returns {Array}
 */
Artist.prototype.getDisco = function(){
	return this.disco;
};

/**
 * @function
 * @name Artist.setEvents
 * @param {JSON} data - JSON-data from the apicall
 * @return {Void}
 * @returns {Void}
 */
Artist.prototype.setEvents = function(data){
	if(data != null || data != undefined){
		if(data.total != 0){
			if(data._attr.total > 1){
				var arr = new Array();
				for(var i=0; i <= (data._attr.total - 1); i++){
					arr[i] = "Date: " + data.event[i].startDate + " Location:" + data.event[i].venue.name + ", " + data.event[i].venue.location.city + ", " + data.event[i].venue.location.country;
				}
				this.events = arr;
			}
			else{
				var arr = new Array();
				arr[0] = "Date: " + data.event.startDate + " Location:" + data.event.venue.name + ", " + data.event.venue.location.city + ", " + data.event.venue.location.country;

				this.events = arr;
			}
		}
		else{
			this.events = null;
		}
	}
	else{
		this.events = null;
	}
};

/**
 * @function
 * @name Artist.getEvents
 * @return {Array}
 * @returns {Array}
 */
Artist.prototype.getEvents = function(){
	return this.events;
};

/**
 * @function
 * @name Artist.setSimilar
 * @param {JSON} data - JSON-data from the apicall
 * @return {Void}
 * @returns {Void}
 */
Artist.prototype.setSimilar = function(data){
	var arr = new Array();
	
	for(var i=0; i <= 15; i++){
		arr[i] = data.artist[i].name;
	}
	this.similar = arr;
};

/**
 * @function
 * @name Artist.getSimilar
 * @return {Array}
 * @returns {Array}
 */
Artist.prototype.getSimilar = function(){
	return this.similar;
};