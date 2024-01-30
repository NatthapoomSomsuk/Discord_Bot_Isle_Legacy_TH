const Discord = require("discord.js")
    /**
     *
     *
     * @param {import("discord.js").Client} bot
     * @param {import("discord.js").Message} message
     * @param {String[]} args
     */
exports.run = async(bot, message, args) => {
    return message.channel.send(new Discord.MessageEmbed()
        .setTitle(`คำสั่งต่างๆ ❓`)
        .addField("คำสั่งทั่วไป ⚡", `\`${prefix}buydino (ชื่อไดโนเสาร์) (เพศ male, female)\` สำหรับซื้อไดโนเสาร์
\`${prefix}cm\` สำหรับดูโครโมโซมของท่าน
\`${prefix}register (UID Steam)\` สำหรับลงชื่อเข้าใช้งาร Bot
\`${prefix}store\` สำหรับดูราคาไดโนเสาร์
\`${prefix}sell\` สำหรับขายไดโนเสาร์ 
\`${prefix}donate (จำนวนเงิน)\` สำหรับบริจากเงินให้กับเรา
\`${prefix}profile \` สำหรับดูไดโนเสาร์ใน Server 
\`${prefix}viewslot \` สำหรับดูข้อมูลใน slot ที่บันทึกไว้
\`${prefix}saveslot (ช่อง slot)\` สำหรับเซฟไดโนเสาร์
\`${prefix}loadslot  (ช่อง slot)\` สำหรับโหลดไดโนเสาร์เข้า Server 
\`${prefix}slay \` สำหรับลบตัวละครออกจาก Server 
\`${prefix}leaderboard\` สำหรับดูคนสะสมพ้อยมากที่สุด
\`${prefix}help\` สำหรับดูหน้านี้`, false)
        .addField("คำสั่งแอดมิน 💻", `\`${prefix}heal (uuid)\` สำหรับเพิ่มเลือดไดโนเสาร์
\`${prefix}addpoint (tag) (จำนวนพ้อย)\` สำหรับเพิ่มพ้อย
\`${prefix}removepoint (tag) (จำนวนพ้อย)\` สำหรับลบพ้อย
\`${prefix}reuid (tag) \` สำหรับ reuid ผู้เล่น
\`${prefix}resetpoint (tag)\` สำหรับปรับพ้อย เป็น 0`)
        .setColor(config.color))
}