import { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } from "@discordjs/voice";
import googleTTS from "google-tts-api";

let connection = null;    
let player = null;        

export const playJoke = async (message, text) => {
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) {
        return message.reply("Спочатку зайди в голосовий канал, щоб я міг озвучити жарт.");
    }

   
    if (connection && player && player.state.status !== AudioPlayerStatus.Idle) {
        return message.reply("Я вже озвучую жарт, зачекай трохи.");
    }

    try {
        
        if (!connection) {
            connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: voiceChannel.guild.id,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator,
            });

            
            connection.on('error', error => {
                console.error('Voice connection error:', error);
                connection.destroy();
                connection = null;
                player = null;
            });
        }

        const url = googleTTS.getAudioUrl(text, {
            lang: "uk",
            slow: false,
            host: "https://translate.google.com",
        });

        const resource = createAudioResource(url);

        
        player = createAudioPlayer();

        player.play(resource);
        connection.subscribe(player);

        player.on(AudioPlayerStatus.Idle, () => {
            
            connection.destroy();
            connection = null;
            player = null;
        });

        player.on('error', error => {
            console.error('Audio player error:', error);
            connection.destroy();
            connection = null;
            player = null;
            message.channel.send("Сталася помилка при відтворенні аудіо.");
        });

    } catch (err) {
        console.error("Помилка при відтворенні аудіо:", err);
        message.channel.send("Сталася помилка при спробі озвучити жарт.");
    }
};
