// MMM-PreciousMetals.js

/* Magic Mirror
 * Module: MMM-PreciousMetals
 *
 * MIT Licensed
 */
Module.register("MMM-PreciousMetals", {

	// Module config defaults.
    defaults: {
        apiKey: "",
        currency: "USD",
        unit: "toz",
        showRetrievalTime: true,
		metals: ["silver","gold"],
        currencies: [],
		updateInterval: 3 * 60 * 60 * 1000 // every 3 hours, total of 248 per month in a 31 day month
	},

    // Set defaults for variables
	start: function() {
		this.baseUrl = 'https://api.metals.dev';
		this.metalsUrl = '/v1/latest';
        this.metals = undefined;
        this.metalsTime = undefined;
		this.getPrices();
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
		
		if(this.metals != undefined) {
    		// Parse through the each item in json value
			Object.entries(this.metals).forEach(([key, value]) => {
                if(key == "metals") {
                    // parse each metal
                    Object.entries(value).forEach(([key1, value1])  => {
			            // Only show item is it's in the list
			            if(this.config.metals.includes(key1)) {
				            // Line break after each new item
				            if(count > 0) {
					            metalsHtml.innerHTML = metalsHtml.innerHTML + "<BR>";
				            }
				            // Capitalize the name of the metal
				            var newKey = key1[0].toUpperCase() + key1.slice(1)
				            
				            metalsHtml.innerHTML = metalsHtml.innerHTML + newKey + ": " + value1;
				            count = count + 1;
			            }
                    });
                }
                if(key == "currencies") {
                    // If also retrieved metals, leave empty line between metals and currencies.
                    if(count > 0) {
			            metalsHtml.innerHTML = metalsHtml.innerHTML + "<BR>";
		            }
                    // parse each currency
                    Object.entries(value).forEach(([key1, value1])  => {
			            // Only show item is it's in the list
			            if(this.config.currencies.includes(key1)) {
				            // Line break before each new item
				            if(count > 0) {
					            metalsHtml.innerHTML = metalsHtml.innerHTML + "<BR>";
				            }
				            // Capitalize the name of the metal
				            var newKey = key1[0].toUpperCase() + key1.slice(1)
				            
				            metalsHtml.innerHTML = metalsHtml.innerHTML + newKey + ": " + value1;
				            count = count + 1;
			            }
                    });
                }
                if(this.config.showRetrievalTime === true && key === "timestamps") {
                    // Leave blank line between values and times
                    metalsHtml.innerHTML = metalsHtml.innerHTML + "<BR>";
                    // parse each timestamp
                    Object.entries(value).forEach(([key1, value1])  => {
                        // Add time of metals retrieval
                        if(this.config.metals != [] && key1 === "metal") {
                            this.metalsTime = value1;
                            if(count > 0) {
                                metalsHtml.innerHTML = metalsHtml.innerHTML + "<BR>";
                                value1 = value1.replace("T", " ");
                                value1 = value1.replace("Z", "");
                                metalsHtml.innerHTML = metalsHtml.innerHTML + "Metals retrieved at: " + value1 + " UTC";
				            }
                        }
                        // Add time of currencies retrieval
                        if(this.config.currencies != [] && key1 === "currency") {
                            this.metalsTime = value1;
                            if(count > 0) {
					            metalsHtml.innerHTML = metalsHtml.innerHTML + "<BR>";
                                value1 = value1.replace("T", " ");
                                value1 = value1.replace("Z", "");
                                metalsHtml.innerHTML = metalsHtml.innerHTML + "Currencies retrieved at: " + value1 + " UTC";
				            }
                        }
                    });
                }
			});
		}

		wrapper.appendChild(metalsHtml);

		return wrapper;
	},

    // Format URL and then send notification to fetch prices
	getPrices: function() {
		console.log(this.name + ": getting prices...");
		newMetalsUrl = new URL(this.metalsUrl, this.baseUrl);
        newMetalsUrl.searchParams.append('api_key',this.config.apiKey);
        newMetalsUrl.searchParams.append('currency',this.config.currency);
        newMetalsUrl.searchParams.append('unit',this.config.unit);
        //console.log(this.name + ": URL: " + newMetalsUrl.toString()); // This line for debugging
        this.sendSocketNotification("GET_METAL_PRICES", newMetalsUrl);
    },
	
	scheduleUpdate: function() {
        setInterval(() => {
            this.getPrices();
        }, this.config.updateInterval);
    },
	
    // When notification is received, set variable and update UI
	socketNotificationReceived: function(notification, payload) {	
        if (notification === "METAL_PRICE_RESULTS") {
            this.metals = payload;
			this.loaded = true;
			this.updateDom();
        }
    },
});
