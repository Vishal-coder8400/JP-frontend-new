const ResumeViewer = ({ fileUrl, name }) => {
  return (
    <div className="w-full flex-col h-[90vh] max-w-5xl mx-auto overflow-hidden flex justify-center items-center z-50">
      <h2 className="text-left w-full text-lg font-semibold mb-3">Resume</h2>
      {fileUrl ? (
        <div className="w-[90%] h-full bg-white overflow-auto rounded-lg shadow-xl relative p-4">
          <iframe
            src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
            title={name}
            width="100%"
            height="100%"
            className="w-full h-full border-0"
            allow="fullscreen"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="w-[90%] h-full flex justify-center items-center bg-gray-100 rounded-lg">
          <p className="text-gray-500 text-base">No resume available</p>
        </div>
      )}
    </div>
  );
};
export default ResumeViewer;
