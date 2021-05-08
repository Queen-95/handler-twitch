const {green} = require('colors')
module.exports = async(client, addr, port) => {
    console.log(`${green('[BOT]')} Connected to ${addr}:${port}`);
    console.log(`${green('[BOT]')} Connected into ${client.username}`)
}