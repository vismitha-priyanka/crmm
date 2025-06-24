import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const LeadAnalytics: React.FC = () => {
  // State for all data
  const [leadSources, setLeadSources] = useState<
    { name: string; value: number }[]
  >([]);
  const [leadStatusData, setLeadStatusData] = useState<
    { status: string; count: number }[]
  >([]);
  const [recentLeads, setRecentLeads] = useState<
    { date: string; leads: number }[]
  >([]);
  const [KPIData, setKPIData] = useState<
    { title: string; value: string | number }[]
  >([]);

  // Form state
  const [sourceForm, setSourceForm] = useState({ name: "", value: "" });
  const [statusForm, setStatusForm] = useState({ status: "", count: "" });
  const [recentForm, setRecentForm] = useState({ date: "", leads: "" });
  const [kpiForm, setKpiForm] = useState({ title: "", value: "" });

  // Handlers for adding data
  const addSource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sourceForm.name || !sourceForm.value) return;
    setLeadSources([
      ...leadSources,
      { name: sourceForm.name, value: Number(sourceForm.value) },
    ]);
    setSourceForm({ name: "", value: "" });
  };
  const addStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!statusForm.status || !statusForm.count) return;
    setLeadStatusData([
      ...leadStatusData,
      { status: statusForm.status, count: Number(statusForm.count) },
    ]);
    setStatusForm({ status: "", count: "" });
  };
  const addRecent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recentForm.date || !recentForm.leads) return;
    setRecentLeads([
      ...recentLeads,
      { date: recentForm.date, leads: Number(recentForm.leads) },
    ]);
    setRecentForm({ date: "", leads: "" });
  };
  const addKPI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kpiForm.title || !kpiForm.value) return;
    setKPIData([...KPIData, { title: kpiForm.title, value: kpiForm.value }]);
    setKpiForm({ title: "", value: "" });
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Lead Analytics</h2>

      {/* KPI Cards + Form */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {KPIData.map((item, index) => (
          <div key={index} className="bg-white rounded-2xl shadow p-4">
            <p className="text-sm text-gray-500">{item.title}</p>
            <p className="text-xl font-bold mt-2">{item.value}</p>
          </div>
        ))}
      </div>
      <form onSubmit={addKPI} className="flex flex-col md:flex-row gap-2 mb-6">
        <input
          className="input input-bordered flex-1 px-2 py-1 rounded border"
          placeholder="KPI Title"
          value={kpiForm.title}
          onChange={(e) => setKpiForm((f) => ({ ...f, title: e.target.value }))}
        />
        <input
          className="input input-bordered flex-1 px-2 py-1 rounded border"
          placeholder="KPI Value"
          value={kpiForm.value}
          onChange={(e) => setKpiForm((f) => ({ ...f, value: e.target.value }))}
        />
        <button
          type="submit"
          className="btn bg-blue-500 text-white px-4 py-1 rounded"
        >
          Add KPI
        </button>
      </form>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Lead Source Pie Chart */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h3 className="text-lg font-semibold mb-2">Lead Sources</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={leadSources}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
              >
                {leadSources.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <form onSubmit={addSource} className="flex gap-2 mt-2">
            <input
              className="input input-bordered flex-1 px-2 py-1 rounded border"
              placeholder="Source Name"
              value={sourceForm.name}
              onChange={(e) =>
                setSourceForm((f) => ({ ...f, name: e.target.value }))
              }
            />
            <input
              className="input input-bordered flex-1 px-2 py-1 rounded border"
              placeholder="Value"
              type="number"
              value={sourceForm.value}
              onChange={(e) =>
                setSourceForm((f) => ({ ...f, value: e.target.value }))
              }
            />
            <button
              type="submit"
              className="btn bg-blue-500 text-white px-4 py-1 rounded"
            >
              Add
            </button>
          </form>
        </div>

        {/* Lead Status Bar Chart */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h3 className="text-lg font-semibold mb-2">Lead Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={leadStatusData}>
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
          <form onSubmit={addStatus} className="flex gap-2 mt-2">
            <input
              className="input input-bordered flex-1 px-2 py-1 rounded border"
              placeholder="Status"
              value={statusForm.status}
              onChange={(e) =>
                setStatusForm((f) => ({ ...f, status: e.target.value }))
              }
            />
            <input
              className="input input-bordered flex-1 px-2 py-1 rounded border"
              placeholder="Count"
              type="number"
              value={statusForm.count}
              onChange={(e) =>
                setStatusForm((f) => ({ ...f, count: e.target.value }))
              }
            />
            <button
              type="submit"
              className="btn bg-blue-500 text-white px-4 py-1 rounded"
            >
              Add
            </button>
          </form>
        </div>

        {/* Recent Leads Line Chart */}
        <div className="bg-white rounded-2xl shadow p-4 md:col-span-2">
          <h3 className="text-lg font-semibold mb-2">Recent Lead Trends</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={recentLeads}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="leads"
                stroke="#82ca9d"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
          <form onSubmit={addRecent} className="flex gap-2 mt-2">
            <input
              className="input input-bordered flex-1 px-2 py-1 rounded border"
              placeholder="Date"
              value={recentForm.date}
              onChange={(e) =>
                setRecentForm((f) => ({ ...f, date: e.target.value }))
              }
            />
            <input
              className="input input-bordered flex-1 px-2 py-1 rounded border"
              placeholder="Leads"
              type="number"
              value={recentForm.leads}
              onChange={(e) =>
                setRecentForm((f) => ({ ...f, leads: e.target.value }))
              }
            />
            <button
              type="submit"
              className="btn bg-blue-500 text-white px-4 py-1 rounded"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeadAnalytics;
