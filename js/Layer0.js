addLayer("L0", {
    name: "Layer 0", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "L0", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#b78dff",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Matter", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.00097975, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasUpgrade("L1",11)) mult = mult.mul(upgradeEffect("L1",11))
        if(hasUpgrade("L1",15)) mult = mult.mul(upgradeEffect("L1",15))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration() {
        let gen = new Decimal(1);
        if(hasUpgrade("L0",11)) gen = gen.mul(upgradeEffect("L0",11))
        if(hasUpgrade("L0",12)) gen = gen.mul(upgradeEffect("L0",12))
        gen = gen.mul(buyableEffect("L0", "11"));
        gen = gen.mul(buyableEffect("L0", "21"));
        gen = gen.mul(buyableEffect("L0", "31"));
        gen = gen.mul(buyableEffect("L0", "41"));
        return gen;
    },
    autoUpgrade: () => (hasUpgrade("L2", 11)),
    update(delta) {
        if (hasUpgrade("L2" , 11)) buyBuyable(this.layer, 11)
        if (hasUpgrade("L2" , 11)) buyBuyable(this.layer, 21)
        if (hasUpgrade("L2" , 11)) buyBuyable(this.layer, 31)
        if (hasUpgrade("L2" , 11)) buyBuyable(this.layer, 41)
        if (hasUpgrade("L2" , 11)) buyBuyable(this.layer, 51)
    },
    
    upgrades: {
        rows: 6,
        cols: 6,
        11: {
            title: "Self-Duplication I",
            description: "Matter boosts itself slightly",
            cost: 5000,
            effect() {
                let base = player["L0"].points;
                let log = 10;
                let eff = new Decimal.log(Decimal.add(base, 1), log).add(1)
                return eff;
            },
            effectDisplay() {
                return "x" + format(upgradeEffect(this.layer,this.id));
            },
            unlocked() {
                return player["L0"].best.gte(3000)
            }
        },
        12: {
            title: "Chain Boosting I",
            description: "2.25x more Matter for each Matter upgrade bought",
            cost: 50000,
            effect() {
                let base = player["L0"].upgrades.length;
                let log = 2.25;
                let eff = new Decimal.pow(base, log).add(1)
                return eff;
            },
            effectDisplay() {
                return "x" + format(upgradeEffect(this.layer,this.id));
            },
            unlocked() {
                return player["L0"].best.gte(50000)
            }
        },
        13: {
            title: "Data Increase I",
            description: "+10 to DIM I Capacity, +5 to DIM II Capacity",
            cost: 1e15,
            effect() {
                let eff = 1;
                return eff;
            },
            unlocked() {
                return player["L0"].best.gte(1e15)
            }
        },
    },
    buyables: {
        rows: 6,
        cols: 6,

        11: {
            cost(x) {
                let reduc = new Decimal(1)
                reduc = reduc.mul(buyableEffect("L1", 11))
                reduc = reduc.mul(buyableEffect("L1", 21))
                let pow = new Decimal(5).mul(hasUpgrade("L1", 16) ? 1.5 : 1)
                let base = new Decimal(1).mul(Decimal.pow(pow, x.pow(1))).div(reduc)
                return base;
            },
            purchaseLimit() {
                let base = new Decimal(20).add(hasUpgrade("L0", 13) ? 10 : 0).add(hasUpgrade("L1", 14) ? 10 : 0).mul(hasUpgrade("L1", 16) ? 2 : 1).mul(hasUpgrade("L2", 12) ? 2 : 1)
                return base;
            },
            title() {
                return "DIMENSION I"
            },
            display() {
                return `<h3>Boost: x${format(tmp[this.layer].buyables[this.id].effect)} Matter</h3><br>
                <h2>Purchase Limit: ${format(tmp[this.layer].buyables[this.id].purchaseLimit)}, you have ${format(player[this.layer].buyables[this.id], 0)}</h2>
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
                    "border" : "0px",
                    "margin" : "5px"
                }
                return {
                    "width": "300px",
                    "height": " 140px",
                    "border-radius": "5px",
                    "border" : "0px",
                    "margin" : "5px"
                }
            },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base = new Decimal(2).mul(hasUpgrade("L1", 12) ? 1.25 : 1).add(hasUpgrade("L1", 21) ? 1.5 : 0)
                let eff = new Decimal(1).mul(Decimal.pow(base, x.mul(1)))
                return eff;
            },
            unlocked() {
                return true;
            }
        },
        21: {
            cost(x) {
                let reduc = new Decimal(1)
                reduc = reduc.mul(buyableEffect("L1", 11))
                reduc = reduc.mul(buyableEffect("L1", 21))
                let pow = new Decimal(250).mul(hasUpgrade("L1", 16) ? 1.5 : 1)
                let base = new Decimal(1000).mul(Decimal.pow(pow, x.pow(1))).div(reduc)
                return base;
            },
            purchaseLimit() {
                let base = new Decimal(15).add(hasUpgrade("L0", 13) ? 5 : 0).add(hasUpgrade("L1", 14) ? 5 : 0).mul(hasUpgrade("L1", 16) ? 2 : 1).mul(hasUpgrade("L2", 12) ? 2 : 1)
                return base;
            },
            title() {
                return "DIMENSION II"
            },
            display() {
                return `<h3>Boost: x${format(tmp[this.layer].buyables[this.id].effect)} Matter</h3><br>
                <h2>Purchase Limit: ${format(tmp[this.layer].buyables[this.id].purchaseLimit)}, you have ${format(player[this.layer].buyables[this.id], 0)}</h2>
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
                    "border" : "0px",
                    "margin" : "5px"
                }
                return {
                    "width": "300px",
                    "height": "140px",
                    "border-radius": "5px",
                    "border" : "0px",
                    "margin" : "5px"
                }
            },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base = new Decimal(3).mul(hasUpgrade("L1", 12) ? 1.33 : 1)
                let eff = new Decimal(1).mul(Decimal.pow(base, x.mul(1)))
                return eff;
            },
            unlocked() {
                return true;
            }
        },
        31: {
            cost(x) {
                let reduc = new Decimal(1)
                reduc = reduc.mul(buyableEffect("L1", 11))
                reduc = reduc.mul(buyableEffect("L1", 21))
                let pow = new Decimal(1e5).mul(hasUpgrade("L1", 16) ? 1.5 : 1)
                let base = new Decimal(1).mul(Decimal.pow(pow, x.pow(1))).div(reduc)
                return base;
            },
            purchaseLimit() {
                let base = new Decimal(10).mul(hasUpgrade("L1", 16) ? 2 : 1).mul(hasUpgrade("L2", 12) ? 2 : 1)
                return base;
            },
            title() {
                return "DIMENSION III"
            },
            display() {
                return `<h3>Boost: x${format(tmp[this.layer].buyables[this.id].effect)} Matter</h3><br>
                <h2>Purchase Limit: ${format(tmp[this.layer].buyables[this.id].purchaseLimit)}, you have ${format(player[this.layer].buyables[this.id], 0)}</h2>
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
                    "border" : "0px",
                    "margin" : "5px"
                }
                return {
                    "width": "300px",
                    "height": "140px",
                    "border-radius": "5px",
                    "border" : "0px",
                    "margin" : "5px"
                }
            },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base = new Decimal(4)
                let eff = new Decimal(1).mul(Decimal.pow(base, x.mul(1)))
                return eff;
            },
            unlocked() {
                return hasUpgrade("L1", 11);
            }
        },
        41: {
            cost(x) {
                let reduc = new Decimal(1)
                reduc = reduc.mul(buyableEffect("L1", 11))
                reduc = reduc.mul(buyableEffect("L1", 21))
                let pow = new Decimal(1e10).mul(hasUpgrade("L1", 16) ? 1.5 : 1)
                let base = new Decimal(1).mul(Decimal.pow(pow, x.pow(1))).div(reduc)
                return base;
            },
            purchaseLimit() {
                let base = new Decimal(5).mul(hasUpgrade("L1", 16) ? 2 : 1).mul(hasUpgrade("L2", 12) ? 2 : 1)
                return base;
            },
            title() {
                return "DIMENSION IV"
            },
            display() {
                return `<h3>Boost: x${format(tmp[this.layer].buyables[this.id].effect)} Matter</h3><br>
                <h2>Purchase Limit: ${format(tmp[this.layer].buyables[this.id].purchaseLimit)}, you have ${format(player[this.layer].buyables[this.id], 0)}</h2>
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
                    "border" : "0px",
                    "margin" : "5px"
                }
                return {
                    "width": "300px",
                    "height": "140px",
                    "border-radius": "5px",
                    "border" : "0px",
                    "margin" : "5px"
                }
            },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base = new Decimal(5)
                let eff = new Decimal(1).mul(Decimal.pow(base, x.mul(1)))
                return eff;
            },
            unlocked() {
                return hasUpgrade("L1", 15);
            }
        },
        51: {
            cost(x) {
                let reduc = new Decimal(1)
                reduc = reduc.mul(buyableEffect("L1", 11))
                reduc = reduc.mul(buyableEffect("L1", 21))
                let pow = new Decimal(1e20)
                let base = new Decimal(1).mul(Decimal.pow(pow, x.pow(1))).div(reduc)
                return base;
            },
            purchaseLimit() {
                let base = new Decimal(5).mul(hasUpgrade("L2", 12) ? 2 : 1)
                return base;
            },
            title() {
                return "DIMENSION V"
            },
            display() {
                return `<h3>Boost: x${format(tmp[this.layer].buyables[this.id].effect)} Matter</h3><br>
                <h2>Purchase Limit: ${format(tmp[this.layer].buyables[this.id].purchaseLimit)}, you have ${format(player[this.layer].buyables[this.id], 0)}</h2>
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
                    "border" : "0px",
                    "margin" : "5px"
                }
                return {
                    "width": "300px",
                    "height": "140px",
                    "border-radius": "5px",
                    "border" : "0px",
                    "margin" : "5px"
                }
            },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base = new Decimal(6)
                let eff = new Decimal(1).mul(Decimal.pow(base, x.mul(1)))
                return eff;
            },
            unlocked() {
                return hasUpgrade("L2", 11) & hasUpgrade("L1", 15);
            }
        },
    },
    tabFormat: {
        "Main" : {
            unlocked() {return true},
            content : [
                "main-display",
                "resource-display",
                "upgrades",
                "buyables"
            ]
        },
       
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})
