import {
  IoArrowBack,
  IoHeadset,
  IoMicOff,
  IoPerson,
  IoVideocam,
} from "react-icons/io5";

const ChatLayout = () => {
  return (
    <div className="bg-gray-200 rounded-lg w-full p-4 flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex gap-6">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center cursor-pointer">
            <IoArrowBack color="black" size={20} />
          </div>
          <div className="flex items-center">
            <h1 className="font-semibold text-2xl">디스고드 만들기#1</h1>
          </div>
        </div>
        <div className="flex">
          <div className="flex items-center gap-2 bg-white rounded-full py-2 px-4">
            <IoPerson color="gray" />
            <p className=" text-gray-400">3</p>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-wrap justify-start gap-4 overflow-y-scroll">
        <div className="bg-gray-500 w-96 h-64  rounded-xl"></div>
        <div className="bg-gray-500 w-96 h-64  rounded-xl"></div>
        <div className="bg-gray-500 w-96 h-64  rounded-xl"></div>
        <div className="bg-gray-500 w-96 h-64  rounded-xl"></div>
      </div>
      <div className="flex gap-8 justify-center">
        <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer">
          <IoPerson />
        </div>
        <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer">
          <IoMicOff />
        </div>
        <div className="bg-red-400 rounded-full flex items-center justify-center px-6 cursor-pointer">
          <p className="text-white">Disconnect</p>
        </div>
        <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer">
          <IoVideocam />
        </div>
        <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer">
          <IoHeadset />
        </div>
        {/* <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
      <IoEllipsisHorizontal />
    </div> */}
      </div>
    </div>
  );
};

export default ChatLayout;
