"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { Card } from "@/components/card";
import { User } from "@/db/schemas";
import { Typography } from "@/components/typography";

const LastUsersChart = ({ users }: { users: User[] }) => {
  const data = new Array(12).fill(0).map((_, i) => {
    const month = i + 1;
    const total = users.filter(
      (user) => user.createdAt.getMonth() === i,
    ).length;

    return {
      name: new Date(0, i).toLocaleString("default", { month: "short" }),
      total,
    };
  });

  return (
    <Card className="w-full p-4">
      <Typography variant="lead" className="mb-4">
        Derniers utilisateurs
      </Typography>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Bar
            dataKey="total"
            fill="currentColor"
            radius={[4, 4, 0, 0]}
            className="fill-primary"
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default LastUsersChart;
