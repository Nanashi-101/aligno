"use client";

import { use, useState } from "react";
import BoardViewTab from "../BoardView";
import ListViewTab from "../ListView";
import ProjectHeader from "../ProjectHeader";
import { useGetProjectsQuery } from "@/state/api";
import TimelineViewtab from "../timelineView";
import TableViewTab from "../tableView";
import NewTaskModal from "@/app/components/modalNewtask";

type IAppProps = {
  params: Promise<{ id: string }>;
};

function Projects({ params }: IAppProps) {
  const { id } = use(params);
  const {data: projects} = useGetProjectsQuery();
  const reqData = projects?.filter((project) => project.id === Number(id));
  const [activeTab, setActiveTab] = useState("Board");
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  return (
    <div>
      <NewTaskModal isOpen={isNewTaskModalOpen} onClose={() => setIsNewTaskModalOpen(false)} id={id}/>
      <ProjectHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        projectName={reqData && reqData.length > 0 && reqData[0]?.name}
      />
      {activeTab === "Board" && (
        <BoardViewTab id={id} setIsModalNewsTaskOpen={setIsNewTaskModalOpen} />
      )}
      {activeTab === "List" && (
        <ListViewTab id={id} setIsModalNewsTaskOpen={setIsNewTaskModalOpen} />
      )}
      {activeTab === "Timeline" && (
        <TimelineViewtab id={id} setIsModalNewsTaskOpen={setIsNewTaskModalOpen} />
      )}
      {activeTab === "Table" && (
        <TableViewTab id={id} setIsModalNewsTaskOpen={setIsNewTaskModalOpen} />
      )}
    </div>
  );
}

export default Projects;
