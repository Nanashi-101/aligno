/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Tasks as TaskType,
  useGetTasksQuery,
  useUpdateTasksStatusMutation,
} from "@/state/api";
import { format } from "date-fns";
import { EllipsisVertical, MessageSquareCodeIcon, MessageSquareDiff, MessageSquareDiffIcon, PlusCircleIcon } from "lucide-react";
import Image from "next/image";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import image1 from "/i1.jpg";

type BoardProps = {
  id: string;
  setIsModalNewsTaskOpen: (isOpen: boolean) => void;
};

const TaskStatus = ["To Do", "Work In Progress", "Under Review", "Completed"];
function BoardViewTab({ id, setIsModalNewsTaskOpen }: BoardProps) {
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({
    projectId: Number(id),
  });

  const [updateTaskStatus] = useUpdateTasksStatusMutation();

  const moveTasks = (taskId: number, toStatus: string) => {
    // move task to new status
    updateTaskStatus({
      taskId,
      status: toStatus,
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4">
        {TaskStatus.map((status, index) => (
          <TaskColumns
            key={index}
            status={status}
            tasks={tasks || []}
            moveTask={moveTasks}
            setIsModalNewsTaskOpen={setIsModalNewsTaskOpen}
          />
        ))}
      </div>
    </DndProvider>
  );
}

type TaskColumnProps = {
  status: string;
  tasks: TaskType[];
  moveTask: (taskId: number, toStatus: string) => void;
  setIsModalNewsTaskOpen: (isOpen: boolean) => void;
};

const TaskColumns = ({
  status,
  tasks,
  moveTask,
  setIsModalNewsTaskOpen,
}: TaskColumnProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: { id: number }) => moveTask(item.id, status),
    collect: (monitor: any) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const taskCount = tasks.filter((task) => task.status === status).length;
  const statusColors: any = {
    "To Do": "#EA4335",
    "Work In Progress": "#E37400",
    "Under Review": "#FBBC04",
    Completed: "#34A853",
  };
  return (
    <div
      className={`sl:py-4 rounded-lg py-2 xl:px-2 ${
        isOver ? "bg-blue-100 dark:bg-neutral-950" : ""
      }`}
      ref={(instance) => {
        drop(instance);
      }}
    >
      <div className="mb-3 w-full flex">
        <div
          className={`w-2 !bg-[${statusColors[status]}] rounded-s-lg`}
          style={{
            backgroundColor: statusColors[status],
          }}
        />
        <div className="flex w-full items-center justify-between rounded-e-lg bg-white px-5 py-4 dark:bg-dark-secondary">
          <h3 className="flex items-center text-lg font-semibold dark:text-white">
            {status}{" "}
            <span
              className="ml-2 inline-block rounded-full bg-gray-200 p-2 text-sm text-center leading-none dark:bg-dark-tertiary"
              style={{
                width: "1.5rem",
                height: "1.5rem",
              }}
            >
              {taskCount}
            </span>
          </h3>
          <div className="flex items-center gap-1 ">
            <button className="flex items-center justify-center h-6 w-5 dark:text-neutral-500 cursor-pointer">
              <EllipsisVertical size={26} />
            </button>
            <button
              className="flex h-6 w-6 items-center justify-center rounded bg-gray-200 dark:bg-dark-tertiary dark:text-white cursor-pointer"
              onClick={() => setIsModalNewsTaskOpen(true)}
            >
              <PlusCircleIcon size={18} />
            </button>
          </div>
        </div>
      </div>

      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <Task key={task.id} task={task} />
        ))}
    </div>
  );
};

const Task = ({ task }: { task: TaskType }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const taskTagsSplit = task.tags ? task.tags.split(",") : [];
  const formattedTaskStartDate = task.startDate
    ? format(new Date(task.startDate), "P")
    : "";
  const formattedTaskDueDate = task.dueDate
    ? format(new Date(task.dueDate), "P")
    : "";
  const numberOfComments = (task.comments && task.comments.length) || 0;
  const PriorityTag = ({ priority }: { priority: TaskType["priority"] }) => (
    <div
      className={`rounded-full px-2 py-1 text-xs font-semibold ${
        priority === "Urgent"
          ? "bg-red-200 text-red-700"
          : priority === "High"
          ? "bg-yellow-200 text-yellow-700"
          : priority === "Medium"
          ? "bg-green-200 text-green-700"
          : priority === "Low"
          ? "bg-blue-200 text-blue-700"
          : "bg-gray-200 text-gray-700"
      }`}
    >
      {priority}
    </div>
  );

  return (
    <div
      className={`mb-4 rounded-md bg-white shadow dark:bg-dark-secondary ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
      ref={(instance) => {
        drag(instance);
      }}
    >
      {task.attachments && task.attachments.length > 0 && (
        <Image
          src={`/${task.attachments[0].fileURL}`}
          alt={`${task.attachments[0].fileName}`}
          width={400}
          height={200}
          className="h-auto w-full rounded-t-md"
        />
      )}
      <div className="p-4 md:p-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-3">
            {task.priority && <PriorityTag priority={task.priority} />}
            <div className="flex gap-2">
              {taskTagsSplit.map((tag) => (
                <div
                  className="rounded-full px-2 py-1 bg-blue-100 text-xs"
                  key={tag}
                >
                  {" "}
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <button className="flex h-6 w-4 flex-shrink-0 items-center justify-center dark:text-neutral-500">
            <EllipsisVertical size={26} />
          </button>
        </div>
        <div className="my-3 flex justify-between">
          <h4 className="text-normal font-bold dark:text-white">
            {task.title}
          </h4>
          {typeof task.points === "string" && (
            <div className="text-xs font-semibold dark:text-white">
              Points: {task.points}
            </div>
          )}
        </div>
        <div className="text-xs text-gray-500 dark:text-neutral-500">
          {formattedTaskStartDate && (
            <span className="">{formattedTaskStartDate} - </span>
          )}
          {formattedTaskDueDate && (
            <span className="">{formattedTaskDueDate}</span>
          )}
        </div>
        <p className="text-sm text-gray-600 dark:text-neutral-500 my-2">
          {task.description}
        </p>
        <div className="mt-4 border-t border-gray-300 dark:border-stroke-dark" />

        {/* Authors and Assignees */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex -space-x-[6px] overflow-hidden">
            {task.assignee && (
              <Image
                key={task.assignee.userId}
                src={`/${task.assignee.profilePictureUrl}`}
                alt={`${task.assignee.name}`}
                width={50}
                height={50}
                className="h-10 w-10 rounded-full border-2 border-white object-cover dark:border-dark-secondary"
              />
            )}
            {task.author && (
              <Image
                key={task.author.userId}
                src={`/${task.author.profilePictureUrl}`}
                alt={`${task.author.name}`}
                width={50}
                height={50}
                className="h-10 w-10 rounded-full border-2 border-white object-cover dark:border-dark-secondary"
              />
            )}
          </div>
          <div className="flex items-center text-gray-500 dark:text-neutral-500">
            <MessageSquareDiff size={20} className="cursor-pointer"/>
            <span className="ml-1 text-sm text-gray-500 dark:text-neutral-400">{numberOfComments}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardViewTab;
