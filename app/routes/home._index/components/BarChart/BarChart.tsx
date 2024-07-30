"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import type { AccountingsForBarChartProps } from "~/interfaces";
import BarChartSkeleton from "./BarChartSkeleton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const getMonthlyData = (
  transactions: AccountingsForBarChartProps[],
  type: string
) => {
  const monthlyData = Array(12).fill(0);
  transactions
    .filter((transaction) => transaction.type === type)
    .forEach((transaction) => {
      const month = new Date(transaction.date).getMonth();
      monthlyData[month] += transaction.amount;
    });
  return monthlyData;
};

interface BarChartProps {
  accountings: AccountingsForBarChartProps[];
  isSearching: boolean;
}

const BarChart = ({ accountings, isSearching }: BarChartProps) => {
  const incomeData = getMonthlyData(accountings, "Income");
  const expenseData = getMonthlyData(accountings, "Expense");
  const transferData = getMonthlyData(accountings, "Transfer");

  const chartData = {
    labels: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    datasets: [
      {
        label: "Ingresos",
        data: incomeData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Gastos",
        data: expenseData,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Transferencias",
        data: transferData,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Ingresos y Gastos por Mes",
      },
    },
  };

  return (
    <>
      {isSearching ? (
        <BarChartSkeleton />
      ) : (
        <Bar data={chartData} options={options} />
      )}
    </>
  );
};

export default BarChart;
