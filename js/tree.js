var layoutInfo = {
    startTab: "none",
    startNavTab: "tree-tab",
	showTree: true,

    treeLayout: ""

    
}


// A "ghost" layer which offsets other layers in the tree
addNode("C1", {
    layerShown: "ghost",
    symbol: "∞",
    row: 0,
        position: 1,
}, 
)
addNode("C2", {
        layerShown: "ghost",
        symbol: "∞",
        row: 0,
        position: -1,
    },
)
addNode("C1", {
        layerShown: "ghost",
        symbol: "∞",
        row: 0,
        position: 2,
    },
)


addLayer("tree-tab", {
    tabFormat: [["tree", function() {return (layoutInfo.treeLayout ? layoutInfo.treeLayout : TREE_LAYERS)}]],
    previousTab: "",
    leftTab: true,
})