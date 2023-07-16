import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { colors } from "../../../common/styles";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function formatDate(date: Date) {
  // Add leading zeros to the day and month if they are less than 10
  const day = date.getDate().toString().padStart(2, "0");
  // Array of month names
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = monthNames[date.getMonth()];

  return `${day} ${month}`;
}

function getLastSevenDays() {
  const dates = [];

  for (let i = 13; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i); // Subtract i days to get the past dates
    dates.push(formatDate(date));
  }

  return dates;
}

export default function RecentActivity({
  recentActivity,
}: {
  recentActivity: number[];
}) {
  const data = {
    labels: getLastSevenDays(),
    datasets: [
      {
        label: "# of problems",
        data: recentActivity,
        backgroundColor: colors.buttonBackground,
        barThickness: 10,
        borderRadius: 5,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
}
