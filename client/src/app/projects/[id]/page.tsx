/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { use, useState } from "react";
import BoardViewTab from "../BoardView";
import ListViewTab from "../ListView";
import ProjectHeader from "../ProjectHeader";
import { useGetProjectsQuery } from "@/state/api";

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
      {/* New Task Modal */}
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
    </div>
  );
}

export default Projects;
