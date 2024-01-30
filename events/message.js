const talkedRecently = new Set();
const Discord = require("discord.js")
/**
 *
 *
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 */
module.exports = async (bot,message)=>{
	if(message.author.bot) return;
	if(message.channel.type=="dm") return;

	if(!message.content.startsWith(prefix)) return false;
	const slice = message.content.startsWith(prefix) ? prefix.length : 0
	const args = message.content.slice(slice).split(/\s+/)
	const command = args.shift().toLowerCase()
	console.log([message.author.tag,command,...args].join(" | "))
	if (talkedRecently.has(message.author.id)) {
		let embed = new Discord.MessageEmbed()
  			.setTitle(`กรุณารอ \`2\` วิ... \`${message.author.tag}\``)
  			.setFooter(`ระบบป้องกันฟลัดถูกใช้`)
  			.setTimestamp()
			.setColor("#ff0000")
  		message.channel.send(embed).then((msg)=>{
			msg.delete({timeout:2000});
		  });
	} else {
		if (bot.commands.has(command)) {
			bot.commands.get(command).run(bot, message, args)
			talkedRecently.add(message.author.id);
			setTimeout(() => {
				talkedRecently.delete(message.author.id);
			}, 2000);
		} else if (bot.aliases.has(command)) {
			bot.commands.get(bot.aliases.get(command)).run(bot, message, args)
		}
	}
}