addLayer("L1", {
    name: "Layer 1", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "L1", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "#8dffc2",
    requires: new Decimal(10e6), // Can be a function that takes requirement increases into account
    resource: "Neutrons", // Name of prestige currency
    baseResource: "Matter", // Name of resource prestige is based on
    baseAmount() {return player.L0.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.125, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    resetsNothing() {
        if (hasUpgrade("L2", 11)) return true;
        else
            return false
    },
    upgrades: {
        rows: 6,
        cols: 6,
        11 : {
            title: "Matter Extension I",
            description: "Unlock 3rd Mattter DIMENSION, 5x Matter",
            cost: 1,
            effect() {
                let base = 5;
                let pow = 1;
                let eff = new Decimal.pow(base,pow)
                return eff;
            },
            unlocked() {
                return player["L1"].best.gte(1)
            }
        },
        12 : {
            title: "DIMENSION Boosting I",
            description: "Matter DIMENSION I base effect 2x > 2.5x",
            cost: 7,
            effect() {
                let base = 1;
                let pow = 1;
                let eff = new Decimal.pow(base, pow)
                return eff;
            },
            unlocked() {
                return hasUpgrade("L1", 11)
            },
        },
            13 : {
                title: "DIMENSION Boosting II",
                description: "Matter DIMENSION II base effect 3x > 4x",
                cost: 175,
                effect() {
                    let base = 1;
                    let pow = 1;
                    let eff = new Decimal.pow(base,pow)
                    return eff;
                },
                unlocked() {
                    return hasUpgrade("L1", 12)
                },
        },
        14 : {
            title: "Data Increase II",
            description: "+10 to DIM I Capacity, +5 to DIM II Capacity",
            cost: 500,
            effect() {
                let base = 1;
                let pow = 1;
                let eff = new Decimal.pow(base,pow)
                return eff;
            },
            unlocked() {
                return hasUpgrade("L1", 13)
            },
        },
        15 : {
            title: "Matter Extension II",
            description: "Unlock 4th Mattter DIMENSION, 5x Matter",
            cost: 7500,
            effect() {
                let base = 5;
                let pow = 1;
                let eff = new Decimal.pow(base,pow)
                return eff;
            },
            unlocked() {
                return hasUpgrade("L1", 14)
            },
        },
        16 : {
            title: "Data Increase III",
            description: "2x 1-4th Matter DIMENSION Capacity, but increase Matter DIMENSION cost",
            cost: 1.25e5,
            effect() {
                let base = 1;
                let pow = 1;
                let eff = new Decimal.pow(base,pow)
                return eff;
            },
            unlocked() {
                return hasUpgrade("L1", 15)
            },
        },
        21 : {
            title: "DIMENSION Boosting III",
            description: "Matter DIMENSION I base effect 2.5x > 4x",
            cost: 175e6,
            effect() {
                let base = 1;
                let pow = 1;
                let eff = new Decimal.pow(base,pow)
                return eff;
            },
            unlocked() {
                return hasUpgrade("L1", 16)
            },
        },
    },
    buyables: {
        rows: 6,
        cols: 6,

        11: {
            cost(x) {
                let base = new Decimal(1).mul(Decimal.pow(10, x.pow(1)))
                return base;
            },
            title() {
                return "REDUCANT I"
            },
            purchaseLimit() {
                let base = new Decimal(10)
                return base;
            },
            display() {
                return `Divide Matter DIMENSION Costs by ${format(tmp[this.layer].buyables[this.id].effect)}x<br>
                <h2>Purchase Limit: ${format(tmp[this.layer].buyables[this.id].purchaseLimit)}, you have ${format(player[this.layer].buyables[this.id], 0)}</h2><br>
                <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)}</h1>`
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "width": "300px",
                    "height": "140px",
                    "border-radius": "5px",
                    "border": "0px",
                    "margin" : "5px"
                }
                return {
                    "width": "300px",
                    "height": "140px",
                    "border-radius": "5px",
                    "border": "0px",
                    "margin" : "5px"
                }
            },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            effect(x) {
                let fone = new Decimal(5)
                let base = new Decimal(1).mul(Decimal.pow(fone, x.mul(1)))
                return base;
            },
            unlocked() {
              return player["L1"].best.gte(1)
            }
        },
        21: {
            cost(x) {
                let base = new Decimal(1e16).mul(Decimal.pow(1e4, x.pow(1)))
                return base;
            },
            title() {
                return "REDUCANT II"
            },
            purchaseLimit() {
                let base = new Decimal(10)
                return base;
            },
            display() {
                return `Divide Matter DIMENSION Costs by ${format(tmp[this.layer].buyables[this.id].effect)}x<br>
                <h2>Purchase Limit: ${format(tmp[this.layer].buyables[this.id].purchaseLimit)}, you have ${format(player[this.layer].buyables[this.id], 0)}</h2><br>
                <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)}</h1>`
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "width": "300px",
                    "height": "140px",
                    "border-radius": "5px",
                    "border": "0px",
                    "margin" : "5px"
                }
                return {
                    "width": "300px",
                    "height": "140px",
                    "border-radius": "5px",
                    "border": "0px",
                    "margin" : "5px"
                }
            },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            },
            effect(x) {
                let fone = new Decimal(10)
                let base = new Decimal(1).mul(Decimal.pow(fone, x.mul(1)))
                return base;
            },
            unlocked() {
                return hasUpgrade("L2", 12)
            }
        },
    },
    branches: ["L0"],
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
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player["L0"].best.gte(3e6) || player["L1"].best.gte(1) || player["L2"].best.gte(1)}
})
