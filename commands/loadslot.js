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
    message.channel.send(new Discord.MessageEmbed().setAuthor(`โปรดทำการ Saft logout ออกจาก Server ก่อนเพื่อทำรายการ`, "https://img.icons8.com/emoji/96/000000/warning-emoji.png").setColor(config.colorwarning));
    if (userdata.uid == '0') return message.channel.send(new Discord.MessageEmbed().setAuthor(`คุณคุณยังไม่ได้ทำการ register โปรดทำการ ${prefix}register UID Steam เพื่อเข้าใช้งานก่อน`, "http://pluspng.com/img-png/png-wrong-cross-cancel-cross-exit-no-not-allowed-stop-wrong-icon-icon-512.png").setColor(config.colorfail));
    if (!userdata.uid) return message.reply(`กรุณาใส่ uuid steam เช่น ${prefix}loadslot 123456789 1`);
    if (!args[0]) return message.reply(`กรุณาระบุเลข slot เช่น ${prefix}loadslot 1`);
    if (parseInt(args[0]) > 3 || parseInt(args[0]) < 1) return message.reply(`ใส่เลข slot ได้แค่ 1-3 เท่านั้น`);
    let msg = await message.channel.send(new Discord.MessageEmbed().setAuthor("กำลังโหลดไดโนเสาร์", "https://cdn.discordapp.com/attachments/700682902459121695/709605085386113114/8104LoadingEmote.gif"))
    if (fs.existsSync(`${config.userdatabasepath}/${userdata.uid}.json`)) {
        return msg.edit(new Discord.MessageEmbed().setAuthor(`คุณมีไดโนเสาร์อยู่ในเซิร์ฟเวอร์อยู่แล้ว`, "http://pluspng.com/img-png/png-wrong-cross-cancel-cross-exit-no-not-allowed-stop-wrong-icon-icon-512.png").setColor(config.colorfail))
    }
    if (!fs.existsSync(`${appRoot}/config/saveslots/${userdata.uid}`)) {
        fs.mkdirSync(`${appRoot}/config/saveslots/${userdata.uid}`);
        return msg.edit(new Discord.MessageEmbed().setAuthor(`ไม่พบไดโนเสาร์ใน slot นี้`, "http://pluspng.com/img-png/png-wrong-cross-cancel-cross-exit-no-not-allowed-stop-wrong-icon-icon-512.png").setColor(config.colorfail))
    }
    if (!fs.existsSync(`${appRoot}/config/saveslots/${userdata.uid}/${args[0]}.json`)) {
        return msg.edit(new Discord.MessageEmbed().setAuthor(`ไม่พบไดโนเสาร์ใน slot นี้`, "http://pluspng.com/img-png/png-wrong-cross-cancel-cross-exit-no-not-allowed-stop-wrong-icon-icon-512.png").setColor(config.colorfail))
    }
    let data = JSON.parse(fs.readFileSync(`${appRoot}/config/saveslots/${userdata.uid}/${args[0]}.json`));
    let shortname = getnamebyClassname(bot.db.dino.price, data.CharacterClass)
    if (!shortname) return msg.edit(new Discord.MessageEmbed().setAuthor(`มีปัญหา price.json`, "http://pluspng.com/img-png/png-wrong-cross-cancel-cross-exit-no-not-allowed-stop-wrong-icon-icon-512.png").setColor(config.colorfail))
    fs.copyFile(`${appRoot}/config/saveslots/${userdata.uid}/${args[0]}.json`, `${config.userdatabasepath}/${userdata.uid}.json`, (err) => {
        if (err) {
            console.error(err)
            return msg.edit(new Discord.MessageEmbed().setAuthor("ไม่สามารถเขียนข้อมูลลงระบบได้", "http://pluspng.com/img-png/png-wrong-cross-cancel-cross-exit-no-not-allowed-stop-wrong-icon-icon-512.png").setColor(config.colorfail))
        }
        let data = JSON.parse(fs.readFileSync(`${appRoot}/config/saveslots/${userdata.uid}/${args[0]}.json`));
        fs.unlinkSync(`${appRoot}/config/saveslots/${userdata.uid}/${args[0]}.json`)
        msg.edit(new Discord.MessageEmbed().setAuthor(`โหลดไดโนเสาร์ ${shortname} จาก slot ที่ ${args[0]} แล้ว `, "https://img.pngio.com/check-circle-correct-mark-success-tick-yes-icon-png-success-395_512.png").setColor(config.colorsuccess))
    });
}