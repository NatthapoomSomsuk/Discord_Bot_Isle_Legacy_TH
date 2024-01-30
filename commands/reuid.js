const Discord = require('discord.js')
    /**
     *
     *
     * @param {import("discord.js").Client} bot
     * @param {import("discord.js").Message} message
     * @param {String[]} args
     */
exports.run = async(bot, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        return message.channel.send(`${message.author} ท่านไม่มีสิทธ์ ADMINISTRATOR `);
    }
    let traget = message.mentions.users.first() || message.author
        // let userdata = await bot.db.getuser(traget.id);
        // let uidqy = await bot.db.getuid(uuid);
        // if (!args[0]) return message.reply(`โปรดทำการใส่ข้อมูล UID Steam ของคุณ ตัวอย่าง ${prefix}register 76561198300000000`);
        // if (`${uuid.length}` != 17) return message.reply(`UID Steam ของคุณไม่ถูกต้องหรือใส่ข้องมูลไม่ครบ โปรดทำการตรวจสอบ UID Steam ของคุณอีกครั้ง`);
        // if (!parseInt(args[0]) || parseInt(args[0]) <= 0) return message.reply("คำสั่งไม่ถูกต้อง");
        // if (userdata.uid != '0') {
        //     message.channel.send(new Discord.MessageEmbed().setAuthor(`คุณได้ทำการลงทะเบียน UID Steam ไว้เแล้ว`, "http://pluspng.com/img-png/png-wrong-cross-cancel-cross-exit-no-not-allowed-stop-wrong-icon-icon-512.png").setColor(config.colorfail));
        // } else if (uidqy === 'false') {
        //     bot.db.setuid(user, uuid).then(() => {
        //         message.channel.send(new Discord.MessageEmbed().setAuthor(`ทำการลงทะเบียนให้กับ ${traget.id} โดย ใช้งาน UID Steam : ${uuid}`).setColor(config.colorsuccess));
        //     });
        // } else if (uidqy === 'true') {
        //     message.channel.send(new Discord.MessageEmbed().setAuthor(`มี UID นี้แล้ว`, "http://pluspng.com/img-png/png-wrong-cross-cancel-cross-exit-no-not-allowed-stop-wrong-icon-icon-512.png").setColor(config.colorfail));
        // }
    if (!args[0]) return message.reply(`โปรดทำการ tag ชื่อผู้เล่นที่ต้องการ ReUID`);
    bot.db.setuid(traget.id, 0).then(() => {
        message.channel.send(new Discord.MessageEmbed().setAuthor(`ทำการ ReUID ของคุณ ${traget.tag} เสร็จเรียบร้อยแล้วโปรดทำการ register ใหม่อีกครั้ง`).setColor(config.colorsuccess));
    })




}