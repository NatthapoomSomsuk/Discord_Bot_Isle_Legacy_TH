const Discord = require("discord.js")
    /**
     *
     *
     * @param {import("discord.js").Client} bot
     * @param {import("discord.js").Message} message
     * @param {String[]} args
     */
exports.run = async(bot, message, args) => {
    let traget = message.mentions.users.first() || message.author
    let userdata = await bot.db.getuser(traget.id);
    if (userdata.uid == '0') return message.channel.send(new Discord.MessageEmbed().setAuthor(`คุณคุณยังไม่ได้ทำการ register โปรดทำการ ${prefix}register UID Steam เพื่อเข้าใช้งานก่อน`, "http://pluspng.com/img-png/png-wrong-cross-cancel-cross-exit-no-not-allowed-stop-wrong-icon-icon-512.png").setColor(config.colorfail));
    message.channel.send({
        embed: new Discord.MessageEmbed()
            .setTitle(`พอยต์ที่มี <:dna:968048852575850497>`)
            .addField(`คุณมีโครโมโซมจำนวน ${userdata.point} <:dna:968048852575850497> โครโมโซม`, `The isle Thailand`, true)
            .setColor(config.color)
    });
}