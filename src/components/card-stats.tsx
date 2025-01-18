"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";

function CardStats({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: number;
  subtitle?: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-normal">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-medium text-primary">{value}</div>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
}

export { CardStats };
