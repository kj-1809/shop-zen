"use client";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface Props {
  data: {
    name: string;
    total: number;
  }[];
}

export async function Overview(props: Props) {
  if (!props || !props.data) {
    return <h1>Loading ...</h1>;
  }

  return (
    <ResponsiveContainer width='100%' height={350}>
      <BarChart data={props.data} margin={{ left: 30 }}>
        <XAxis
          dataKey='name'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `₹${value}`}
        />
        <Bar dataKey='total' fill='#adfa1d' radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
