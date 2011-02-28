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
	this.info = lastfm.getInfo(name);
	this.disco = lastfm.getAlbums(name);
	this.events = lastfm.getEvents(name);
	this.similar = lastfm.getSimilar(name);
	
}