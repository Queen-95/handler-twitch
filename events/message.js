module.exports = async(client, channel, user, content, self) => {
    const data = content;
    //console.log(user)
    const args = data.slice(client.prefix.length).trim().split(/ +/g);

    if (!data.startsWith(client.prefix)) {
        return;
    }
    let command;
    if(!client.commands.has(args[0])) {
        client.commands.forEach((value, key) => {
            if(key === args[0] || value.aliases.includes(args[0])) {
                command = client.commands.get(key);
            }
        })
    } else {
        command = client.commands.get(args[0])
    }
    //const command = client.commands.find(cmd => cmd.aliases.includes(args[0])) || client.commands.get(args[0]);
    if (!command) {
        return ;
    }
    if(!command.botNotAllowed && self) {
        return;
    }
    console.log(user.badges.broadcaster !== '1')
    if(command.perms === 'owner') {
        if(!client.config.owners.includes(user.username)) {
            client.say(channel, `@${user.username}, you are not allowed to you use that!`);
            return;
        }
    }
    if(command.perms === "mod" && user.badges.broadcaster !== '1') {
        if(!user.mod) {
            client.say(channel, `@${user.username}, Only mods can use that command!`);
            return;
        }
    }
    if(command.perms === "sub") {
        if(!user.subscriber) {
            client.say(channel, `@${user.username}, Only subscribers can use that command!`);
            return;
        }
    }
    if(command.perms === "streamer") {
        if(user.badges.broadcaster !== '1') {
            client.say(channel, `@${user.username}, Only the streamer can use that command!`);
            return;
        }
    }
    try {
        command.run(client, channel, content, user, args)
    } catch (err) {
        client.emit('error',err);
    }
}