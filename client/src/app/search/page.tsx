"use client";

import { useSearchQuery } from "@/state/api";
import { debounce } from "lodash";
import React, { useEffect } from "react";
import Header from "../components/header";
import TaskCard from "../components/taskCard";
import ProjectCard from "../components/projectCard";
import UserCard from "../components/userCard";

// type Props = {}

function SearchPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const {
    data: searchResults,
    isLoading,
    isError,
  } = useSearchQuery(searchTerm, {
    skip: searchTerm.length < 3, // Skip the query if the search term is less than 3 characters
  });

  const handleSearchChange = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    500
  );

  useEffect(() => {
    return handleSearchChange.cancel; // Cleanup the debounce function on unmount
  }, [handleSearchChange.cancel]);

  return (
    <div className="p-4 w-full flex flex-col justify-center ">
      <Header name="Search" />
      <div className="">
        <input
          type="text"
          name=""
          placeholder="Search..."
          id=""
          className="w-10/12 rounded border p-3 shadow"
          onChange={handleSearchChange}
        />
      </div>
      <div className="p-5">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error fetching search results.</p>}
        {!isLoading && !isError && searchResults && (
          <div>
            {searchResults.tasks && searchResults.tasks.length > 0 && (
              <h2>Tasks</h2>
            )}
            {searchResults.tasks?.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
            {searchResults.projects && searchResults.projects.length > 0 && (
              <h2>Projects</h2>
            )}
            {searchResults.projects?.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            {searchResults.users && searchResults.users.length > 0 && (
              <h2>Users</h2>
            )}
            {searchResults.users?.map((user) => (
                    <UserCard key={user.userId} user={user} />
                ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
