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
	if(!target) return message.reply(`กรุณาแท็ค user เช่น ${prefix}addpoint ${message.author} 40`);
	if(target&&!args[1]) return message.reply(`กรุณาใส่ point เช่น ${message.content} 40`);
	if(!parseInt(args[1])||parseInt(args[1])<=0) return message.reply("คำสั่งไม่ถูกต้อง");
    let amount = parseInt(args[1]);
    bot.db.setpoint(target.id,amount).then(()=>{
        message.channel.send(new Discord.MessageEmbed().setAuthor(`ปรับ chromos ของ ${target.tag} เป็น ${amount}`).setImage('https://cdn.discordapp.com/attachments/700682902459121695/710127424943423529/text-plus-icon.png').setcolor(config.colorsuccess))
    })
}