import { IoMic, IoVideocam } from "react-icons/io5";

const ChatParticipants = () => {
  const clients = [
    {
      profile:
        "https://firebasestorage.googleapis.com/v0/b/urbur-5e34d.appspot.com/o/urchive%2Fyellow.svg?alt=media&token=b6a02ee0-a63a-4211-bf24-b30d2d3aeb1f",
      name: "이소을",
    },
    {
      profile:
        "https://firebasestorage.googleapis.com/v0/b/urbur-5e34d.appspot.com/o/urchive%2Fgreen.svg?alt=media&token=5d6ae782-4c4f-451e-a6da-c5c2b1d247b1",
      name: "문종환",
    },
    {
      profile:
        "https://firebasestorage.googleapis.com/v0/b/urbur-5e34d.appspot.com/o/urchive%2Fred.svg?alt=media&token=02ee6ebd-b09c-4eff-be32-4f6fb34bab85",
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
