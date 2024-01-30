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
    message.channel.send(new Discord.MessageEmbed().setAuthor(`โปรดทำการ Saft logout ออกจาก Server ก่อนเพื่อทำรายการ`, "https://img.icons8.com/emoji/96/000000/warning-emoji.png").setColor(config.colorwarning));
    if (userdata.uid == '0') return message.channel.send(new Discord.MessageEmbed().setAuthor(`คุณคุณยังไม่ได้ทำการ register โปรดทำการ ${prefix}register UID Steam เพื่อเข้าใช้งานก่อน`, "http://pluspng.com/img-png/png-wrong-cross-cancel-cross-exit-no-not-allowed-stop-wrong-icon-icon-512.png").setColor(config.colorfail));
    if (!args[0]) return message.reply(`กรุณาใส่ชื่อไดโนเสาร์ เช่น ${prefix}buydino ${Object.keys(bot.db.dino.price)[0]} female`);
    if (!args[1]) return message.reply(`กรุณาระบุเพศเช่น ${prefix}buy ${Object.keys(bot.db.dino.price)[0]} male`);
    if (args[1] != "male" && args[1] != "female") {
        return message.reply(`ระบุเพศไม่ถูกต้อง female หญิง male ชาย`);
    }
    if (fs.existsSync(`${config.userdatabasepath}/${userdata.uid}.json`)) {
        return message.channel.send(new Discord.MessageEmbed().setAuthor(`คุณมีไดโนเสาร์อยู่แล้วให้ใช้ ${prefix}sell เพื่อขายก่อน`, "http://pluspng.com/img-png/png-wrong-cross-cancel-cross-exit-no-not-allowed-stop-wrong-icon-icon-512.png").setColor(config.colorfail))
    }
    let msg = await message.channel.send(new Discord.MessageEmbed().setAuthor("กำลังซื้อไดโนเสาร์", "https://cdn.discordapp.com/attachments/700682902459121695/709605085386113114/8104LoadingEmote.gif"))

    if (!bot.db.dino.price.hasOwnProperty(args[0])) return msg.edit(new Discord.MessageEmbed().setAuthor(`ไม่พบไดโนเสาร์ตัวนี้ในระบบ`, "http://pluspng.com/img-png/png-wrong-cross-cancel-cross-exit-no-not-allowed-stop-wrong-icon-icon-512.png").setColor(config.colorfail));
    let thisdino = {
        name: args[0],
        price: bot.db.dino.price[args[0]].buy
    }
    let dinodata = JSON.parse(fs.readFileSync(`${appRoot}/config/dinos/${thisdino.name}.json`));
    let embed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setAuthor(`คุณต้องการซื้อไดโนเสาร์ ${args[0]} หรือไม่`, "http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/sign-warning-icon.png")
        .setDescription(`ข้อมูลไดโนเสาร์
เติบโต: ${(dinodata.Growth*100).toFixed(2)}%
เพศ: ${args[1]}
ความหิว: ${dinodata.Hunger}
ความกระหายนํ้า: ${dinodata.Thirst}
สเตมีน่า: ${dinodata.Stamina}
เลือด: ${dinodata.Health}
ออกซิเจน: ${dinodata.Oxygen}
ขาหัก: ${dinodata.bBrokenLegs?"✅":"❌"}
หากต้องการซื้อกดปุ่ม✅เพื่อยืนยันการซื้อ`);
    msg.edit(embed)
    await msg.react("✅")
    msg.react("❌")
    const filter = (reaction, user) => ['❌', '✅'].includes(reaction.emoji.name) && user.id === message.author.id;
    const collector = await msg.createReactionCollector(filter, { time: 1000 * 60 * 5 });
    collector.on('collect', async r => {
        collector.stop()
        if (r.emoji.name == "✅") {
            msg.reactions.removeAll()
            let userdata = await bot.db.getuser(message.author.id)
            if (userdata.point < thisdino.price) return msg.edit(new Discord.MessageEmbed().setAuthor(`คุณมีพ้อยไม่พอ`, "http://pluspng.com/img-png/png-wrong-cross-cancel-cross-exit-no-not-allowed-stop-wrong-icon-icon-512.png").setColor(config.colorfail));
            if (!await fs.existsSync(`${appRoot}/config/dinos/${thisdino.name}.json`)) {
                return msg.edit(new Discord.MessageEmbed().setAuthor(`ไม่พบข้อมูลไดโนเสาร์นี้ในระบบกรุณาติดต่อแอดมิน`, "http://pluspng.com/img-png/png-wrong-cross-cancel-cross-exit-no-not-allowed-stop-wrong-icon-icon-512.png").setColor(config.colorfail))
            }
            bot.db.setpoint(userdata.id, userdata.point - thisdino.price, true).then(() => {
                let isfemale = args[1] == "female" ? true : false
                dinodata.bGender = isfemale;
                fs.writeFile(`${config.userdatabasepath}/${userdata.uid}.json`, JSON.stringify(dinodata), (err) => {
                    if (err) {
                        bot.db.setpoint(userdata.id, userdata.point, true)
                        return msg.edit(new Discord.MessageEmbed().setAuthor("ไม่สามารถเขียนข้อมูลลงระบบได้", "http://pluspng.com/img-png/png-wrong-cross-cancel-cross-exit-no-not-allowed-stop-wrong-icon-icon-512.png").setColor(config.colorfail).setDescription("ไม่สามารถเขียนข้อมูลลงระบบเข้าตัวท่านได้กรุณาติดต่อแอดมิน\n_เนื่องจากปัญหาที่เกิดขึ้นพ้อยของท่านถูกโอนกลับแล้ว_"))
                    }
                    msg.edit(new Discord.MessageEmbed().setAuthor(`ซื้อ ${thisdino.name} แล้ว `, "https://img.pngio.com/check-circle-correct-mark-success-tick-yes-icon-png-success-395_512.png").setColor(config.colorsuccess))
                });
            })
        }
        if (r.emoji.name == "❌") return msg.delete()
    });
}