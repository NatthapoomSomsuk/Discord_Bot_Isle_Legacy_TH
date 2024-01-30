const Discord = require("discord.js")
const fs = require("fs");
module.exports = async (bot) => {
    bot.db.dino = {
        price: require("./price.json")
    }
    for (const dino in bot.db.dino.price) {
        if (bot.db.dino.price.hasOwnProperty(dino)) {
            if(!fs.existsSync(appRoot+`/config/dinos/${dino}.json`)) {
                console.log(`${dino} not Exists`.red)
                return process.exit()
            }
            const data = JSON.parse(fs.readFileSync(appRoot+`/config/dinos/${dino}.json`))
            bot.db.dino.price[dino]["class"] = data.CharacterClass
        }
    }
};