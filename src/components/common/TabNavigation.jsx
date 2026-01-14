const TabNavigation = ({
  tabs,
  activeTab,
  onTabChange,
  className = "",
  containerClassName = "w-full space-y-6 min-w-0",
  showActions = false,
  actions = null,
}) => {
  return (
    <div className={containerClassName}>
      <div className="flex items-center justify-between min-w-0">
        <div className="flex p-1 min-w-0 overflow-x-auto flex-1 lg:max-w-3xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center px-4 py-2 transition-colors font-medium border-b-[1px] cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-b-primary-purple text-primary-purple"
                  : "text-gray1 border-b-gray1"
              } ${className}`}
            >
              {tab.icon && <span className="mr-2">{tab.icon}</span>}
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {showActions && (
          <div className="flex justify-end items-center space-x-4 ml-4">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default TabNavigation;
