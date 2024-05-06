const Tooltip = ({
  children,
  message,
}: {
  children: JSX.Element;
  message: string;
}) => {
  return (
    <div className="group relative ">
      {children}
      <span className="absolute -top-8 left-[50%] -translate-x-[50%]  scale-0 rounded bg-gray-400 p-2 text-xs text-white whitespace-nowrap group-hover:scale-100">
        {message}
      </span>
    </div>
  );
};

export default Tooltip;
