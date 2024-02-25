const { getStreamsFromAttachment } = global.utils;

module.exports = {
	config: {
		name: "notification",
		aliases: ["notify", "noti"],
		version: "1.6",
		author: "NTKhang",
		countDown: 5,
		role: 2,
		shortDescription: {
			vi: "Gửi thông báo từ admin đến all box",
			en: "Send notification from admin to all box"
		},
		longDescription: {
			vi: "Gửi thông báo từ admin đến all box",
			en: "Send notification from admin to all box"
		},
		category: "owner",
		guide: {
			en: "{pn} <tin nhắn>"
		},
		envConfig: {
			delayPerGroup: 250
		}
	},

	langs: {
		vi: {
			missingMessage: "Vui lòng nhập tin nhắn bạn muốn gửi đến tất cả các nhóm",
			notification: "Thông báo từ admin bot đến tất cả nhóm chat (không phản hồi tin nhắn này)",
			sendingNotification: "Bắt đầu gửi thông báo từ admin bot đến %1 nhóm chat",
			sentNotification: "✅ Đã gửi thông báo đến %1 nhóm thành công",
			errorSendingNotification: "Có lỗi xảy ra khi gửi đến %1 nhóm:\n%2"
		},
		en: {
			missingMessage: "📥 Maitre veillez saisir le messages qui sera distribuée à tout les groupes📨",
			notification: "══════ ⋆★⋆ ══════                           𝖀𝖓 𝖈𝖔𝖚𝖗𝖗𝖎𝖊𝖗 𝖊́𝖑𝖊𝖈𝖙𝖗𝖔𝖓𝖎𝖖𝖚𝖊 𝖆 𝖊́𝖙𝖊́ 𝖊𝖓𝖛𝖔𝖞𝖊́ 𝖕𝖆𝖗 𝖑'𝖆𝖉𝖒𝖎𝖓 𝖉𝖚 𝖇𝖔𝖙 📬 (𝕽𝖊́𝖕𝖔𝖓𝖉𝖊𝖟 𝖆̀ 𝖑'𝖆𝖉𝖒𝖎𝖓 📨 𝖊𝖓 𝖚𝖙𝖎𝖑𝖎𝖘𝖆𝖓𝖙  𝖑𝖆 𝖈𝖒𝖉 -𝖈𝖆𝖑𝖑𝖆𝖉)     ══════ ⋆★⋆══════",
			sendingNotification: "✅📬Début de l' envoie de votre Message à %1 groupes ",
			sentNotification: "✅ Maître le message à était envoyé dans %1 groupes 🚀",
			errorSendingNotification: "🚨 Maître j' ai rencontré des problèmes en route avec  %1 groupes:\n%2"
		}
	},

	onStart: async function ({ message, api, event, args, commandName, envCommands, threadsData, getLang }) {
		const { delayPerGroup } = envCommands[commandName];
		if (!args[0])
			return message.reply(getLang("missingMessage"));
		const formSend = {
			body: `${getLang("notification")}\n\n${args.join(" ")}`,
			attachment: await getStreamsFromAttachment(
				[
					...event.attachments,
					...(event.messageReply?.attachments || [])
				].filter(item => ["photo", "png", "animated_image", "video", "audio"].includes(item.type))
			)
		};

		const allThreadID = (await threadsData.getAll()).filter(t => t.isGroup && t.members.find(m => m.userID == api.getCurrentUserID())?.inGroup);
		message.reply(getLang("sendingNotification", allThreadID.length));

		let sendSucces = 0;
		const sendError = [];
		const wattingSend = [];

		for (const thread of allThreadID) {
			const tid = thread.threadID;
			try {
				wattingSend.push({
					threadID: tid,
					pending: api.sendMessage(formSend, tid)
				});
				await new Promise(resolve => setTimeout(resolve, delayPerGroup));
			}
			catch (e) {
				sendError.push(tid);
			}
		}

		for (const sended of wattingSend) {
			try {
				await sended.pending;
				sendSucces++;
			}
			catch (e) {
				const { errorDescription } = e;
				if (!sendError.some(item => item.errorDescription == errorDescription))
					sendError.push({
						threadIDs: [sended.threadID],
						errorDescription
					});
				else
					sendError.find(item => item.errorDescription == errorDescription).threadIDs.push(sended.threadID);
			}
		}

		let msg = "";
		if (sendSucces > 0)
			msg += getLang("sentNotification", sendSucces) + "\n";
		if (sendError.length > 0)
			msg += getLang("errorSendingNotification", sendError.reduce((a, b) => a + b.threadIDs.length, 0), sendError.reduce((a, b) => a + `\n - ${b.errorDescription}\n  + ${b.threadIDs.join("\n  + ")}`, ""));
		message.reply(msg);
	}
};