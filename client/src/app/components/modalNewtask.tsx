import Modal from "@/app/components/modal";
import { Priority, Status, useCreateTasksMutation } from "@/state/api";
import { formatISO } from "date-fns";
import React, { useState } from "react";

type INewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  id?: string | null;
};

function ModalNewTask({
  isOpen,
  onClose,
  id = null,
}: INewModalProps) {
  const [createNewTask, { isLoading }] = useCreateTasksMutation();
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [status, setStatus] = React.useState<Status>(Status.ToDo);
  const [priority, setPriority] = React.useState<Priority>(Priority.Backlog);
  const [tags, setTags] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [dueDate, setDueDate] = React.useState("");
  const [authorUserId, setAuthorUserId] = React.useState("");
  const [assignedUserId, setAssignedUserId] = React.useState("");
  const [projectId, setProjectId] = useState("");

  const handleSubmit = async () => {
    console.log(status);
    if (!title || !authorUserId || !(id !== null || projectId)) return;
    const formattedStartDate = formatISO(new Date(startDate), {
      representation: "complete",
    });
    const formattedDueDate = formatISO(new Date(dueDate), {
      representation: "complete",
    });
    await createNewTask({
      title,
      description,
      status,
      priority,
      tags,
      startDate: formattedStartDate,
      dueDate: formattedDueDate,
      authorUserId: parseInt(authorUserId),
      assignedUserId: parseInt(assignedUserId),
      projectId: id !== null ? Number(id) : Number(projectId),
    });
  };

  const formValidation = () => {
    return title && authorUserId && (id !== null || projectId);
  };

  const selectStyles =
    "mb-4 block w-full rounded border border-gray-300 px-3 py-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none focus:border-blue-500 focus:ring-blue-500";
  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create new task">
      <form
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(status);
          handleSubmit();
        }}
      >
        <input
          type="text"
          name="title"
          id=""
          placeholder="Task Name"
          className={inputStyles}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          name="description"
          id=""
          placeholder="Description"
          className={inputStyles}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <select
            className={selectStyles}
            value={status}
            onChange={(e) => {
              const statusValue = e.target.value;
              const statusKey = (
                Object.keys(Status) as Array<keyof typeof Status>
              ).find((key) => Status[key] === statusValue);

              if (statusKey) {
                console.log("Status Key:", statusKey);
                setStatus(Status[statusKey]); 
              }
            }}
          >
            <option value="">Select Status</option>
            <option value={Status.ToDo}>To Do</option>
            <option value={Status.InProgress}>Work In Progress</option>
            <option value={Status.UnderReview}>Under Review</option>
            <option value={Status.Completed}>Completed</option>
          </select>
          <select
            className={selectStyles}
            value={priority}
            onChange={(e) =>
              setPriority(Priority[e.target.value as keyof typeof Priority])
            }
          >
            <option value="">Select Priority</option>
            <option value={Priority.Urgent}>Urgent</option>
            <option value={Priority.High}>High</option>
            <option value={Priority.Medium}>Medium</option>
            <option value={Priority.Low}>Low</option>
            <option value={Priority.Backlog}>Backlog</option>
          </select>
        </div>
        <input
          type="text"
          name="tags"
          id=""
          placeholder="Tags (comma separated)"
          className={inputStyles}
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <input
            type="date"
            name="startDate"
            id=""
            placeholder="Start Date"
            className={inputStyles}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            name="endDate"
            id=""
            placeholder="End Date"
            className={inputStyles}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <input
          type="text"
          name="auhorUserId"
          id=""
          placeholder="Author User ID"
          className={inputStyles}
          value={authorUserId}
          onChange={(e) => setAuthorUserId(e.target.value)}
        />
        <input
          type="text"
          name="assignedUserId"
          id=""
          placeholder="Assigned User ID"
          className={inputStyles}
          value={assignedUserId}
          onChange={(e) => setAssignedUserId(e.target.value)}
        />
        {id === null && (
          <input
            type="text"
            className={inputStyles}
            placeholder="ProjectId"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          />
        )}
        <button
          type="submit"
          className={`mt-4 w-full flex justify-center rounded shadow-sm bg-blue-primary font-medium px-4 py-2 border-transparent text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
            !formValidation() || isLoading
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={!formValidation() || isLoading}
        >
          {isLoading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </Modal>
  );
}

export default ModalNewTask;
