import { ImPhoneHangUp } from "react-icons/im";
import { IoHeadset, IoMic, IoPerson, IoVideocam } from "react-icons/io5";

const ChatLayout = () => {
  return (
    <div className="bg-gray-200 rounded-lg w-full flex flex-col gap-4 p-4">
      <div className="flex flex-row justify-between mt-8 mx-8">
        <div className="flex items-center">
          <h1 className="font-semibold text-2xl">디스고드 만들기#1</h1>
        </div>
        <div className="flex">
          <div className="flex items-center gap-2 bg-white rounded-full py-2 px-4">
            <IoPerson color="gray" />
            <p className="text-gray-400">4</p>
          </div>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center overflow-y-auto">
        <div className="flex flex-wrap gap-4 overflow-y-auto justify-center">
          <div className="bg-gray-500 w-96 h-60 rounded-xl"></div>
          <div className="bg-gray-500 w-96 h-60 rounded-xl"></div>
          <div className="bg-gray-500 w-96 h-60 rounded-xl"></div>
          <div className="bg-gray-500 w-96 h-60 rounded-xl"></div>
        </div>
      </div>
      <div className="flex  gap-8 justify-center">
        <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer">
          <IoMic />
        </div>
        <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer">
          <IoVideocam />
        </div>
        <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer">
          <IoHeadset />
        </div>
        <div className="bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer">
          <ImPhoneHangUp />
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
