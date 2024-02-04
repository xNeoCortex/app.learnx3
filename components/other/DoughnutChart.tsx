import React from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "bottom" as const,
			display: true,
		},
		title: {
			display: true,
			text: "Class Information",
		},
	},
	label: false,
}

export function DoughnutChart({
	dataClass,
}: {
	dataClass: {
		number: number
		name: string
	}[]
}) {
	const ClassNumbers = dataClass.map((item) => item.number).slice(1)
	const ClassNames = dataClass.map((item) => item.name).slice(1)

	const data = {
		labels: ClassNames,
		datasets: [
			{
				label: "# of Students",
				data: ClassNumbers,
				backgroundColor: [
					"rgba(153, 102, 255, 0.6)",
					"rgba(54, 162, 235, 0.6)",
					"rgba(255, 206, 86, 0.6)",
					"rgba(255, 99, 132, 0.6)",
					"rgba(75, 192, 192, 0.6)",
					"rgba(255, 159, 64, 0.6)",
				],
				borderColor: [
					"rgba(153, 102, 255, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(255, 99, 132, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(255, 159, 64, 1)",
				],
				borderWidth: 1,
			},
		],
	}

	return <Doughnut data={data} options={options} />
}
