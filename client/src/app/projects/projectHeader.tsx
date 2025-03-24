/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import Header from '../components/header';
import { Clock1, FilterIcon, Grid3X3Icon, List, Share2Icon, Table2 } from 'lucide-react';

type IAppProps = {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}
function ProjectHeader({ activeTab, setActiveTab }: IAppProps) {
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  return (
    <div className="px-4 xl:px-6">
      {/* Modal */}
      <div className="py-6 lg:pb-4 lg:pt-8">
        <Header name="Projects" />
      </div>
      {/* Tabs */}
      <div className="flex flex-wrap-reverse gap-4 md:gap-2 border-y border-gray-200 pb-[8px] pt-2 dark:border-stroke-dark md:items-center">
        <div className="flex flex-1 items-center gap-3 md:gap-4">
          <TabButton
            name="Board"
            icon={<Grid3X3Icon className="size-6 rounded-md transition-all" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="List"
            icon={<List className="size-6 rounded-md transition-all" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="Timeline"
            icon={<Clock1 className="size-6 rounded-md transition-all" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="Table"
            icon={<Table2 className="size-6 rounded-md transition-all" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
        </div>
        <div className="flex items-center gap-3 ml-2 md:ml-auto">
          <button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300 cursor-pointer">
            <FilterIcon className="h-5 w-5" />
          </button>
          <button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300 cursor-pointer">
            <Share2Icon className="h-5 w-5" />
          </button>
          <div className="relative">
            <input
              type="text"
              name=""
              id=""
              placeholder="Search Task"
              className="rounded-md border placeholder:text-gray-200 py-1 pl-10 pr-4 focus:outline-none dark:border-dark-secondary dark:text-neutral-500 dark:placeholder:text-neutral-500"
            />
            <Grid3X3Icon className="absolute left-3 top-2 size-4 text-gray-400 dark:text-neutral-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

type tabButtonProps = {
  name: string;
  icon: React.ReactNode;
  setActiveTab: (tab: string) => void;
  activeTab: string;
}


const TabButton = ({
  name,
  icon,
  setActiveTab,
  activeTab,
 }: tabButtonProps) => 
{
  const isActive = activeTab === name;
  return (
    <button
      className={`relative flex items-center gap-2 py-2 px-1 text-gray-500 after:absolute after:-bottom-[9px] after:left-0 after:h-[1.7px] after:w-full hover:text-blue-600 dark:text-neutral-500 dark:hover:text-white sm:px-2 lg:px-4 cursor-pointer transition-all font-bold tracking-tight text-lg after:rounded-xl ${
        isActive ? "dark:text-white after:bg-blue-600 text-blue-600" : ""
      }`}
      onClick={() => {
        setActiveTab(name);
        console.log(isActive);
      }}
    >
      {icon}
      {name}
    </button>
  );

}

export default ProjectHeader
