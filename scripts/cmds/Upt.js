module.exports = {
  config: {
    name: "uptime",
aliases: ["upt"],
    version: "1.0",
    author: "TK Joel",
    role: 2,
    shortDescription: {
      en: "Displays the total number of users of the bot and check uptime "
    },
    longDescription: {
      en: "Displays the total number of users who have interacted with the bot and check uptime."
    },
    category: "system",
    guide: {
      en: "Use {p}totalusers to display the total number of users of the bot and check uptime."
    }
  },
  onStart: async function ({ api, event, args, usersData, threadsData }) {
    try {
      const allUsers = await usersData.getAll();
      const allThreads = await threadsData.getAll();
      const uptime = process.uptime();
      
const days = 
Math.floor(uptime / (3600 * 24));
      const hours = Math.floor(uptime / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = Math.floor(uptime % 60);
      
      const uptimeString = `${days}days ${hours}𝑯𝒓𝒔 ${minutes}𝑴𝒊𝒏 ${seconds}𝑺𝒆𝒄`;
      
      api.sendMessage(`═════𝗨𝗽𝘁𝗶𝗺𝗲/𝗨𝗽𝘁═════

⏰ | 𝐓𝐞𝐦𝐩𝐬 𝐝' 𝐞𝐱𝐞́𝐜𝐮𝐭𝐢𝐨𝐧 𝐝𝐞 𝐓𝐊 𝐁𝐨𝐭ℹ \ ${uptimeString}\

≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
👪 | 𝐍𝐨𝐦𝐛𝐫𝐞 𝐭𝐨𝐭𝐚𝐥 𝐝' 𝐮𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐞𝐮𝐫🚻 \ ${allUsers.length}\

≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡

👥 | 𝐍𝐨𝐦𝐛𝐫𝐞 𝐭𝐨𝐭𝐚𝐥 𝐝𝐞 𝐝𝐢𝐬𝐜𝐮𝐬𝐬𝐢𝐨𝐧𝐬💬 \ ${allThreads.length}`, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while retrieving data.", event.threadID);
    }
  }
};
