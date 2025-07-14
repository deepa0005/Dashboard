import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { useTheme } from "../../hooks/use-theme";

import { overviewData, recentSalesData, topProducts } from "@/constants";

import { Footer } from "../../layouts/footer";

import {
    CreditCard,
    DollarSign,
    Package,
    PencilLine,
    Star,
    Trash,
    TrendingUp,
    Users
} from "lucide-react";

import { useState, useEffect } from "react";



import axios from "axios";

const DashboardPage = () => {
    const { theme } = useTheme();

    const [limit, setLimit] = useState(3);

    const [leads, setLeads] = useState([]);

    const [todaysLeads, setTodaysLeads] = useState([]);

    const [hourlyLeads, setHourlyLeads] = useState([]);

    const [totalLeads, setTotalLeads] = useState(0);
    const [todaysLeadCount, setTodaysLeadCount] = useState(0);
    const [weeklyLeads, setWeeklyLeads] = useState(0);

    const [topService, setTopService] = useState({ services: '', count: 0 });

    // ✅ Then define useEffects
    useEffect(() => {
        axios.get("http://192.168.1.6:5000/api/leads")
            .then((res) => setLeads(res.data))
            .catch((err) => console.error("❌ Lead fetch failed:", err));
    }, []);

    useEffect(() => {
        axios.get("http://192.168.1.6:5000/api/leads/today")
            .then((res) => {
                console.log("🔥 Today's Leads", res.data);
                setTodaysLeads(res.data);
            })
            .catch((err) => console.error("❌ Error fetching today's leads", err));
    }, []);

useEffect(() => {
  fetch(`http://192.168.1.6:5000/api/leads/top-service?limit=${limit}`)
    .then((res) => res.json())
    .then((data) => setTopService(data))
    .catch((err) => console.error("Failed to fetch top services", err));
}, [limit]);
    // useEffect(() => {
    //   axios.get("http:// 192.168.1.9:5000/api/leads/total")
    //     .then(res => setTotalLeads(res.data.total));

    //   axios.get("http:// 192.168.1.9:5000/api/leads/today/count")
    //     .then(res => setTodaysLeadsCount(res.data.total));

    //   axios.get("http:// 192.168.1.9:5000/api/leads/weekly")
    //     .then(res => setWeeklyLeads(res.data.total));

    //   axios.get("http:// 192.168.1.9:5000/api/leads/top-service")
    //     .then(res => setTopService(res.data));
    // }, []);


    useEffect(() => {
        axios.get("http://192.168.1.6:5000/api/leads/total")
            .then((res) => {
                setTotalLeads(res.data.total);
            })
            .catch((err) => {
                console.error("❌ Error fetching total leads:", err);
            });
    }, []);

    useEffect(() => {
        axios
            .get("http://192.168.1.6:5000/api/leads/today/count")
            .then((res) => setTodaysLeadCount(res.data.total))
            .catch((err) => console.error("❌ Error fetching today's leads count:", err));
    }, []);

    useEffect(() => {
        axios
            .get("http://192.168.1.6:5000/api/leads/weekly")
            .then((res) => setWeeklyLeads(res.data.total))
            .catch((err) => console.error("❌ Error fetching weekly leads:", err));
    }, []);


    return (
        <div className="flex flex-col gap-y-4">
            <h1 className="title">Dashboard</h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <div className="card">
                    <div className="card-header">
                        <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                            <Package size={26} />
                        </div>
                        <p className="card-title"> Total Leads</p>
                    </div>
                    <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
                        <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">
                            {totalLeads || "Loading..."}
                        </p>
                        <span className="flex w-fit items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 font-medium text-blue-500 dark:border-blue-600 dark:text-blue-600">
                            <TrendingUp size={18} />
                            25%
                        </span>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                            <DollarSign size={26} />
                        </div>
                        <p className="card-title">Today’s Leads</p>
                    </div>
                    <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
                        <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">{todaysLeadCount}</p>
                        <span className="flex w-fit items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 font-medium text-blue-500 dark:border-blue-600 dark:text-blue-600">
                            <TrendingUp size={18} />
                            12%
                        </span>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                            <Users size={26} />
                        </div>
                        <p className="card-title">Weekly Leads</p>
                    </div>
                    <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
                        <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">
                            {weeklyLeads}
                        </p>
                        <span className="flex w-fit items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 font-medium text-blue-500 dark:border-blue-600 dark:text-blue-600">
                            <TrendingUp size={18} />
                            15%
                        </span>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500 dark:bg-blue-600/20 dark:text-blue-600">
                                <CreditCard size={26} />
                            </div>
                            <p className="card-title">Top Requested Services</p>
                        </div>

                        {/* 🔽 Dropdown */}
                        <select
                            className="text-sm px-2 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none"
                            value={limit}
                            onChange={(e) => setLimit(Number(e.target.value))}
                        >
                            <option value={3}>Top 3</option>
                            <option value={5}>Top 5</option>
                            <option value={10}>Top 10</option>
                        </select>
                    </div>

                    <div className="card-body bg-slate-100 dark:bg-slate-950 space-y-3">
                        {Array.isArray(topService) && topService.length > 0 ? (
                            topService.map((service, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center bg-white dark:bg-slate-900 p-3 rounded-lg shadow"
                                >
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                        {service.services}
                                    </span>
                                    <span className="text-xl font-bold text-slate-900 dark:text-slate-100">
                                        {service.count}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-slate-500 dark:text-slate-400">No data available</p>
                        )}
                    </div>
                </div>

            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="card col-span-1 md:col-span-2 lg:col-span-4">
                    <div className="card-header">
                        <p className="card-title">Overview</p>
                    </div>
                    <div className="card-body p-0">
                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >
                            <AreaChart
                                data={overviewData}
                                margin={{
                                    top: 0,
                                    right: 0,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <defs>
                                    <linearGradient
                                        id="colorTotal"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="#2563eb"
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="#2563eb"
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                </defs>
                                <Tooltip
                                    cursor={false}
                                    formatter={(value) => `$${value}`}
                                />

                                <XAxis
                                    dataKey="name"
                                    strokeWidth={0}
                                    stroke={theme === "light" ? "#475569" : "#94a3b8"}
                                    tickMargin={6}
                                />
                                <YAxis
                                    dataKey="total"
                                    strokeWidth={0}
                                    stroke={theme === "light" ? "#475569" : "#94a3b8"}
                                    tickFormatter={(value) => `$${value}`}
                                    tickMargin={6}
                                />

                                <Area
                                    type="monotone"
                                    dataKey="total"
                                    stroke="#2563eb"
                                    fillOpacity={1}
                                    fill="url(#colorTotal)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="card col-span-1 md:col-span-2 lg:col-span-3">
                    <div className="card-header">
                        <p className="card-title">Today’s Leads</p>
                    </div>
                    <div className="card-body h-[300px] overflow-auto p-0">
                        {todaysLeads.length > 0 ? (
                            todaysLeads.slice(0, 6).map((lead) => (
                                <div
                                    key={lead.id}
                                    className="flex items-center justify-between gap-x-4 py-2 pr-2 px-4 border-b"
                                >
                                    <div className="flex items-center gap-x-4">
                                        {/* Placeholder Avatar */}
                                        <div className="size-10 flex-shrink-0 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold uppercase">
                                            {lead.name?.charAt(0)}
                                        </div>

                                        {/* Lead Info */}
                                        <div className="flex flex-col gap-y-1">
                                            <p className="font-medium text-slate-900 dark:text-slate-50">{lead.name}</p>
                                            <p className="text-sm text-slate-600 dark:text-slate-400">{lead.email}</p>
                                            {lead.company && (
                                                <p className="text-xs text-slate-500 dark:text-slate-400">{lead.company}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Time */}
                                    <span className="text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap">
                                        {new Date(lead.submitted_at).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <div className="flex items-center justify-center h-full text-sm text-slate-500 dark:text-slate-400">
                                No leads today.
                            </div>
                        )}
                    </div>
                </div>

            </div>
            <div className="card">
                <div className="card-header">
                    <p className="card-title">Leads</p>
                </div>
                <div className="card-body p-0">
                    <div className="relative h-[500px] w-full flex-shrink-0 overflow-auto rounded-none [scrollbar-width:_thin]">
                        <table className="table">
                            <thead className="table-header">
                                <tr className="table-row">
                                    <th className="table-head">#</th>
                                    <th className="table-head">Name</th>
                                    <th className="table-head">Email</th>
                                    {/* <th className="table-head">Phone</th> */}
                                    {/* <th className="table-head">City</th> */}
                                    <th className="table-head">Message</th>
                                    <th className="table-head">Submitted</th>
                                </tr>
                            </thead>
                            <tbody className="table-body">
                                {leads.map((lead, index) => (
                                    <tr key={lead.id} className="table-row">
                                        <td className="table-cell">{index + 1}</td>
                                        <td className="table-cell">{lead.name}</td>
                                        <td className="table-cell">{lead.email}</td>
                                        {/* <td className="table-cell">{lead.phone}</td> */}
                                        {/* <td className="table-cell">{lead.city || "-"}</td> */}
                                        <td className="table-cell">{lead.message}</td>
                                        <td className="table-cell">
                                            {new Date(lead.submitted_at).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DashboardPage;
