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

    getPrices: function(url) {
		fetch(url).then(response => {
			response.json().then(data => {
				this.sendSocketNotification("METAL_PRICE_RESULTS", data);
			})
		}), error => {
			console.error(this.name + ' ERROR:', error);
		}
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "GET_METAL_PRICES") {
			console.log("MMM-PreciousMetals: in helper. Getting prices...");
            this.getPrices(payload);
        }
    }
});
