addLayer("P", {
    name: "Protons", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: new Decimal(1),
    }},
    branches: ["N"],
    color: "#ff5d5d",
    requires: new Decimal(1e38), // Can be a function that takes requirement increases into account
    resource: "Protons", // Name of prestige currency
    baseResource: "Matter", // Name of resource prestige is based on
    baseAmount() {return player.M.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.125, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        mult = new Decimal(1)
        return mult;
    },
    softcapshift() {
        let a = player.P.points;
        a = a.add(1)
        let b = new Decimal(10);
        let eff1 = new Decimal.pow(a,b)
        let eff2 = new Decimal.pow(eff1, 0.5).add(1)
        if (player.P.best.lt(1)) return eff2 = new Decimal(1)
        return eff2
    },
    protonboost() {
        let a = player.P.points;
        a = a.add(1)
        let b = new Decimal(4)
        let log = new Decimal(5)
        let eff = new Decimal.log(Decimal.pow(a,b), log).add(1)
        if (player.P.best.lt(1)) return eff = new Decimal(1)
        return eff;
    },
    milestones: {
        1: {
            requirementDescription: "1 PROTON",
                done() {return player[this.layer].best.gte(1)},
                effectDescription: "Automate Matter Layer fully and unlock 5th and 6th Dimension , Neutrons have better translation effect",
        },
    },
    tabFormat: {
        "Main": {
            unlocked() {
                return true
            },
            content: [
                "main-display",
                "resource-display",
                ["display-text", () => {
                    return `Your Protons shift Matter hardcap by <b style="font-size: 22px; color:#ff5d5d; text-shadow: 0px 0px 10px">${format(tmp.P.softcapshift)}</b>x higher`
                }],
                ["display-text", () => {
                    return `Your Protons also give boost to Matter and NFC production by <b style="font-size: 22px; color:#ff5d5d;  text-shadow: 0px 0px 10px">${format(tmp.P.protonboost)}</b>x`
                }],
                "blank",
                "prestige-button",
                ["row", [["buyable", 99]]],
                ["row", [["buyable", 11]]],
                ["row", [["buyable", 12]]],
                ["row", [["buyable", 13]]],
                ["row", [["buyable", 14]]],
            ]
        },
        "Milestones": {
            unlocked() {
                return (player.P.best.gte(1))
            },
            content: [
                "main-display",
                ["row", [["milestone", 1]]],
                ["row", [["milestone", 2]]],
            ]
        },
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.M.points.gte(5e36) || player.P.best.gte(1)}
})

    