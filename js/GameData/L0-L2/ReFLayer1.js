addLayer("N", {
    name: "Neutrons", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "N", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        nbp: new Decimal(1),
        cells: new Decimal(0)
    }},
    color: "#dedede",
    requires: new Decimal(1e6), // Can be a function that takes requirement increases into account
    resource: "Neutrons", // Name of prestige currency
    baseResource: "Matter", // Name of resource prestige is based on
    baseAmount() {return player.M.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.25, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        return new Decimal(1)
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        mult = new Decimal(1)
        return mult;
    },
    calculatenbp() {
        let base = new Decimal(1)
        let add = player.N.points
        let eff1 = new Decimal.add(base, add)
        let eff2 = new Decimal.pow(Decimal.pow(eff1, 0.3).add(1), 1.33)
        if(hasMilestone("P", 1))eff2 = eff2.pow(1.45)
        eff2 = eff2.mul(tmp.N.calculatengenb).add(1)
        if (player.N.best.lt(1)) return eff2 = new Decimal(1)
        return eff2
    },
    calculatenfcp() {
        let eff = new Decimal(0)
        eff = eff.add(buyableEffect("N", 11))
        eff = eff.mul(tmp.P.protonboost)
        return eff;
    },
    calculatengenb() {
        let base = new Decimal(0.25)
        let add = player.N.cells;
        let eff1 = new Decimal.pow(add, base).add(1)
        return eff1;
    },
    
    branches: ["M"],
    upgrades: {
        rows: 6,
        cols: 6,
        11: {
            title: "11",
            cost: 2,
            description: "Unlock Neutron Generators",
            unlocked() {
                return player.N.best.gte(2)
            }
        },
    },
    buyables: {
        rows: 6,
        cols: 6,

        11: {
            cost(x) {
                let pow = new Decimal(15)
                let base = new Decimal(1).mul(Decimal.pow(pow, x.pow(1)))
                return base;
            },
            display() {
                return `  <b style="font-size:24px">GENERATOR I</b>
                <h2>Generate ${format(tmp[this.layer].buyables[this.id].effect)} Neutron FCs / sec</h2>
                  <h2>Amount: ${format(player[this.layer].buyables[this.id], 0)}</h2><br>
                <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)}</h1>`
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "width": "300px",
                    "height": "110px",
                    "border-radius": "5px",
                    "border": "0px",
                    "margin": "5px"
                }
                return {
                    "width": "300px",
                    "height": " 110px",
                    "border-radius": "5px",
                    "border": "0px",
                    "margin": "5px"
                }
            },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            tooltip() {
                return `Cost Scale: 10x<br>
                <p style="font-size:16px">Value Scale: 2.5x</p>
                <p style="font-size:20px">Produces NFCs</p> `;
            },
            effect(x) {
                return new Decimal(0).add(Decimal.pow(2.5, x.pow(1))).sub(1)
            },
            unlocked() {
                return true;
            }
        },
    },
    tabFormat: {
        "Main": {
            unlocked() {
                return true
            },
            content: [
                "main-display",
                ["display-text", () => {
                    return `Your Neutrons translate their energy into  <b style="font-size: 22px; color:#dedede; text-shadow: 0px 0px 10px">${format(tmp.N.calculatenbp)}</b>x Matter boost`
                }],
                "blank",
                "prestige-button",
                "blank",
                "upgrades"
            ]
        },
        "Generators": {
            unlocked() {
                return hasUpgrade("N", 11)
            },
            content: [
                "main-display",
                ["display-text", () => {
                    return `Your Neutron Fuel Cells boost Neutron translated boost by <b style="font-size: 22px; color:#dedede; text-shadow: 0px 0px 10px">${format(tmp.N.calculatengenb)}</b>x`
                }],
                ["display-text", () => {
                    return `You have ${format(player.N.cells)} NFCs and you generate them ${format(tmp.N.calculatenfcp)} / sec`
                }],
                "buyables",
            ]
        },
    },
        update(diff) {
            player.N.cells = player.N.cells.add(tmp.N.calculatenfcp.times(diff))
        },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "N: Go for Neutron Reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("M", 12) || player.N.best.gte(1)}
})

