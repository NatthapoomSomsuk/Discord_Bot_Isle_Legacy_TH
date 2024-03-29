const Discord = require("discord.js")
const fs = require("fs");
module.exports = async (bot) => {
    bot.commands = new Discord.Collection()
    bot.aliases = new Discord.Collection()
    const loadFolders = (path, sub=null) => {
        fs.readdir(path, (err, files) => {
            if(files) files.forEach(file=>{
                if (file.endsWith('.js')&&file[0]!="-") return loadFiles(path+"/"+file);
                else if(file[0]=="-") return console.log(`Skipped ${file}`.yellow);
                //console.log(`loading folders ${file}`.yellow)
                loadFolders(path+"/"+file)
            });
            else return //console.log(`Skipped ${file} floder empty!`.yellow);
        });
    }
    
    const loadFiles = (path) => {
            if (!path.endsWith(".js")) return;
            delete require.cache[require.resolve(`${appRoot}/${path}`)]
            let props = require(`${appRoot}/${path}`);
            let command = path.match(/[^\\/]+(?=\.)(?!([^\\/]+[\\/]))/)[0];
            console.log(`Loaded ${command}.js`.green);
            bot.commands.set(command, props)
            try {
            props.conf.aliases.forEach(alias => {
            bot.aliases.set(alias, command)
            })
            } catch (error) {
                
            }
    }
    loadFolders('commands')
};