const Discord = require("discord.js");
const bot = new Discord.Client();

const sqlite3 = require('sqlite3').verbose()
const { open } = require("sqlite")
require("colors")
const path = require('path');
global.config = require("./config/config.js")
global.prefix = "d!";
global.appRoot = path.resolve(__dirname);

(async() => {
    bot.db = await open({
        filename: './database.dll',
        driver: sqlite3.Database
    });
    await bot.db.exec(`CREATE TABLE IF NOT EXISTS users (
        id varchar(20) PRIMARY KEY,
        point int DEFAULT 0 not null,
        uid varchar(17) DEFAULT 0 not null
    )`)
    require('./config/dinoloader')(bot);

    bot.db.adduser = async(userid) => {
        return new Promise(async(resolve, reject) => {
            bot.db.exec(`INSERT OR IGNORE INTO users(id) VALUES('${userid}')`).then((user) => {
                return resolve(user)
            })
        })
    }
    bot.db.setuid = async(userid, uid) => {
        return new Promise(async(resolve, reject) => {
            bot.db.exec(`UPDATE users SET uid = ${uid} WHERE id = "${userid}"`).then((user) => {
                return resolve(user)
            })
        })
    }
    bot.db.setpoint = async(userid, point, check = false) => {
        return new Promise(async(resolve, reject) => {
            if (!check) {
                await bot.db.getuser(userid)
            }
            bot.db.exec(`UPDATE users SET point = ${point} WHERE id = "${userid}"`).then((user) => {
                return resolve(user)
            })
        })
    }
    bot.db.getuser = async(userid) => {
        return new Promise(async(resolve, reject) => {
            bot.db.get(`SELECT * FROM users WHERE id = "${userid}"`).then(async(user) => {
                if (user) {
                    return resolve(user)
                } else {
                    bot.db.adduser(userid).then(async(user) => {
                        return resolve(user)
                    })
                }
            })
        })
    }

    bot.db.getuid = async(userid) => {
        return new Promise(async(resolve, reject) => {
            bot.db.get(`SELECT * FROM users WHERE uid = "${userid}"`).then(async(user) => {
                if (user === undefined) {
                    return resolve('false')
                } else {
                    return resolve('true')
                }
            })
        })
    }
    bot.db.qyuid = async(userid) => {
            return new Promise(async(resolve, reject) => {
                bot.db.get(`SELECT * FROM users WHERE uid = "${userid}"`).then(async(user) => {
                    if (user) {
                        return resolve(user)
                    } else {
                        return bot.db.adduser(userid).then(async(user) => {
                            return resolve(user)
                        })
                    }
                })
            })
        }
        /*
        bot.db.getguild = async(guildid)=>{
            return new Promise(async(resolve,reject)=>{
                bot.db.get('SELECT * FROM guilds WHERE id = ?', guildid).then(async(guild)=>{
                    if(guild){
                        guild["settings"] = JSON.parse(guild["settings"])
                    }   
                    return resolve(guild)
                })
            })
        }*/
})()
require('./config/command')(bot);
require('./config/event')(bot);

bot.login(config.token)