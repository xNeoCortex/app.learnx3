// Curriculum table
const curriculumX = [
	{
		curriculum_name: "Shamil's curriculum",
		level: "b1",
		lessons: ["1", "2", "3", "4"],
		createdBy: {
			email: "yosin1@icloud.com",
			name: "Admin Account",
			time: "2023-05-08T14:55:41.950Z",
			uid: "iH5hmoGObedS4svoZao1q4vByPZ2",
		},
	},
]

// Lessons table
const lessonsX = [
	{
		uid: "1",
		level: "b1",
		topic: "Word Building",
		lesson_number: 1,
		type: "file", // ENUM: "file", "video", "audio"
		teach_material: "",
		category: "vocabulary",
		createdBy: {
			email: "yosin1@icloud.com",
			name: "Admin Account",
			time: "2023-05-08T14:55:41.950Z",
			uid: "iH5hmoGObedS4svoZao1q4vByPZ2",
		},
		aseessments: [],
	},
	{
		uid: "1",
		level: "b1",
		topic: "Word Building",
		lesson_number: 1,
		type: "file", // ENUM: "file", "video", "audio"
		teach_material: "",
		category: "vocabulary",
		createdBy: {
			email: "yosin1@icloud.com",
			name: "Admin Account",
			time: "2023-05-08T14:55:41.950Z",
			uid: "iH5hmoGObedS4svoZao1q4vByPZ2",
		},
		aseessments: [],
	},
]

export { curriculumX, lessonsX }
