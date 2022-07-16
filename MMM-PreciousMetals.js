// MMM-PreciousMetals.js

/* Magic Mirror
 * Module: MMM-PreciousMetals
 *
 * MIT Licensed
 */
Module.register("MMM-PreciousMetals", {

	// Module config defaults.
    defaults: {
		metals: ["silver","gold"],
		updateInterval: 60 * 60 * 1000 // every hour
	},
	
	start: function() {
		this.baseUrl = 'https://api.metals.live';
		this.metalsUrl = '/v1/spot';
		this.commoditiesUrl = '/v1/spot/commodities';
        this.metals = {};
        this.commodities = {};
		// get initial prices
		this.getPrices();
		// schedule updates every updateInterval
        this.scheduleUpdate();
    },
	
	getDom: function() {
		
		// Create base HTML element
		var wrapper = document.createElement("div");
		wrapper.className = "wrapper";
		
		// If data isn't loaded yet, display loading message
		if (!this.loaded) {
            wrapper.innerHTML = "Getting metal prices . . .";
            wrapper.classList.add("bright", "light", "small");
            return wrapper;
        }
		
		// Create secondary HTML element
		var metalsHtml = document.createElement("div");
		metalsHtml.classList.add("small", "bright", "metalsHtml");
		var count = 0;
		
		// Parse through the prices of each item.
		if(this.metals.length > 0) {
			this.metals.forEach(obj => {			
				Object.entries(obj).forEach(([key, value]) => {
					// Only show item is it's in the list
					if(this.config.metals.includes(key)) {
						// Line break after each new item
						if(count > 0) {
							metalsHtml.innerHTML = metalsHtml.innerHTML + "<BR>";
						}
						// Capitalize the name of the metal
						var newKey = key[0].toUpperCase() + key.slice(1)
						
						metalsHtml.innerHTML = metalsHtml.innerHTML + newKey + ": $" + value;
						count = count + 1;
					}
				});
			});
		}
		
		if(this.commodities.length > 0) {
			this.commodities.forEach(obj => {			
				Object.entries(obj).forEach(([key, value]) => {
					// Only show item is it's in the list
					if(this.config.metals.includes(key)) {
						// Line break after each new item
						if(count > 0) {
							metalsHtml.innerHTML = metalsHtml.innerHTML + "<BR>";
						}
						// Capitalize the name of the metal
						var newKey = key[0].toUpperCase() + key.slice(1)
						
						metalsHtml.innerHTML = metalsHtml.innerHTML + newKey + ": $" + value;
						count = count + 1;
					}
				});
			});
		}
		
		wrapper.appendChild(metalsHtml);
		
		return wrapper;
	},
	
	getPrices: function() {
		console.log(this.name + ": getting prices...");
		newMetalsUrl = new URL(this.metalsUrl, this.baseUrl);
        this.sendSocketNotification("GET_METAL_PRICES", newMetalsUrl);
		newComUrl = new URL(this.commoditiesUrl, this.baseUrl);
        this.sendSocketNotification("GET_COMMODITY_PRICES", newComUrl);
    },
	
	scheduleUpdate: function() {
        setInterval(() => {
            this.getPrices();
        }, this.config.updateInterval);
    },
	
	socketNotificationReceived: function(notification, payload) {	
        if (notification === "METAL_PRICE_RESULTS") {
            this.metals = payload;
			this.loaded = true;
			console.log(this.name + ": metal prices received: " + payload.length);
			this.updateDom();
        }
        else if (notification === "COMMODITY_PRICE_RESULTS") {
            this.commodities = payload;
			this.loaded = true;
			console.log(this.name + ": commodity prices received: " + payload.length);
			this.updateDom();
        }
    },
});