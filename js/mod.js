let modInfo = {
	name: "The Ixion Tree RE",
	id: "ATAAGO DS II",
	author: "Niko_",
	pointsName: "Time Fabrics",
	modFiles: ["GameData/L0-L2/ReFLayer0.js",
		/*"GameData/L0-L2/ReFLayer1.js",*/ /* Neutrona layer ( obselote and unusused )*/
		"GameData/L0-L2/ReFLayer2.js", 
		"GameData/SpecialLayers/Automation.js", 
		/*"InfoLayer.js", */ /* Ixion Tree Lore be like */
		"tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "GTT 1.003",
	name: "Prelude to Infinity",
}

let changelog = `<h1 style="font-weight: 100">Changelog:</h1><br>
	<h3><b style=" font-size: 33px; background: -webkit-linear-gradient(#df8dff, #8db9ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 1000">GTT 1.003</b><br>
		<br>
		<div style="font-weight: 100">
		- Reworked Matter Dimension logic because I managed to make <br>
		timewall simulator 2023 edition deluxe...<br>
		<br>
		- Removed Neutron ( Neutrona ) layer due to its unusuability. <br>
		<br>
		- Though Proton ( Protona ) layer got some serious buffs and changes.<br>
		<br>
		- Big thanks for @EmJov#5025 for making a QoL game suggestion =). <br>
		You can now toggle Matter automation On and Off + Tickspeed <br>
		 gets affected by it aswell!
		</div>`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function() {
		let a = `<br>Pre-Float Skill Tree<br>`
		if (player.M.best.gte(1.17e38)) return a = `<br>Post-Float Skill Tree<br>`
		if (player.M.best.gte(1e200)) return a = `<br>Pre-Infinity Skill Tree<br>`
		if (player.M.best.gte(1.78e308)) return a = `<br>Post-Infinity Skill Tree<br>`
		let b = `There is no real Endgame`
		return a + b
		
		
	},
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}