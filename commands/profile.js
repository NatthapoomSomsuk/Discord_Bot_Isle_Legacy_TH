const Discord = require('discord.js')
const fs = require("fs")
    /**
     * @param {import("discord.js").Client} bot
     * @param {import("discord.js").Message} message
     * @param {String[]} args
     */
exports.run = async(bot, message, args) => {
    let traget = message.mentions.users.first() || message.author
    let userdata = await bot.db.getuser(traget.id);
    if (userdata.uid == '0') return message.channel.send(new Discord.MessageEmbed().setAuthor(`คุณคุณยังไม่ได้ทำการ register โปรดทำการ ${prefix}register UID Steam เพื่อเข้าใช้งานก่อน`, "http://pluspng.com/img-png/png-wrong-cross-cancel-cross-exit-no-not-allowed-stop-wrong-icon-icon-512.png").setColor(config.colorfail));
    if (!userdata.uid) return message.reply(`กรุณาใส่ uuid steam เช่น ${prefix}profile 123456789`);
    let msg = await message.channel.send(new Discord.MessageEmbed().setAuthor("กำลังเรียกดูข้อมูลไดโนเสาร์", "https://cdn.discordapp.com/attachments/700682902459121695/709605085386113114/8104LoadingEmote.gif"))
    if (!fs.existsSync(`${config.userdatabasepath}/${userdata.uid}.json`)) {
        return msg.edit(new Discord.MessageEmbed().setAuthor(`ไม่พบไดโนเสาร์ของผู้เล่นนี้`, "http://pluspng.com/img-png/png-wrong-cross-cancel-cross-exit-no-not-allowed-stop-wrong-icon-icon-512.png").setColor(config.colorfail))
    }
    let playerdata = JSON.parse(fs.readFileSync(`${config.userdatabasepath}/${userdata.uid}.json`, { encoding: "utf-8" }))
    if (!playerdata.CharacterClass) return msg.edit(new Discord.MessageEmbed().setAuthor(`ไม่พบไดโนเสาร์ของผู้เล่นนี้`, "http://pluspng.com/img-png/png-wrong-cross-cancel-cross-exit-no-not-allowed-stop-wrong-icon-icon-512.png").setColor(config.colorfail))
    let embed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setTitle(`ไดโนเสาร์ ${playerdata.CharacterClass}`)
        .setDescription(`ข้อมูลไดโนเสาร์
    เติบโต: ${(playerdata.Growth*100).toFixed(2)}%
    เพศ: ${playerdata.bGender?"เพศเมีย":"เพศผู้"}
    ความหิว: ${playerdata.Hunger}
    ความกระหายนํ้า: ${playerdata.Thirst}
    สเตมีน่า: ${playerdata.Stamina}
    เลือด: ${playerdata.Health}
    ออกซิเจน: ${playerdata.Oxygen}
    ขาหัก: ${playerdata.bBrokenLegs?"✅":"❌"}`);

    msg.edit(embed)
}