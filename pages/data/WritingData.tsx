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

export { WritingData, writingResult, WritingDataX, WritingDataTest }
