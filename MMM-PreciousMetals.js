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
		this.url = 'https://api.metals.live/v1/spot';
        this.prices = [];
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
		this.prices.forEach(obj => {			
			Object.entries(obj).forEach(([key, value]) => {
				// TODO: Make metal list into object, so it is sortable
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
		
		wrapper.appendChild(metalsHtml);
		
		return wrapper;
	},
	
	getPrices: function() {
		console.log(this.name + ": getting prices...");
        this.sendSocketNotification("GET_METAL_PRICES", this.url);
    },
	
	scheduleUpdate: function() {
        setInterval(() => {
            this.getPrices();
        }, this.config.updateInterval);
    },
	
	socketNotificationReceived: function(notification, payload) {	
        if (notification === "METAL_PRICE_RESULTS") {
            this.prices = payload;
			this.loaded = true;
			this.updateDom();
        }
    },
});