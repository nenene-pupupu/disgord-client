import { IoMic, IoVideocam } from "react-icons/io5";

const ChatParticipants = () => {
  const clients = [
    {
      profile:
        "https://scontent.cdninstagram.com/v/t51.2885-19/435201158_794471895914749_8927004876572619041_n.jpg?_nc_ht=scontent.cdninstagram.com&_nc_cat=101&_nc_ohc=QAKToX5XZMwQ7kNvgE7-7iu&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfAon6yc4KZATrkDIPSo8BxLN2yzK2_WIZ1hE6uv4fgSJw&oe=663A8F5B&_nc_sid=10d13b",
      name: "이소을",
    },
    {
      profile:
        "https://scontent.cdninstagram.com/v/t51.2885-19/435201158_794471895914749_8927004876572619041_n.jpg?_nc_ht=scontent.cdninstagram.com&_nc_cat=101&_nc_ohc=QAKToX5XZMwQ7kNvgE7-7iu&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfAon6yc4KZATrkDIPSo8BxLN2yzK2_WIZ1hE6uv4fgSJw&oe=663A8F5B&_nc_sid=10d13b",
      name: "문종환",
    },
    {
      profile:
        "https://instagram.ficn1-1.fna.fbcdn.net/v/t51.2885-19/316353753_926707678292197_7726306747457837288_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.ficn1-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=xfwuAnUc7oAQ7kNvgEK2BQJ&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfDOvl5HLMrv7r9TVmnMLZpt-fDNMRfR8Ig8WygMpFfmMg&oe=663B6205&_nc_sid=8b3546",
      name: "성준모",
    },
    {
      profile:
        "https://instagram.ficn1-1.fna.fbcdn.net/v/t51.2885-19/316353753_926707678292197_7726306747457837288_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.ficn1-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=xfwuAnUc7oAQ7kNvgEK2BQJ&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfDOvl5HLMrv7r9TVmnMLZpt-fDNMRfR8Ig8WygMpFfmMg&oe=663B6205&_nc_sid=8b3546",
      name: "성준모",
    },
    {
      profile:
        "https://instagram.ficn1-1.fna.fbcdn.net/v/t51.2885-19/316353753_926707678292197_7726306747457837288_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.ficn1-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=xfwuAnUc7oAQ7kNvgEK2BQJ&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfDOvl5HLMrv7r9TVmnMLZpt-fDNMRfR8Ig8WygMpFfmMg&oe=663B6205&_nc_sid=8b3546",
      name: "성준모",
    },
  ];
  return (
    <div className="mt-4">
      <h2 className="text-2xl mb-2">Participants</h2>

      <div className="relative h-40 overflow-y-scroll">
        <div className="sticky top-0 bg-gradient-to-b from-white to-transparent h-2 w-full"></div>
        <div className="">
          <div className="flex flex-col gap-2">
            {clients.map((v, i) => (
              <div
                key={i}
                className={
                  "flex items-center w-full h-12 rounded-full gap-2 p-2 pr-4 " +
                  (i == 0 ? "bg-gray-100" : "")
                }
              >
                <div>
                  <img src={v.profile} className="w-8 h-8 rounded-full" />
                </div>
                <div className="flex-1">
                  <p>{v.name}</p>
                </div>
                <IoMic color="gray" className="cursor-pointer" />
                <IoVideocam color="gray" className="cursor-pointer" />
              </div>
            ))}
          </div>
        </div>

        <div className="sticky bottom-0 bg-gradient-to-t from-white to-transparent h-2 w-full"></div>
      </div>
    </div>
  );
};

export default ChatParticipants;
