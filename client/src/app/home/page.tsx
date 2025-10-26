/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  Priority,
  Projects,
  Task,
  useGetProjectsQuery,
  useGetTasksQuery,
} from "@/state/api";
import React from "react";
import { useAppSelector } from "../redux";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Header from "../components/header";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";

const HomePage = () => {
  const {
    isLoading: isTaskLoading,
    isError: isTaskError,
    data: tasks,
  } = useGetTasksQuery({ projectId: parseInt("1") });

  const {
    data: projects,
    isLoading: isProjectsLoading,
    isError: isProjectsError,
  } = useGetProjectsQuery();

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (isTaskLoading || isProjectsLoading)
    return <div className="">Loading...</div>;
  if (isTaskError || isProjectsError)
    return <div className="">Error fetching data</div>;

  const priorityCount =
    tasks?.reduce<Record<string, number>>(
      (acc: Record<string, number>, task: Task) => {
        const { priority } = task;
        acc[priority as Priority] = (acc[priority as Priority] || 0) + 1;
        return acc;
      },
      {}
    ) ?? {};

  const taskdistribution = Object.keys(priorityCount).map((key) => ({
    name: key,
    count: priorityCount[key] || 0,
  }));

  const statusCount =
    projects?.reduce<Record<string, number>>(
      (acc: Record<string, number>, project: Projects) => {
        const status = project.endDate ? "Completed" : "Active";
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      },
      {}
    ) ?? {};

  const projectStatus = Object.keys(statusCount).map((key) => ({
    name: key,
    count: statusCount[key] || 0,
  }));

  const taskColumns: GridColDef[] = [
    { field: "title", headerName: "Title", width: 200 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "priority", headerName: "Priority", width: 150 },
    { field: "dueDate", headerName: "Due Date", width: 150 },
  ];

  const COLORS = ["#0088FE", "#00C49E", "#FFBB28", "#FF8042"];
  const chartColors = isDarkMode
    ? {
        bar: "#8884d8",
        barGrid: "#303030",
        pieFill: "#4A90E2",
        text: "#FFFFFF",
      }
    : {
        bar: "#82ca9d",
        barGrid: "#e0e0e0",
        pieFill: "#FFBB28",
        text: "#000000",
      };

  return (
    <div className="container h-full w-[100%] bg-transparent p-8 mx-auto flex flex-col gap-4">
      <Header name="Project Management Dashboard" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Task Priority Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={taskdistribution}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={chartColors.barGrid}
              />
              <XAxis dataKey="name" stroke={chartColors.text} />
              <YAxis stroke={chartColors.text} />
              <Tooltip
                contentStyle={{
                  width: "min-content",
                  height: "min-content",
                }}
              />
              <Legend />
              <Bar dataKey="count" fill={chartColors.bar} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Project Status Overview
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie dataKey="count" data={projectStatus} fill="#82ca9d" label>
                {projectStatus.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary">
        <h3 className="mb-4 text-lg font-semibold dark:text-white">
          Your tasks
        </h3>
        <div className="" style={{ height: 300, width: "100%" }}>
          <DataGrid
            rows={tasks}
            columns={taskColumns}
            checkboxSelection
            loading={isTaskLoading}
            className={dataGridClassNames}
            sx={dataGridSxStyles(isDarkMode)}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
