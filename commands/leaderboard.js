const Discord = require('discord.js')
    /**
     *
     *
     * @param {import("discord.js").Client} bot
     * @param {import("discord.js").Message} message
     * @param {String[]} args
     */
exports.run = async(bot, message, args) => {
    let text = ""
    let list = await bot.db.all(`SELECT * FROM users ORDER BY point DESC LIMIT 20`);
    for (let i = 0; i < list.length; i++) {
        if (!bot.users.cache.get(list[i].id)) {
            text += `อันดับที่ \`${i+1}\` **${list[i].id}** พ้อย \`${list[i].point}\`\n`;
            continue;
        }
        text += `อันดับที่ \`${i+1}\` **${bot.users.cache.get(list[i].id).username}** พ้อย \`${list[i].point}\`\n`
    }
    message.channel.send(new Discord.MessageEmbed()
        .setTitle(`**อันดับคนสะสม Point เยอะที่สุด**`)
        .setDescription(text)
        .setColor(config.color));
}
exports.conf = { aliases: [] };