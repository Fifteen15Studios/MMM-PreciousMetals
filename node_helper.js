/* Magic Mirror
 * Module: MMM-PreciousMetals
 * 
 * MIT Licensed
 */
const NodeHelper = require('node_helper');
const fetch = require("node-fetch");

module.exports = NodeHelper.create({

    start: function() {
        console.log("Starting node_helper for: MMM-PreciousMetals");
    },

    getMetals: function(url) {
		fetch(url).then(response => {
			response.json().then(data => {
				this.sendSocketNotification("METAL_PRICE_RESULTS", data);
			})
		}), error => {
			console.error(this.name + ' ERROR:', error);
		}
    },
    
    getCommodities: function(url) {
		console.log("MMM-PreciousMetals: commodity price URL: " + url);
		fetch(url).then(response => {
			response.json().then(comData => {
				this.sendSocketNotification("COMMODITY_PRICE_RESULTS", comData);
			})
		}), error => {
			console.error(this.name + ' ERROR:', error);
		}
    },

    socketNotificationReceived: function(notification, url) {
        if (notification === "GET_METAL_PRICES") {
			console.log("MMM-PreciousMetals: in helper. Getting metals prices...");
            this.getMetals(url);
        }
		if (notification === "GET_COMMODITY_PRICES") {
			console.log("MMM-PreciousMetals: in helper. Getting commodities prices...");
            this.getCommodities(url);        
		}
    }
});
