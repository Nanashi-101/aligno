"use client";

import ModalNewTask from "@/app/components/modalNewtask";
import { useAppSelector } from "@/app/redux";
import { Priority, Task, useGetTasksByUserQuery } from "@/state/api";
import React, { useState } from "react";

type Props = {
  priority: Priority;
};

const PriorityPage = ({ priority }: Props) => {
  const [view, setView] = useState("list");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  const userId = 1; // Replace with actual user ID
  const {
    data: tasks,
    isLoading,
    isError: isTaskError,
  } = useGetTasksByUserQuery(userId || 0, {
    skip: userId === null,
  });

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const fillteredTasks = tasks?.filter(
    (task: Task) => task.priority === priority
  );

  if (isTaskError || !tasks) return <div>Error loading tasks.</div>;
  if (isLoading) return <div>Loading tasks...</div>;
  return <div className="m-4 p-8">
    <ModalNewTask isOpen={isModalNewTaskOpen} onClose={() => setIsModalNewTaskOpen(false)} />1
  </div>;
};

export default PriorityPage;
