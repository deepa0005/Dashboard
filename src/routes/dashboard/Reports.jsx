import React, { useState } from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SparklineChart } from "../../Component/SparklineChart";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { toast } from "react-hot-toast";

const reportData = [
  {
    label: "Total Leads",
    value: 4520,
    change: "+5.2%",
    sparkline: [5, 6, 7, 9, 8, 10, 12],
  },
  {
    label: "Conversion Rate",
    value: "4.8%",
    change: "+1.4%",
    sparkline: [2, 3, 4, 3, 5, 4, 6],
  },
  {
    label: "Bounce Rate",
    value: "48.5%",
    change: "-0.6%",
    sparkline: [60, 55, 52, 50, 49, 48, 47],
  },
  {
    label: "Avg. Time",
    value: "3m 45s",
    change: "+0.9%",
    sparkline: [3, 3.2, 3.4, 3.5, 3.6, 3.7, 3.75],
  },
];

const initialCountries = [
  { country: "India", leads: 1200, conversion: "5.2%" },
  { country: "USA", leads: 950, conversion: "4.8%" },
  { country: "UK", leads: 750, conversion: "4.5%" },
  { country: "Germany", leads: 620, conversion: "4.2%" },
  { country: "Australia", leads: 540, conversion: "3.9%" },
  { country: "Canada", leads: 500, conversion: "4.0%" },
  { country: "Brazil", leads: 450, conversion: "3.6%" },
  { country: "France", leads: 420, conversion: "3.8%" },
  { country: "Japan", leads: 400, conversion: "4.1%" },
  { country: "Mexico", leads: 380, conversion: "3.7%" },
];

const Report = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [filters, setFilters] = useState({ region: "All", device: "All", source: "All" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const topCountries = initialCountries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Top Performing Countries", 14, 16);
    doc.autoTable({
      head: [["Country", "Leads", "Conversion"]],
      body: initialCountries.map((c) => [c.country, c.leads, c.conversion]),
      startY: 20,
    });
    doc.save("report.pdf");
    toast.success("PDF exported successfully");
  };

  const exportCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(initialCountries);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "TopCountries");
    XLSX.writeFile(workbook, "report.csv");
    toast.success("CSV exported successfully");
  };

  return (
    <div className="mt-10 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Report Summary</h2>
        <div className="flex gap-2">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="p-2 rounded bg-slate-100 dark:bg-slate-800 text-sm"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="p-2 rounded bg-slate-100 dark:bg-slate-800 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {reportData.map((item) => (
          <div
            key={item.label}
            className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md shadow"
          >
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.label}</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{item.value}</p>
            <SparklineChart data={item.sparkline} />
            <p
              className={`text-sm mt-2 ${item.change.includes('+') ? 'text-green-600' : 'text-red-500'}`}
            >
              {item.change} from last week
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <select
          className="p-2 rounded bg-slate-100 dark:bg-slate-800"
          onChange={(e) => setFilters((prev) => ({ ...prev, region: e.target.value }))}
        >
          <option>All Regions</option>
          <option>Asia</option>
          <option>North America</option>
        </select>
        <select
          className="p-2 rounded bg-slate-100 dark:bg-slate-800"
          onChange={(e) => setFilters((prev) => ({ ...prev, device: e.target.value }))}
        >
          <option>All Devices</option>
          <option>Mobile</option>
          <option>Desktop</option>
        </select>
        <select
          className="p-2 rounded bg-slate-100 dark:bg-slate-800"
          onChange={(e) => setFilters((prev) => ({ ...prev, source: e.target.value }))}
        >
          <option>All Sources</option>
          <option>Email</option>
          <option>Social</option>
          <option>Direct</option>
        </select>

        <div className="ml-auto flex gap-2">
          <button
            onClick={exportPDF}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Export PDF
          </button>
          <button
            onClick={exportCSV}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto mt-4 rounded-md shadow">
        <table className="w-full text-left bg-white dark:bg-slate-800">
          <thead className="bg-slate-200 dark:bg-slate-700">
            <tr>
              <th className="px-4 py-2 text-sm font-medium">Country</th>
              <th className="px-4 py-2 text-sm font-medium">Leads</th>
              <th className="px-4 py-2 text-sm font-medium">Conversion</th>
            </tr>
          </thead>
          <tbody>
            {topCountries.map((country) => (
              <tr key={country.country} className="border-b border-slate-300 dark:border-slate-700">
                <td className="px-4 py-2 text-sm">{country.country}</td>
                <td className="px-4 py-2 text-sm">{country.leads}</td>
                <td className="px-4 py-2 text-sm">{country.conversion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 text-sm bg-slate-200 dark:bg-slate-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          disabled={currentPage * itemsPerPage >= initialCountries.length}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 text-sm bg-slate-200 dark:bg-slate-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Report;
