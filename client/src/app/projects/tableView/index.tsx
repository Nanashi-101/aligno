import Header from "@/app/components/header";
import { useAppSelector } from "@/app/redux";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import { useGetTasksQuery } from "@/state/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Plus } from "lucide-react";

type TableViewTabProps = {
  id: string;
  setIsModalNewsTaskOpen: (isOpen: boolean) => void;
};

function TableViewTab({ id, setIsModalNewsTaskOpen }: TableViewTabProps) {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({
    projectId: Number(id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      width: 100,
    },
    {
      field: "description",
      headerName: "Description",
      width: 200,
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => (
        <span className="inline-flex rounded-full bg-violet-100 px-2 text-xs font-semibold leading-5 text-violet-800">{params.value}</span>
      )
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 75,
    },
    {
      field: "tags",
      headerName: "Tags",
      width: 140,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 140,
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      width: 140,
    },
    {
      field: "author",
      headerName: "Author",
      width: 150,
      renderCell: (params) => params.value.username || "Unknown",
    },
    {
      field: "assignee",
      headerName: "Assignee",
      width: 150,
      renderCell: (params) => params.value.username || "Unknown",
    },
  ];

  return (
    <div className="h-[540px] w-full px-4 pb-8 xl:px-6 dark:text-white">
      <div className="pt-5">
        <Header
          name="Table"
          buttonComponent={
            <button
              className="flex items-center px-3 py-2 text-white bg-blue-primary hover:bg-blue-600 rounded hover:scale-105 transition-all duration-200"
              onClick={() => setIsModalNewsTaskOpen(true)}
            >
              <Plus className="size-5 mr-2"/> New task
            </button>
          }
          isSmallText
        />
      </div>
      <DataGrid
        rows={tasks || []}
        columns={columns}
        className={dataGridClassNames}
        sx={dataGridSxStyles(isDarkMode ?? false)}
      />
    </div>
  );
}

export default TableViewTab;
