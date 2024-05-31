const Tooltip = ({
  children,
  message,
}: {
  children: JSX.Element;
  message: string;
}) => {
  return (
    <div className="group relative flex">
      {children}
      <span className="absolute -top-7 left-[50%] -translate-x-[70%]  scale-0 rounded bg-gray-400 p-2 text-xs text-white whitespace-nowrap group-hover:scale-90">
        {message}
      </span>
    </div>
  );
};

export default Tooltip;
