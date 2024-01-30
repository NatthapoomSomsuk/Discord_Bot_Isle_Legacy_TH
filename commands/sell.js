const Discord = require('discord.js')
const fs = require("fs")
const talkedRecently = new Set();

function getpricebyClassname(price, classname) {
    for (const dino in price) {
        if (price.hasOwnProperty(dino)) {
            if (price[dino].class == classname) return price[dino];
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
    if (talkedRecently.has(message.author.id)) {
        message.channel.send(new Discord.MessageEmbed().setAuthor(`โปรดรอ 60 นาที่ เพื่อใช้คำสั่งนี้อีกครั้ง`, "http://pluspng.com/img-png/png-wrong-cross-cancel-cross-exit-no-not-allowed-stop-wrong-icon-icon-512.png").setColor(config.colorfail));
    } else {
        message.channel.send(new Discord.MessageEmbed().setAuthor(`โปรดทำการ Saft logout ออกจาก Server ก่อนเพื่อทำรายการ`, "https://img.icons8.com/emoji/96/000000/warning-emoji.png").setColor(config.colorwarning));
        let traget = message.mentions.users.first() || message.author
        let userdata = await bot.db.getuser(traget.id);
        if (userdata.uid == '0') return message.channel.send(new Discord.MessageEmbed().setAuthor(`คุณคุณยังไม่ได้ทำการ register โปรดทำการ ${prefix}register UID Steam เพื่อเข้าใช้งานก่อน`, "http://pluspng.com/img-png/png-wrong-cross-cancel-cross-exit-no-not-allowed-stop-wrong-icon-icon-512.png").setColor(config.colorfail));
        let playerdata = JSON.parse(fs.readFileSync(`${config.userdatabasepath}/${userdata.uid}.json`, { encoding: "utf-8" }));
        let msg = await message.channel.send(new Discord.MessageEmbed().setAuthor("กำลังขายไดโนเสาร์", "https://cdn.discordapp.com/attachments/700682902459121695/709605085386113114/8104LoadingEmote.gif"))
        if (!fs.existsSync(`${config.userdatabasepath}/${userdata.uid}.json`)) {
            return msg.edit(new Discord.MessageEmbed().setAuthor(`ไม่พบไดโนเสาร์ของผู้เล่นนี้`, "http://pluspng.com/img-png/png-wrong-cross-cancel-cross-exit-no-not-allowed-stop-wrong-icon-icon-512.png").setColor(config.colorfail))
        }
        if (!playerdata.CharacterClass) return msg.edit(new Discord.MessageEmbed().setAuthor(`ไม่พบไดโนเสาร์ของผู้เล่นนี้`, "http://pluspng.com/img-png/png-wrong-cross-cancel-cross-exit-no-not-allowed-stop-wrong-icon-icon-512.png").setColor(config.colorfail))
        let price = bot.db.dino.price[playerdata.CharacterClass]
        if (!price) return msg.edit(new Discord.MessageEmbed().setAuthor(`ไม่พบไดโนเสาร์ตัวนี้ในระบบ`, "http://pluspng.com/img-png/png-wrong-cross-cancel-cross-exit-no-not-allowed-stop-wrong-icon-icon-512.png").setColor(config.colorfail));
        if (playerdata.Growth != 1.0) return msg.edit(new Discord.MessageEmbed().setAuthor(`ไดโนเสาร์ของคุณยังไม่เต็มวัย ${(playerdata.Growth*100).toFixed(2)}%`, "http://pluspng.com/img-png/png-wrong-cross-cancel-cross-exit-no-not-allowed-stop-wrong-icon-icon-512.png").setColor(config.colorfail));
        if (playerdata.bBrokenLegs != false) return msg.edit(new Discord.MessageEmbed().setAuthor(`ไดโนเสาร์ของคุณยังไม่หายจากการขาหักโปรดรอจนกว่าขาจะหายดี`, "http://pluspng.com/img-png/png-wrong-cross-cancel-cross-exit-no-not-allowed-stop-wrong-icon-icon-512.png").setColor(config.colorfail));
        if (playerdata.CharacterClass.toLowerCase() != price.class.toLowerCase()) return msg.edit(new Discord.MessageEmbed().setAuthor(`มีปัญหา price.json ${price}`, "http://pluspng.com/img-png/png-wrong-cross-cancel-cross-exit-no-not-allowed-stop-wrong-icon-icon-512.png").setColor(config.colorfail))
        let thisdino = {
            name: playerdata.CharacterClass,
            price: price.sell
        }
        let embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setAuthor(`คุณต้องการขายไดโนเสาร์ ${playerdata.CharacterClass} หรือไม่`, "http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/sign-warning-icon.png");
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
                bot.db.setpoint(userdata.id, userdata.point + thisdino.price, true).then(() => {
                    fs.unlink(`${config.userdatabasepath}/${userdata.uid}.json`, (err) => {
                        if (err) {
                            bot.db.setpoint(userdata.id, userdata.point, true)
                            return msg.edit(new Discord.MessageEmbed().setAuthor("ไม่สามารถเขียนข้อมูลลงระบบได้", "http://pluspng.com/img-png/png-wrong-cross-cancel-cross-exit-no-not-allowed-stop-wrong-icon-icon-512.png").setColor(config.colorfail).setDescription("ไม่สามารถเขียนข้อมูลลงระบบเข้าตัวท่านได้กรุณาติดต่อแอดมิน\n_เนื่องจากปัญหาที่เกิดขึ้นพ้อยของท่านถูกโอนกลับแล้ว_"))
                        }
                        msg.edit(new Discord.MessageEmbed().setAuthor(`ขาย ${playerdata.CharacterClass} แล้ว `, "https://img.pngio.com/check-circle-correct-mark-success-tick-yes-icon-png-success-395_512.png").setColor(config.colorsuccess))
                        talkedRecently.add(message.author.id);
                        setTimeout(() => {
                            // Removes the user from the set after a minute
                            talkedRecently.delete(message.author.id);
                        }, 3600000);
                    });
                })

            }
            if (r.emoji.name == "❌") return msg.delete()
        });

    }

}