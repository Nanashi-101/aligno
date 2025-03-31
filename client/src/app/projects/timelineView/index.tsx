/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAppSelector } from "@/app/redux";
import { useGetTasksQuery } from "@/state/api";
import { DisplayOption, Gantt, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import React, { useMemo, useState } from "react";

type IAppProps = {
  id: string;
  setIsModalNewsTaskOpen: (isOpen: boolean) => void;
};

type TaskTypeItems = "task" | "milestone" | "project";

function TimelineViewtab({ id, setIsModalNewsTaskOpen }: IAppProps) {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({
    projectId: Number(id),
  });

  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });

  const handleViewMode = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDisplayOptions((prev) => ({
     ...prev,
      viewMode: event.target.value as ViewMode,
    }));
  }

  const ganttTask = useMemo(() => {
    return tasks?.map((task) => ({
      start: new Date(task.startDate as string),
      end: new Date(task.dueDate as string),
      name: task.title,
      id: `Task-${task.id}`,
      type: "task" as TaskTypeItems,
      progress: task.points ? (task.points / 10) * 100 : 0,
      isDisabled: false,
    })) || [];
  }, [tasks]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  return (
    <div className="px-4 xl:px-6">
        <div className="flex flex-wrap items-center justify-between gap-2 py-5">
            <h1 className="me-2 text-lg font-bold dark:text-white">
                Project task timeline
            </h1>
            <div className="relative inline-block w-64">
                <select name="" id="" className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white" value={displayOptions.viewMode} onChange={handleViewMode}>
                    <option value={ViewMode.Day}>Day</option>
                    <option value={ViewMode.Week}>Week</option>
                    <option value={ViewMode.Month}>Month</option>
                </select>
            </div>
        </div>

        <div className="overflow-hidden rounded-md bg-white shadow dark:bg-dark-secondary dark:text-white">
          <div className="timeline">
            <Gantt
            tasks={ganttTask}
            {...displayOptions}
            columnWidth={displayOptions.viewMode === ViewMode.Month ? 150:100}
            listCellWidth="200px"
            barBackgroundColor={isDarkMode ? "#101214": "#aeb8c2"}
            barBackgroundSelectedColor={isDarkMode ? "#000":"#9ba1a6"}
            />
          </div>
          <div className="px-4 pb-5 pt-1">
            <button className="flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
            onClick={() => setIsModalNewsTaskOpen(true)}
            >
              Add Task
            </button>
          </div>
        </div>
    </div>
  );
}

export default TimelineViewtab;
