import { Box, Button, IconButton } from "@mui/material"
import { useState } from "react"
import { Configuration, OpenAIApi } from "openai"
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh"
import ClearIcon from "@mui/icons-material/Clear"

function CreateTestAI({ prompt, buttonTitle, bg }) {
  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  })

  const openAI = new OpenAIApi(configuration)

  // const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    try {
      const response = await openAI.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are english language exam creator. You create english language tests in json format",
          },
          {
            role: "user",
            content:
              "Create 4 multiple choice language tests for the topic Present continuous ",
          },
          {
            role: "assistant",
            content: `[
              {
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
              }]`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 800,
        presence_penalty: 0,
      })
      console.log(
        "typeof response :>> ",
        typeof response.data.choices[0].message.content
      )
      setResult(response.data.choices[0].message.content)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "start",
        background: bg || "white",
        borderRadius: "7px",
        marginBottom: "10px",
      }}
    >
      <Box
        sx={{
          position: "relative",
          padding: 2,
        }}
      >
        {result.length > 0 && (
          <Box
            sx={{
              position: "absolute",
              right: 5,
              color: "black",
              cursor: "pointer",
            }}
            onClick={() => setResult("")}
          >
            <IconButton>
              <ClearIcon />
            </IconButton>
          </Box>
        )}
        <Button
          variant="contained"
          onClick={handleClick}
          disabled={loading}
          style={{
            background: "rgb(50, 51, 49)",
            color: "white",
            fontWeight: "bold",
            fontSize: 12,
          }}
        >
          <AutoFixHighIcon style={{ marginRight: 10 }} />{" "}
          {loading ? "Loading..." : buttonTitle}
        </Button>

        <div
          style={{
            width: "100%",
            minHeight: "100%",
            color: "black",
            margin: "20px 2px",
          }}
        >
          <p
            dangerouslySetInnerHTML={{
              __html: result.replace(/\n/g, "<br />"),
            }}
          />
        </div>
      </Box>
    </Box>
  )
}

export default CreateTestAI
