const WordBuilding = {
	level: "b1",
	topic: "Word Building 1",
	lesson_number: 1,
	question_type: "word_building", // ENUM: "file", "video", "audio"
	questions: [
		{
			question: "Money can't buy you ______ or at least that's what some people say.",
			word: "happy",
			answers: "happiness",
		},
		{
			question: "I don't think guns _______ toys for are young children.",
			word: "suit",
			answers: "suitable",
		},
		{
			question: `Alexander Graham Bell developed the first telephone in 1876. Did he have any idea how
      important his _______ would become?`,
			word: "invent",
			answers: "invention",
		},
		{
			question: `Come on! You can do it! There's no such word as _______.`,
			word: "possible",
			answers: "possibility",
		},
		{
			question: `The tobacco companies understood the _______ effects of smoking for
      a long time - but kept quiet about them.`,
			word: "harm",
			answers: "harmful",
		},
		{
			question: `Towards the end of the 20th century, Microsoft became the world's most _______ company.`,
			word: "success",
			answers: "successful",
		},
		{
			question: `Kate Winslet's ______ is the only good thing about this film.`,
			word: "perform",
			answers: "performance",
		},
		{
			question: `The England football team has some talent,
      but we're all _______ about their chances in the World Cup.`,
			word: "doubt",
			answers: "doubtful",
		},
		{
			question: `Frightened? I was absolutely _______!`,
			word: "terror",
			answers: "terrified",
		},
		{
			question: `Adam is too ______ Al I said was I didn't like his new hair colour, and now he won't speak to me.`,
			word: "sense",
			answers: "sensitive",
		},
		{
			question: `I was kept ______ last night by another crazy party in the flat below me.`,
			word: "wake",
			answers: "awake",
		},
		{
			question: `You have a problem, and I'm very ______. But I'm not in a position to lend you money.`,
			word: "sympathy",
			answers: "sympathetic",
		},
	],
}

const Vocabulary_1 = {
	vocabulary: 1,
	level: "b1",
	type: "verb",
	vocabularies: [
		{
			word: "happy",
			synonyms: ["joyful", "content", "delighted"],
			definition: "feeling or showing pleasure, contentment, or joy",
			antonyms: ["sad", "miserable", "unhappy"],
			example: "She was extremely happy when she received the news of her promotion.",
		},
		{
			word: "suit",
			definition:
				"to be appropriate or suitable for someone or something; to meet the needs or preferences of someone or something",
			synonyms: ["fit", "match", "complement"],
			antonyms: ["mismatch", "clash", "disagree"],
			example: "He wore a stylish suit to the wedding.",
		},
		{
			word: "invent",
			synonyms: ["create", "devise", "concoct"],
			definition: "create or design (something that has not existed before); be the originator of",
			antonyms: ["destroy", "abolish", "eliminate"],
			example: "Thomas Edison invented the phonograph.",
		},
		{
			word: "possible",
			synonyms: ["feasible", "achievable", "attainable"],
			definition: "able to be done; within the power or capacity of someone or something",
			antonyms: ["impossible", "unattainable", "infeasible"],
			example: "With hard work and determination, anything is possible.",
		},
		{
			word: "harm",
			synonyms: ["damage", "injury", "hurt"],
			definition: "physical injury, especially that which is deliberately inflicted",
			antonyms: ["heal", "protect", "benefit"],
			example: "Please be careful not to harm yourself.",
		},
		{
			word: "success",
			definition: "the accomplishment of an aim or purpose",
			synonyms: ["achievement", "victory", "triumph"],
			antonyms: ["failure", "defeat", "loss"],
			example: "His hard work and dedication led to great success.",
		},
		{
			word: "perform",
			definition: "carry out, accomplish, or fulfill (an action, task, or function)",
			synonyms: ["execute", "carry out", "accomplish"],
			antonyms: ["neglect", "fail", "underperform"],
			example: "The band will perform live at the concert tonight.",
		},
		{
			word: "doubt",
			definition: "a feeling of uncertainty or lack of conviction",
			synonyms: ["uncertainty", "skepticism", "question"],
			antonyms: ["certainty", "belief", "confidence"],
			example: "I have no doubt that she will succeed in her endeavors.",
		},
		{
			word: "sympathy",
			definition:
				"a feeling or expression of understanding, compassion, or sorrow for someone else's hardships, pain, or loss",
			synonyms: ["compassion", "empathy", "understanding"],
			antonyms: ["apathy", "indifference", "unsympathetic"],
			example: "She showed sympathy towards her friend who was going through a difficult time.",
		},
	],
}

const Vocabulary_2 = {
	vocabulary: 2,
	level: "b1",
	type: "verb",
	vocabularies: [
		{
			word: "love",
			synonyms: ["adore", "cherish", "care for"],
			definition: "to have a strong affection or deep emotional attachment for someone",
			antonyms: ["hate", "dislike", "detest"],
			example: "I love spending time with my family.",
		},
		{
			word: "support",
			synonyms: ["encourage", "uphold", "assist"],
			definition: "to provide assistance, encouragement, or help to someone",
			antonyms: ["oppose", "discourage", "hinder"],
			example: "My family always supports me in pursuing my dreams.",
		},
		{
			word: "care",
			synonyms: ["concern", "attention", "regard"],
			definition: "to feel concern or interest for the well-being of someone",
			antonyms: ["neglect", "disregard", "ignore"],
			example: "My parents take great care of me.",
		},
		{
			word: "bond",
			synonyms: ["connection", "tie", "relationship"],
			definition: "a strong emotional connection or relationship between people",
			antonyms: ["distance", "separation", "estrangement"],
			example: "There is a strong bond between siblings.",
		},
		{
			word: "trust",
			synonyms: ["confidence", "reliance", "faith"],
			definition: "a firm belief in the reliability, truth, or ability of someone",
			antonyms: ["distrust", "suspicion", "doubt"],
			example: "I trust my family completely.",
		},
		{
			word: "communicate",
			synonyms: ["convey", "express", "share"],
			definition: "to exchange information, ideas, or feelings with others",
			antonyms: ["miscommunicate", "withhold", "conceal"],
			example: "Open and honest communication is important in a family.",
		},
		{
			word: "respect",
			synonyms: ["admiration", "esteem", "regard"],
			definition: "to have a high or deep regard for someone; to show consideration and honor",
			antonyms: ["disrespect", "disregard", "contempt"],
			example: "Respect is essential in maintaining a healthy family relationship.",
		},
		{
			word: "supportive",
			synonyms: ["encouraging", "helpful", "reliable"],
			definition: "providing assistance, encouragement, or comfort to someone",
			antonyms: ["unsupportive", "unhelpful", "indifferent"],
			example: "My family is always supportive of my decisions.",
		},
		{
			word: "unconditional",
			synonyms: ["absolute", "complete", "unrestricted"],
			definition: "not limited by conditions or requirements; without limitations or expectations",
			antonyms: ["conditional", "limited", "restrictive"],
			example: "A parent's love is often described as unconditional.",
		},
	],
}

const WordBuilding2 = {
	level: "b1",
	topic: "Word Building 2",
	lesson_number: 2,
	question_type: "word_building", // ENUM: "file", "video", "audio"
	questions: [
		{
			question: "There is a lot of ______in the street. Are we missing something?.",
			word: "ACTIVE",
			answers: "activity",
		},
		{
			question: "There are _______ reasons not to fall in love.",
			word: "COUNT",
			answers: "countless",
		},
		{
			question: `Don't ask. I'm afraid I'm _______ to help you.`,
			word: "POWER",
			answers: "powerless",
		},
		{
			question: `I'd love to, but _______ I can't make it this FORTUNE TV hardware weekend.`,
			word: "FORTUNE",
			answers: "unfortunately",
		},
		{
			question: `Just what is the _______ of listening to four old men playing rock music?.`,
			word: "ATTRACT",
			answers: "attraction",
		},
		{
			question: `Safety is not my _______. Speak to my supervisor.`,
			word: "RESPONSE",
			answers: "responsibility",
		},
		{
			question: `Clean it up now. It' ______ ,and sooner or later somebody will fall over.`,
			word: "SLIP",
			answers: "slippery",
		},
		{
			question: `'I've been concerned about your _______ for some time,' the head teacher said in a rather
			threatening voice.`,
			word: "BEHAVE",
			answers: "behavior",
		},
		{
			question: `What do we want? _______! When do we want it? Now!`,
			word: "EQUAL",
			answers: "equality",
		},
	],
}

export { WordBuilding, Vocabulary_1, Vocabulary_2 , WordBuilding2}
