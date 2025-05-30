import 'dotenv/config';
import { Client, GatewayIntentBits } from 'discord.js';
import fetch from 'node-fetch';

const client = new Client({
    intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent ]
});


client.once('ready', () => {
    console.log(`Bot logged in as ${client.user.tag}`);
})

client.on('messageCreate', async message => {
    if(message.author.bot) return;

    if(message.content.toLowerCase() === '!joke'){
        try{
            const res = await fetch('http://localhost:3000/api/jokes/random');
            const data = await res.json();
            message.channel.send(data.text);
        }catch(err){
            message.channel.send('Error');
        }
    }
});

client.login(process.env.DISCORD_TOKEN);