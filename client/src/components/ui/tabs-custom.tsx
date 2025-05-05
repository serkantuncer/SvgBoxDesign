import React from 'react';

// Tab definition
interface Tab {
  id: string;
  label: string;
}

// Props for TabsCustom
interface TabsCustomProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

// Props for TabContent
interface TabContentProps {
  id: string;
  activeTab: string;
  children: React.ReactNode;
}

// Tabs component
export function TabsCustom({ tabs, activeTab, onChange }: TabsCustomProps) {
  return (
    <div className="border-b border-neutral-200 bg-neutral-50">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-3 text-sm font-medium transition-colors relative 
              ${activeTab === tab.id
                ? 'text-primary border-primary'
                : 'text-neutral-600 hover:text-primary hover:bg-neutral-100 border-transparent'
              }`}
            onClick={() => onChange(tab.id)}
            aria-selected={activeTab === tab.id}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// Tab content component
export function TabContent({ id, activeTab, children }: TabContentProps) {
  if (id !== activeTab) return null;
  
  return (
    <div className="p-4 space-y-4">
      {children}
    </div>
  );
}