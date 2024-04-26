const Header = () => {
  return (
    <div className="flex flex-row h-20 justify-between items-center mx-12">
      <div>
        <p className="font-bold text-2xl">DISGORD</p>
      </div>
      <div className="flex flex-row gap-4 items-center">
        <p className="bg-slate-400 rounded-full w-6 h-6"></p>
        <p className="bg-slate-400 rounded-full w-6 h-6"></p>
        <p className="bg-slate-400 rounded-full w-6 h-6"></p>
        <p className="bg-slate-400 rounded-full w-6 h-6"></p>
      </div>
    </div>
  );
};

export default Header;
