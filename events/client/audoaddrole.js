module.exports = async (client, guild, member) => {
    client.on('guildMemberAdd', async (member, message) => {
        const { guild } = member// We declare a constant equal to the participant.
        const role1 = message.roles.cache.find(role => role.name === 'test')//We indicate the name of the role that will be issued to the user.
        member.roles.add(role1)//We give the participant the specified role.
        console.log(
            `Audo Added the Welcome role to ${member}`
        );
    })
}