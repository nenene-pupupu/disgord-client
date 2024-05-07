import { IconSky } from "@/assets/svg";

export default function Profile() {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="w-1/3 h-3/4 flex flex-col items-center justify-center gap-8 shadow-xl">
        <p className="text-2xl font-bold text-sky-600">My Profile</p>
        <img src={IconSky} className="w-24 h-24 rounded-full" />
        <div className="flex flex-col gap-4">
          <div className="flex gap-16">
            <div className="w-4/5">
              <p className="text-gray-500 font-medium">user name</p>
              <p className="text-gray-900 text-xl font-medium">성준모</p>
            </div>
          </div>
          <div className="flex gap-16">
            <div className="w-4/5">
              <p className="text-gray-500 font-medium">display name</p>
              <p className="text-gray-900 text-xl font-medium">모모모모모</p>
            </div>
            <button className="px-4 bg-sky-500 rounded-lg text-white">
              Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
