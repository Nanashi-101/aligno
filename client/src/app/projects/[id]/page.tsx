/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { use, useState } from "react";
import BoardViewTab from "../BoardView";
import ProjectHeader from "../ProjectHeader";

type IAppProps = {
  params: Promise<{ id: string }>;
};

function Projects({ params }: IAppProps) {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState("Board");
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  return (
    <div>
      {/* New Task Modal */}
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Board" && <BoardViewTab id={id} setIsModalNewsTaskOpen={setIsNewTaskModalOpen} />}
    </div>
  );
}

export default Projects;
