/**
 *
 *
 * @param {import("discord.js").Client} bot
 */
module.exports = async(bot)=>{
	console.log("Loggined as "+ bot.user.username);
	bot.users.cache.forEach((user)=>{
		console.log("adding new user "+user.id)
		bot.db.adduser(user.id)
    })
}