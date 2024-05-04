const ChatChat = () => {
  const chats = [
    {
      profile:
        "https://instagram.ficn1-1.fna.fbcdn.net/v/t51.2885-19/316353753_926707678292197_7726306747457837288_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.ficn1-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=xfwuAnUc7oAQ7kNvgEK2BQJ&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfDOvl5HLMrv7r9TVmnMLZpt-fDNMRfR8Ig8WygMpFfmMg&oe=663B6205&_nc_sid=8b3546",
      name: "성준모",
      message: "디자인 너무 어렵다",
      time: "14:50",
    },
    {
      profile:
        "https://scontent.cdninstagram.com/v/t51.2885-19/435201158_794471895914749_8927004876572619041_n.jpg?_nc_ht=scontent.cdninstagram.com&_nc_cat=101&_nc_ohc=QAKToX5XZMwQ7kNvgE7-7iu&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfAon6yc4KZATrkDIPSo8BxLN2yzK2_WIZ1hE6uv4fgSJw&oe=663A8F5B&_nc_sid=10d13b",
      name: "이소을",
      message: "인정",
      time: "14:51",
    },
    {
      profile:
        "https://scontent.cdninstagram.com/v/t51.2885-19/435201158_794471895914749_8927004876572619041_n.jpg?_nc_ht=scontent.cdninstagram.com&_nc_cat=101&_nc_ohc=QAKToX5XZMwQ7kNvgE7-7iu&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfAon6yc4KZATrkDIPSo8BxLN2yzK2_WIZ1hE6uv4fgSJw&oe=663A8F5B&_nc_sid=10d13b",
      name: "이소을",
      message: "인정",
      time: "14:51",
    },
    {
      profile:
        "https://scontent.cdninstagram.com/v/t51.2885-19/435201158_794471895914749_8927004876572619041_n.jpg?_nc_ht=scontent.cdninstagram.com&_nc_cat=101&_nc_ohc=QAKToX5XZMwQ7kNvgE7-7iu&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfAon6yc4KZATrkDIPSo8BxLN2yzK2_WIZ1hE6uv4fgSJw&oe=663A8F5B&_nc_sid=10d13b",
      name: "이소을",
      message: "인정",
      time: "14:51",
    },
    {
      profile:
        "https://scontent.cdninstagram.com/v/t51.2885-19/435201158_794471895914749_8927004876572619041_n.jpg?_nc_ht=scontent.cdninstagram.com&_nc_cat=101&_nc_ohc=QAKToX5XZMwQ7kNvgE7-7iu&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfAon6yc4KZATrkDIPSo8BxLN2yzK2_WIZ1hE6uv4fgSJw&oe=663A8F5B&_nc_sid=10d13b",
      name: "이소을",
      message: "인정",
      time: "14:51",
    },
    {
      profile:
        "https://scontent.cdninstagram.com/v/t51.2885-19/435201158_794471895914749_8927004876572619041_n.jpg?_nc_ht=scontent.cdninstagram.com&_nc_cat=101&_nc_ohc=QAKToX5XZMwQ7kNvgE7-7iu&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfAon6yc4KZATrkDIPSo8BxLN2yzK2_WIZ1hE6uv4fgSJw&oe=663A8F5B&_nc_sid=10d13b",
      name: "이소을",
      message: "인정",
      time: "14:51",
    },
    {
      profile:
        "https://scontent.cdninstagram.com/v/t51.2885-19/435201158_794471895914749_8927004876572619041_n.jpg?_nc_ht=scontent.cdninstagram.com&_nc_cat=101&_nc_ohc=QAKToX5XZMwQ7kNvgE7-7iu&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfAon6yc4KZATrkDIPSo8BxLN2yzK2_WIZ1hE6uv4fgSJw&oe=663A8F5B&_nc_sid=10d13b",
      name: "이소을",
      message: "인정",
      time: "14:51",
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
              <img src={v.profile} className="w-12 h-12 rounded-full" />
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

      <div className="mt-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="p-4 bg-gray-100 rounded-md w-full"
        />
      </div>
    </div>
  );
};

export default ChatChat;
