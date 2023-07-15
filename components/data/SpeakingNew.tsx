import { useStoreUser } from "../zustand"

export const School = {
	level: "b1",
	topic: "School",
	// createdAt: `${new Date().toISOString()}`,
	// createdById: `${userInfo.uid}`,
	// createdByName: `${userInfo.name}`,
	assessment: [],
	vocabularies: [
		{
			type: "noun",
			words: [
				{
					type: "noun",
					word: "student",
					synonyms: ["pupil", "learner", "scholar"],
					definition: "a person who is studying at a school or college",
					example: "The students were excited for the field trip.",
				},
				{
					type: "noun",
					word: "teacher",
					synonyms: ["educator", "instructor", "professor"],
					definition: "a person who teaches, especially in a school",
					example: "The teacher explained the lesson to the class.",
				},
				{
					type: "noun",
					word: "classroom",
					synonyms: ["lecture hall", "schoolroom", "study"],
					definition: "a room in a school where a class of students is taught",
					example: "The students gathered in the classroom for the lesson.",
				},
				{
					type: "noun",
					word: "homework",
					synonyms: ["assignment", "task", "project"],
					definition: "work that a student is required to do at home as part of their studies",
					example: "She spent the evening doing her homework.",
				},
				{
					type: "noun",
					word: "classroom",
					synonyms: ["lecture hall", "schoolroom", "study"],
					definition: "a room in a school where a class of students is taught",
					example: "The students gathered in the classroom for the lesson.",
				},
				{
					type: "noun",
					word: "homework",
					synonyms: ["assignment", "task", "project"],
					definition: "work that a student is required to do at home as part of their studies",
					example: "She spent the evening doing her homework.",
				},
			],
		},
		{
			type: "verb",
			words: [
				{
					type: "verb",
					word: "study",
					synonyms: ["learn", "read", "research"],
					definition: "apply one's mind to acquire knowledge",
					example: "He spends several hours a day studying for exams.",
				},
				{
					type: "verb",
					word: "learn",
					synonyms: ["acquire", "grasp", "absorb"],
					definition: "gain knowledge or skill through study, experience, or teaching",
					example: "Children learn best through interactive activities.",
				},
				{
					type: "verb",
					word: "teach",
					synonyms: ["instruct", "educate", "coach"],
					definition: "impart knowledge or skill to someone by instruction or example",
					example: "The teacher taught the students how to solve the math problem.",
				},
				{
					type: "verb",
					word: "attend",
					synonyms: ["go to", "be present at", "participate in"],
					definition: "be present at or take part in an event, meeting, or school",
					example: "She attends a prestigious school in the city.",
				},
			],
		},
		{
			type: "adverb",
			words: [
				{
					type: "adverb",
					word: "carefully",
					synonyms: ["cautiously", "prudently", "thoroughly"],
					definition: "in a way that is done with attention, caution, and thoroughness",
					example: "He read the instructions carefully before starting the experiment.",
				},
				{
					type: "adverb",
					word: "actively",
					synonyms: ["energetically", "vigorously", "enthusiastically"],
					definition: "in a way that involves physical or mental effort and engagement",
					example: "The students participated actively in the class discussion.",
				},
				{
					type: "adverb",
					word: "eagerly",
					synonyms: ["enthusiastically", "keenly", "excitedly"],
					definition: "in a way that shows keen interest or anticipation",
					example: "The students eagerly awaited the results of the science experiment.",
				},
				{
					type: "adverb",
					word: "successfully",
					synonyms: ["effectively", "efficiently", "triumphantly"],
					definition: "in a way that accomplishes a desired result or goal",
					example: "The students completed the project successfully.",
				},
			],
		},
		{
			type: "adjective",
			words: [
				{
					type: "adjective",
					word: "knowledgeable",
					synonyms: ["informed", "learned", "educated"],
					definition: "having or showing knowledge, information, or understanding",
					example: "The teacher is knowledgeable about various subjects.",
				},
				{
					type: "adjective",
					word: "curious",
					synonyms: ["inquisitive", "interested", "inquiring"],
					definition: "having a strong desire to know or learn something",
					example: "The students asked curious questions during the science experiment.",
				},
				{
					type: "adjective",
					word: "attentive",
					synonyms: ["alert", "observant", "mindful"],
					definition: "paying close attention to something or someone",
					example: "The attentive student took notes during the lecture.",
				},
				{
					type: "adjective",
					word: "enthusiastic",
					synonyms: ["eager", "passionate", "excited"],
					definition: "having or showing intense excitement, interest, or approval",
					example: "The students were enthusiastic about the upcoming field trip.",
				},
			],
		},
	],
	conversation: {
		title: "Conversation",
		content: [
			{
				speaker: "Student",
				content: "Good morning, teacher. How are you today?",
				order: 1,
			},
			{
				speaker: "Teacher",
				content: "Good morning, everyone. I'm doing well, thank you. How about all of you?",
				order: 2,
			},
			{
				speaker: "Student",
				content: "We're good, thank you.",
				order: 3,
			},
			{
				speaker: "Teacher",
				content:
					"Great to hear that. Today, we'll be discussing different subjects related to school. Who can tell me their favorite subject?",
				order: 4,
			},
			{
				speaker: "Student",
				content: "I really enjoy math. It challenges me and makes me think.",
				order: 5,
			},
			{
				speaker: "Teacher",
				content: "That's wonderful. Math is indeed an interesting subject. How about the rest of you?",
				order: 6,
			},
			{
				speaker: "Student",
				content: "I love English. I enjoy reading and writing stories.",
				order: 7,
			},
			{
				speaker: "Teacher",
				content: "That's great to hear. English can be a creative and expressive subject. Anyone else?",
				order: 8,
			},

			{
				speaker: "Student",
				content: "I find science fascinating. I love conducting experiments and learning about the natural world.",
				order: 9,
			},
			{
				speaker: "Teacher",
				content:
					"Science is indeed an exciting subject. It allows us to explore and understand the world around us. Any other favorites?",
				order: 10,
			},
			{
				speaker: "Student",
				content:
					"I'm really interested in history. Learning about the past helps us understand the present and shape the future.",
				order: 11,
			},
			{
				speaker: "Teacher",
				content:
					"History is a valuable subject that teaches us important lessons from the past. Thank you for sharing. Now, let's move on to today's lesson.",
				order: 12,
			},
			{
				speaker: "Student",
				content: "Sure, teacher. We're excited to learn.",
				order: 13,
			},
			{
				speaker: "Teacher",
				content:
					"That's the spirit! Today, we will focus on the importance of education and how it shapes our lives. Let's begin.",
				order: 14,
			},
		],
	},
	exercise: {
		name: "Multiple Choice Questions",
		topic: "School",
		type: "multiple-choice",
		questions: [
			{
				question: "What is the definition of the word 'homework'?",
				options: [
					{
						option: "work done at the workplace",
						correct: false,
					},
					{
						option: "tasks performed outdoors",
						correct: false,
					},
					{
						option: "work done at home as part of studies",
						correct: true,
					},
					{
						option: "work done during school breaks",
						correct: false,
					},
				],
			},
			{
				question: "Which word means 'a person who is studying at a school or college'?",
				options: [
					{
						option: "pupil",
						correct: true,
					},
					{
						option: "instructor",
						correct: false,
					},
					{
						option: "librarian",
						correct: false,
					},
					{
						option: "scientist",
						correct: false,
					},
				],
			},
			{
				question: "Which term refers to 'a room in a school where a class of students is taught'?",
				options: [
					{
						option: "playground",
						correct: false,
					},
					{
						option: "laboratory",
						correct: false,
					},
					{
						option: "classroom",
						correct: true,
					},
					{
						option: "gymnasium",
						correct: false,
					},
				],
			},
			{
				question: "What does the verb 'teach' mean?",
				options: [
					{
						option: "learn from others",
						correct: false,
					},
					{
						option: "impart knowledge or skill to someone",
						correct: true,
					},
					{
						option: "attend classes",
						correct: false,
					},
					{
						option: "perform experiments",
						correct: false,
					},
				],
			},
			{
				question: "Which term describes 'apply one's mind to acquire knowledge'?",
				options: [
					{
						option: "study",
						correct: true,
					},
					{
						option: "socialize",
						correct: false,
					},
					{
						option: "sleep",
						correct: false,
					},
					{
						option: "eat",
						correct: false,
					},
				],
			},
			{
				question: "Who is a person who teaches, especially in a school?",
				options: [
					{
						option: "student",
						correct: false,
					},
					{
						option: "parent",
						correct: false,
					},
					{
						option: "teacher",
						correct: true,
					},
					{
						option: "friend",
						correct: false,
					},
				],
			},
		],
	},
	phrases: [
		"What a lovely day!",
		"My name is Mr/Mrs/Ms Smith. I’ll be teaching you English this year.",
		"Let’s begin today’s lesson.",
		"I hope you are all ready for your English lesson.",
		"We won’t start until everyone is quiet.",
		"We started ten minutes ago. What have you been doing?",
		"Put your hands up.",
		"Put your hands down.",
		"Come out and write it on the board.",
		"I’m really impressed. I knew you could do it!",
		"Your marks will get better if you practise more.",
		"Carry on with the exercise while I’m away.",
		"This is your homework for tonight.",
		"Stand up and say goodbye to the class, please",
	],
	questions: [
		`What is your favorite subject?`,
		`How do you get to school?`,
		`What did you do over the weekend?`,
		`Have you read any interesting books lately?`,
		`What is your favorite sport or hobby?`,
		`What is your favorite food?`,
		`Do you have any pets?`,
		`What is your favorite movie or TV show?`,
		`What do you like to do during lunchtime?`,
	],
}

export const Family = {
	level: "b1",
	topic: "Family",
	// createdAt: `${new Date().toISOString()}`,
	// createdById: `${userInfo.uid}`,
	// createdByName: `${userInfo.name}`,
	assessment: [],
	vocabularies: [
		{
			type: "noun",
			word: "family",
			synonyms: ["relatives", "kin", "clan"],
			definition: "a group consisting of parents and children living together in a household",
			example: "My family and I went on a vacation together.",
		},
		{
			type: "noun",
			word: "parent",
			synonyms: ["mother", "father", "guardian"],
			definition: "a person who is a mother or father",
			example: "My parents always support me in everything I do.",
		},
		{
			type: "noun",
			word: "sibling",
			synonyms: ["brother", "sister"],
			definition: "a brother or sister",
			example: "I have two siblings, an older brother and a younger sister.",
		},
		{
			type: "noun",
			word: "grandparent",
			synonyms: ["grandfather", "grandmother"],
			definition: "a parent of one's parent",
			example: "My grandparents often tell me stories from their childhood.",
		},
		{
			type: "noun",
			word: "cousin",
			synonyms: [],
			definition: "a child of one's aunt or uncle",
			example: "I enjoy spending time with my cousins during family gatherings.",
		},
		{
			type: "noun",
			word: "aunt",
			synonyms: [],
			definition: "the sister of one's parent",
			example: "My aunt is a talented artist.",
		},
		{
			type: "noun",
			word: "uncle",
			synonyms: [],
			definition: "the brother of one's parent",
			example: "My uncle loves to take us on outdoor adventures.",
		},
		{
			type: "noun",
			word: "uncle",
			synonyms: [],
			definition: "the brother of one's parent",
			example: "My uncle loves to take us on outdoor adventures.",
		},

		{
			type: "verb",
			word: "love",
			synonyms: ["adore", "care for", "cherish"],
			definition: "to have a deep affection or fondness for someone",
			example: "I love spending time with my family.",
		},
		{
			type: "verb",
			word: "support",
			synonyms: ["encourage", "assist", "back"],
			definition: "to give assistance, comfort, or encouragement to someone",
			example: "My parents always support me in pursuing my dreams.",
		},
		{
			type: "verb",
			word: "care",
			synonyms: ["concern", "worry", "attend to"],
			definition: "to feel concern or interest; to look after or provide for someone",
			example: "My older sister takes care of me when our parents are away.",
		},
		{
			type: "verb",
			word: "spend",
			synonyms: ["utilize", "pass", "use"],
			definition: "to use time in a particular way or for a particular purpose",
			example: "I love to spend quality time with my grandparents.",
		},
		{
			type: "verb",
			word: "share",
			synonyms: ["give", "divide", "contribute"],
			definition: "to have or use something in common with others",
			example: "My siblings and I share a room.",
		},

		{
			type: "adverb",
			word: "together",
			synonyms: ["united", "jointly", "in concert"],
			definition: "in or into one gathering, company, mass, place, or body",
			example: "We love to do activities together as a family.",
		},
		{
			type: "adverb",
			word: "happily",
			synonyms: ["joyfully", "cheerfully", "contentedly"],
			definition: "in a happy or joyful manner",
			example: "We spent a day at the beach, happily building sandcastles.",
		},
		{
			type: "adverb",
			word: "closely",
			synonyms: ["intimately", "tightly", "near"],
			definition: "in a way that is close or near",
			example: "I am closely connected to my siblings.",
		},
		{
			type: "adverb",
			word: "always",
			synonyms: ["forever", "constantly", "perpetually"],
			definition: "at all times; on every occasion",
			example: "I can always count on my family for support.",
		},

		{
			type: "adjective",
			word: "loving",
			synonyms: ["affectionate", "caring", "warm"],
			definition: "showing love or affection",
			example: "My family has a loving and supportive environment.",
		},
		{
			type: "adjective",
			word: "close",
			synonyms: ["intimate", "tight-knit", "familiar"],
			definition: "having strong emotional or familial bonds",
			example: "We have a close-knit family that always sticks together.",
		},
		{
			type: "adjective",
			word: "big",
			synonyms: ["large", "enormous", "massive"],
			definition: "having a great size or extent",
			example: "I have a big extended family with many relatives.",
		},
		{
			type: "adjective",
			word: "extended",
			synonyms: ["expanded", "prolonged", "enlarged"],
			definition: "involving more than the nuclear family",
			example: "During the holidays, we gather with our extended family.",
		},
	],
	conversation: {
		title: "Conversation",
		content: [
			{
				speaker: "Child",
				content: "Hi Mom! How was your day?",
				order: 1,
			},
			{
				speaker: "Parent",
				content: "Hi sweetheart! It was good. How about yours?",
				order: 2,
			},
			{
				speaker: "Child",
				content: "I had a fun day at school. I played with my friends during recess.",
				order: 3,
			},
			{
				speaker: "Parent",
				content: "That's great to hear! Did you learn anything interesting in class today?",
				order: 4,
			},
			{
				speaker: "Child",
				content: "Yes, we learned about animals and their habitats. It was fascinating!",
				order: 5,
			},
			{
				speaker: "Parent",
				content: "Wow! I'm glad you enjoyed your lesson. Is there anything else you'd like to share?",
				order: 6,
			},
			{
				speaker: "Child",
				content: "Yes, I need your help with my homework. Can you assist me with math?",
				order: 7,
			},
			{
				speaker: "Parent",
				content: "Of course! I'll be happy to help you with your math homework. Let's work on it together.",
				order: 8,
			},
			{
				speaker: "Child",
				content: "Thank you, Mom! You're the best.",
				order: 9,
			},
			{
				speaker: "Parent",
				content: "You're welcome, sweetheart. I'm always here to support you. Let's get started with the homework.",
				order: 10,
			},
		],
	},
	exercise: {
		name: "Multiple Choice Questions",
		topic: "Family",
		type: "multiple-choice",
		questions: [
			{
				question: "What is the definition of the word 'family'?",
				options: [
					{
						option: "a group of friends",
						correct: false,
					},
					{
						option: "a group of people living in the same neighborhood",
						correct: false,
					},
					{
						option: "a group consisting of parents and children living together in a household",
						correct: true,
					},
					{
						option: "a group of classmates",
						correct: false,
					},
				],
			},
			{
				question: "Who is a person who is a mother or father?",
				options: [
					{
						option: "sibling",
						correct: false,
					},
					{
						option: "grandparent",
						correct: false,
					},
					{
						option: "parent",
						correct: true,
					},
					{
						option: "cousin",
						correct: false,
					},
				],
			},
			{
				question: "Which word describes 'having strong emotional or familial bonds'?",
				options: [
					{
						option: "loving",
						correct: false,
					},
					{
						option: "big",
						correct: false,
					},
					{
						option: "close",
						correct: true,
					},
					{
						option: "extended",
						correct: false,
					},
				],
			},
			{
				question: "What does the verb 'support' mean?",
				options: [
					{
						option: "to give assistance or encouragement",
						correct: true,
					},
					{
						option: "to spend time with friends",
						correct: false,
					},
					{
						option: "to share belongings",
						correct: false,
					},
					{
						option: "to care for pets",
						correct: false,
					},
				],
			},
			{
				question: "Who is a brother or sister?",
				options: [
					{
						option: "parent",
						correct: false,
					},
					{
						option: "grandparent",
						correct: false,
					},
					{
						option: "sibling",
						correct: true,
					},
					{
						option: "aunt",
						correct: false,
					},
				],
			},
			{
				question: "Which term means 'in a way that is close or near'?",
				options: [
					{
						option: "together",
						correct: false,
					},
					{
						option: "happily",
						correct: false,
					},
					{
						option: "closely",
						correct: true,
					},
					{
						option: "always",
						correct: false,
					},
				],
			},
		],
	},
	phrases: [
		"How was your day?",
		"I love spending time with my family.",
		"My parents always support me.",
		"We spent a day at the park together.",
		"I care deeply for my siblings.",
		"Let's visit our grandparents this weekend.",
		"Our family enjoys going on vacations.",
		"I'm grateful for my loving family.",
		"We share a strong bond.",
		"I'm always there for my family.",
	],
	questions: [
		"How was your day?",
		"What did you do today?",
		"Do you have any siblings?",
		"Who is your favorite family member?",
		"What activities do you enjoy doing with your family?",
		"How often do you visit your grandparents?",
		"What does family mean to you?",
		"Who supports you the most in your family?",
		"Do you have any family traditions?",
		"What are some things you love about your family?",
	],
}
