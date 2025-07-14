import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { SummaryCard } from "../../Component/SummaryCard";
import { exportLeads } from "../../utils/exportleads";
import axios from "axios";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { Package, DollarSign, Users, CreditCard, TrendingUp } from "lucide-react";

// const data = [
//     { date: "Nov 12", pageViews: 200, uniqueVisitors: 80 },
//     { date: "Nov 14", pageViews: 400, uniqueVisitors: 180 },
//     { date: "Nov 16", pageViews: 350, uniqueVisitors: 150 },
//     { date: "Nov 18", pageViews: 500, uniqueVisitors: 200 },
//     { date: "Nov 20", pageViews: 300, uniqueVisitors: 120 },
//     { date: "Nov 22", pageViews: 700, uniqueVisitors: 250 },
//     { date: "Nov 24", pageViews: 650, uniqueVisitors: 220 },
//     { date: "Nov 26", pageViews: 900, uniqueVisitors: 300 },
//     { date: "Nov 28", pageViews: 800, uniqueVisitors: 270 },
//     { date: "Nov 30", pageViews: 620, uniqueVisitors: 210 },
//     { date: "Dec 2", pageViews: 500, uniqueVisitors: 190 },
//     { date: "Dec 4", pageViews: 700, uniqueVisitors: 240 },
//     { date: "Dec 6", pageViews: 550, uniqueVisitors: 200 },
//     { date: "Dec 8", pageViews: 580, uniqueVisitors: 220 },
//     { date: "Dec 10", pageViews: 620, uniqueVisitors: 210 },
//     { date: "Dec 12", pageViews: 300, uniqueVisitors: 100 },
// ];



const leadSourcesData = [
    { name: "Social Media", percent: 35, change: "+5%", icon: "📱" },
    { name: "Referral", percent: 25, change: "+3%", icon: "🔗" },
    { name: "Direct", percent: 20, change: "-2%", icon: "🌐" },
    { name: "Email", percent: 20, change: "+2%", icon: "📧" },
];

export default function Analytics() {


    const [lineChartData, setLineChartData] = useState([]);


    useEffect(() => {
        axios.get("http://192.168.1.6:5000/api/leads/last-7-days")
            .then((res) => {
                console.log("✅ Response from backend:", res.data); // ✅ Check this
                const formattedData = res.data.map(item => ({
                    date: item.day,
                    leads: item.count
                }));
                console.log("📈 Formatted Chart Data:", formattedData); // ✅ Confirm data format
                setLineChartData(formattedData);
            })
            .catch((err) => {
                console.error("❌ Error fetching line chart data:", err);
            });
    }, []);



    return (
        <div className="p-6 bg-white dark:bg-slate-900 min-h-screen space-y-6">
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Analytics Overview</h1>
            <div className="flex gap-2">
                <button
                    onClick={() => window.open('http://192.168.1.6:5000/api/export/leads/excel', '_blank')}
                    className="text-sm bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                >
                    Export Analytics (Excel)
                </button>
                <button
                    onClick={() => window.open('http://192.168.1.6:5000/api/export/leads/pdf', '_blank')}
                    className="text-sm bg-rose-600 text-white px-4 py-1 rounded hover:bg-rose-700"
                >
                    Export Analytics (PDF)
                </button>
            </div>


            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <SummaryCard title="Unique visitors" value="30,380" icon={<Users size={26} />} />
                <SummaryCard title="Page views" value="126,470" icon={<Package size={26} />} />
                <SummaryCard title="Events" value="29,164" icon={<DollarSign size={26} />} />
                <SummaryCard title="Live visitors" value="0" icon={<CreditCard size={26} />} />
                <SummaryCard title="Total Leads" value="12,340" icon={<Users size={26} />} />
                <SummaryCard title="Leads This Week" value="432" icon={<TrendingUp size={26} />} />
                {/* <SummaryCard title="Converted Leads" value="124" icon={<DollarSign size={26} />} /> */}
                {/* <SummaryCard title="Avg. Submission Time" value="2m 14s" icon={<Clock size={26} />} /> */}
            </div>

            <div className="card p-4 bg-slate-100 dark:bg-slate-950 rounded-xl shadow">
                <p className="font-semibold text-slate-800 dark:text-slate-100 mb-4">Leads Overview (Last 7 Days)</p>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={lineChartData}>
                        <defs>
                            <linearGradient id="colorPageViews" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="date" stroke="#94a3b8" tickMargin={6} />
                        <YAxis
                            stroke="#94a3b8"
                            tickMargin={6}
                            domain={[0, 50]}         // Set range from 0 to 50
                            ticks={[10, 20, 30, 40, 50]} // Define fixed tick values
                        />
                        <Tooltip />
                        <Area type="monotone" dataKey="leads" stroke="#3b82f6" fillOpacity={1} fill="url(#colorPageViews)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-10">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">Lead Sources</h2>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Lead Sources</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">+8%</p>
                <p className="text-sm text-green-600">This Week +8%</p>

                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {leadSourcesData.map((item) => (
                        <div
                            key={item.name}
                            className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md shadow flex flex-col items-center"
                        >
                            <div className="flex justify-between w-full">
                                <span className="text-2xl">{item.icon}</span>
                                <span className={`text-sm ${item.change.includes('+') ? 'text-green-600' : 'text-red-500'}`}>{item.change}</span>
                            </div>
                            <p className="mt-4 text-sm font-medium text-blue-700 dark:text-blue-400">{item.name}</p>
                            <div className="w-full bg-slate-300 dark:bg-slate-700 h-1 rounded mt-2">
                                <div className="h-1 bg-blue-500 rounded" style={{ width: `${item.percent}%` }} />
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.percent}%</p>
                        </div>
                    ))}
                </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AnalyticsTable title="Top HTTP referrers" rows={[
                    ["Direct", "19,724"],
                    ["google.com", "4,072"],
                    ["indiehackers.com", "550"],
                    ["news.ycombinator.com", "530"],
                    ["remix-page-blocks.vercel.app", "447"],
                ]} />

                <AnalyticsTable title="Top pages" rows={[
                    ["/?", "28,330"],
                    ["/pricing", "12,002"],
                    ["/docs", "8,527"],
                    ["/docs/stack", "1,848"],
                    ["/changelog", "1,706"],
                ]} />

                <AnalyticsTable title="Top sources" rows={[
                    ["noreferer", "26,312"],
                    ["gumroad.com", "727"],
                    ["medium", "578"],
                    ["dev.to", "385"],
                    ["remix-blocks", "196"],
                ]} />
            </div>


        </div>
    );
}

function SummaryCard({ title, value, icon }) {
    return (
        <div className="flex flex-col gap-y-2 p-4 bg-slate-100 dark:bg-slate-950 rounded-xl shadow">
            <div className="flex items-center justify-between">
                <div className="text-blue-500 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-600/20 p-2 rounded-lg">
                    {icon}
                </div>
                <TrendingUp size={20} className="text-blue-500 dark:text-blue-400" />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">{title}</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
        </div>
    );
}

function AnalyticsTable({ title, rows }) {
    return (
        <div className="bg-white dark:bg-slate-950 shadow rounded-xl p-4 border border-slate-200 dark:border-slate-800">
            <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">{title}</h4>
            <ul className="text-sm text-slate-700 dark:text-slate-400 space-y-2">
                {rows.map(([label, value], idx) => (
                    <li key={idx} className="flex justify-between">
                        <span>{label}</span>
                        <span className="font-medium text-slate-900 dark:text-slate-100">{value}</span>
                    </li>
                ))}
            </ul>
        </div>
    );


}
