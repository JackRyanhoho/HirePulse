import AgoraChat from 'agora-chat';

const AGORA_APP_KEY = "611423034#1623825"; 
const CHAT_USER_ID = "rajaryan";
const CHAT_USER_TOKEN = "007eJxTYGCTehBs0/dKV5abSWWzheE2ywNyH0NiV2UZeT1VMTDL+qjAYGphZmpmYZCcmmpsapJkZmhpbmloZJFslmicbGFgamo2f454ZkMgI8MVvpUMjAysQMzIAOKrMJgYmRkYGCUa6CYbWqboGhqmGegmmZsY6VpamiRZpBmZGxsbWgIAnJ4iHA==";
const BOT_USER_ID = "chatbot";

export interface AgoraService {
  init: (onMessageReceived: (message: any) => void) => void;
  sendMessage: (text: string) => Promise<void>;
  conn: any;
}

let conn: any;
let messageHandler: ((message: any) => void) | null = null;

// This is the core logic for establishing a connection
const connect = () => {
    // If we're already connected, resolve immediately
    if (conn && conn.isOpened()) {
        return Promise.resolve();
    }

    // If a connection object doesn't exist, create it for the first time
    if (!conn) {
        conn = new AgoraChat.connection({
            appKey: AGORA_APP_KEY,
        });
        agoraService.conn = conn;

        // Add event handlers only once
        conn.addEventHandler("connection&message", {
            onConnected: () => console.log("Agora Chat connected successfully."),
            onTextMessage: (message: any) => {
                console.log("Message received from Agora:", message);
                if (message.from === BOT_USER_ID && messageHandler) {
                    try {
                        const parsedData = JSON.parse(message.msg);
                        messageHandler(parsedData);
                    } catch (e) {
                        console.error("Failed to parse message from bot, treating as plain text:", e);
                        messageHandler({ text: message.msg, candidates: [] });
                    }
                }
            },
            onDisconnected: () => console.log("Agora Chat disconnected."),
            onError: (error: any) => console.error("Agora Chat Error:", error),
        });
    }

    // Open the connection (or re-open if it was previously closed)
    return conn.open({
        user: CHAT_USER_ID,
        agoraToken: CHAT_USER_TOKEN,
    });
};

const agoraService: AgoraService = {
  conn: null,
  init: (onMessageReceived) => {
    // Avoid re-registering the handler if init is called multiple times.
    if (!messageHandler) {
      messageHandler = onMessageReceived;
    }
    // Attempt to connect immediately on initialization.
    connect().catch(e => console.error("Initial Agora connection failed:", e));
  },

  sendMessage: async (text: string) => {
    try {
        // This will connect if not already connected, or resolve immediately if it is.
        // It robustly handles reconnection and initial connection race conditions.
        await connect();
    } catch (error) {
        console.error("Agora connection failed before sending message:", error);
        throw new Error("Chat service not initialized.");
    }

    const msg = AgoraChat.message.create({
      type: "txt",
      to: BOT_USER_ID,
      msg: text,
      chatType: 'singleChat'
    });

    try {
      await conn.send(msg);
      console.log("Message sent to bot:", text);
    } catch (e) {
      console.error("Failed to send message:", e);
      throw e;
    }
  },
};

export default agoraService;
