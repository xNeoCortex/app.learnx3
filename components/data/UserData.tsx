export const student = {
	uid: "584vjNvLNTfAsOzEMGF2YezHZWx2mmm",
	name: "Shohrukhi Asliddin",
	email: "farzonajalolova746@gmail.com",
	age: "17",
	gender: "male",
	phone: "002229957",
	country: "Tajikistan",
	role: "student",
	permit: true,
	performance: "Doing ok",
	level: "A1", // A0 = beginner, A1 = elementary, A2 = pre-intermediate, B1 = intermediate, B2 = upper-intermediate, C1 = advanced, C2 = Proficient
	subscription_type: "free", // free, charity, premium
	subscription_start_date: "2021-05-05",
	subscription_end_date: "2021-06-05",
	paid: false,
	num_of_lessons: 0,
	num_of_lessons_left: 0,
	num_of_ai_topics_created: 0,
	discount: "", // 10%, 20%, 30%, 40%, 50%, 60%, 70%, 80%, 90%, 100%
	photo: "",
}

const teacher = {
	uid: "6E7TjU8LYIOAILifSQNKbfBFKNp2",
	name: "John Doe",
	email: "sss@gmail.com",
	age: 16,
	gender: "",
	phone: "555-555-5555",
	country: "UK",
	role: "teacher",
	permit: true,
	bio: "Experienced English teacher with a passion for helping students improve their language skills.",
	qualification: ["Teaching English as a Foreign Language (TEFL)"],
	specializations: ["Speaking", "Pronunciation"],
	reviews: [],
	photo: "",
}

export const lesson = [
	{
		uid: "6E7TjU8LYIOAILifSQNKbfBFKNp2",
		description: null,
		lesson_date: "2023-08-18T17:00:00.000Z",
		lesson_duration_minutes: 60,
		lesson_id: null,
		lesson_target_skills: ["speaking", "listening"], // Speaking,  Grammar, Vocabulary, Pronunciation, Exam Preparation, Business English, General English, IElTS, TOEFL
		lesson_type: "speaking_club", // general_english, speaking_club, business_english, ielts, toefl
		level: "A1", // A0 = beginner, A1 = elementary, A2 = pre-intermediate, B1 = intermediate, B2 = upper-intermediate, C1 = advanced, C2 = Proficient
		platform: "Google Meet",
		video_call_link: "https://meet.google.com/xxx-xxx-xxx",
		topic: "Functional Language: invitations and giving general excuses; pronunciation work",
		teacher_id: "6E7TjU8LYIOAILifSQNKbfBFKNp2",
		teacher_name: "John Doe",
		students: ["584vjNvLNTfAsOzEMGF2YezHZWx2mmm"],
		cancelled: false,
	},
	{
		uid: "6E7TjU8LYIOAILifSQNKbfBFKNp2",
		description: null,
		lesson_date: "2023-08-22T17:00:00.000Z",
		lesson_duration_minutes: 60,
		lesson_id: null,
		lesson_target_skills: ["speaking", "listening"], // Speaking,  Grammar, Vocabulary, Pronunciation, Exam Preparation, Business English, General English, IElTS, TOEFL
		lesson_type: "general_english", // general_english, speaking_club, business_english, ielts, toefl
		level: "A1", // A0 = beginner, A1 = elementary, A2 = pre-intermediate, B1 = intermediate, B2 = upper-intermediate, C1 = advanced, C2 = Proficient
		platform: "Google Meet",
		video_call_link: "https://meet.google.com/xxx-xxx-xxx",
		topic: "Helping others",
		teacher_id: "6E7TjU8LYIOAILifSQNKbfBFKNp2",
		teacher_name: "John Doe",
		students: ["584vjNvLNTfAsOzEMGF2YezHZWx2mmm"],
		cancelled: false,
	},
	{
		uid: "6E7TjU8LYIOAILifSQNKbfBFKNp2",
		description: null,
		lesson_date: "2023-08-18T17:00:00.000Z",
		lesson_duration_minutes: 60,
		lesson_id: null,
		lesson_target_skills: ["speaking", "listening"], // Speaking,  Grammar, Vocabulary, Pronunciation, Exam Preparation, Business English, General English, IElTS, TOEFL
		lesson_type: "general_english", // general_english, speaking_club, business_english, ielts, toefl
		level: "A1", // A0 = beginner, A1 = elementary, A2 = pre-intermediate, B1 = intermediate, B2 = upper-intermediate, C1 = advanced, C2 = Proficient
		platform: "Google Meet",
		video_call_link: "https://meet.google.com/xxx-xxx-xxx",
		topic: " Functional Language: invitations and giving general excuses; pronunciation work",
		teacher_id: "6E7TjU8LYIOAILifSQNKbfBFKNp2",
		teacher_name: "John Doe",
		students: ["584vjNvLNTfAsOzEMGF2YezHZWx2mmm"],
		cancelled: false,
	},
	{
		uid: "6E7TjU8LYIOAILifSQNKbfBFKNp2",
		description: null,
		lesson_date: "2023-08-19T17:00:00.000Z",
		lesson_duration_minutes: 60,
		lesson_id: null,
		lesson_target_skills: ["speaking", "listening"], // Speaking,  Grammar, Vocabulary, Pronunciation, Exam Preparation, Business English, General English, IElTS, TOEFL
		lesson_type: "general_english", // general_english, speaking_club, business_english, ielts, toefl
		level: "A1", // A0 = beginner, A1 = elementary, A2 = pre-intermediate, B1 = intermediate, B2 = upper-intermediate, C1 = advanced, C2 = Proficient
		platform: "Google Meet",
		video_call_link: "https://meet.google.com/xxx-xxx-xxx",
		topic: " Functional Language: invitations and giving general excuses; pronunciation work",
		teacher_id: "6E7TjU8LYIOAILifSQNKbfBFKNp2",
		teacher_name: "John Doe",
		students: ["584vjNvLNTfAsOzEMGF2YezHZWx2mmm"],
		cancelled: false,
	},
	{
		uid: "6E7TjU8LYIOAILifSQNKbfBFKNp2",
		description: null,
		lesson_date: "2023-09-19T17:00:00.000Z",
		lesson_duration_minutes: 60,
		lesson_id: null,
		lesson_target_skills: ["speaking", "listening"], // Speaking,  Grammar, Vocabulary, Pronunciation, Exam Preparation, Business English, General English, IElTS, TOEFL
		lesson_type: "general_english", // general_english, speaking_club, business_english, ielts, toefl
		level: "A1", // A0 = beginner, A1 = elementary, A2 = pre-intermediate, B1 = intermediate, B2 = upper-intermediate, C1 = advanced, C2 = Proficient
		platform: "Google Meet",
		video_call_link: "https://meet.google.com/xxx-xxx-xxx",
		topic: " Functional Language: invitations and giving general excuses; pronunciation work",
		teacher_id: "6E7TjU8LYIOAILifSQNKbfBFKNp2",
		teacher_name: "John Doe",
		students: ["584vjNvLNTfAsOzEMGF2YezHZWx2mmm"],
		cancelled: false,
	},
]
