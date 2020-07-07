//-------Requires:----------

const Discord = require("discord.js")
const config = require("./config.json")
const client = new Discord.Client()
const bot = new Discord.Client()
const active = new Map();
bot.commands = new Discord.Collection();
const fs = require("fs")
//-------Carregamento dos Comandos-------
fs.readdir("./staff", (err,files) => {
  if (err) console.error(err)
  let staff = files.filter(f => f.split(".").pop() == "js")
  staff.forEach((f,i) => {
    let props = require(`./staff/${f}`)
    console.log(` - ${f}`)
    bot.commands.set(props.help.name, props)
  })
})
fs.readdir("./hype.comandos", (err,files) => {
  if (err) console.error(err)
  let staff = files.filter(f => f.split(".").pop() == "js")
  staff.forEach((f,i) => {
    let props = require(`./hype.comandos/${f}`)
    console.log(` - ${f}`)
    bot.commands.set(props.help.name, props)
  })
})
//------Status---------
const Constants = require('discord.js/src/util/Constants.js')
Constants.DefaultOptions.ws.properties.$browser = `Discord iOS`
bot.on('ready', () => {
  console.log("O Bot "+bot.user.username+" Esta Online...")
  const bot_on = new Discord.RichEmbed()
  .setColor("GREEN")
  .setTimestamp()
  .setAuthor(" | Logs do Hype | ", bot.user.avatarURL)
  .setTitle("**__``Hype Online:``__**")
  .setDescription("**Bot Online Em ``"+bot.guilds.size+"`` Servidores Com ``"+bot.users.size+"`` Usuarios...**")
 bot.channels.get("723174187778310174").send(bot_on)


      const ms = require('pretty-ms')
       function setStatus() {
         
       }
    setInterval(() => {
 bot.user.setActivity("Estou Em: "+bot.guilds.size+" Servidores...")
bot.user.setActivity("Tempo Online: "+ms(bot.uptime)+"...")
      bot.user.setActivity("Vendo "+bot.users.size+" Usuarios...")
   setStatus();
    }, 5000)
})
// manda a cada 1m e 20s, para evitar flood
//numsei para q mais blz ta em baixo ai:
bot.on('message', async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
if(!message.content.startsWith(config.prefix)) return;
  let messageArray = message.content.split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1);
  let ops = {
        active: active
    }
  let rodar_comandos = bot.commands.get(command.slice(config.prefix.length))
if (rodar_comandos) {
    rodar_comandos.run(bot, message, args, ops);

}
})
bot.login(config.token)
/*git remote add origin https://github.com/BotDuiConfig/hype-bot.git
git push -u origin master

echo "# hype-bot" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/Equipe-Hype/hype-bot.git
git push -u origin master*/
