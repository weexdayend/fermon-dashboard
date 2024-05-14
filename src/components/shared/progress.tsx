import prettyMS from "pretty-ms";

const SimpleProgressBar = ({
  progress = 0,
  remaining = 0,
  message = '',
}: {
  progress?: number;
  remaining?: number;
  message?: string;
}) => {
  return (
    <>
      {!!remaining && (
        <div className="mb-1.5 text-sm text-gray-700">
          Remaining time: {prettyMS(remaining)}
        </div>
      )}
      {!!message && (
        <div className="mb-1.5 text-sm text-gray-700">
          {message}
        </div>
      )}
      <div className="w-full py-1.5 h-6 relative rounded-full">
        <div className="absolute top-0 bottom-0 left-0 w-full h-full bg-blue-300 rounded-full"></div>
        <div
          style={{
            width: `${progress}%`,
          }}
          className="absolute top-0 bottom-0 left-0 h-full transition-all duration-150 bg-blue-600 rounded-full"
        ></div>
        <div className="absolute top-0 bottom-0 left-0 flex items-center justify-center w-full h-full">
          <span className="text-xs font-bold text-white">{progress}%</span>
        </div>
      </div>
    </>
  );
};

export default SimpleProgressBar;