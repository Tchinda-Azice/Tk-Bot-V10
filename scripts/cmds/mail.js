const axios = require("axios");

module.exports = {
  config: {
    name: "mail",
    version: "1.0",
    author: "Rishad",
    countDown: 5,
    role: 2,
    shortDescription: {
      en: "retrieve emails and inbox messages",
      vi: "retrieve emails and inbox messages",
    },
    longDescription: {
      en: "retrieve emails and inbox messages",
      vi: "retrieve emails and inbox messages",
    },
    category: "tool",
    guide: {
      en: "{pn} gen\n{pn} inbox (email)",
      vi: "{pn} gen\n{pn} inbox (email)",
    },
  },

  onStart: async function ({ api, args, event }) {
    const command = args[0];

    if (command === "gen") {
      try {
        const response = await axios.get("https://for-devs.onrender.com/api/mail/gen?apikey=fuck");
        const email = response.data.email;
        return api.sendMessage(`Generated email: ${email}`, event.threadID);
      } catch (error) {
        console.error(error);
        return api.sendMessage("Failed to generate email.", event.threadID);
      }
    } else if (command === "inbox") {
      const email = args[1];

      if (!email) {
        return api.sendMessage("Please provide an email address for the inbox.", event.threadID);
      }

   try {
        const inboxResponse = await axios.get(`https://for-devs.onrender.com/api/mail/inbox?email=${email}&apikey=fuck`);
        const inboxMessages = inboxResponse.data;

        const formattedMessages = inboxMessages.map((message) => {
          return `${message.date} - From: ${message.sender}\n${message.message}`;
        });

        return api.sendMessage(`Inbox messages for ${email}:\n\n${formattedMessages.join("\n\n")}\n\nOld messages will be deleted after some time.`, event.threadID);

      } catch (error) {
        console.error(error);
        return api.sendMessage("Failed to retrieve inbox messages.", event.threadID);
      }
    } else {
      return api.sendMessage("Invalid command. Use {pn} gen or {pn} inbox (email).", event.threadID);
    }
  }
}
