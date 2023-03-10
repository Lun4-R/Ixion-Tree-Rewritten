addLayer("P", {
    name: "Protons", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    branches: ["M"],
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
    passiveGeneration() {
        let gen = new Decimal(0)
        gen = gen.add(hasMilestone("P", 4) ? 0.005 : 0)
        return gen
    },
    softcapshift() {
        let a = player.P.points;
        a = a.add(1)
        let b = new Decimal(10);
        let falloff = new Decimal(0.5)
        falloff = falloff.add(hasMilestone("P", 3) ? 0.03 : 0)
        if (hasUpgrade("P", 11 )) b = b.mul(upgradeEffect("P", 11))
        let eff1 = new Decimal.pow(a,b)
        let eff2 = new Decimal.pow(eff1, falloff).add(1)
        if (player.P.best.lt(1)) return eff2 = new Decimal(1)
        return eff2
    },
    protonboost() {
        let a = player.P.points;
        a = a.add(1)
        let b = new Decimal(10)
        let falloff = new Decimal(0.25)
        falloff = falloff.add(hasMilestone("P", 2) ? 0.1 : 0)
        falloff = falloff.add(hasMilestone("P", 3) ? 0.1 : 0)
        let eff = new Decimal.pow(Decimal.pow(a,b), falloff).add(1)
        if (player.P.best.lt(1)) return eff = new Decimal(1)
        return eff;
    },
    tickspeedboost() {
        let a = player.P.points;
        a = a.sub(0.2)
        let b = new Decimal(0.025)
        let log = new Decimal(10)
        let eff = new Decimal.log(Decimal.pow(Decimal.pow(a,b), 0.0125), log).mul(4)
        if (player.P.best.lt(1)) return eff = new Decimal(1)
        return eff;
    },
    milestones: {
        1: {
            requirementDescription: "1 PROTON",
                done() {return player[this.layer].best.gte(1)},
                effectDescription: "Unlock Automation options",
            style() {
                if (tmp[this.layer].milestones[this.id].done) return {
                    "background" : "#ff5d5d",
                    "width" : "400px",
                    "height" : "auto",
                    "padding" : "5px",
                    "border" : "0px solid"
                }
                return {
                    "background" : "#dcdcdc",
                    "width" : "400px",
                    "height" : "auto",
                    "padding" : "5px",
                    "border" : "0px solid"
                }
            }
        },
        2: {
            requirementDescription: "100 PROTONS",
            done() {return player[this.layer].best.gte(100)},
            effectDescription: "^0.25 > ^0.35 Proton Boost falloff",
            style() {
                if (tmp[this.layer].milestones[this.id].done) return {
                    "background" : "#ff5d5d",
                    "width" : "400px",
                    "height" : "auto",
                    "padding" : "5px",
                    "border" : "0px solid"
                }
                return {
                    "background" : "#dcdcdc",
                    "width" : "400px",
                    "height" : "auto",
                    "padding" : "5px",
                    "border" : "0px solid"
                }
            }
        },
        3: {
            requirementDescription: "10,000 PROTONS",
            done() {return player[this.layer].best.gte(10000)},
            effectDescription: "^0.35 > ^0.45 Proton Boost falloff, ^0.5 > ^0.53 Proton Hardcap Shift falloff",
            style() {
                if (tmp[this.layer].milestones[this.id].done) return {
                    "background" : "#ff5d5d",
                    "width" : "400px",
                    "height" : "auto",
                    "padding" : "5px",
                    "border" : "0px solid"
                }
                return {
                    "background" : "#dcdcdc",
                    "width" : "400px",
                    "height" : "auto",
                    "padding" : "5px",
                    "border" : "0px solid"
                }
            }
        },
        4: {
            requirementDescription: "1E11 PROTONS",
            done() {return player[this.layer].best.gte(1e11)},
            effectDescription: "Gain passively 0.5% Protons / sec",
            style() {
                if (tmp[this.layer].milestones[this.id].done) return {
                    "background" : "#ff5d5d",
                    "width" : "400px",
                    "height" : "auto",
                    "padding" : "5px",
                    "border" : "0px solid"
                }
                return {
                    "background" : "#dcdcdc",
                    "width" : "400px",
                    "height" : "auto",
                    "padding" : "5px",
                    "border" : "0px solid"
                }
            }
        },
    },
    upgrades: {
        rows: 6,
        cols: 6,
        11: {
            title: "11",
            cost: 40,
            description: "Improve Softcap Shift base by 1.5x",
            effect() {
                let base = new Decimal(1.5)
                let pow = new Decimal(1)
                let eff = new Decimal.pow(base,pow)
                return eff;
            },
            unlocked() {
                return player.P.best.gte(1)
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
                "resource-display",
                ["display-text", () => {
                    return `Your Protons shift Matter hardcap by <b style="font-size: 22px; color:#ff5d5d; text-shadow: 0px 0px 10px">${format(tmp.P.softcapshift)}</b>x higher`
                }],
                ["display-text", () => {
                    return `Your Protons also give boost to Matter and NFC production by <b style="font-size: 22px; color:#ff5d5d;  text-shadow: 0px 0px 10px">${format(tmp.P.protonboost)}</b>x`
                }],
                ["display-text", () => {
                    return `Your Protons also add Tickspeeds base by +<b style="font-size: 22px; color:#ff5d5d;  text-shadow: 0px 0px 10px">${formatAtSmall(tmp.P.tickspeedboost)}</b>`
                }],
                "blank",
                "prestige-button",
                "blank",
                "blank",
                "upgrades"
            ]
        },
        "Milestones": {
            unlocked() {
                return (player.P.best.gte(1))
            },
            content: [
                "main-display",
                "milestones"
            ]
        },
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player.M.points.gte(5e36) || player.P.best.gte(1)}
})

    