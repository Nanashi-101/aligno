import Modal from "@/app/components/modal";
import { useCreateProjectMutation } from "@/state/api";
import React from "react";
import { formatISO } from "date-fns"; 

type INewModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function NewProjectModal({
  isOpen = false,
  onClose = () => {},
}: INewModalProps) {
  const [createNewProject, { isLoading }] = useCreateProjectMutation();
  const [projectName, setProjectName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");

  const handleSubmit = async () => {
    if (!startDate || !endDate || !projectName) {
      alert("Please fill all the fields");
      return;
    }
    const formattedStartDate = formatISO(new Date(startDate), {representation: 'complete'});
    const formattedEndDate = formatISO(new Date(endDate), {representation: 'complete'});
    await createNewProject({
      name: projectName,
      description,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    });
  };

  const formValidation = () => {
    return projectName && startDate && endDate && description;
  };

  const inputStyes =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none focus:border-blue-500 focus:ring-blue-500";
  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create new project board">
      <form
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          name="projectName"
          id=""
          placeholder="Project Name"
          className={inputStyes}
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <textarea
          name="description"
          id=""
          placeholder="Description"
          className={inputStyes}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <input
            type="date"
            name="startDate"
            id=""
            placeholder="Start Date"
            className={inputStyes}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            name="endDate"
            id=""
            placeholder="End Date"
            className={inputStyes}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className={`mt-4 w-full flex justify-center rounded shadow-sm bg-blue-primary font-medium px-4 py-2 border-transparent text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
            !formValidation() || isLoading
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={!formValidation() || isLoading}
        >
          {isLoading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </Modal>
  );
}

export default NewProjectModal;
