module.exports = {
    config: {
        name: "😂",
        version: "1.0",
        author: "TK Joel",
        countDown: 5,
        role: 0,
        shortDescription: "No Prefix",
        longDescription: "No Prefix",
        category: "reply",
    },
onStart: async function(){}, 
onChat: async function({
    event,
    message,
    getLang
}) {
    if (event.body && event.body.toLowerCase() == "😂") return message.reply("Ne riez pas si fort 🤣🤣les mouches 🪰 pourraient entrer dans votre bouche ");
}
};