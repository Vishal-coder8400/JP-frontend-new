import React from "react";

const TabContent = ({
  activeTab,
  tabComponents,
  defaultTab,
  className = "min-w-0",
}) => {
  const renderTabContent = () => {
    const Component = tabComponents[activeTab];
    if (Component) {
      return React.createElement(Component);
    }

    if (defaultTab && tabComponents[defaultTab]) {
      return React.createElement(tabComponents[defaultTab]);
    }

    return null;
  };

  return <div className={className}>{renderTabContent()}</div>;
};

export default TabContent;
