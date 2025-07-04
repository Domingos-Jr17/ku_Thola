import { createContext, useContext, useState, type ReactNode } from "react";

type TabsContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export function Tabs({
  defaultValue,
  value,
  onValueChange,
  children,
}: {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
}) {
  // Use internal state only if not controlled externally
  const [internalActiveTab, setInternalActiveTab] = useState(defaultValue || "");

  // Determine if component is controlled or uncontrolled
  const isControlled = value !== undefined;
  const activeTab = isControlled ? value : internalActiveTab;

  const setActiveTab = (tab: string) => {
    // If controlled externally, call the callback
    if (isControlled && onValueChange) {
      onValueChange(tab);
    } else {
      // Otherwise update internal state
      setInternalActiveTab(tab);
    }
  };
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="w-full">{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children }: { children: ReactNode }) {
  return (
    <div className="flex space-x-2 border-b border-gray-200 mb-4">
      {children}
    </div>
  );
}
export function TabsTrigger({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabsTrigger must be used within Tabs");
  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`px-4 py-2 text-sm font-medium border-b-2 transition-all ${
        isActive
          ? "border-blue-600 text-blue-600"
          : "border-transparent text-gray-500 hover:text-blue-600"
      }`}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabsContent must be used within Tabs");
  return context.activeTab === value ? <div>{children}</div> : null;
}
