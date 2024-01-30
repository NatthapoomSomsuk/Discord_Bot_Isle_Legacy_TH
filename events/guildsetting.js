/**
 *
 *
 * @param {import("discord.js").Client} bot
 * @param {{}} guildsettings
 */
module.exports = async (bot,guildsettings=null)=>{
    if(!guildsettings) return;
    let guild = bot.guilds.cache.get(guildsettings.id)
    if(!guild) return;
    console.log(guild.name + " update settings")
    let statuschannel = guild.channels.cache.get(guildsettings.settings.statusid)
    if(!statuschannel) return;
    if(guildsettings.settings.enable){
        statuschannel.setName(guildsettings.settings.openmsg)
    }else{
        statuschannel.setName(guildsettings.settings.closemsg)
    }
}