import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

export const SparklineChart = ({ data }) => {
  const formatted = data.map((val, index) => ({ index, value: val }));

  return (
    <div className="w-full h-10">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formatted}>
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
