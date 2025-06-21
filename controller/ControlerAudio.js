import fs from 'fs';
import fetch from 'node-fetch';
import { promisify } from 'util';
import stream from 'stream';
import { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } from '@discordjs/voice';
import googleTTS from 'google-tts-api';

const pipeline = promisify(stream.pipeline);

export const playJoke = async (message, text) => {
    const voiceChannel = message.member?.voice?.channel;

    if (!voiceChannel) {
        return message.reply("Спочатку зайди в голосовий канал.");
    }

    try {
        const url = googleTTS.getAudioUrl(text, {
            lang: "uk",
            slow: false,
            host: "https://translate.google.com"
        });

        const outputPath = "/tmp/joke.mp3";
        await pipeline((await fetch(url)).body, fs.createWriteStream(outputPath));

        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: voiceChannel.guild.id,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        });

        const player = createAudioPlayer();
        const resource = createAudioResource(outputPath);

        player.play(resource);
        connection.subscribe(player);

        player.on(AudioPlayerStatus.Idle, () => {
            connection.destroy();
        });

        player.on('error', error => {
            connection.destroy();
            message.channel.send("Помилка при відтворенні жарту.");
        });

    } catch (err) {
        message.channel.send("Сталася помилка при озвучуванні.");
    }
};
