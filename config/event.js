const fs = require("fs");
module.exports = (bot) => {
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
    
    const loadFiles = async (path) => {
            const event = require(`${appRoot}/${path}`);
            let eventName = path.match(/[^\\/]+(?=\.)(?!([^\\/]+[\\/]))/)[0];
            bot.on(eventName, event.bind(null, bot));
            console.log(`Add ${eventName} event`.green);
    }
    loadFolders("events")
};