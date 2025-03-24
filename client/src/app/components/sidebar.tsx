/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Home,
  Icon,
  Layers3,
  Lock,
  LucideIcon,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux";
import { setIsSideBarCollapsed } from "@/state";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useGetProjectsQuery } from "@/state/api";

function Sidebar() {
  const [showProjects, setShowProjects] = useState(false);
  const [showPriority, setShowPriority] = useState(false);
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSideBarCollapsed
  );

  const { data: projects } = useGetProjectsQuery();

  const sideBarClassName = `fixed flex flex-col h-full justify-between shadow-2xl transition-all duration-300 ease-in-out z-40 dark:bg-black overflow-y-auto bg-white ${
    isSidebarCollapsed ? "w-0" : "w-70"
  }`;

  return (
    <div className={sideBarClassName}>
      <div
        className={`flex h-full w-full flex-col justify-start transition-all delay-200 ${
          isSidebarCollapsed && "hidden"
        }`}
      >
        {/* Top logo */}
        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between pt-3 bg-white px-6 dark:bg-black">
          <div className="text-xl font-bold text-gray-800 dark:text-white">
            ALIGNO
          </div>
          <button
            onClick={() => dispatch(setIsSideBarCollapsed(!isSidebarCollapsed))}
            className="flex items-center w-8 h-8 rounded-full bg-gray"
          >
            <X className="h-6 w-6 dark:text-white cursor-pointer" />
          </button>
        </div>
        {/* Teams */}
        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-7 py-4 dark:border-gray-700">
          <Image src="/images/logo.webp" alt="Teams" width={40} height={40} />
          <div className="flex flex-col items-start gap-3">
            <h3 className="font-bold tracking-wide dark:text-gray-200">
              ALIGNO TEAMS
            </h3>
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 dark:text-gray-200" />
              <p className="mt-[0.1rem] text-md text-gray-500 dark:text-gray-400 font-bold">
                Private
              </p>
            </div>
          </div>
        </div>
        {/* Navbar Links */}
        <nav className="z-10 w-full">
          <SideBarLinks icon={Home} href="/" label="Home" />
          <SideBarLinks icon={Briefcase} href="/timeline" label="Timeline" />
          <SideBarLinks icon={Search} href="/search" label="Search" />
          <SideBarLinks icon={Settings} href="/settings" label="Settings" />
          <SideBarLinks icon={User} href="/profiles" label="Profiles" />
          <SideBarLinks icon={Users} href="/teams" label="Teams" />
        </nav>

        {/* Bottom */}
        {/* Projects */}
        <button
          className="flex w-full items-center justify-between px-8 py-3 text-gray-800 dark:text-white"
          onClick={() => setShowProjects((prev) => !prev)}
        >
          <span className="">Projects</span>
          {!showProjects ? (
            <ChevronDown className="h-6 w-6 dark:text-gray-200" />
          ) : (
            <ChevronUp className="h-6 w-6 dark:text-gray-200" />
          )}
        </button>
        {showProjects &&
          projects?.map((project) => (
            <SideBarLinks
              key={project.id}
              icon={Briefcase}
              label={project.name as string}
              href={`/projects/${project.id}`}
            />
          ))}
        {/* Priority */}
        <button
          className="flex w-full items-center justify-between px-8 py-3 text-gray-800 dark:text-white"
          onClick={() => setShowPriority((prev) => !prev)}
        >
          <span className="">Priority</span>
          {!showPriority ? (
            <ChevronDown className="h-6 w-6 dark:text-gray-200" />
          ) : (
            <ChevronUp className="h-6 w-6 dark:text-gray-200" />
          )}
        </button>
        {showPriority && <Priorities />}
      </div>
    </div>
  );
}

interface SideBarLinksProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

const SideBarLinks = ({ href, icon: Icon, label }: SideBarLinksProps) => {
  const pathName = usePathname();
  const isActive =
    pathName === href || (pathName === "/" && href === "/dashboard");
  const screenWidth = window.innerWidth;

  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex cursor-pointer items-center gap-3 transition-colors duration-300 hover:bg-gray-200 dark:bg-black dark:hover:bg-gray-700 dark:text-gray-200 px-8 py-4 justify-start ${
          isActive ? "bg-blue-100/60 text-white dark:bg-gray-600" : ""
        }`}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-full w-[5px] bg-blue-400"></div>
        )}
        <Icon className="h-6 w-6 dark:text-gray-200 text-gray-800" />
        <span
          className={`font-medium text-gray-800 dark:text-gray-100 flex items-center`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

const Priorities = () => {
  return (
    <>
      <SideBarLinks icon={AlertCircle} label="Urgent" href="/urgent" />
      <SideBarLinks icon={ShieldAlert} label="High" href="/high" />
      <SideBarLinks icon={AlertTriangle} label="Medium" href="/medium" />
      <SideBarLinks icon={AlertOctagon} label="Low" href="/low" />
      <SideBarLinks icon={Layers3} label="Backlog" href="/backlog" />
    </>
  );
};

export default Sidebar;
