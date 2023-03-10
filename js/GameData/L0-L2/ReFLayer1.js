addLayer("N", {
    name: "Neutronas", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "N", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        mps: new Decimal(0),
        d1: new Decimal(0),
        d2: new Decimal(0),
        d3: new Decimal(0),
        d4: new Decimal(0),
        d5: new Decimal(0),
        d6: new Decimal(0)
    }},
    color: "#dcdcdc",
    requires: new Decimal(1e10), // Can be a function that takes requirement increases into account
    resource: "Neutronas", // Name of prestige currency
    baseResource: "Matter", // Name of resource prestige is based on
    baseAmount() {return player.M.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.125, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        mult = mult.mul(buyableEffect("M", 11))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        mult = new Decimal(1)
        return mult;
    },
    passiveGeneration() {
        let gen = new Decimal(0)
        if (player.N.d1.gte(1)) return gen = new Decimal(1)
        return gen;
    },
    calculatemps() {
        let mps = new Decimal(0)
        mps = mps.add(buyableEffect("N", 11))
        return mps
    },
    calculatetransboost() {
        let a = player.N.points;
        let b = new Decimal(10)
        let eff1 = new Decimal.log(a,b).add(1)
        let eff2 = new Decimal.pow(eff1, 1.25).add(1)
        return eff2
    },
    neutronaboost() {
        let a = player.N.points;
        a = a.add(1)
        let b = new Decimal(5)
        let log = new Decimal(5)
        let eff = new Decimal.log(Decimal.pow(a,b), log).add(1)
        if (player.N.best.lt(1)) return eff = new Decimal(1)
        return eff;
    },
    update(diff) {
        player.N.d1 = player.N.d1.add(buyableEffect("N", 12).times(diff))
        player.N.d2 = player.N.d2.add(buyableEffect("N", 13).times(diff))
        player.N.d3 = player.N.d3.add(buyableEffect("N", 14).times(diff))
    },
    buyables: {
        rows: 6,
        cols: 6,

        11: {
            cost(x) {
                let pow = new Decimal(10)
                let base = new Decimal(1).mul(Decimal.pow(pow, x.pow(1)))
                return base;
            },
            display() {
                return `  <b style="font-size:24px">DIMENSION I</b>
                <h2>Generate ${format(tmp[this.layer].buyables[this.id].effect)} NFCs / sec</h2>
                  <h2>Amount: ${format(player.N.d1)} , ( ${format(player[this.layer].buyables[this.id], 0)} )</h2><br>
                <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)}</h1>`
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background": "linear-gradient(180deg, rgba(223,141,255,1) 0%, rgba(126,101,136,1) 100%)",
                    "width": "400px",
                    "height": "105px",
                    "border-radius": "10px",
                    "border": "0px",
                    "margin": "5px"
                }
                return {
                    "background": "linear-gradient(180deg, rgba(255,189,189,1) 0%, rgba(170,82,82,1) 100%)",
                    "width": "400px",
                    "height": " 105px",
                    "border-radius": "10px",
                    "border": "0px",
                    "margin": "5px"
                }
            },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.N.d1 = player.N.d1.add(1)
            },
            tooltip() {
                return `Cost Scale: 10x<br>
                <p style="font-size:16px">Value Scale: 2x</p>
                <p style="font-size:20px">Produces Matter</p> `;
            },
            effect(x) {
                let beff = new Decimal(1).mul(Decimal.pow(2, x.pow(1)))
                let base = player.N.d1
                let eff = new Decimal.mul(beff, base)
                return eff
            },
            unlocked() {
                return true;
            }
        },
        12: {
            cost(x) {
                let pow = new Decimal(100)
                let base = new Decimal(100).mul(Decimal.pow(pow, x.pow(1)))
                return base;
            },
            display() {
                return `  <b style="font-size:24px">DIMENSION II</b>
                <h2>Generate ${format(tmp[this.layer].buyables[this.id].effect)} Dimension I / sec</h2>
                  <h2>Amount: ${format(player.N.d2)} , ( ${format(player[this.layer].buyables[this.id], 0)} )</h2><br>
                <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)}</h1>`
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background": "linear-gradient(180deg, rgba(223,141,255,1) 0%, rgba(126,101,136,1) 100%)",
                    "width": "400px",
                    "height": "105px",
                    "border-radius": "10px",
                    "border": "0px",
                    "margin": "5px"
                }
                return {
                    "background": "linear-gradient(180deg, rgba(255,189,189,1) 0%, rgba(170,82,82,1) 100%)",
                    "width": "400px",
                    "height": " 105px",
                    "border-radius": "10px",
                    "border": "0px",
                    "margin": "5px"
                }
            },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.N.d2 = player.N.d2.add(1)
            },
            tooltip() {
                return `Cost Scale: 100x<br>
                <p style="font-size:16px">Value Scale: 2x</p>
                <p style="font-size:20px">Produces Dimension I</p> `;
            },
            effect(x) {
                let beff = new Decimal(1).mul(Decimal.pow(2, x.pow(1)))
                let base = player.N.d2
                let eff = new Decimal.mul(beff, base)
                return eff
            },
            unlocked() {
                return (player.N.d1.gte(1));
            }
        },
        13: {
            cost(x) {
                let pow = new Decimal(10000)
                let base = new Decimal(10000).mul(Decimal.pow(pow, x.pow(1)))
                return base;
            },
            display() {
                return `  <b style="font-size:24px">DIMENSION III</b>
                <h2>Generate ${format(tmp[this.layer].buyables[this.id].effect)} Dimension II / sec</h2>
                  <h2>Amount: ${format(player.N.d3)} , ( ${format(player[this.layer].buyables[this.id], 0)} )</h2><br>
                <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)}</h1>`
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background": "linear-gradient(180deg, rgba(223,141,255,1) 0%, rgba(126,101,136,1) 100%)",
                    "width": "400px",
                    "height": "105px",
                    "border-radius": "10px",
                    "border": "0px",
                    "margin": "5px"
                }
                return {
                    "background": "linear-gradient(180deg, rgba(255,189,189,1) 0%, rgba(170,82,82,1) 100%)",
                    "width": "400px",
                    "height": " 105px",
                    "border-radius": "10px",
                    "border": "0px",
                    "margin": "5px"
                }
            },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.N.d3 = player.N.d3.add(1)
            },
            tooltip() {
                return `Cost Scale: 10,000x<br>
                <p style="font-size:16px">Value Scale: 2x</p>
                <p style="font-size:20px">Produces Dimension II</p> `;
            },
            effect(x) {
                let beff = new Decimal(1).mul(Decimal.pow(2, x.pow(1)))
                let base = player.N.d3
                let eff = new Decimal.mul(beff, base)
                return eff
            },
            unlocked() {
                return (player.N.d2.gte(1));
            }
        },
        14: {
            cost(x) {
                let pow = new Decimal(1e8)
                let base = new Decimal(1e8).mul(Decimal.pow(pow, x.pow(1)))
                return base;
            },
            display() {
                return `  <b style="font-size:24px">DIMENSION IV</b>
                <h2>Generate ${format(tmp[this.layer].buyables[this.id].effect)} Dimension III / sec</h2>
                  <h2>Amount: ${format(player.N.d4)} , ( ${format(player[this.layer].buyables[this.id], 0)} )</h2><br>
                <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)}</h1>`
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background": "linear-gradient(180deg, rgba(223,141,255,1) 0%, rgba(126,101,136,1) 100%)",
                    "width": "400px",
                    "height": "105px",
                    "border-radius": "10px",
                    "border": "0px",
                    "margin": "5px"
                }
                return {
                    "background": "linear-gradient(180deg, rgba(255,189,189,1) 0%, rgba(170,82,82,1) 100%)",
                    "width": "400px",
                    "height": " 105px",
                    "border-radius": "10px",
                    "border": "0px",
                    "margin": "5px"
                }
            },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.N.d4 = Decimal.add(1)
            },
            tooltip() {
                return `Cost Scale: 1e8x<br>
                <p style="font-size:16px">Value Scale: 2x</p>
                <p style="font-size:20px">Produces Dimension III</p> `;
            },
            effect(x) {
                return new Decimal(x).mul(Decimal.mul(1.5, x.pow(1)))
            },
            unlocked() {
                return (player.N.d3.gte(1));
            }
        },
        
    },
    tabFormat: {
        "Dimensions" : {
            unlocked() {return true},
            content : [
                ["raw-html", () => {
                     return `You have <b style="font-size:30px; color: #dcdcdc; text-shadow: 0px 0px 10px">${format(player.N.points)}</b> Neutronas`
                }],
                ["display-text", () => {
                    return `Your Neutronas also give boost to Matter by <b style="font-size: 22px; color:#dcdcdc;  text-shadow: 0px 0px 10px">${format(tmp.N.neutronaboost)}</b>x`
                }],
                "blank",
                "prestige-button",
                ["row", [["buyable", 99]]],
                ["row", [["buyable", 11]]],
                ["row", [["buyable", 12]]],
                ["row", [["buyable", 13]]],
                ["row", [["buyable", 14]]],
                ["row", [["buyable", 15]]],
                ["row", [["buyable", 16]]],
            ]
        },
        
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("M", 12)}
})
