import { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } from "@discordjs/voice";
import googleTTS from "google-tts-api";


export const playJoke = async (message, text) => {
    const voiceChannel = message.member.voice.channel;

    if(!voiceChannel){
        return message.reply("Спочатку зайди в голосовий канал, щоб я міг озвучити жарт.");

    }
    try {
        const connect = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: voiceChannel.guild.id,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        });

        const url = googleTTS.getAudioUrl(text , {
            lang: "uk",
            slow: false,
            host: "https://translate.google.com",
        })

        const resource = createAudioResource(url);

        const player = createAudioPlayer();

        player.play(resource);
        connect.subscribe(player);

        player.on(AudioPlayerStatus.Idle, () => {
        connect.destroy(); 
    });

    }catch(err){
        console.error("Помилка при відтворенні аудіо:", err);
        message.channel.send("Сталася помилка при спробі озвучити жарт.");
    }
};