const StatusTabs = ({ activeStatus, onStatusChange, className = "" }) => {
  const statusTabs = [
    {
      id: "pending",
      name: "Pending",
    },
    {
      id: "approved",
      name: "Approved",
    },
    {
      id: "rejected",
      name: "Rejected",
    },
    {
      id: "hold",
      name: "Hold",
    },
  ];

  return (
    <div className="w-full gap-2">
      <div className={`w-full grid grid-cols-12 gap-2 ${className}`}>
        {statusTabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => onStatusChange(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              index === 0
                ? "col-start-9"
                : index === 1
                ? "col-start-10"
                : index === 2
                ? "col-start-11"
                : "col-start-12"
            } col-span-1 ${
              activeStatus === tab.id
                ? "bg-primary-purple text-white"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StatusTabs;
