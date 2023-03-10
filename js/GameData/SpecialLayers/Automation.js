addLayer("A", {
    startData() { return {
        unlocked: true,
        auto:{
            mauto: false,
        },
    }},
    color: "#646464",
    row: "side",
    layerShown() {return true},
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("AUTOMATION")
    },
    clickables: {
        mauto: {
            set: "auto",
            title: "Matter Layer Automation",
            display() {
                return Boolean(player.A[this.set][this.id]) ? "On" : "Off"
            },
            canClick() {
                return hasMilestone('P', 1)
            },
            onClick() {
                player.A[this.set][this.id] = Boolean(1 - player.A[this.set][this.id])
            },
            canRun() {
                return player.A[this.set][this.id] && tmp.A.clickables[this.id].canClick
            },
            unlocked() {
                return hasMilestone("P", 1)
            },
            style() {
                if (this.canClick()) return {"background": "linear-gradient(180deg, rgba(223,141,255,1) 0%, rgba(141,185,255,1) 100%)",
                "color": "white",
                "border": "0px",
                    "border-radius" : "5px"}
                else return {"background": "linear-gradient(180deg, rgba(223,141,255,1) 0%, rgba(141,185,255,1) 100%)",
                        "color" : "white",
                "border" : "0px", 
                    "border-radius" : "5px"}
            },
        },
    },
    tabFormat:[
        ["row",[["clickable","mauto"]]],
        "blank",
    ],
})