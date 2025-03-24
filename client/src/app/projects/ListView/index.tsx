/* eslint-disable @typescript-eslint/no-unused-vars */
import Header from "@/app/components/header";
import TaskCard from "@/app/components/taskCard";
import { useGetTasksQuery, Tasks as TaskType} from "@/state/api";
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
            <Header name="Task List" />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {
                tasks?.map((task: TaskType) => (
                    <TaskCard key={task.id} task={task} /> 
                ))
            }
        </div>
    </div>
  );
}

export default ListViewTab;
