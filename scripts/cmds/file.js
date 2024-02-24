const fs = require('fs');

module.exports = {
  config: {
    name: "file",
    version: "1.0",
    author: "Tk",
    countDown: 5,
    role: 2,
    shortDescription: "Send bot script",
    longDescription: "Send bot specified file ",
    category: "owner",
    guide: "{pn} file name. Ex: .{pn} filename"
  },

  onStart: async function ({ message, args, api, event }) {
    const permission = ["100079402482429",];
    if (!permission.includes(event.senderID)) {
      return api.sendMessage("- Bitch, Only my Boss Mr ʚɸɞ TK JOEL ʚɸɞ can use this👿🖕🏽", event.threadID, event.messageID);
    }
    
    const fileName = args[0];
    if (!fileName) {
      return api.sendMessage("Please provide a file name.", event.threadID, event.messageID);
    }

    const filePath = __dirname + `/${fileName}.js`;
    if (!fs.existsSync(filePath)) {
      return api.sendMessage(`File not found: ${fileName}.js`, event.threadID, event.messageID);
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    api.sendMessage({ body: fileContent }, event.threadID);
  }
};