const Discord = require('discord.js')
const fs = require("fs")
/**
 * @param {import("discord.js").Client} bot
 * @param {import("discord.js").Message} message
 * @param {String[]} args
 */
exports.run = async(bot, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")){
        return message.channel.send(`${message.author} ท่านไม่มีสิทธ์ ADMINISTRATOR `);
    }
    if(!args[0]) return message.reply(`กรุณาใส่ uuid steam เช่น ${prefix}heal 123456789`);
    if(!fs.existsSync(`${config.userdatabasepath}/${args[0]}.json`)){
        return message.channel.send(new Discord.MessageEmbed().setAuthor(`ไม่พบไดโนเสาร์ของผู้เล่นนี้`,"http://pluspng.com/img-png/png-wrong-cross-cancel-cross-exit-no-not-allowed-stop-wrong-icon-icon-512.png").setColor(config.colorfail))
    }
    let playerdata = JSON.parse(fs.readFileSync(`${config.userdatabasepath}/${args[0]}.json`,{encoding:"utf-8"}));
    playerdata.Health = 99999,playerdata.Hunger = 99999,playerdata.Thirst = 99999,playerdata.Stamina = 99999;
    fs.writeFile(`${config.userdatabasepath}/${args[0]}.json`,JSON.stringify(playerdata), (err) => {
        if (err){
            return message.channel.send(new Discord.MessageEmbed().setAuthor("ไม่สามารถเขียนข้อมูลลงระบบได้","http://pluspng.com/img-png/png-wrong-cross-cancel-cross-exit-no-not-allowed-stop-wrong-icon-icon-512.png").setColor(config.colorfail).setDescription("ไม่สามารถเขียนข้อมูลลงระบบเข้าตัวท่านได้กรุณาติดต่อแอดมิน\n_เนื่องจากปัญหาที่เกิดขึ้นพ้อยของท่านถูกโอนกลับแล้ว_"))
        }
        message.channel.send(new Discord.MessageEmbed().setAuthor(`heal ${playerdata.CharacterClass} แล้ว `,"https://img.pngio.com/check-circle-correct-mark-success-tick-yes-icon-png-success-395_512.png").setColor(config.colorsuccess))
    });
}