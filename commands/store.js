const Discord = require("discord.js")
    /**
     *
     *
     * @param {import("discord.js").Client} bot
     * @param {import("discord.js").Message} message
     * @param {String[]} args
     */

exports.run = async(bot, message, args) => {
    // message.channel.send(new Discord.MessageEmbed().setAuthor(`ระบบนี้กำลังปรับปรุ่งใหม่`, "https://img.icons8.com/emoji/96/000000/warning-emoji.png").setColor(config.colorwarning));
    message.channel.send(new Discord.MessageEmbed()
        .setTitle(`เปลี่ยนแปลง Chromos เป็น ตัวละคร`)
        .addFields({ name: '🍀 𝗛𝗲𝗿𝗯𝗶𝘃𝗼𝗿𝗲 🍀', value: '**Psittacosaurus** (Taco)``` 50 Chromos```\n**Orodromeus** (Oro) ```50 Chromos```\n**Avaceratops** (Ava) ```50 Chromos```\n**Stegosaurus **(Stego)``` 1500 Chromos```\n**Therizinosaurus **(Theri) ```2500 Chromos```\n**Ankylosaurus** (Anky) ```800 Chromos```\n**Shantungosaurus** (Shant) ```2000 Chromos```\n**Camarasaurus** (Camara) ```3000 Chromos```', inline: true }, { name: '🍖 𝗖𝗮𝗿𝗻𝗶𝘃𝗼𝗿𝗲 🍖', value: '**Velociraptor** (Velo) ```20 Chromos```\n**Herrerasaurus** (Herrera) ```50 Chromos```\n**Austroraptor** (Austro)``` 30 Chromos```\n**Albertosaurus** (Albert)```800 Chromos```\n**Acrocanthosaurus** (Acro) ```1000 Chromos```\n**Baryonyx** (Bary)``` 1300 Chromos```\n**Spinosaurus** (Spino) ```2000 Chromos```', inline: true }, )
        .setColor('#19ff00')
    );
    message.channel.send(new Discord.MessageEmbed()
        .setTitle(`อัตราแลกเปลี่ยนเป็น Chromos`)
        .addFields({ name: '🍀 𝗛𝗲𝗿𝗯𝗶𝘃𝗼𝗿𝗲 🍀', value: '**Gallimimus** (Galli)   ```160  Chromos```\n**Maiasaura** (Maia)  ```160  Chromos```\n**Diabloceratops** (Diablo)``` 160  Chromos```\n**Pachycephalosaurus** (Pachy) ``` 160  Chromos```\n**Dryosaurus** (Dryo) ```120  Chromos```\n**Triceratops** (Trike)  ```110  Chromos```', inline: true }, { name: '🍖 𝗖𝗮𝗿𝗻𝗶𝘃𝗼𝗿𝗲 🍖', value: '** Utahraptor**  (Utah )  ```110 Chromos```\n** Ceratosaurus**  (Cerato)   ```120 Chromos```\n** Dilophosaurus**  (Dilo)  ```90 Chromos```\n** Giganotosaurus**  (Giga)  ```70 Chromos```\n** Allosaurus**  (Allo)  ```140 Chromos```\n** Carnotaurus**  (Carno)  ```120 Chromos```\n** Suchomimus**  (Sucho)  ```90 Chromos```\n** Tyrannosaurus** (Rex) ```90 Chromos```', inline: true }, )
        .setColor('#fff900')
    );
}