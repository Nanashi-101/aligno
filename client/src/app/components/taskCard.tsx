import { Task, useDeleteTaskMutation } from "@/state/api";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import Image from "next/image";

type IAppProps = {
  task: Task;
};

function TaskCard({ task }: IAppProps) {
  const [deleteTaskMutation] = useDeleteTaskMutation();
  const HandleDelete = () => {
    deleteTaskMutation({ taskId: task.id });
  }
  return (
    <div className="mb-3 relative rounded bg-white p-4 shadow dark:bg-dark-secondary dark:text-white">
      {task.attachments && task.attachments.length > 0 && (
        <div className="">
          <strong>Attachments: </strong>
          <div className="flex flex-wrap">
            {task.attachments && task.attachments.length > 0 && (
              <Image
                src={`/${task.attachments[0].fileURL}`}
                alt={`${task.attachments[0].fileName}`}
                width={400}
                height={200}
                className="rounded-md"
              />
            )}
          </div>
        </div>
      )}
      <p>
        <strong>ID: </strong>
        {task.id}
      </p>
      <p>
        <strong>Title: </strong>
        {task.title}
      </p>
      <p>
        <strong>Description: </strong> {task.description || "No Description"}
      </p>
      <p>
        <strong>Status: </strong>
        {task.status}
      </p>
      <p>
        <strong>Priority: </strong>
        {task.priority}
      </p>
      <p>
        <strong>Tags: </strong>
        {task.tags || "No Tags"}
      </p>
      <p>
        <strong>Start Date: </strong>{" "}
        {task.startDate
          ? format(new Date(task.startDate), "P")
          : "No Start Date"}
      </p>
      <p>
        <strong>Due Date: </strong>{" "}
        {task.dueDate ? format(new Date(task.dueDate), "P") : "No Due Date"}
      </p>
      <p>
        <strong>Author: </strong>
        {task.author ? task.author.name : "No Author"}
      </p>
      <p>
        <strong>Assignee: </strong>
        {task.assignee ? task.assignee.name : "No Assignee"}
      </p>
      <button className="absolute right-[10px] bottom-[10px]" onClick={() => HandleDelete()}>
        <Trash2
          size={18}
          className="hover:scale-105 transition-all duration-200 cursor-pointer hover:text-red-500"
        />
      </button>
    </div>
  );
}

export default TaskCard;
