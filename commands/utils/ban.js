'use strict';

const Command = require("../../structure/Command.js");

class Ban extends Command {
    constructor() {
        super({
            name: 'ban',
            category: 'utils',
            description: 'Roll a dice',
            usage: 'ban <username> <reason>',
            example: ['ban arvix Spam in chat', 'ban @arvix Spam in chat'],
            perms: "mod"
        });
    }

    async run(client, channel, content, user, args) {
        if(!args[1]) {
            return client.say(channel, `@${user.username}, No user specified!`)
        } else {
            const target = args[1].replace("@",'');
            args.shift(); args.shift();
            client.ban(channel, target, args.join(" ")).then(res => {
                client.say(channel, `@${user.username}, Successfully banned ${target} from the channel`)
            }).catch((e) => {
                client.say(channel, `@${user.username}, An error has occured! ${e.error}`)
            })

        }
    }
}

module.exports = new Ban;