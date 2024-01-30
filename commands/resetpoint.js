const Discord = require('discord.js')
/**
 *
 *
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
 */
exports.run = async(bot, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")){
        return message.channel.send(`${message.author} ท่านไม่มีสิทธ์ ADMINISTRATOR `);
    }
    let target = message.mentions.users.first();
	if(!target) return message.reply(`กรุณาแท็ค user เช่น ${prefix}resetpoint ${message.author}`);
    bot.db.setpoint(target.id,0).then(()=>{
        message.channel.send(new Discord.MessageEmbed().setAuthor(`รีเซ็ต point ของ ${target.tag} แล้ว`,'https://img.pngio.com/check-circle-correct-mark-success-tick-yes-icon-png-success-395_512.png').setColor(config.colorsuccess))
    })
}