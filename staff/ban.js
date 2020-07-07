const Discord = require('discord.js')
const fs = require('fs');
const config = require('../config.json');
const { RichEmbed } = require('discord.js')


module.exports.run = async (bot, message, args) => {
          if(!message.member.hasPermission('BAN_MEMBERS')) {
  let embed = new RichEmbed()
          .setDescription('Você não possuí permissão `Banir Membros`')
       .setColor("#EA1C1C")
       message.channel.send(embed)
return;
            
          }
  
    let member = message.mentions.members.first()

    const user = message.mentions.users.first();

    let prefix = config.prefix;

     ////////////////////
       if(!member) return message.channel.send(`Use: ${prefix}ban <Usuário> <Motivo>`)

  
            ////////////////////

        if(!member.bannable)
        return message.reply("Eu não posso banir esse usuário, ele pode ter um cargo maior que o meu.")

        let reason = args.slice(1).join(' ');

   let anuncioembed = new Discord.RichEmbed()
   anuncioembed.setDescription(`Você está presta a banir o ${user.toString()} você tem certeza?`)
   anuncioembed.setTimestamp();
   
   return message.channel.send(anuncioembed).then(async msg => {
   
        await msg.react("✅") 
        await msg.react("❌")

       const a1 = (reaction, user) => reaction.emoji.name ==='✅' && user.id === message.author.id
       const b1 = msg.createReactionCollector(a1, { time: 3000000 });
      
       const a2 = (reaction, user) => reaction.emoji.name ==='❌' && user.id === message.author.id
       const b2 = msg.createReactionCollector(a2, { time: 3000000 });
       
       b1.on("collect", c1 => {
        msg.delete(anuncioembed)
        if(!reason) reason = "Não informado"
        member.ban(reason)

         .catch(error => message.reply(`Desculpe ${message.author} não consigo expulsar esse jogador, devido ao erro: ${error}`));

        let pEmbed = new Discord.RichEmbed()

        .setDescription(`O jogador ${user.toString()} foi banido. \nMotivo: ${reason}`)
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL)
        .setTimestamp()
        
         msg.channel.send(pEmbed)

       })
  b2.on("collect", c2 => {
    msg.delete(0) 
    
    })
})

}
module.exports.help = {
  name: "ban"
}
