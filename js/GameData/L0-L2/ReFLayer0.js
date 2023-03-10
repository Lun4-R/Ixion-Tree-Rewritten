addLayer("M", {
    name: "Matter", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: new Decimal(1),
        mps: new Decimal(1),
        d1: new Decimal(1),
        d2: new Decimal(0),
        d3: new Decimal(0),
        d4: new Decimal(0),
        d5: new Decimal(0),
        d6: new Decimal(0),
        d7: new Decimal(0),
        d8: new Decimal(0),
        d9: new Decimal(0),
        d10: new Decimal(0),
        d11: new Decimal(0),
        d12: new Decimal(0)
    }},
    softcap() {
        let base =new Decimal(1.17e38)
        base = base.mul(tmp.P.softcapshift)
        return base
    },
    softcapPower: new Decimal("1e-20"),
    color: "#df8dff",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Matter", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        mult = mult.mul(buyableEffect("M", 11))
        if (hasUpgrade("M", 31 )) mult = mult.mul(upgradeEffect("M", 31))
        if (hasUpgrade("M", 32 )) mult = mult.mul(upgradeEffect("M", 32))
        if (hasUpgrade("M", 33 )) mult = mult.mul(upgradeEffect("M", 33))
        if (hasUpgrade("M", 34 )) mult = mult.mul(upgradeEffect("M", 34))
        if (hasUpgrade("M", 35 )) mult = mult.mul(upgradeEffect("M", 35))
        if (hasUpgrade("M", 36 )) mult = mult.mul(upgradeEffect("M", 36))
        mult = mult.mul(tmp.P.protonboost)
        if (player.M.points.gte(tmp.M.softcap)) {
            mult = mult.pow(tmp.M.softcapPower)
        }
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
         mult = new Decimal(1)
        return mult;
    },
    passiveGeneration() {
        let gen = new Decimal(1)
        return gen;
    },
    calculatemps() {
        let mps = new Decimal(1)
        mps = mps.mul(buyableEffect("M", 11))
        mps = mps.mul(buyableEffect("M", 99))
        if (hasUpgrade("M", 31 )) mps = mps.mul(upgradeEffect("M", 31))
        if (hasUpgrade("M", 32 )) mps = mps.mul(upgradeEffect("M", 32))
        if (hasUpgrade("M", 33 )) mps = mps.mul(upgradeEffect("M", 33))
        if (hasUpgrade("M", 34 )) mps = mps.mul(upgradeEffect("M", 34))
        if (hasUpgrade("M", 35 )) mps = mps.mul(upgradeEffect("M", 35))
        if (hasUpgrade("M", 36 )) mps = mps.mul(upgradeEffect("M", 36))
        mps = mps.mul(tmp.P.protonboost)
        if (player.M.points.gte(tmp.M.softcap)) {
            mps = mps.pow(tmp.M.softcapPower)
        }
        return mps
    },
    autoUpgrade: () => ((tmp.A.clickables.mauto.canRun)), update(delta) {
    },
    update(diff) {
        if (tmp.A.clickables.mauto.canRun) buyBuyable(this.layer, 11)
        if (tmp.A.clickables.mauto.canRun) buyBuyable(this.layer, 12)
        if (tmp.A.clickables.mauto.canRun) buyBuyable(this.layer, 13)
        if (tmp.A.clickables.mauto.canRun) buyBuyable(this.layer, 14)
        if (tmp.A.clickables.mauto.canRun) buyBuyable(this.layer, 15)
        if (tmp.A.clickables.mauto.canRun) buyBuyable(this.layer, 16)
        if (tmp.A.clickables.mauto.canRun) buyBuyable(this.layer, 17)
        if (tmp.A.clickables.mauto.canRun) buyBuyable(this.layer, 18)
        if (tmp.A.clickables.mauto.canRun) buyBuyable(this.layer, 99)

        player.M.d1 = player.M.d1.add(buyableEffect("M", 12).times(diff))
        player.M.d2 = player.M.d2.add(buyableEffect("M", 13).times(diff))
        player.M.d3 = player.M.d3.add(buyableEffect("M", 14).times(diff))
        player.M.d4 = player.M.d4.add(buyableEffect("M", 15).times(diff))
        player.M.d5 = player.M.d5.add(buyableEffect("M", 16).times(diff))
        player.M.d6 = player.M.d6.add(buyableEffect("M", 17).times(diff))
        player.M.d7 = player.M.d7.add(buyableEffect("M", 18).times(diff))
        
    },
    upgrades: {
        rows: 6,
        cols: 6,
        11: {
            title: "11",
            cost: 25,
            description: "Unlock Tickspeed"
        },
        12: {
            title: "12",
            cost: 150000,
            description: "Unlock Neutron Layer",
            unlocked() {
               return hasUpgrade("M", 11)
            }
        },
        31: {
            title: "31",
            cost: 1e6,
            description: "10x Matter Production",
            effect() {
                let base = new Decimal(10)
                let pow = new Decimal(1)
                let eff = new Decimal.pow(base,pow)
                return eff;
            },
            unlocked() {
                return hasUpgrade("M", 12)
            },
        },
            
        32: {
            title: "32",
            cost: 1e12,
            description: "100x Matter Production",
            effect() {
                let base = new Decimal(100)
                let pow = new Decimal(1)
                let eff = new Decimal.pow(base,pow)
                return eff;
            },
            unlocked() {
                return hasUpgrade("M", 31)
            }
        },
        33: {
            title: "33",
            cost: 1e24,
            description: "1,000x Matter Production",
            effect() {
                let base = new Decimal(1000)
                let pow = new Decimal(1)
                let eff = new Decimal.pow(base,pow)
                return eff;
            },
            unlocked() {
                return hasUpgrade("M", 32)
            }
        },
        34: {
            title: "34",
            cost: 1e48,
            description: "10,000x Matter Production",
            effect() {
                let base = new Decimal(10000)
                let pow = new Decimal(1)
                let eff = new Decimal.pow(base,pow)
                return eff;
            },
            unlocked() {
                return hasUpgrade("M", 33)
            }
        },
        35: {
            title: "35",
            cost: 1e96,
            description: "100,000x Matter Production",
            effect() {
                let base = new Decimal(1e5)
                let pow = new Decimal(1)
                let eff = new Decimal.pow(base,pow)
                return eff;
            },
            unlocked() {
                return hasUpgrade("M", 34)
            }
        },
        36: {
            title: "36",
            cost: 1e192,
            description: "1,000,000x Matter Production",
            effect() {
                let base = new Decimal(1e6)
                let pow = new Decimal(1)
                let eff = new Decimal.pow(base,pow)
                return eff;
            },
            unlocked() {
                return hasUpgrade("M", 35)
            }
        }
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
                <h2>Generate ${format(tmp[this.layer].buyables[this.id].effect)} Matter / sec</h2>
                  <h2>Amount: ${format(player.M.d1)} , ( ${format(player[this.layer].buyables[this.id], 0)} )</h2><br>
                <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)}</h1>`
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background" : "linear-gradient(180deg, rgba(223,141,255,1) 0%, rgba(126,101,136,1) 100%)",
                    "width": "400px",
                    "height": "115px",
                    "border-radius": "10px",
                    "border": "0px",
                    "margin": "5px"
                }
                return {
                    "background" : "linear-gradient(180deg, rgba(255,189,189,1) 0%, rgba(170,82,82,1) 100%)",
                    "width": "400px",
                    "height": " 115px",
                    "border-radius": "10px",
                    "border": "0px",
                    "margin": "5px"
                }
            },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.M.d1 = player.M.d1.add(1)
            },
            tooltip() {
                return `Cost Scale: 10x<br>
                <p style="font-size:16px">Value Scale: x * mul * mul(2)</p>
                <p style="font-size:20px">Produces Matter</p> `;
            },
            effect(x) {
                let beff = new Decimal(1).mul(Decimal.pow(2, x.pow(1)))
                let base = player.M.d1
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
                  <h2>Amount: ${format(player.M.d2)} , ( ${format(player[this.layer].buyables[this.id], 0)} )</h2><br>
                <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)}</h1>`
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background" : "linear-gradient(180deg, rgba(223,141,255,1) 0%, rgba(126,101,136,1) 100%)",
                    "width": "400px",
                    "height": "115px",
                    "border-radius": "10px",
                    "border": "0px",
                    "margin": "5px"
                }
                return {
                    "background" : "linear-gradient(180deg, rgba(255,189,189,1) 0%, rgba(170,82,82,1) 100%)",
                    "width": "400px",
                    "height": " 115px",
                    "border-radius": "10px",
                    "border": "0px",
                    "margin": "5px"
                }
            },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.M.d2 = player.M.d2.add(1)
            },
            tooltip() {
                return `Cost Scale: 100x<br>
                <p style="font-size:16px">Value Scale: x * mul * mul(2)</p>
                <p style="font-size:20px">Produces Dimension I</p> `;
            },
            effect(x) {
                let beff = new Decimal(1).mul(Decimal.pow(2, x.pow(1)))
                let base = player.M.d2
                let eff = new Decimal.mul(beff, base)
                return eff
            },
            unlocked() {
                return (player.M.d1.gte(1));
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
                  <h2>Amount: ${format(player.M.d3)} , ( ${format(player[this.layer].buyables[this.id], 0)} )</h2><br>
                <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)}</h1>`
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background" : "linear-gradient(180deg, rgba(223,141,255,1) 0%, rgba(126,101,136,1) 100%)",
                    "width": "400px",
                    "height": "115px",
                    "border-radius": "10px",
                    "border": "0px",
                    "margin": "5px"
                }
                return {
                    "background" : "linear-gradient(180deg, rgba(255,189,189,1) 0%, rgba(170,82,82,1) 100%)",
                    "width": "400px",
                    "height": " 115px",
                    "border-radius": "10px",
                    "border": "0px",
                    "margin": "5px"
                }
            },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.M.d3= player.M.d3.add(1)
            },
            tooltip() {
                return `Cost Scale: 10,000x<br>
                <p style="font-size:16px">Value Scale: x * mul * mul(2)</p>
                <p style="font-size:20px">Produces Dimension II</p> `;
            },
            effect(x) {
                let beff = new Decimal(1).mul(Decimal.pow(2, x.pow(1)))
                let base = player.M.d3
                let eff = new Decimal.mul(beff, base)
                return eff
            },
            unlocked() {
                return (player.M.d2.gte(1));
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
                  <h2>Amount: ${format(player.M.d4)} , ( ${format(player[this.layer].buyables[this.id], 0)} )</h2><br>
                <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)}</h1>`
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background" : "linear-gradient(180deg, rgba(223,141,255,1) 0%, rgba(126,101,136,1) 100%)",
                    "width": "400px",
                    "height": "115px",
                    "border-radius": "10px",
                    "border": "0px",
                    "margin": "5px"
                }
                return {
                    "background" : "linear-gradient(180deg, rgba(255,189,189,1) 0%, rgba(170,82,82,1) 100%)",
                    "width": "400px",
                    "height": " 115px",
                    "border-radius": "10px",
                    "border": "0px",
                    "margin": "5px"
                }
            },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.M.d4 = Decimal.add(1)
            },
            tooltip() {
                return `Cost Scale: 1e8x<br>
                <p style="font-size:16px">Value Scale: x * mul * mul(2)</p>
                <p style="font-size:20px">Produces Dimension III</p> `;
            },
            effect(x) {
                let beff = new Decimal(1).mul(Decimal.pow(2, x.pow(1)))
                let base = player.M.d4
                let eff = new Decimal.mul(beff, base)
                return eff
            },
            unlocked() {
                return (player.M.d3.gte(1));
            }
        },
        15: {
            cost(x) {
                let pow = new Decimal(1e16)
                let base = new Decimal(1e16).mul(Decimal.pow(pow, x.pow(1)))
                return base;
            },
            display() {
                return `  <b style="font-size:24px">DIMENSION V</b>
                <h2>Generate ${format(tmp[this.layer].buyables[this.id].effect)} Dimension IV / sec</h2>
                  <h2>Amount: ${format(player.M.d5)} , ( ${format(player[this.layer].buyables[this.id], 0)} )</h2><br>
                <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)}</h1>`
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background" : "linear-gradient(180deg, rgba(223,141,255,1) 0%, rgba(126,101,136,1) 100%)",
                    "width": "400px",
                    "height": "115px",
                    "border-radius": "10px",
                    "border": "0px",
                    "margin": "5px"
                }
                return {
                    "background" : "linear-gradient(180deg, rgba(255,189,189,1) 0%, rgba(170,82,82,1) 100%)",
                    "width": "400px",
                    "height": " 115px",
                    "border-radius": "10px",
                    "border": "0px",
                    "margin": "5px"
                }
            },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.M.d5 = Decimal.add(1)
            },
            tooltip() {
                return `Cost Scale: 1e16x<br>
                <p style="font-size:16px">Value Scale: x * mul * mul(2)</p>
                <p style="font-size:20px">Produces Dimension IV</p> `;
            },
            effect(x) {
              /*  return new Decimal(x).mul(Decimal.mul(1.5, x.pow(1)))*/
                let beff = new Decimal(1).mul(Decimal.pow(2, x.pow(1)))
                let base = player.M.d5
                let eff = new Decimal.mul(beff, base)
                return eff
            },
            unlocked() {
                return (player.M.d4.gte(1));
            }
        },
        16: {
            cost(x) {
                let pow = new Decimal(1e32)
                let base = new Decimal(1e32).mul(Decimal.pow(pow, x.pow(1)))
                return base;
            },
            display() {
                return `  <b style="font-size:24px">DIMENSION VI</b>
                <h2>Generate ${format(tmp[this.layer].buyables[this.id].effect)} Dimension V / sec</h2>
                  <h2>Amount: ${format(player.M.d6)} , ( ${format(player[this.layer].buyables[this.id], 0)} )</h2><br>
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
                player.M.d6 = Decimal.add(1)
            },
            tooltip() {
                return `Cost Scale: 1e32x<br>
                <p style="font-size:16px">Value Scale: 1 * mul * pow(2)</p>
                <p style="font-size:20px">Produces Dimension V</p> `;
            },
            effect(x) {
                /*  return new Decimal(x).mul(Decimal.mul(1.5, x.pow(1)))*/
                let beff = new Decimal(1).mul(Decimal.pow(2, x.pow(1)))
                let base = player.M.d6
                let eff = new Decimal.mul(beff, base)
                return eff
            },
            unlocked() {
                return (player.M.d5.gte(1));
            }
        },
        17: {
            cost(x) {
                let pow = new Decimal(1e64)
                let base = new Decimal(1e64).mul(Decimal.pow(pow, x.pow(1)))
                return base;
            },
            display() {
                return `  <b style="font-size:24px">DIMENSION VII</b>
                <h2>Generate ${format(tmp[this.layer].buyables[this.id].effect)} Dimension V / sec</h2>
                  <h2>Amount: ${format(player.M.d7)} , ( ${format(player[this.layer].buyables[this.id], 0)} )</h2><br>
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
                player.M.d7 = Decimal.add(1)
            },
            tooltip() {
                return `Cost Scale: 1e64x<br>
                <p style="font-size:16px">Value Scale: 1 * mul * pow(2)</p>
                <p style="font-size:20px">Produces Dimension VI</p> `;
            },
            effect(x) {
                /*  return new Decimal(x).mul(Decimal.mul(1.5, x.pow(1)))*/
                let beff = new Decimal(1).mul(Decimal.pow(2, x.pow(1)))
                let base = player.M.d7
                let eff = new Decimal.mul(beff, base)
                return eff
            },
            unlocked() {
                return (player.M.d6.gte(1));
            }
        },
        18: {
            cost(x) {
                let pow = new Decimal(1e128)
                let base = new Decimal(1e128).mul(Decimal.pow(pow, x.pow(1)))
                return base;
            },
            display() {
                return `  <b style="font-size:24px">DIMENSION VIII</b>
                <h2>Generate ${format(tmp[this.layer].buyables[this.id].effect)} Dimension VII / sec</h2>
                  <h2>Amount: ${format(player.M.d8)} , ( ${format(player[this.layer].buyables[this.id], 0)} )</h2><br>
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
                player.M.d8 = Decimal.add(1)
            },
            tooltip() {
                return `Cost Scale: 1e128x<br>
                <p style="font-size:16px">Value Scale: 1 * mul * pow(2)</p>
                <p style="font-size:20px">Produces Dimension VII</p> `;
            },
            effect(x) {
                /*  return new Decimal(x).mul(Decimal.mul(1.5, x.pow(1)))*/
                let beff = new Decimal(1).mul(Decimal.pow(2, x.pow(1)))
                let base = player.M.d8
                let eff = new Decimal.mul(beff, base)
                return eff
            },
            unlocked() {
                return (player.M.d7.gte(1));
            }
        },
        99: {
            cost(x) {
                let pow = new Decimal(10)
                let base = new Decimal(100).mul(Decimal.pow(pow, x.pow(1)))
                return base;
            },
            display() {
                return `  <b style="font-size:24px">TICKSPEED</b>
                <h2> ${formatSmall(tmp[this.layer].buyables[this.id].effect)} Ticks / sec</h2>
                <h1>Cost: ${format(tmp[this.layer].buyables[this.id].cost)}</h1>`
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            style() {
                if (tmp[this.layer].buyables[this.id].canAfford) return {
                    "background" : "linear-gradient(0deg, rgba(223,141,255,1) 0%, rgba(126,101,136,1) 100%)",
                    "width": "200px",
                    "height": "85px",
                    "border-radius": "5px",
                    "border": "0px",
                    "margin": "5px"
                }
                return {
                    "background" : "linear-gradient(0deg, rgba(255,189,189,1) 0%, rgba(170,82,82,1) 100%)",
                    "width": "200px",
                    "height": " 85px",
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
                <p style="font-size:16px">Value Scale: 1.025x</p>
                <p style="font-size:20px">Makes game "faster"</p> `;
            },
            effect(x) {
                let pow = new Decimal(1.025)
                pow = pow.add(tmp.P.tickspeedboost)
                let eff = new Decimal(1).mul(Decimal.pow(pow, x.pow(1)))
                return eff
            },
            unlocked() {
                return hasUpgrade("M", 11);
            }
        },
    },
    tabFormat: {
        "Dimensions" : {
            unlocked() {return true},
            content : [
                ["raw-html", () => {
                if (player.M.points.gte(tmp.M.softcap)) {
                   return `You have <b style="font-size:30px; color: #df8dff; text-shadow: 0px 0px 10px">${format(player.M.points)}</b> Matter <b style="font-size:18px; color:#f00e2c; text-shadow: 0px 0px 10px">[ HARDCAPPED ]</b>`
                }
                    else return `You have <b style="font-size:30px; color: #df8dff; text-shadow: 0px 0px 10px">${format(player.M.points)}</b> Matter`
                }],
                ["raw-html", () => {
                    if (player.P.points.gte(1)) {
                        return `Matter Overflow Hardcap is at <b style="font-size:25px; color: #ff5d5d; text-shadow: 0px 0px 10px">${format(tmp.M.softcap)}</b> Matter`
                    }
                    else return ``
                }],
                "blank",
                "blank",
                ["display-text", () => {
                    return `Calculating all Matter production and multiplications you produce <b style="font-size: 22px; color:#df8dff; text-shadow: 0px 0px 10px">${format(tmp.M.calculatemps)}</b> Matter / sec`
                }],
                ["row", [["buyable", 99]]],
                ["row", [["buyable", 11]]],
                ["row", [["buyable", 12]]],
                ["row", [["buyable", 13]]],
                ["row", [["buyable", 14]]],
                ["row", [["buyable", 15]]],
                ["row", [["buyable", 16]]],
                ["row", [["buyable", 17]]],
                ["row", [["buyable", 18]]],
            ]
        },
        "Upgrades" : {
            unlocked() {return player.M.best.gte(15)},
            content : [
                "main-display",
                ["display-text", () => {
                    return `Expansion Upgrades`
                }],
                ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13]]],
                "blank",
                ["display-text", () => {
                if (hasUpgrade("M", 12)) {
                    return `Production Upgrades`
                }
                else return ``
                }],
                ["row", [["upgrade", 31], ["upgrade", 32], ["upgrade", 33], ["upgrade", 34]]],
                ["row", [["upgrade", 35], ["upgrade", 36]]],
                "blank",
            ],
        },
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})
