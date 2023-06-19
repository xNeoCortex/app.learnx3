const WritingData = [
	{
		id: 1,
		lesson_id: 1,
		topic: "About me",
		type: "general",
		key_words: ["happy", "sport", "sleep"],
		word_limit: 150,
	},
	{
		id: 2,
		lesson_id: 2,
		topic: "Favorite food",
		type: "general",
		key_words: ["cook", "eat", "serve"],
		word_limit: 250,
	},
	{
		id: 4,
		lesson_id: 3,
		topic: "Spring",
		type: "general",
		key_words: ["weather", "cold", "rain"],
		word_limit: 100,
	},
	{
		id: 5,
		lesson_id: 4,
		topic: "Traveling",
		type: "general",
		key_words: ["happy", "London", "river"],
		word_limit: 200,
	},
	{
		id: 6,
		lesson_id: 5,
		topic: "Sports",
		type: "general",
		key_words: ["jump", "run", "football"],
		word_limit: 150,
	},
]

const writingResult = [
	{
		id: 1,
		topic: "About me",
		level: "intermediate",
		essay: `The greatest wealth is our own health. A healthy body can earn great wealth but, a wealthy person cannot earn great health. We live in a fast-moving world where individuals have no time for themselves. Most part of their life withers away in search of materialistic wealth in order to outshine others but, along the way, they lose their health.
    
    Recent studies have shown that the increased stress of the present speedy life is leading to various medical conditions. Major among those are heart and neurological problems. Good health assists an individual to keep a positive attitude toward work and life in general. Wealth matters, but, is not as important as health.`,
		feedback: `lorem oremloremloremlorem loremlorem loremloremloremlorem loremloremloremloremlorem loremloremloremloremloremloremloremlorem`,
		result: null,
		student_id: 111,
	},
	{
		id: 2,
		topic: "Favorite food",
		level: "intermediate",
		essay: `The greatest wealth is our own health. A healthy body can earn great wealth but, a wealthy person cannot earn great health. We live in a fast-moving world where individuals have no time for themselves. Most part of their life withers away in search of materialistic wealth in order to outshine others but, along the way, they lose their health.
    
    Recent studies have shown that the increased stress of the present speedy life is leading to various medical conditions. Major among those are heart and neurological problems. Good health assists an individual to keep a positive attitude toward work and life in general. Wealth matters, but, is not as important as health.`,
		feedback: `lorem oremloremloremlorem loremlorem loremloremloremlorem loremloremloremloremlorem loremloremloremloremloremloremloremlorem`,
		result: null,
		student_id: 111,
	},
	{
		id: 3,
		topic: "Spring",
		level: "intermediate",
		essay: "Lorem",
		feedback: "lreom",
		result: null,
		student_id: 111,
	},
	{
		id: 4,
		topic: "About me",
		level: "intermediate",
		essay: `The greatest wealth is our own health. A healthy body can earn great wealth but, a wealthy person cannot earn great health. We live in a fast-moving world where individuals have no time for themselves. Most part of their life withers away in search of materialistic wealth in order to outshine others but, along the way, they lose their health.
    
    Recent studies have shown that the increased stress of the present speedy life is leading to various medical conditions. Major among those are heart and neurological problems. Good health assists an individual to keep a positive attitude toward work and life in general. Wealth matters, but, is not as important as health.`,
		feedback: `lorem oremloremloremlorem loremlorem loremloremloremlorem loremloremloremloremlorem loremloremloremloremloremloremloremlorem`,
		result: null,
		student_id: 222,
	},
	{
		id: 5,
		topic: "Spring",
		level: "Favorite food",
		essay: "Lorem",
		feedback: "lreom",
		result: null,
		student_id: 222,
	},
	{
		id: 6,
		topic: "Sports",
		level: "intermediate",
		essay: "Lorem",
		feedback: "lreom",
		result: null,
		student_id: 222,
	},
]

const WritingDataX = {
	lesson_number: 1,
	topic: "Email/Article about nightmare holiday",
	lesson_type: "writing",
	writing_type: "article",
	level: "b1",
	assessment: [],
	topic_content: `
    Writing a letter involves several components, including the sender's address, date, recipient's address, salutation, body, closing, and signature. Here's a basic structure for writing a letter:

      Sender's Address:
      Your name
      Your address
      City, State, ZIP code
      Country (if applicable)

      Date:
      Write the date on which the letter is being written.

      Recipient's Address:
      Recipient's name
      Recipient's address
      City, State, ZIP code
      Country (if applicable)

      Salutation:
      Begin with a greeting, such as "Dear [Recipient's Name],"

      Body:
      Compose the main content of the letter, expressing your thoughts, ideas, or any relevant information. Divide it into paragraphs for better readability.

      Closing:
      End the letter with a closing phrase, such as "Sincerely," or "Best regards," followed by your name.

      Signature:
      Sign your name below the closing phrase.
    `,
	topic_example: `
      John Doe
      123 Main Street
      Cityville, State 12345
      United States
      
      [Date]
      
      Jane Smith
      456 Park Avenue
      Townsville, State 67890
      United States
      
      Dear Jane,
      
      I am writing to share an unforgettable and harrowing experience I had during a holiday, which I believe would be a fitting entry for your story-writing competition. This incident took place during my trip to a remote island in the Pacific last summer.

      Accompanied by my close friends, Sarah and Michael, we embarked on this adventure-seeking journey. Little did we know that our dream vacation would turn into a nightmare. The trouble started when a powerful storm hit the island, leaving us stranded with limited supplies and communication.
      
      As the storm raged on, our lodging was damaged, and we were forced to take shelter in a makeshift tent. With each passing day, the situation worsened. Food became scarce, and we struggled to find clean water. The isolation and uncertainty tested our resilience.
      
      However, despite the hardships, our spirit remained unbroken. We supported and encouraged one another, devising creative ways to survive and stay hopeful. Eventually, a rescue team arrived after a week of enduring this grueling ordeal.
      
      Looking back, this experience taught us the importance of perseverance, friendship, and gratitude for the little things we often take for granted. It served as a reminder of our inner strength and resilience in the face of adversity.
      
      Thank you for considering my submission for the competition. I hope this tale of survival and personal growth resonates with your readers.      
      
      Sincerely,
      John Doe
      
      [Signature]
    `,
}

const WritingDataTest = {
	lesson_number: 1,
	word_limit: 150,
	writing_type: "article",
	assessment_type: "email/article",
	topic: "Email/Article about nightmare holiday",
	key_words: ["Nightmare", "Holiday", "Challenges", "Solutions", "Friendship"],
	task: `
    A newspaper is running a story-writing competition. Write about a nightmare holiday you’ve had, or a difficult situation you’ve been in (or invent one), to send to the newspaper. Answer the following questions. 
    • When and where did it happen?
    • Who were you with? Why?
    • What went wrong? What happened? 
    • What happened in the end?
  `,
	topic_content: `
    Writing a letter involves several components, including the sender's address, date, recipient's address, salutation, body, closing, and signature. Here's a basic structure for writing a letter:

      Sender's Address:
      Your name
      Your address
      City, State, ZIP code
      Country (if applicable)

      Date:
      Write the date on which the letter is being written.

      Recipient's Address:
      Recipient's name
      Recipient's address
      City, State, ZIP code
      Country (if applicable)

      Salutation:
      Begin with a greeting, such as "Dear [Recipient's Name],"

      Body:
      Compose the main content of the letter, expressing your thoughts, ideas, or any relevant information. Divide it into paragraphs for better readability.

      Closing:
      End the letter with a closing phrase, such as "Sincerely," or "Best regards," followed by your name.

      Signature:
      Sign your name below the closing phrase.
    `,
}

const WritingData2 = {
	lesson_number: 2,
	topic: "Email to Home-Stay Family",
	lesson_type: "writing",
	writing_type: "email",
	level: "b1",
	assessment: [],
	topic_content: `
    Writing a letter involves several components, including the sender's address, date, recipient's address, salutation, body, closing, and signature. Here's a basic structure for writing a letter:

      Salutation:
      Begin with a greeting, such as "Dear [Recipient's Name],"

      Body:
      Compose the main content of the letter, expressing your thoughts, ideas, or any relevant information. Divide it into paragraphs for better readability.

      Closing:
      End the letter with a closing phrase, such as "Sincerely," or "Best regards," followed by your name.

      Signature:
      Sign your name below the closing phrase.
    `,
	topic_example: `

      Dear [Home-Stay Family],

      I hope this email finds you well. Thank you so much for reaching out to me and providing me with an opportunity to share some information about myself. I'm really looking forward to staying with your family during my language studies in the UK.

      To give you a brief introduction, I am [Your Name], [Your Age] years old. I come from a small family, consisting of my parents and a younger sister. As for my educational background, I am currently studying [Your Field of Study] at [Your University/Institution]. I am passionate about my studies and always strive for academic excellence.

      In terms of food preferences, I have a diverse palate and enjoy trying new dishes. I am open to experiencing the local cuisine and would love to try traditional British dishes during my stay. However, I do have a few dislikes, such as spicy food and seafood.

      When it comes to sports, I am an active individual. I particularly enjoy playing football (soccer) and going for long walks or hikes in nature. I find these activities refreshing and a great way to stay active and explore the surroundings. Apart from sports, I have a keen interest in music, reading, and learning about different cultures.

      Once again, I want to express my gratitude for welcoming me into your home. I am excited about the opportunity to immerse myself in British culture and improve my language skills during my three-week stay with your family. If there is any additional information you need or any questions you have, please feel free to ask.

      Thank you again for your warm welcome and support.

      Best regards,

      [Your Name]
      
      [Signature]
    `,
}

const WritingDataTest2 = {
	lesson_number: 2,
	word_limit: 180,
	writing_type: "email",
	assessment_type: "email",
	topic: "Email to Home-Stay Family",
	key_words: ["Home", "Family", "Visit", "Abroad", "Education"],
	task: `
      Imagine you’re going to study at a language school in the UK for three weeks. You receive an email from your home-stay family asking some questions about your lifestyle. Reply to their email and include the following information. (140–180 words)
      • thank them for email
      • your age, family, work / study
      • what you usually eat / your likes and dislikes • sports you do / interests you have
  `,
	topic_content: `
    Writing a letter involves several components, including the sender's address, date, recipient's address, salutation, body, closing, and signature. Here's a basic structure for writing a letter:

      Salutation:
      Begin with a greeting, such as "Dear [Recipient's Name],"

      Body:
      Compose the main content of the letter, expressing your thoughts, ideas, or any relevant information. Divide it into paragraphs for better readability.

      Closing:
      End the letter with a closing phrase, such as "Sincerely," or "Best regards," followed by your name.

      Signature:
      Sign your name below the closing phrase.
    `,
}

const WritingData3 = {
	lesson_number: 3,
	topic: "Learn how to write an essay",
	lesson_type: "writing",
	writing_type: "essay",
	level: "b1",
	assessment: [],
	topic_content: `
    To write an essay with two body paragraphs, along with an introduction and a conclusion, you can follow this structure:

	Introduction:
	Start with an interesting sentence to get the reader's attention, like a fun fact or a question.
	Give a little bit of information about the topic to help the reader understand what you'll be talking about.
	Clearly state your main point or what you want to prove in your essay. This is called your thesis statement.
	
	Body Paragraph 1:
	Start with a sentence that tells the reader what this paragraph will be about.
	Give one reason or example to support your main point. Use facts or examples to explain why this reason is important.
	Talk about the evidence or examples you provided and explain how they support your main point.
	If you have more examples or details, you can include them to make your argument stronger.
	
	Body Paragraph 2:
	Start with a sentence that tells the reader what this paragraph will be about. It should be related to your main point.
	Give another reason or example to support your main point. Use facts or examples to explain why this reason is important.
	Discuss the evidence or examples you provided and explain how they support your main point.
	If you have more examples or details, include them to make your argument stronger.
	
	Conclusion:
	Restate your main point or thesis statement in a different way.
	Summarize the main reasons or examples you gave in your body paragraphs.
    `,
	topic_example: `
	Here's an example of an essay with two body paragraphs, an introduction, and a conclusion, written in simple language for children to understand. The topic of the essay is the importance of reading books.

	Introduction:
	Books are magical! They can take us on incredible adventures and teach us new things. In this essay, we will explore why reading books is so important and how it can help us grow.

	Body Paragraph 1:
	Reading books is like opening a door to a whole new world. When we read, we can go on exciting journeys without leaving our homes. We can visit faraway places, meet fascinating characters, and imagine ourselves in their shoes. Books can make us dream, laugh, and even cry. They spark our imagination and help us develop a love for stories.

	Body Paragraph 2:
	Not only are books fun, but they also teach us many things. When we read, we learn about different cultures, animals, and even history. We can discover new ideas and gain knowledge about the world around us. Books can also help us improve our language and vocabulary. The more we read, the better we become at expressing ourselves and understanding others.

	Conclusion:
	In conclusion, books are our friends. They open up a world of possibilities and make learning enjoyable. By reading books, we can explore new adventures, learn about the world, and expand our minds. So let's grab a book, turn its pages, and let the magic of reading take us on amazing journeys!
    `,
}

const WritingDataTest3 = {
	lesson_number: 3,
	word_limit: 180,
	writing_type: "essay",
	assessment_type: "essay",
	topic: "My Amazing Travel Adventure",
	key_words: ["Travel", "Hotel", "Mountain", "City", "Landscape"],
	task: `
      Write an essay about your traveling experience 

	  Introduction:
	  Start by sharing the excitement of traveling and how it can be an incredible experience. Mention that you want to share a special travel adventure that you had.
	  
	  Body Paragraph 1:
	  Describe the destination you traveled to. Talk about the country or city, its unique features, and why you were excited to visit. Share some interesting facts or landmarks you encountered during your trip.
	  
	  Body Paragraph 2:
	  Share your experiences and adventures during your travel. Discuss the activities you did, such as visiting famous sites, trying local food, or participating in fun cultural traditions. Describe the people you met and the new things you learned.
	  
	  Conclusion:
	  Summarize your travel adventure and express how it made a positive impact on you. Talk about the importance of travel in broadening our horizons, learning about different cultures, and appreciating the world around us. Encourage other children to explore and embrace the wonders of travel.    
  	`,
	topic_content: `
	`,
}

const WritingData4 = {
	lesson_number: 4,
	topic: "Learn how to write an essay",
	lesson_type: "writing",
	writing_type: "essay",
	level: "b1",
	assessment: [],
	topic_content: `
    To write an essay with two body paragraphs, along with an introduction and a conclusion, you can follow this structure:

	Introduction:
	Start with an interesting sentence to get the reader's attention, like a fun fact or a question.
	Give a little bit of information about the topic to help the reader understand what you'll be talking about.
	Clearly state your main point or what you want to prove in your essay. This is called your thesis statement.
	
	Body Paragraph 1:
	Start with a sentence that tells the reader what this paragraph will be about.
	Give one reason or example to support your main point. Use facts or examples to explain why this reason is important.
	Talk about the evidence or examples you provided and explain how they support your main point.
	If you have more examples or details, you can include them to make your argument stronger.
	
	Body Paragraph 2:
	Start with a sentence that tells the reader what this paragraph will be about. It should be related to your main point.
	Give another reason or example to support your main point. Use facts or examples to explain why this reason is important.
	Discuss the evidence or examples you provided and explain how they support your main point.
	If you have more examples or details, include them to make your argument stronger.
	
	Conclusion:
	Restate your main point or thesis statement in a different way.
	Summarize the main reasons or examples you gave in your body paragraphs.
    `,
	topic_example: `

	Here's an example of an essay with two body paragraphs, an introduction, and a conclusion, written in simple language for children to understand. The topic of the essay is the importance of reading books.

	Introduction:
	Do you love books? Books are magical! They can take us on incredible adventures and teach us new things. In this essay, we will explore why reading books is so important and how it can help us grow.

	Body Paragraph 1:
	Reading books is like opening a door to a whole new world. When we read, we can go on exciting journeys without leaving our homes. We can visit faraway places, meet fascinating characters, and imagine ourselves in their shoes. Books can make us dream, laugh, and even cry. They spark our imagination and help us develop a love for stories.

	Body Paragraph 2:
	Not only are books fun, but they also teach us many things. When we read, we learn about different cultures, animals, and even history. We can discover new ideas and gain knowledge about the world around us. Books can also help us improve our language and vocabulary. The more we read, the better we become at expressing ourselves and understanding others.

	Conclusion:
	In conclusion, books are our friends. They open up a world of possibilities and make learning enjoyable. By reading books, we can explore new adventures, learn about the world, and expand our minds. So let's grab a book, turn its pages, and let the magic of reading take us on amazing journeys!
    `,
}

const WritingDataTest4 = {
	lesson_number: 4,
	word_limit: 180,
	writing_type: "essay",
	assessment_type: "essay",
	topic: "My Favorite Food",
	key_words: ["Eat", "Enjoy", "Restaurant", "Local", "Italian"],
	task: `
      Write an essay about your Favorite Food

	  Why do you like this food? 
	  What makes it special? 
	  Would you recommend it to foreigners?
  	`,
	topic_content: `
	`,
}

export {
	WritingData,
	writingResult,
	WritingDataX,
	WritingDataTest,
	WritingData2,
	WritingDataTest2,
	WritingData3,
	WritingDataTest3,
	WritingData4,
	WritingDataTest4
}
