import Header from "@/app/components/header";
import TaskCard from "@/app/components/taskCard";
import { useGetTasksQuery, Task as TaskType } from "@/state/api";
import { Plus } from "lucide-react";
import React from "react";

type ListViewTabProps = {
  id: string;
  setIsModalNewsTaskOpen: (isOpen: boolean) => void;
};

function ListViewTab({ id, setIsModalNewsTaskOpen }: ListViewTabProps) {
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({
    projectId: Number(id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;
  return (
    <div className="px-4 pb-8 xl:px-6 ">
      <div className="pt-5">
        <Header
          name="Task List"
          buttonComponent={
            <button
              className="flex items-center px-3 py-2 text-white bg-blue-primary hover:bg-blue-600 rounded hover:scale-105 transition-all duration-200"
              onClick={() => setIsModalNewsTaskOpen(true)}
            >
              <Plus className="size-5 mr-2" /> New task
            </button>
          }
          isSmallText
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {tasks?.map((task: TaskType) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default ListViewTab;
