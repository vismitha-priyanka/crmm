import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const DealInsights: React.FC = () => {
  // State for all data
  const [dealStages, setDealStages] = useState<
    { stage: string; count: number }[]
  >([]);
  const [monthlyDeals, setMonthlyDeals] = useState<
    { month: string; deals: number }[]
  >([]);
  const [revenueSources, setRevenueSources] = useState<
    { name: string; value: number }[]
  >([]);
  const [KPIData, setKPIData] = useState<
    { title: string; value: string | number }[]
  >([]);

  // Form state
  const [stageForm, setStageForm] = useState({ stage: "", count: "" });
  const [monthForm, setMonthForm] = useState({ month: "", deals: "" });
  const [revenueForm, setRevenueForm] = useState({ name: "", value: "" });
  const [kpiForm, setKpiForm] = useState({ title: "", value: "" });

  // Handlers for adding data
  const addStage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stageForm.stage || !stageForm.count) return;
    setDealStages([
      ...dealStages,
      { stage: stageForm.stage, count: Number(stageForm.count) },
    ]);
    setStageForm({ stage: "", count: "" });
  };
  const addMonth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!monthForm.month || !monthForm.deals) return;
    setMonthlyDeals([
      ...monthlyDeals,
      { month: monthForm.month, deals: Number(monthForm.deals) },
    ]);
    setMonthForm({ month: "", deals: "" });
  };
  const addRevenue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revenueForm.name || !revenueForm.value) return;
    setRevenueSources([
      ...revenueSources,
      { name: revenueForm.name, value: Number(revenueForm.value) },
    ]);
    setRevenueForm({ name: "", value: "" });
  };
  const addKPI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kpiForm.title || !kpiForm.value) return;
    setKPIData([...KPIData, { title: kpiForm.title, value: kpiForm.value }]);
    setKpiForm({ title: "", value: "" });
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Deal Insights</h2>

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

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Deal Stages */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h3 className="text-lg font-semibold mb-2">
            Deal Stages Distribution
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dealStages}>
              <XAxis dataKey="stage" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
          <form onSubmit={addStage} className="flex gap-2 mt-2">
            <input
              className="input input-bordered flex-1 px-2 py-1 rounded border"
              placeholder="Stage"
              value={stageForm.stage}
              onChange={(e) =>
                setStageForm((f) => ({ ...f, stage: e.target.value }))
              }
            />
            <input
              className="input input-bordered flex-1 px-2 py-1 rounded border"
              placeholder="Count"
              type="number"
              value={stageForm.count}
              onChange={(e) =>
                setStageForm((f) => ({ ...f, count: e.target.value }))
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

        {/* Revenue Sources */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h3 className="text-lg font-semibold mb-2">Revenue Sources</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={revenueSources}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
              >
                {revenueSources.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <form onSubmit={addRevenue} className="flex gap-2 mt-2">
            <input
              className="input input-bordered flex-1 px-2 py-1 rounded border"
              placeholder="Source Name"
              value={revenueForm.name}
              onChange={(e) =>
                setRevenueForm((f) => ({ ...f, name: e.target.value }))
              }
            />
            <input
              className="input input-bordered flex-1 px-2 py-1 rounded border"
              placeholder="Value"
              type="number"
              value={revenueForm.value}
              onChange={(e) =>
                setRevenueForm((f) => ({ ...f, value: e.target.value }))
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

        {/* Monthly Deal Trend */}
        <div className="bg-white rounded-2xl shadow p-4 md:col-span-2">
          <h3 className="text-lg font-semibold mb-2">Monthly Deal Trends</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyDeals}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="deals"
                stroke="#00C49F"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
          <form onSubmit={addMonth} className="flex gap-2 mt-2">
            <input
              className="input input-bordered flex-1 px-2 py-1 rounded border"
              placeholder="Month"
              value={monthForm.month}
              onChange={(e) =>
                setMonthForm((f) => ({ ...f, month: e.target.value }))
              }
            />
            <input
              className="input input-bordered flex-1 px-2 py-1 rounded border"
              placeholder="Deals"
              type="number"
              value={monthForm.deals}
              onChange={(e) =>
                setMonthForm((f) => ({ ...f, deals: e.target.value }))
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

export default DealInsights;
