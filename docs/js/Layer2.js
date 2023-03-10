addLayer("L2", {
    name: "Layer 2", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "L2", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "#ffb58d",
    requires: new Decimal(1e12), // Can be a function that takes requirement increases into account
    resource: "Protons", // Name of prestige currency
    baseResource: "Neutrons", // Name of resource prestige is based on
    baseAmount() {return player["L1"].points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.0125, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    upgrades: {
        rows: 6,
        cols: 6,
        11: {
            title: "Volality I",
            description: "L0 won't be resetted and it's automated, unlock 5th Matter DIMENSION",
            cost: 1,
            unlocked() {
                return player["L2"].best.gte(1)
            },
            tooltip() {
                return "5th Matter DIMENSION is unlocked when you unlock 4th!"
            }
        },
        12: {
            title: "Data Increase IV",
            description: "2x 1-5th Matter DIMENSION Capacity, unlock 2nd Neutron REDUCANT",
            cost: 1,
            unlocked() {
                return (hasUpgrade("L2", "11"))
            },
        }
    },
    branches: ["L1"],
    tabFormat: {
    "Main" : {
        unlocked() {return true},
        content : [
            "main-display",
            "resource-display",
            "prestige-button",
            "blank",
            "upgrades",
            "buyables"
        ]
    },

},
row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
    {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
],
    layerShown(){return player["L1"].best.gte(1e11) || player["L2"].best.gte(1)}
})