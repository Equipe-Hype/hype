const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
  

    let ping = new Discord.RichEmbed()
        .setColor("GREEN")
    .setTimestamp()
       .addField('| **__Bot Ping :__** ', Math.floor(bot.ping) + 'ms')
message.channel.send(ping);
        

};

exports.help = {
    name: "ping"
}
