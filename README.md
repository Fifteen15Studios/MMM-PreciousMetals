# MMM-PreciousMetals
Magic Mirror Module to show the price of certain precious metals (like gold and silver.) Also has the ability to show foreign exchange rates.

This module requires that you first obtain an API key from [metals.dev](https://metals.dev). To obtain a key, simply click the "Sign In" button at the top of the screen. If you do not already have an account, it will create one.

Default update time of every 3 hours will use 248 of your available 250 calls (for a free account) in a 31 day month.

Sample:

<img src="https://raw.githubusercontent.com/Fifteen15Studios/MMM-PreciousMetals/main/PreciousMetals-screenshot.png">

## Installation

In terminal, go to your MagicMirror's Module folder:
```
cd ~/MagicMirror/modules
```

Clone this repository:
```
git clone https://github.com/Fifteen15Studios/MMM-PreciousMetals.git
```

## Updating

In terminal, go to the Module's folder and pull the latest version from GitHub:
```
cd ~/MagicMirror/modules/MMM-PreciousMetals
git pull
```

## Using the module

To use this module, add it to the modules array in the `~/MagicMirror/config/config.js` file.

### Example 1
```javascript
modules: [
    {
        module: "MMM-PreciousMetals",
        header: 'Precious Metals',
        position: "top_left",
        config: {
            apiKey: "<Your API Key>"
        } // This will show gold and silver - the default values
    }
]
```

### Example 2
```javascript
modules: [
    {
        module: "MMM-PreciousMetals",
        header: 'Precious Metals',
        position: "top_right",
        config: {
            apiKey: "<Your API Key>",
            metals: ["gold","platinum"],
            showRetrievaltime: false, // don't display time that prices were retrieved.'
            unit: "g", // changes metal price units to grams instead of troy ounce
            updateInterval: 30 * 60 * 1000 // every 30 minutes
        }
    }
]
```

### Example 3
```javascript
modules: [
    {
        module: "MMM-PreciousMetals",
        header: 'Precious Metals',
        position: "top_right",
        config: {
            apiKey: "<Your API Key>",
            currency: "USD",
            metals: ["gold"], // will display price of gold
            currencies: ["CAD"],  // will display the USD to CAD exchange rate
            updateInterval: 1* 60 * 60 * 1000 // every 1 hour
        }
    }
]
```

## Configuration options

|Option|Default|Description|Acceptible Values|
|---|---|---|---|
|`apiKey`|`""`|Required API Key from [metals.dev](https://metals.dev).|A valid [metals.dev](https://metals.dev) API key|
|`currency`|`"USD"`|*OPTIONAL* Base currency for foreign exchange rates. Default is US Dollars.|See list at [https://metals.dev/symbols](https://metals.dev/symbols) under "Curencies"|
|`unit`|`"toz"`|Unit of metal prices to be displayed. Default is Troy Ounces.|See list at [https://metals.dev/symbols](https://metals.dev/symbols) under "Unit"|
|`showRetrievalTime`|`true`|Whether or not to display when the data was las retrieved from the server. Time is shown as UTC time.|`true` or `false`|
|`metals`|`["silver","gold"]`|An array of metals you would like to see prices of.| See list at [https://metals.dev/symbols](https://metals.dev/symbols). Any item listed under "Metals" is acceptable.|
|`currencies`|`["silver","gold"]`|An array of foreign exchange rates you would like to see.| See list at [https://metals.dev/symbols](https://metals.dev/symbols). Any item listed under "Currencies" is acceptable.|
|`updateInterval`| `3 * 60 * 60 * 1000` | How often to update prices - in milliseconds. Default is 3 hours. | Any integer greater than `0`. However, be careful when using low numbers|

## Future Improvements / Enhancements

Future Ideas:

* Support for custom sorting of values (alphabetical by name, or sorted by value)

## Community Support

**Have an idea? Start a [discussion](https://github.com/Fifteen15Studios/MMM-PreciousMetals/discussions), and I may implement it.**

**Found a bug? Submit an [issue](https://github.com/Fifteen15Studios/MMM-PreciousMetals/issues) and I'll take a look at it.**
