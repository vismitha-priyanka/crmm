import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

const ActivityStats: React.FC = () => {
  // State for all data
  const [activityTrends, setActivityTrends] = useState<
    { day: string; activities: number }[]
  >([]);
  const [activityTypes, setActivityTypes] = useState<
    { name: string; value: number }[]
  >([]);
  const [userActivity, setUserActivity] = useState<
    { user: string; count: number }[]
  >([]);
  const [KPIs, setKPIs] = useState<{ title: string; value: string | number }[]>(
    []
  );

  // Form state
  const [trendForm, setTrendForm] = useState({ day: "", activities: "" });
  const [typeForm, setTypeForm] = useState({ name: "", value: "" });
  const [userForm, setUserForm] = useState({ user: "", count: "" });
  const [kpiForm, setKpiForm] = useState({ title: "", value: "" });

  // Handlers for adding data
  const addTrend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trendForm.day || !trendForm.activities) return;
    setActivityTrends([
      ...activityTrends,
      { day: trendForm.day, activities: Number(trendForm.activities) },
    ]);
    setTrendForm({ day: "", activities: "" });
  };
  const addType = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typeForm.name || !typeForm.value) return;
    setActivityTypes([
      ...activityTypes,
      { name: typeForm.name, value: Number(typeForm.value) },
    ]);
    setTypeForm({ name: "", value: "" });
  };
  const addUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userForm.user || !userForm.count) return;
    setUserActivity([
      ...userActivity,
      { user: userForm.user, count: Number(userForm.count) },
    ]);
    setUserForm({ user: "", count: "" });
  };
  const addKPI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kpiForm.title || !kpiForm.value) return;
    setKPIs([...KPIs, { title: kpiForm.title, value: kpiForm.value }]);
    setKpiForm({ title: "", value: "" });
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Activity Stats</h2>

      {/* KPI Cards + Form */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {KPIs.map((item, index) => (
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Activity Trends */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h3 className="text-lg font-semibold mb-2">
            Activity Trends (Last 7 Days)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={activityTrends}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="activities"
                stroke="#00C49F"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
          <form onSubmit={addTrend} className="flex gap-2 mt-2">
            <input
              className="input input-bordered flex-1 px-2 py-1 rounded border"
              placeholder="Day"
              value={trendForm.day}
              onChange={(e) =>
                setTrendForm((f) => ({ ...f, day: e.target.value }))
              }
            />
            <input
              className="input input-bordered flex-1 px-2 py-1 rounded border"
              placeholder="Activities"
              type="number"
              value={trendForm.activities}
              onChange={(e) =>
                setTrendForm((f) => ({ ...f, activities: e.target.value }))
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

        {/* Activity Types */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h3 className="text-lg font-semibold mb-2">
            Activity Type Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={activityTypes}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
              >
                {activityTypes.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <form onSubmit={addType} className="flex gap-2 mt-2">
            <input
              className="input input-bordered flex-1 px-2 py-1 rounded border"
              placeholder="Type Name"
              value={typeForm.name}
              onChange={(e) =>
                setTypeForm((f) => ({ ...f, name: e.target.value }))
              }
            />
            <input
              className="input input-bordered flex-1 px-2 py-1 rounded border"
              placeholder="Value"
              type="number"
              value={typeForm.value}
              onChange={(e) =>
                setTypeForm((f) => ({ ...f, value: e.target.value }))
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

        {/* User Activity */}
        <div className="bg-white rounded-2xl shadow p-4 md:col-span-2">
          <h3 className="text-lg font-semibold mb-2">User-wise Activity</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={userActivity}>
              <XAxis dataKey="user" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
          <form onSubmit={addUser} className="flex gap-2 mt-2">
            <input
              className="input input-bordered flex-1 px-2 py-1 rounded border"
              placeholder="User Name"
              value={userForm.user}
              onChange={(e) =>
                setUserForm((f) => ({ ...f, user: e.target.value }))
              }
            />
            <input
              className="input input-bordered flex-1 px-2 py-1 rounded border"
              placeholder="Count"
              type="number"
              value={userForm.count}
              onChange={(e) =>
                setUserForm((f) => ({ ...f, count: e.target.value }))
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

export default ActivityStats;
