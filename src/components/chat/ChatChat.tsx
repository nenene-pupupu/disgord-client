const ChatChat = () => {
  const chats = [
    {
      profile:
        "https://firebasestorage.googleapis.com/v0/b/urbur-5e34d.appspot.com/o/urchive%2Fred.svg?alt=media&token=02ee6ebd-b09c-4eff-be32-4f6fb34bab85",
      name: "성준모",
      message: "디자인 너무 어렵다",
      time: "14:50",
    },
    {
      profile:
        "https://firebasestorage.googleapis.com/v0/b/urbur-5e34d.appspot.com/o/urchive%2Fyellow.svg?alt=media&token=b6a02ee0-a63a-4211-bf24-b30d2d3aeb1f",
      name: "이소을",
      message: "인정",
      time: "14:51",
    },
    {
      profile:
        "https://firebasestorage.googleapis.com/v0/b/urbur-5e34d.appspot.com/o/urchive%2Fgreen.svg?alt=media&token=5d6ae782-4c4f-451e-a6da-c5c2b1d247b1",
      name: "문종환",
      message: "견뎌",
      time: "14:55",
    },
    {
      profile:
        "https://firebasestorage.googleapis.com/v0/b/urbur-5e34d.appspot.com/o/urchive%2Fred.svg?alt=media&token=02ee6ebd-b09c-4eff-be32-4f6fb34bab85",
      name: "성준모",
      message: "넵 ..",
      time: "14:55",
    },
    {
      profile:
        "https://firebasestorage.googleapis.com/v0/b/urbur-5e34d.appspot.com/o/urchive%2Fred.svg?alt=media&token=02ee6ebd-b09c-4eff-be32-4f6fb34bab85",
      name: "성준모",
      message: "넵 ..",
      time: "14:55",
    },
  ];
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div>
        <h2 className="text-2xl mb-4">Chat</h2>
      </div>
      <div className="relative overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-b from-white to-transparent h-2 w-full"></div>
        <div className="flex flex-col gap-4 overflow-y-auto">
          {chats.map((v, i) => (
            <div key={i} className="flex gap-2">
              <img src={v.profile} className="w-8 h-8 rounded-full" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <p>{v.name}</p>
                  <p className="text-gray-300 text-sm">{v.time}</p>
                </div>
                <div className="bg-gray-100 rounded-xl p-4">
                  <p>{v.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="sticky bottom-0 bg-gradient-to-t from-white to-transparent h-2 w-full"></div>
      </div>

      <div className="flex mt-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="p-4 bg-gray-100 rounded-tl-md w-full outline-none"
        />
        <button
          type="submit"
          className="bg-sky-500 rounded-tr-md text-white text-xs px-2"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatChat;
