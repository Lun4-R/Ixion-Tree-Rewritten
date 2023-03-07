addLayer("CORE", {
    name: "CORE", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "∞", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    color: "#ffffff",
    resource: "CORE", // Name of prestige currency
    row: 0,
    branches: ["M"],
    infoboxes:{
        Text1: {
            title: "CORE 0 - INTRODUCTION",
            titleStyle: {'color': '#000000'},
            body: `The Heart of Ixion Tree<br>
            <br>
            This CORE 0 Layer. It serves no progression purpose but here you can find info and special data.`,
            bodyStyle: {'background-color': "#ffffff",
            "color": "#000000"}
            
        },
        Text2: {
            title: "CORE 0 - MATTER",
            titleStyle: {'color': '#000000'},
            body: `Matter that is produced by its dimensions, CORE resource<br>
            <br>
            Matter is produced by Matter Dimensions. Those are considered as keys to universe secrets. With almost century long research, there isn't alot of infomation found about what Matter can do and what purpose it serves in science terms. Reach to Double Floating-Point Matter to cause Big Crunch...`,
            bodyStyle: {'background-color': "#ffffff",
                "color": "#000000"}

        },
        Text3: {
            title: "CORE 0 - NEUTRONS",
            titleStyle: {'color': '#000000'},
            unlocked() {
                if (player.N.best.gte(1)) {
                    return true
                }
            },
            body: `Neutrons are atom bodies that have no charge but they can be used to produce extra energy, CORE 1 resource<br>
            <br>
           Neutrons are atomic bodies that no charge but they can be used to create some very simple elements to boost Matter production. Neutrons also can be used to produce Neutron Fuel Cells for extra Matter boost. You unfortunately don't have enough knowledge for NFC use somewhere else.`,
            bodyStyle: {'background-color': "#ffffff",
                "color": "#000000"}

        }
    },   
    tabFormat: {
        "CORE 0": {
            unlocked() {
                return true
            },
            content: [
                ["row", [["infobox", "Text1"], ["infobox", "Text2"], ["infobox", "Text3"]]]

            ]
        },
    },
    
    layerShown() {
        return true
    }
})