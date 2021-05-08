'use strict';

const Command = require("../../structure/Command.js");

class Dice extends Command {
    constructor() {
        super({
            name: 'dice',
            category: 'utils',
            description: 'Roll a dice',
            usage: 'dice',
            example: ['dice'],
            aliases: ['dé']
        });
    }

    async run(client, channel) {
        client.say(channel, `You rolled: ${Math.floor(Math.random() * 6) + 1}`)
    }
}

module.exports = new Dice;