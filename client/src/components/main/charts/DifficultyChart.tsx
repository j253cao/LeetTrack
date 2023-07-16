import React from "react";
import { colors } from "../../../common/styles";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

type DifficultyData = {
  Easy: number;
  Medium: number;
  Hard: number;
};

ChartJS.register(ArcElement, Tooltip, Legend);

const DifficultyChart: React.FC<{ difficultyData: DifficultyData }> = ({
  difficultyData,
}) => {
  const data = {
    labels: ["Easy", "Medium", "Hard"],
    datasets: [
      {
        label: "# of problems",
        data: [difficultyData.Easy, difficultyData.Medium, difficultyData.Hard],
        backgroundColor: [colors.easy, colors.medium, colors.hard],
        borderColor: [colors.easy, colors.medium, colors.hard],
        borderWidth: 1,
      },
    ],
  };

  const options: any = {
    maintainAspectRatio: false,
    cutout: "85%",
    plugins: {
      legend: {
        position: "bottom",

        fullSize: true,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 5,
          boxHeight: 5,
          padding: 20,
          font: {
            size: 15,
          },
        },
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default DifficultyChart;
