require("dotenv").config();
const { Client, Intents } = require("discord.js");
const express = require('express')
const app = express()
const port = process.env.PORT
const server = app.listen(port)
server.keepAliveTimeout = 60 * 1000;
server.headersTimeout = 61 * 1000;
const fs = require('fs')

const { makeConfig } = require("./worker")

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.MESSAGE_CONTENT
    ]
});

client.on('message', async function(message) {
    if (message.content.startsWith('$emcee-gen')) {
        const { content } = message
        const command = content.split(' ')[1]
        console.log(command)

        if (!command.toLowerCase) {
            return
        }

        if (command.toLowerCase() === 'prerelease') {
            await makeConfig(command.toLowerCase())
            await client.channels.cache.get(message.channelId).send({
                files: ['./prerelease.json']
            })
            await fs.unlinkSync('./prerelease.json')
        } else if (command.toLowerCase() === 'contemporary') {
            await makeConfig(command.toLowerCase())
            await client.channels.cache.get(message.channelId).send({
                files: ['./contemporary.json']
            })
            await fs.unlinkSync('./contemporary.json')
        } else if (command.toLowerCase() === 'highlander-prerelease') {
            await makeConfig(command.toLowerCase())
            await client.channels.cache.get(message.channelId).send({
                files: ['./highlander-prerelease.json']
            })
            await fs.unlinkSync('./highlander-prerelease.json')
        } else if (command.toLocaleLowerCase() === 'highlander-contemporary') {
            await makeConfig(command.toLowerCase())
            await client.channels.cache.get(message.channelId).send({
                files: ['./highlander-contemporary.json']
            })
            await fs.unlinkSync('./highlander-contemporary.json')
        }
    }
});


client.login(process.env.TOKEN);
