import 'dotenv/config';
import { Client, GatewayIntentBits } from 'discord.js';
import fetch from 'node-fetch';
import{playJoke} from './controller/ControlerAudio.js';

const client = new Client({
    intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent,  GatewayIntentBits.GuildVoiceStates ]
});


client.once('ready', () => {
    console.log(`Bot logged in as ${client.user.tag}`);
})

client.on('messageCreate', async message => {
    if(message.author.bot) return;

    if(message.content.toLowerCase() === '!joke'){
        try{
            const res = await fetch(`${process.env.API_URL}/api/jokes/random`);
            const data = await res.json();
            await message.channel.send(data.text);

            await playJoke(message , data.text);
        }catch(err){
            message.channel.send('Error');
        }
    }
});

client.login(process.env.DISCORD_TOKEN);