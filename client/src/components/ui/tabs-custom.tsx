import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsCustomProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export function TabsCustom({ tabs, activeTab, onChange, className }: TabsCustomProps) {
  return (
    <div className={cn("flex border-b border-neutral-300", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={cn(
            "flex-1 py-3 px-4 font-medium transition-colors",
            activeTab === tab.id
              ? "bg-primary text-white"
              : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300"
          )}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

interface TabContentProps {
  id: string;
  activeTab: string;
  children: React.ReactNode;
  className?: string;
}

export function TabContent({ id, activeTab, children, className }: TabContentProps) {
  if (id !== activeTab) return null;
  
  return (
    <div className={cn("p-4 space-y-4", className)}>
      {children}
    </div>
  );
}
