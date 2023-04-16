const TestData = [
  {
    topic_id: 1,
    id: 101,
    topic: "Present continuous",
    level: "intermediate",
    type: "multiple-choice",
    question: "What is the present continuous form of the verb - to be ?",
    choices: ["am", "is", "are", "being"],
    answer: "am",
    explanation:
      "The present continuous form of the verb - to be - is am. This is used when talking about something that is happening now or in the near future. For example, I am eating dinner.",
  },
  {
    topic_id: 1,
    id: 102,
    topic: "Present continuous",
    level: "intermediate",
    type: "multiple-choice",
    question:
      "Which of the following sentences is in the present continuous tense?",
    choices: [
      "I am eating dinner",
      "I ate dinner yesterday",
      "I will eat dinner tomorrow",
      "I have eaten dinner already",
    ],
    answer: "I am eating dinner",
    explanation:
      "A sentence in the present continuous tense will include a form of the verb - to be - (am, is, are) and a verb ending in -ing. For example, I am eating dinner. This sentence indicates that the action of eating dinner is happening now.",
  },
  {
    topic_id: 1,
    id: 103,
    topic: "Present continuous",
    level: "intermediate",
    type: "multiple-choice",
    question: "What is the present continuous form of the verb - to go? ",
    choices: ["Went", "Going", "Gone", "Gones"],
    answer: "Going",
    explanation:
      "The present continuous form of the verb - to go - is going. For example, I am going to the store. This sentence indicates that the action of going to the store is happening now or in the near future.",
  },
  {
    topic_id: 1,
    id: 104,
    topic: "Present continuous",
    level: "intermediate",
    type: "multiple-choice",
    question:
      "Which of the following sentences is NOT in the present continuous tense?",
    choices: [
      "She is studying for her exam tonight",
      "She studied for her exam last night",
      "She will study for her exam tomorrow night",
      "She has studied for her exam already",
    ],
    answer: "She has studied for her exam already",
    explanation:
      "She has studied for her exam already is NOT in the present continuous tense because it does not include a form of the verb  - to be - and a verb ending in -ing. This sentence indicates that an action has already been completed in the past",
  },

  {
    topic_id: 2,
    id: 201,
    topic: "Present simple",
    level: "intermediate",
    type: "multiple-choice",
    question: "What is the third person singular form of the verb - to eat?",
    choices: ["Eats ", " Eat ", "Eated", "Eating"],
    answer: "Eats",
    explanation: `This is the correct answer because this is the third person singular form of the verb "to eat".`,
  },
  {
    topic_id: 2,
    id: 202,
    topic: "Present simple",
    level: "intermediate",
    type: "multiple-choice",
    question: "When do we use the Present Simple?",
    choices: [
      "For habitual or repeated actions in the present",
      "To talk about future events",
      "To express strong emotion",
      "To talk about past events ",
    ],
    answer: "For habitual or repeated actions in the present",
    explanation: "For habitual or repeated actions in the present.",
  },
  {
    topic_id: 2,
    id: 203,
    topic: "Present simple",
    level: "intermediate",
    type: "multiple-choice",
    question:
      "Which of the following is NOT an example of a Present Simple sentence?",
    choices: [
      "She loves pizza",
      "She will love pizza tomorrow",
      "She loves eating pizza",
      "She has been loving pizza for years",
    ],
    answer: "She will love pizza tomorrow",
    explanation:
      "This is the correct answer because this sentence is using future tense, not present tense",
  },
  {
    topic_id: 2,
    id: 204,
    topic: "Present simple",
    level: "intermediate",
    type: "multiple-choice",
    question: "Which of these verbs is irregular in the Present Simple?",
    choices: ["See", "Go", "Read", "Drink"],
    answer: "Go",
    explanation:
      "This is the correct answer because `go` is an irregular verb in the Present Simple, which means that its conjugation does not follow normal rules of conjugation for regular verbs",
  },
  {
    topic_id: 2,
    id: 205,
    topic: "Present simple",
    level: "intermediate",
    type: "multiple-choice",
    question: "How do we form negative sentences using the Present Simple?",
    choices: [
      "Add 'doesn't' after the subject and before the verb",
      "Add 'did not' after the subject and before the verb",
      "Add 'no' after the subject and before the verb",
      "Add 'not' after the verb",
    ],
    answer: "Add 'doesn't' after the subject and before the verb",
    explanation:
      "This is the correct answer because this is how to form negative sentences using Present Simple: add 'doesn't' after the subject and before the verb (e.g., She doesn't like pizza).",
  },

  // ----------------------------------------------------------------

  {
    topic_id: 3,
    id: 301,
    topic: "Present continuous and present simple 1",
    level: "intermediate",
    type: "multiple-choice",
    question: "Which tense is used to express an action that is happening now?",
    choices: [
      "Present Continuous",
      "Future Simple",
      "Present Perfect",
      "Past Simple",
    ],
    answer: "Present Continuous",
    explanation:
      "This tense is used to express an action that is happening now.",
  },
  {
    topic_id: 3,
    id: 302,
    topic: "Present continuous and present simple 1",
    level: "intermediate",
    type: "multiple-choice",
    question: `What is the correct form of the verb “to go” in the present continuous tense?`,
    choices: ["Went", "Going", "Gone", "Gones"],
    answer: "Going",
    explanation: `The correct form of the verb “to go” in the present continuous tense is “going”.`,
  },
  {
    topic_id: 3,
    id: 303,
    topic: "Present continuous and present simple 1",
    level: "intermediate",
    type: "multiple-choice",
    question: "Which sentence uses the present simple tense?",
    choices: [
      "I am working on a project now",
      "I am going to work on a project soon",
      "I work on a project every day",
      "I was working on a project yesterday",
    ],
    answer: "I work on a project every day",
    explanation:
      "This sentence uses the present simple tense, which is used for actions that happen regularly and for general truths.",
  },
  {
    topic_id: 3,
    id: 304,
    topic: "Present continuous and present simple 1",
    level: "intermediate",
    type: "multiple-choice",
    question: "Which sentence uses the present continuous tense?",
    choices: [
      "She goes to school everyday",
      "She is going to school today",
      "She went to school yesterday",
      "She will go to school tomorrow",
    ],
    answer: "She is going to school today",
    explanation:
      "This sentence uses the present continuous tense, which expresses an action that is happening at the moment it is spoken or written about.",
  },
]

export { TestData }
