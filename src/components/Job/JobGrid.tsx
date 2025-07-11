"use client"
import { DownloadIcon, LucideRefreshCw, SearchIcon } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

// components/JobGrid.tsx
const JobGrid = () => {
  const headers = ["Actions", "Name", "Status", "Created", "Modified", "Quoted", "Quoted Price", "Ordered", "Parent"];
  const rows = [
    {
      Actions: "",
      Name: "Web Developer Job",
      Status: "New",
      Created: "2025-06-01",
      Modified: "2025-06-01",
      Quoted: "N/A",
      "Quoted Price": "N/A",
      Ordered: "N/A",
      Parent: "",
    },
    {
      Actions: "",
      Name: "UI/UX Designer Position",
      Status: "Quoted",
      Created: "2025-05-20",
      Modified: "2025-05-22",
      Quoted: "2025-05-21",
      "Quoted Price": "$5000",
      Ordered: "N/A",
      Parent: "",
    },
    {
      Actions: "",
      Name: "Project Manager Role",
      Status: "Ordered",
      Created: "2025-05-25",
      Modified: "2025-05-28",
      Quoted: "2025-05-26",
      "Quoted Price": "$8000",
      Ordered: "2025-05-29",
      Parent: "",
    },
    {
      Actions: "",
      Name: "Data Analyst Opening",
      Status: "PendingRoofReport",
      Created: "2025-06-05",
      Modified: "2025-06-06",
      Quoted: "N/A",
      "Quoted Price": "N/A",
      Ordered: "N/A",
      Parent: "",
    },
    {
      Actions: "",
      Name: "Software Engineer Vacancy",
      Status: "UserActionRequired",
      Created: "2025-05-10",
      Modified: "2025-05-15",
      Quoted: "N/A",
      "Quoted Price": "N/A",
      Ordered: "N/A",
      Parent: "",
    },
    {
      Actions: "",
      Name: "QA Tester Job",
      Status: "Closed",
      Created: "2025-04-15",
      Modified: "2025-05-10",
      Quoted: "2025-04-16",
      "Quoted Price": "$3000",
      Ordered: "2025-04-20",
      Parent: "",
    },
    {
      Actions: "",
      Name: "DevOps Engineer Opening",
      Status: "Requoted",
      Created: "2025-06-10",
      Modified: "2025-06-12",
      Quoted: "2025-06-11",
      "Quoted Price": "$9000",
      Ordered: "N/A",
      Parent: "",
    },
    {
      Actions: "",
      Name: "Technical Writer Position",
      Status: "Amended",
      Created: "2025-05-01",
      Modified: "2025-05-05",
      Quoted: "2025-05-02",
      "Quoted Price": "$4500",
      Ordered: "2025-05-06",
      Parent: "",
    },
    {
      Actions: "",
      Name: "Network Engineer Role",
      Status: "Taken",
      Created: "2025-04-20",
      Modified: "2025-04-25",
      Quoted: "2025-04-22",
      "Quoted Price": "$7000",
      Ordered: "2025-04-28",
      Parent: "",
    },
    {
      Actions: "",
      Name: "Business Analyst Job",
      Status: "OrderPrep",
      Created: "2025-05-15",
      Modified: "2025-05-18",
      Quoted: "2025-05-16",
      "Quoted Price": "$6000",
      Ordered: "2025-05-19",
      Parent: "",
    },
    {
      Actions: "",
      Name: "Mobile Developer Vacancy",
      Status: "AcceptedOrder",
      Created: "2025-06-01",
      Modified: "2025-06-03",
      Quoted: "2025-06-02",
      "Quoted Price": "$9500",
      Ordered: "2025-06-04",
      Parent: "",
    },
    {
      Actions: "",
      Name: "Cybersecurity Analyst",
      Status: "Contracted",
      Created: "2025-05-22",
      Modified: "2025-05-25",
      Quoted: "2025-05-23",
      "Quoted Price": "$12000",
      Ordered: "2025-05-26",
      Parent: "",
    },
  ];
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const filterRef = useRef<HTMLDivElement>(null);

  const toggleFilterDropdown = () => {
    setIsFilterDropdownOpen(!isFilterDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterRef]);

  const statusOptions = [
    "New",
    "Quoted",
    "Ordered",
    "PendingRoofReport",
    "UserActionRequired",
    "Closed",
    "Requoted",
    "Amended",
    "Taken",
    "OrderPrep",
    "AcceptedOrder",
    "Contracted",
  ];

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedStatuses(statusOptions);
    } else {
      setSelectedStatuses([]);
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedStatuses((prev) => [...prev, value]);
    } else {
      setSelectedStatuses((prev) => prev.filter((status) => status !== value));
    }
  };

  const filteredRows =
    selectedStatuses.length === 0
      ? rows
      : rows.filter((row) => selectedStatuses.includes(row.Status));

  return (
    <div className="bg-white dark:bg-black rounded overflow-auto w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center px-2 sm:px-4 py-3 border-b bg-[#137bc4] dark:bg-blue-900 gap-2">
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <button className="text-xs px-2 py-1 group rounded hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer">
            <LucideRefreshCw className="w-4 text-white group-hover:text-[#137bc4] dark:group-hover:text-blue-300" />
          </button>
          <div className="flex bg-white dark:bg-gray-800 rounded-full items-center px-2 flex-1 sm:flex-none min-w-[200px]">
            <SearchIcon className="w-4 text-gray-500 dark:text-gray-400" />
            <input
              type="text"
              placeholder="All Fields"
              className="border px-2 text-xs outline-none border-none bg-white dark:bg-gray-800 dark:text-white rounded-full w-full sm:w-auto"
            />
          </div>
          <div className="relative" ref={filterRef}>
            <button
              className="text-sm px-3 py-1 rounded hover:bg-white dark:hover:bg-gray-700 text-white hover:text-black dark:hover:text-white flex items-center gap-1 cursor-pointer whitespace-nowrap"
              onClick={toggleFilterDropdown}
            >
              Filter <span className="text-xs">&#9660;</span>
            </button>
            {isFilterDropdownOpen && (
              <div className="absolute z-10 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 h-96 overflow-y-auto">
                <div className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Status:
                </div>
                <label className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <input
                    type="checkbox"
                    className="form-checkbox dark:bg-gray-700"
                    checked={selectedStatuses.length === statusOptions.length}
                    onChange={handleSelectAll}
                  />
                  <span className="ml-2 text-sm dark:text-gray-200">All</span>
                </label>
                {statusOptions.map((status) => (
                  <label
                    key={status}
                    className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox dark:bg-gray-700"
                      value={status}
                      checked={selectedStatuses.includes(status)}
                      onChange={handleStatusChange}
                    />
                    <span className="ml-2 text-sm dark:text-gray-200">{status}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 items-center justify-end w-full sm:w-auto">
          <button className="text-white text-xs hover:bg-white hover:text-[#137bc4] dark:hover:bg-gray-700 dark:hover:text-white p-2 rounded-md cursor-pointer whitespace-nowrap">Show Local Time</button>
          <div className="w-[1px] h-4 bg-gray-700 hidden sm:block"></div>
          <button className="text-[#ffffff48] text-xs p-2 whitespace-nowrap">Make Archived</button>
          <div className="w-[1px] h-4 bg-gray-700 hidden sm:block"></div>
          <button className="text-white text-xs hover:bg-white hover:text-[#137bc4] dark:hover:bg-gray-700 dark:hover:text-white p-2 rounded-md cursor-pointer whitespace-nowrap">Show Archived</button>
        </div>
      </div>

      <div className="w-full flex flex-col max-h-[450px] overflow-x-auto overflow-y-auto border dark:border-gray-700">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-200 dark:bg-gray-800 sticky top-0">
                <tr>
                  {headers.map((header, idx) => (
                    <th key={idx} className="p-2 text-[#137bc4] dark:text-blue-400 font-medium whitespace-nowrap">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row, idx) => (
                  <tr
                    key={idx}
                    className={idx % 2 === 0 ? "bg-white dark:bg-black" : "bg-gray-50 dark:bg-gray-800"}
                  >
                    <td className="p-2 cursor-pointer dark:text-gray-200 whitespace-nowrap">{row.Actions}</td>
                    <td className="p-2 cursor-pointer dark:text-gray-200 whitespace-nowrap">{row.Name}</td>
                    <td className="p-2 cursor-pointer dark:text-gray-200 whitespace-nowrap">{row.Status}</td>
                    <td className="p-2 cursor-pointer dark:text-gray-200 whitespace-nowrap">{row.Created}</td>
                    <td className="p-2 cursor-pointer dark:text-gray-200 whitespace-nowrap">{row.Modified}</td>
                    <td className="p-2 cursor-pointer dark:text-gray-200 whitespace-nowrap">{row.Quoted}</td>
                    <td className="p-2 cursor-pointer dark:text-gray-200 whitespace-nowrap">{row["Quoted Price"]}</td>
                    <td className="p-2 cursor-pointer dark:text-gray-200 whitespace-nowrap">{row.Ordered}</td>
                    <td className="p-2 cursor-pointer dark:text-gray-200 whitespace-nowrap">{row.Parent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <span className="text-black dark:text-gray-300 text-xs py-4 px-2">Server Response 9.137 sec</span>
      </div>

      <footer className="w-full flex flex-col sm:flex-row justify-between items-center mt-4 gap-4 sm:gap-0 px-2 sm:px-0">
        <div className="flex flex-wrap gap-2 sm:gap-4 w-full sm:w-auto justify-center sm:justify-start">
          <button className="flex items-center px-3 sm:px-4 py-2 sm:py-3 gap-2 text-xs rounded-sm bg-[#137bc4] dark:bg-blue-900 text-white cursor-pointer w-full sm:w-auto justify-center">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="download" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
              className="svg-inline--fa fa-download w-4">
              <path fill="#fff" d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 
              10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 
              88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z" className="">
              </path>
            </svg>
            Download Active
          </button>
          <button className="flex items-center px-3 sm:px-4 py-2 sm:py-3 gap-2 text-xs rounded-sm bg-[#137bc4] dark:bg-blue-900 text-white cursor-pointer w-full sm:w-auto justify-center">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="download" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
              className="svg-inline--fa fa-download w-4">
              <path fill="#fff" d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 
              10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 
              88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z" className="">
              </path>
            </svg>
            Download Archived
          </button>
        </div>
        <div className="w-full sm:w-auto mt-2 sm:mt-0">
          <Link href="/upload" className="flex items-center justify-center px-3 sm:px-4 py-2 sm:py-3 gap-2 text-xs rounded-sm bg-[#137bc4] dark:bg-blue-900 text-white cursor-pointer w-full sm:w-auto">
            Upload Model
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default JobGrid;