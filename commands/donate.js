const Discord = require('discord.js')
const talkedRecently = new Set();
const { MessageActionRow, MessageButton } = require('discord.js');
/**
 *
 *
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
 */
exports.run = async(bot, message, args) => {
    if (!args[0]) { message.channel.send(new Discord.MessageEmbed().setAuthor(`โปรดทำการ ใส่จำนวนเงินที่ต้องการโดเนท`, "https://img.icons8.com/emoji/96/000000/warning-emoji.png").setColor(config.colorwarning)); }
    var request = require('request');
    var options = {
        'method': 'POST',
        'url': 'http://191.101.215.205/api/v1/qrcode',
        formData: {
            'amount': args[0]
        }
    };
    request(options, function(error, response) {
        if (error) throw new Error(error);
        message.channel.send(new Discord.MessageEmbed()
            .setTitle(`ทำการสแกน QR Code เพื่อทำการ Donate ให้กับเรา`)
            .setImage(`http://191.101.215.205/qrcode/${response.body}`)
            .setColor('#77b255')
        );
    });
}