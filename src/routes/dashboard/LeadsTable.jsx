import React, { useState } from "react";
// import { Badge } from "@/components/ui/badge"; // You can customize this badge component
import { Button } from "../../Component/button";
import { Pencil, Eye, Trash2 } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// ✅ Badge component should be outside of LeadsTable
const Badge = ({ color = "gray", children, className = "", ...props }) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    yellow: "bg-yellow-100 text-yellow-800",
    gray: "bg-gray-100 text-gray-800",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${colorClasses[color]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

// const mockLeads = [
//   {
//     id: 1,
//     name: "Rahul Sharma",
//     email: "rahul@example.com",
//     phone: "+91-9876543210",
//     status: "New",
//     source: "Website",
//     rep: "Amit",
//     createdAt: "2025-07-10",
//     nextFollowUp: "2025-07-15",
//   },
//   {
//     id: 2,
//     name: "Anjali Mehta",
//     email: "anjali@domain.com",
//     phone: "+91-9988776655",
//     status: "Qualified",
//     source: "Referral",
//     rep: "Priya",
//     createdAt: "2025-07-09",
//     nextFollowUp: "2025-07-12",
//   },
//   // add more leads here...
// ];

const statusColors = {
  New: "blue",
  Contacted: "yellow",
  Qualified: "green",
  Lost: "red",
};

const LeadsTable = () => {
  const [leads, setLeads] = useState(mockLeads);
  const [filterStatus, setFilterStatus] = useState("");

  const filteredLeads = filterStatus
    ? leads.filter((lead) => lead.status === filterStatus)
    : leads;

  const handleStatusFilter = (status) => {
    setFilterStatus(status === filterStatus ? "" : status);
  };

  

  return (
    <div className="p-6 bg-white rounded-xl shadow-md dark:bg-gray-900">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Leads</h2>
        <div className="flex gap-2">
          {["New", "Contacted", "Qualified", "Lost"].map((status) => (
            <Badge
              key={status}
              onClick={() => handleStatusFilter(status)}
              className={`cursor-pointer ${
                filterStatus === status ? "scale-105 ring-2 ring-offset-2" : ""
              }`}
              color={statusColors[status]}
            >
              {status}
            </Badge>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-200">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Email / Phone</th>
              <th className="p-2">Status</th>
              <th className="p-2">Source</th>
              <th className="p-2">Sales Rep</th>
              <th className="p-2">Created</th>
              <th className="p-2">Follow-Up</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <tr
                key={lead.id}
                className="border-b hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td className="p-2 font-medium">{lead.name}</td>
                <td className="p-2">
                  <div>{lead.email}</div>
                  <div className="text-xs text-gray-500">{lead.phone}</div>
                </td>
                <td className="p-2">
                  <Badge color={statusColors[lead.status]}>{lead.status}</Badge>
                </td>
                <td className="p-2">{lead.source}</td>
                <td className="p-2">{lead.rep}</td>
                <td className="p-2">{lead.createdAt}</td>
                <td className="p-2">{lead.nextFollowUp}</td>
                <td className="p-2 text-center flex gap-2 justify-center">
                  <Button size="icon" variant="ghost">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
            {!filteredLeads.length && (
              <tr>
                <td colSpan="8" className="text-center p-4 text-gray-500">
                  No leads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadsTable;
