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
    let msg = await message.channel.send(new Discord.MessageEmbed().setAuthor("กำลังลบไดโนเสาร์", "https://cdn.discordapp.com/attachments/700682902459121695/709605085386113114/8104LoadingEmote.gif"))
    if (!fs.existsSync(`${config.userdatabasepath}/${userdata.uid}.json`)) {
        return msg.edit(new Discord.MessageEmbed().setAuthor(`เราไม่พบไดโนเสาร์ของคุณ`, "http://pluspng.com/img-png/png-wrong-cross-cancel-cross-exit-no-not-allowed-stop-wrong-icon-icon-512.png").setColor(config.colorfail))
    }
    let playerdata = JSON.parse(fs.readFileSync(`${config.userdatabasepath}/${userdata.uid}.json`, { encoding: "utf-8" }))
    if (!playerdata.CharacterClass) return msg.edit(new Discord.MessageEmbed().setAuthor(`เราไม่พบไดโนเสาร์ของคุณ`, "http://pluspng.com/img-png/png-wrong-cross-cancel-cross-exit-no-not-allowed-stop-wrong-icon-icon-512.png").setColor(config.colorfail))
    let embed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setAuthor(`คุณต้องการลบไดโนเสาร์ ${playerdata.CharacterClass} ของคุณหรือไม่`, "http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/sign-warning-icon.png");
    msg.edit(embed)
    await msg.react("✅")
    msg.react("❌")
    const filter = (reaction, user) => ['❌', '✅'].includes(reaction.emoji.name) && user.id === message.author.id;
    const collector = await msg.createReactionCollector(filter, { time: 1000 * 60 * 5 });
    collector.on('collect', async r => {
        collector.stop()
        if (r.emoji.name == "✅") {
            msg.reactions.removeAll()
            fs.unlink(`${config.userdatabasepath}/${userdata.uid}.json`, (err) => {
                fs.unlink(`${appRoot}/config/saveslots/${userdata.uid}/`, () => {})
                if (err) {
                    return msg.edit(new Discord.MessageEmbed().setAuthor("ไม่สามารถเขียนข้อมูลลงระบบได้", "http://pluspng.com/img-png/png-wrong-cross-cancel-cross-exit-no-not-allowed-stop-wrong-icon-icon-512.png").setColor(config.colorfail).setDescription("ไม่สามารถเขียนข้อมูลลงระบบเข้าตัวท่านได้กรุณาติดต่อแอดมิน\n_เนื่องจากปัญหาที่เกิดขึ้นพ้อยของท่านถูกโอนกลับแล้ว_"))
                }
                msg.edit(new Discord.MessageEmbed().setAuthor(`เราได้ลบ ${playerdata.CharacterClass} ของคุณแล้ว `, "https://img.pngio.com/check-circle-correct-mark-success-tick-yes-icon-png-success-395_512.png").setColor(config.colorsuccess))
            });
        }
        if (r.emoji.name == "❌") return msg.delete()
    });
}