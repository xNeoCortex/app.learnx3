// Curriculum table
const curriculumX = [
  {
    curriculum_id: 100,
    curriculum_name: "Shamil's curriculum",
    level: "b1",
  },
]

// Lessons table
const lessonsX = [
  {
    lesson_id: 1,
    level: "b1",
    topic: "Word Building",
    lesson_number: 1,
    type: "file", // ENUM: "file", "video", "audio"
    link: "",
    category: "vocabulary",
    curriculum_id: 100, // Foreign key
  },
  {
    lesson_id: 2,
    level: "b1",
    topic: "Describing places",
    lesson_number: 1,
    type: "file",
    link: "",
    category: "speaking",
    curriculum_id: 100,
  },
  {
    lesson_id: 3,
    level: "b1",
    topic: "travel",
    lesson_number: 1,
    type: "file",
    link: "",
    category: "reading",
    curriculum_id: 100,
  },
  {
    lesson_id: 4,
    level: "b1",
    topic: "travel",
    lesson_number: 1,
    type: "file",
    link: "",
    category: "writing",
    curriculum_id: 100,
  },
  {
    lesson_id: 5,
    level: "b1",
    topic: "Word Building",
    lesson_number: 2,
    type: "file",
    link: "",
    category: "vocabulary",
    curriculum_id: 100,
  },
  {
    lesson_id: 6,
    level: "b1",
    topic: "Describing people",
    lesson_number: 2,
    type: "file",
    link: "",
    category: "speaking",
    curriculum_id: 100,
  },
  {
    lesson_id: 7,
    level: "b1",
    topic: "family",
    lesson_number: 2,
    type: "file",
    link: "",
    category: "reading",
    curriculum_id: 100,
  },
  {
    lesson_id: 8,
    level: "b1",
    topic: "family",
    lesson_number: 2,
    type: "file",
    link: "",
    category: "writing",
    curriculum_id: 100,
  },
]

export { curriculumX, lessonsX }
