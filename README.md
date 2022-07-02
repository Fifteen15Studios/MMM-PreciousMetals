# MMM-PreciousMetals
Magic Mirror Module to show the price of certain precious metals (like gold and silver)

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

## Limitations

* Only handles US dollars (limitation of the API)
* Only handles a few metals 
    * Does not handle commodities supported by the API. Only supports metals listed under "spot"

## Using the module

To use this module, add it to the modules array in the `~/MagicMirror/config/config.js` file.

### Example 1
```javascript
modules: [
    {
        module: "MMM-PreciousMetals",
        header: 'Precious Metals',
        position: "top_left",
        config: {} // This will show gold and silver - the default values
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
            metals: ["gold","platinum"],
            updateInterval: 30 * 60 * 1000 // every 30 minutes
        }
    }
]
```

## Configuration options

|Option|Default|Description|Acceptible Values|
|---|---|---|---|
|`metals`|`["silver","gold"]`|An array of metals you would like to see prices of.| See list on https://api.metals.live/. Any item listed under "spot" is acceptable. |
|`updateInterval` | `60 * 60 * 1000` | How often to update prices - in milliseconds. Default is 1 hour. | Any integer. However, be careful when using low numbers |

## Future Improvements / Enhancements

Future Ideas:

* Support for commodities
* Support for custom sorting of values (alphabetical by name, or sorted by value)

## Community Support

**Have an idea? Start a [discussion](https://github.com/Fifteen15Studios/MMM-PreciousMetals/discussions), and I may implement it.**

**Found a bug? Submit an [issue](https://github.com/Fifteen15Studios/MMM-PreciousMetals/issues) and I'll take a look at it.**
