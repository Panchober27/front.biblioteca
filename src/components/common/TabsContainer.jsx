import React, {useState, useEffect} from "react";
import Tabs, { TabPane } from "rc-tabs";

const TabsContainer = ({
  title,
  children,
  defaultActiveKey,
  onChange,
  onTabClick,
  onTabClose,
}) => {
  const [activeKey, setActiveKey] = useState(1);
//   const onTabClick = (key) => {
//     setActiveKey(key);
//   };

  return (
    <Tabs
      activeKey={activeKey}
      onTabClick={onTabClick}
      renderTabBar={() => <Tabs.DefaultTabBar />}
      renderTabContent={() => <Tabs.DefaultTabBar />}
    ></Tabs>
  );
};

export default TabsContainer;
