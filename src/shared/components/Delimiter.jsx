const Delimiter = ({ header, className }) => {
  return (
    <div className="flex items-center justify-center w-full h-[20vh]">
      <div className={`text-4xl opacity-100 mb-5 ${className} w-full mx-5`}>
        <hr className="mb-2 border-none h-px bg-gradient-to-r from-black via-[#A40000] to-black" />
        <h1 className="text-center">{header}</h1>
        <hr className="mt-2 border-none h-px bg-gradient-to-r from-black via-[#A40000] to-black" />
      </div>
    </div>
  );
};

export default Delimiter;
