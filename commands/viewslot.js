const Discord = require('discord.js')
const fs = require("fs")

function getnamebyClassname(price, classname) {
    for (const dino in price) {
        if (price.hasOwnProperty(dino)) {
            if (price[dino].class == classname) return dino;
        }
    }
    return null;
}
/**
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
 */
exports.run = async(bot, message, args) => {
    let traget = message.mentions.users.first() || message.author
    let userdata = await bot.db.getuser(traget.id);
    if (userdata.uid == '0') return message.channel.send(new Discord.MessageEmbed().setAuthor(`คุณคุณยังไม่ได้ทำการ register โปรดทำการ ${prefix}register UID Steam เพื่อเข้าใช้งานก่อน`, "http://pluspng.com/img-png/png-wrong-cross-cancel-cross-exit-no-not-allowed-stop-wrong-icon-icon-512.png").setColor(config.colorfail));
    if (!userdata.uid) return message.reply(`กรุณาใส่ uuid steam เช่น ${prefix}viewslot 123456789`);
    let text = ""
    for (let i = 1; i < 4; i++) {
        if (fs.existsSync(`${appRoot}/config/saveslots/${userdata.uid}/${i}.json`)) {
            let data = JSON.parse(fs.readFileSync(`${appRoot}/config/saveslots/${userdata.uid}/${i}.json`));
            let shortname = getnamebyClassname(bot.db.dino.price, data.CharacterClass)
            text += `slot ${i} : ${shortname?shortname:"_"+data.CharacterClass+"_"} ${data.bGender?"เพศเมีย":"เพศผู้"} ${Math.floor(data.Growth*100)}%\n`
        } else {
            text += `slot ${i} : none\n`
        }
    }
    message.channel.send(new Discord.MessageEmbed().setTitle(`Slot ทั้งหมด ของ ${userdata.uid}`).setDescription(text).setColor(config.color))
}