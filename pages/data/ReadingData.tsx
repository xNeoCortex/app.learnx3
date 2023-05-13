const ReadingData = {
  lesson_number: 1,
  topic: `The best public transport system in the world.`,
  lesson_type: "reading", // ENUM: "file", "video", "audio"
  level: "b1",
  type: "article",
  text: `
        Curitiba in Brazil is no ordinary city; it has the best public transport system in the world. The mayor, Jaime Lerner, along with the council, began developing the world-famous system in 1971.
        Mr Lerner had grown up in Curitiba and knew that the street was an important part of city life for the residents. He made many of the streets into pedestrian areas, with no access for cars. The council put in flowers, lights, and kiosks where people could sell food and other products. To encourage shoppers to use the new areas, the mayor gave away free paper so that local children could paint pictures in the street. Cyclists also benefit from 150km of cycle lanes, which follow old river valleys and railway tracks around the city.
        Mr Lerner realized that to increase the development and growth of the city in the future, the public transport system also had to improve. Buses were chosen as the main transport because it was the cheapest. Curitiba’s transport system now consists of over 300 routes that use around 1,900 buses to carry approximately 1.9 million passengers every day. Approximately 60km of the roads are for buses only, so traffic jams are unusual. Bus travel is faster and more convenient than using private cars. The city now uses 30% less fuel than other large cities in Brazil and people spend only about 10% of their yearly salaries on transport costs.
        Some of the buses are able to carry 170–270 passengers. School buses are yellow, and buses for disabled people are blue. They are designed with three doors – two exits and one entrance – so that people can get on and off quickly. Bus stations provide free maps and facilities to help parents with young children and people carrying heavy bags to board the buses easily. Passengers buy a ticket at the office in advance and then wait for their bus, like in an underground station.
        Because of the success of Curitiba’s public transport system, Jaime Lerner now offers advice to city councils around the world on how they can solve their cities’ transport problems.    
        `,
  assessment: [],
}

const ReadingTest1 = {
  level: "b1",
  lesson_number: 1,
  topic: `The best public transport system in the world.`,
  type: "article",
  text: `
        Curitiba in Brazil is no ordinary city; it has the best public transport system in the world. The mayor, Jaime Lerner, along with the council, began developing the world-famous system in 1971.
        Mr Lerner had grown up in Curitiba and knew that the street was an important part of city life for the residents. He made many of the streets into pedestrian areas, with no access for cars. The council put in flowers, lights, and kiosks where people could sell food and other products. To encourage shoppers to use the new areas, the mayor gave away free paper so that local children could paint pictures in the street. Cyclists also benefit from 150km of cycle lanes, which follow old river valleys and railway tracks around the city.
        Mr Lerner realized that to increase the development and growth of the city in the future, the public transport system also had to improve. Buses were chosen as the main transport because it was the cheapest. Curitiba’s transport system now consists of over 300 routes that use around 1,900 buses to carry approximately 1.9 million passengers every day. Approximately 60km of the roads are for buses only, so traffic jams are unusual. Bus travel is faster and more convenient than using private cars. The city now uses 30% less fuel than other large cities in Brazil and people spend only about 10% of their yearly salaries on transport costs.
        Some of the buses are able to carry 170–270 passengers. School buses are yellow, and buses for disabled people are blue. They are designed with three doors – two exits and one entrance – so that people can get on and off quickly. Bus stations provide free maps and facilities to help parents with young children and people carrying heavy bags to board the buses easily. Passengers buy a ticket at the office in advance and then wait for their bus, like in an underground station.
        Because of the success of Curitiba’s public transport system, Jaime Lerner now offers advice to city councils around the world on how they can solve their cities’ transport problems.    
        `,
  questions: [
    {
      question:
        "Jaime Lerner designed the transport system because he grew up in Curitiba.",
      answer: false,
    },
    {
      question:
        "Cars are allowed to drive on the pedestrian streets in the evenings.",
      answer: false,
    },
    {
      question: "There is good access to the city centre for cyclists.",
      answer: true,
    },
    {
      question:
        "Curitiba’s public transport system currently uses more than 1,900 buses.",
      answer: true,
    },
    {
      question: "Traffic jams are common on the roads of Curitiba.",
      answer: false,
    },
    {
      question:
        "Cars are allowed to drive on the pedestrian streets in the evenings.",
      answer: false,
    },
    {
      question: "There is good access to the city centre for cyclists.",
      answer: true,
    },
    {
      question:
        "Curitiba’s public transport system currently uses more than 1,900 buses.",
      answer: true,
    },
    {
      question: "Traffic jams are common on the roads of Curitiba.",
      answer: false,
    },
    {
      question:
        "The inhabitants of Curitiba prefer using public transport to their own cars.",
      answer: true,
    },
  ],
}

export { ReadingData, ReadingTest1 }
