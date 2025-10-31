
import { GoogleGenAI, Type } from "@google/genai";
import { LessonData, Assignment, AIFeedback, Project } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a fallback for development, but the environment variable should be set.
  console.warn("API_KEY environment variable not set.");
}

export const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateModuleIntro = async (
  courseTitle: string,
  moduleTitle: string,
  language: 'Python' | 'R' | 'SQL' | 'Scala',
  onStream: (chunk: string) => void
): Promise<void> => {
  const prompt = `
    You are an expert educator and author creating content for 'Learn.data', a professional learning platform for Data Science. Your tone must be professional, academic, and encouraging — clear, detailed, and free of filler.

    Your task is to generate a complete, 1,000–1,500 word introductory chapter for the module titled "${moduleTitle}" within the "${courseTitle}" course, using ${language}.

    The introduction must cover:
    1.  **Conceptual Overview:** Clearly define the core concepts of the module. Explain why they are important in the broader context of data science.
    2.  **Theoretical Foundations:** Delve into the essential theory and mathematics behind the concepts. Use clear, accessible language without oversimplifying critical details.
    3.  **Practical Application with ${language}:** Provide a complete, well-annotated code example in ${language}.
        - The code must be self-contained and run without modification.
        - Use modern best practices for ${language} (e.g., Python >= 3.11, R >= 4.3, standard SQL, Scala with sbt).
        - Utilize current, standard libraries (e.g., pandas, scikit-learn for Python; dplyr, ggplot2 for R; Apache Spark for Scala) or standard SQL syntax.
        - Add comments to explain each step of the code logic.
    4.  **Visuals:** Describe where a visual representation (like a plot or diagram) would be beneficial and what it should illustrate. If applicable for the language, generate the ${language} code to create this visual using a relevant library (e.g., Matplotlib/Seaborn for Python, ggplot2 for R). The data used for the plot must be realistic. For SQL, you can describe the kind of chart one would create from a query's result set.
    5.  **Learning Objectives:** Conclude with a clear, bulleted list of what the learner will be able to do after completing this module.

    Structure the output using Markdown. Use headings, subheadings, bold text, lists, and code blocks to ensure the content is well-organized and easy to read. Do not use placeholders like "[Your Code Here]" or truncate any part of the content. Ensure the entire response is a single, cohesive, and complete chapter.
    `;

  try {
    const response = await ai.models.generateContentStream({
      model: 'gemini-2.5-pro',
      contents: prompt,
    });
    for await (const chunk of response) {
      onStream(chunk.text);
    }
  } catch (error) {
    console.error("Error generating content from Gemini API:", error);
    if (error instanceof Error) {
        const errorMessage = `Error: Failed to generate content. Please check your API key and network connection. Details: ${error.message}`;
        onStream(errorMessage)
    } else {
       onStream("An unknown error occurred while generating content.");
    }
  }
};


export const generateLessonContent = async (
    courseTitle: string,
    moduleTitle: string,
    classTitle: string,
    lessonTitle: string,
    language: 'Python' | 'R' | 'SQL' | 'Scala'
): Promise<LessonData> => {
    let setupInstructions = '';
    if (language === 'SQL') {
        setupInstructions = `
        *   For the 'assignment' object, you MUST provide a 'databaseSetup' field containing the necessary SQL (CREATE TABLE, INSERT statements) to create a realistic context for the exercise.`;
    } else if (language === 'R') {
        setupInstructions = `
        *   For the 'assignment' object, you MUST provide a 'dataSetup' field containing the necessary R code to create any data frames or tibbles required for the exercise (e.g., using library(tibble); my_data <- tibble(...) ).`;
    }
    
    let languageSpecifics = '';
    if (language === 'R') {
      languageSpecifics = "If the lesson involves visualization (e.g., using ggplot2), this code block MUST generate a plot as its output."
    } else if (language === 'Python') {
      languageSpecifics = "If the lesson involves visualization (e.g., using matplotlib or seaborn), the code block MUST include a call to `plt.show()` to display the plot."
    }

    const prompt = `
    You are an expert educator creating a lesson for 'Learn.data', a professional Data Science learning platform. Your tone must be academic, professional, and encouraging. The content should be clear, detailed, and practical.

    Generate a complete lesson on the topic "${lessonTitle}" for the class "${classTitle}" in the module "${moduleTitle}" of the "${courseTitle}" course. The programming language is ${language}.

    You must generate two strictly separate parts:

    1.  **Lesson Content:** This is the main teaching text, formatted as valid Markdown (500-800 words). It MUST be structured with the following sections using appropriate Markdown headings (e.g., \`## Introduction\`, \`### Core Concepts\`):
        *   **Introduction:** A concise paragraph introducing the lesson's topic and its relevance. Use clear, engaging language.
        *   **Core Concepts:** A detailed explanation of the theoretical underpinnings of the topic. Use bullet points, bold text, and \`inline code\` formatting to break down complex ideas and highlight key terms.
        *   **Practical Example in ${language}:** A section that includes a complete, well-annotated ${language} code block demonstrating the concept. You must explain the code's purpose and logic *before* presenting the code block itself. ${languageSpecifics}
        *   **Summary:** A brief concluding paragraph that summarizes the key takeaways from the lesson.
        *   This section must be **purely instructional**. It must NOT contain any exercises, questions, or challenges for the student. Its purpose is to teach, not to test.

    2.  **Coding Assignment:** This is a hands-on coding exercise to test the student's understanding. It MUST contain:
        *   A clear problem description for the student to solve.
        *   A starter code block.
        *   A complete, runnable solution code block.
        ${setupInstructions}

    Format your entire response as a single JSON object. Do not include any text or markdown outside of the JSON structure.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        lessonContent: {
                            type: Type.STRING,
                            description: "The full lesson content in Markdown format. This should be purely instructional text and demonstrative code examples. It must not contain any problems or exercises for the student to solve."
                        },
                        assignment: {
                            type: Type.OBJECT,
                            description: "A standalone coding assignment for the lesson, containing a problem statement, starter code, and solution.",
                            properties: {
                                problemDescription: {
                                    type: Type.STRING,
                                    description: "A clear description of the problem to solve."
                                },
                                starterCode: {
                                    type: Type.STRING,
                                    description: `Starter ${language} code for the user.`
                                },
                                solution: {
                                    type: Type.STRING,
                                    description: `The complete ${language} solution code.`
                                },
                                databaseSetup: {
                                    type: Type.STRING,
                                    description: "For SQL assignments ONLY. A string containing SQL statements (CREATE TABLE, INSERT) to set up the database. Omit for other languages."
                                },
                                dataSetup: {
                                    type: Type.STRING,
                                    description: "For R assignments ONLY. A string containing R code to set up data frames (tibbles) for the exercise. Omit for other languages."
                                }
                            },
                            required: ["problemDescription", "starterCode", "solution"]
                        }
                    },
                    required: ["lessonContent", "assignment"]
                }
            }
        });

        const jsonText = response.text.trim();
        const lessonData: LessonData = JSON.parse(jsonText);
        return lessonData;

    } catch (error) {
        console.error("Error generating lesson content from Gemini API:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return {
            lessonContent: `## Generation Error\n\nWe're sorry, but there was an error generating the lesson content. This might be a temporary issue with the service or your connection.\n\n**Details:**\n\`\`\`\n${errorMessage}\n\`\`\`\nPlease try again shortly.`,
            assignment: {
                problemDescription: 'Error: Could not load assignment.',
                starterCode: '# An error occurred while generating the assignment starter code.',
                solution: '# An error occurred while generating the assignment solution.',
            },
        };
    }
};

export const checkCodeSubmission = async (
    assignment: Assignment,
    userCode: string,
    language: 'Python' | 'R' | 'SQL' | 'Scala'
): Promise<AIFeedback> => {
    const prompt = `
    You are an expert programming instructor and code reviewer for 'Learn.data', an educational platform. Your goal is to provide constructive, encouraging, and pedagogically valuable feedback on a student's code submission. Analyze the code as text; DO NOT execute it.

    **Assignment Details:**
    - **Problem:** ${assignment.problemDescription}
    - **A possible solution:**
    \`\`\`${language.toLowerCase()}
    ${assignment.solution}
    \`\`\`

    **Student's Submission:**
    \`\`\`${language.toLowerCase()}
    ${userCode}
    \`\`\`

    **Your Task:**
    Analyze the student's submission based on the following criteria:
    1.  **Correctness:** Does the code solve the problem described? How close is it to the intended logic of the solution?
    2.  **Best Practices:** Does the code follow standard conventions (e.g., PEP 8 for Python, standard SQL formatting)?
    3.  **Readability & Logic:** Is the code clear, well-structured, and logically sound?
    4.  **Efficiency:** Are there obvious performance issues or more efficient ways to accomplish the task?
    5.  **Beginner Mistakes:** Identify common errors that learners make.

    Provide your feedback as a single JSON object with the exact structure specified below. Do not include any text, markdown, or code blocks outside of this JSON object.

    **JSON Output Structure:**
    - \`score\`: An integer from 0 to 100 representing the overall quality of the submission.
    - \`generalAssessment\`: A brief, 2-3 sentence summary of the submission.
    - \`strengths\`: An array of strings highlighting positive aspects of the code.
    - \`issuesAndSuggestions\`: An array of objects, where each object has an \`issue\` (string describing a problem) and a \`suggestion\` (string on how to fix it).
    - \`optimizedCode\`: A string containing a revised version of the student's code that incorporates your suggestions for improvement.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        score: { type: Type.INTEGER },
                        generalAssessment: { type: Type.STRING },
                        strengths: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING }
                        },
                        issuesAndSuggestions: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    issue: { type: Type.STRING },
                                    suggestion: { type: Type.STRING }
                                },
                                required: ['issue', 'suggestion']
                            }
                        },
                        optimizedCode: { type: Type.STRING }
                    },
                    required: ["score", "generalAssessment", "strengths", "issuesAndSuggestions", "optimizedCode"]
                }
            }
        });

        const jsonText = response.text.trim();
        const feedback: AIFeedback = JSON.parse(jsonText);
        return feedback;

    } catch (error) {
        console.error("Error generating code feedback from Gemini API:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return {
            score: 0,
            generalAssessment: "An error occurred while analyzing your code. This might be a temporary issue with the service or your connection.",
            strengths: [],
            issuesAndSuggestions: [{
                issue: "API Error",
                suggestion: `Could not get feedback from the AI model. Details: ${errorMessage}`
            }],
            optimizedCode: "// Could not generate optimized code due to an error."
        };
    }
};

export const generateProjectGuide = async (
  project: Project,
  language: 'Python' | 'R' | 'SQL' | 'Scala',
  onStream: (chunk: string) => void
): Promise<void> => {
  const prompt = `
    You are an expert educator and author for 'Learn.data', a professional learning platform for Data Science. Your tone is professional, encouraging, and clear.

    Your task is to generate a comprehensive, hands-on project guide for the following project:

    - **Project Title:** "${project.title}"
    - **Language:** ${language}
    - **Difficulty:** ${project.difficulty}
    - **Description:** "${project.description}"
    - **Key Concepts/Tags:** ${project.tags.join(', ')}

    The guide must be a complete, self-contained document formatted in Markdown. It should be structured with the following sections using clear headings (e.g., \`## Section Title\`):

    1.  **Project Overview:** Expand on the provided description. Explain the project's real-world relevance and what the final outcome will be.
    2.  **Learning Objectives:** A bulleted list of the specific skills and concepts the learner will master by completing this project.
    3.  **Dataset & Setup:** Describe the dataset to be used.
        - If it's a common dataset (e.g., Iris, Titanic), state its name and provide the ${language} code to load it using a standard library (e.g., pandas, scikit-learn datasets, Tidyverse).
        - If no external dataset is needed, provide self-contained code to generate realistic sample data for the project.
        - For SQL, provide the necessary \`CREATE TABLE\` and \`INSERT\` statements.
    4.  **Step-by-Step Guide:** This is the core of the project. Provide a detailed, numbered list of steps to complete the project from start to finish. Each step should include:
        - A clear, descriptive title.
        - A detailed explanation of the task for that step.
        - Well-annotated ${language} code snippets to guide the user. The code should be illustrative and directly related to the step's task.
    5.  **Final Deliverable:** Clearly describe what the final output should be (e.g., a specific plot, a prediction score, a summary table, a cleaned dataset).
    6.  **Bonus Challenges (Optional):** Include 1-2 optional challenges for learners who want to go further. These could involve exploring a different aspect of the data, trying a more advanced technique, or improving the model/analysis.

    Ensure all code is runnable, follows best practices for ${language}, and uses standard libraries. The entire response must be a single, cohesive Markdown document.
    `;

  try {
    const response = await ai.models.generateContentStream({
      model: 'gemini-2.5-pro',
      contents: prompt,
    });
    for await (const chunk of response) {
      onStream(chunk.text);
    }
  } catch (error) {
    console.error("Error generating project guide from Gemini API:", error);
    if (error instanceof Error) {
        const errorMessage = `Error: Failed to generate project guide. Please check your API key and network connection. Details: ${error.message}`;
        onStream(errorMessage)
    } else {
       onStream("An unknown error occurred while generating the project guide.");
    }
  }
};

export const gradeProjectSubmission = async (
    project: Project,
    userCode: string,
    language: 'Python' | 'R' | 'SQL' | 'Scala'
): Promise<AIFeedback> => {
    const prompt = `
    You are an expert data scientist and technical reviewer for 'Learn.data', an educational platform. Your role is to act as a senior team lead providing a code review for a junior data scientist's portfolio project. Your feedback should be constructive, professional, and encouraging, focusing on both technical correctness and real-world best practices.

    **Project Details:**
    - **Title:** ${project.title}
    - **Description:** ${project.description}
    - **Difficulty:** ${project.difficulty}
    - **Key Concepts:** ${project.tags.join(', ')}
    - **Language:** ${language}

    **Student's Project Code Submission:**
    \`\`\`${language.toLowerCase()}
    ${userCode}
    \`\`\`

    **Your Task:**
    Thoroughly review the student's submission. Evaluate it against the project's goals and general data science best practices. Provide your feedback as a single JSON object with the exact structure specified below.

    **JSON Output Structure:**
    - \`score\`: An integer from 0 to 100. Base this on correctness, code quality, methodology, and fulfillment of the project's goals.
    - \`generalAssessment\`: A 3-4 sentence summary of the project. Mention whether the project successfully achieves its primary goal and give an overall impression of the work.
    - \`strengths\`: An array of strings highlighting specific positive aspects (e.g., "Good use of functions to modularize code," "Excellent choice of visualization for showing the relationship between X and Y.").
    - \`issuesAndSuggestions\`: An array of objects, each with an \`issue\` and a \`suggestion\`. Focus on high-level improvements (e.g., "The feature engineering step could be more robust," "Consider adding comments to explain your analytical choices," "The model evaluation is missing a key metric like F1-score.").
    - \`optimizedCode\`: Provide a small, specific code snippet that demonstrates ONE of your key suggestions. Do not rewrite the entire project. This should be a targeted example of improvement.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        score: { type: Type.INTEGER },
                        generalAssessment: { type: Type.STRING },
                        strengths: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING }
                        },
                        issuesAndSuggestions: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    issue: { type: Type.STRING },
                                    suggestion: { type: Type.STRING }
                                },
                                required: ['issue', 'suggestion']
                            }
                        },
                        optimizedCode: { type: Type.STRING }
                    },
                    required: ["score", "generalAssessment", "strengths", "issuesAndSuggestions", "optimizedCode"]
                }
            }
        });

        const jsonText = response.text.trim();
        const feedback: AIFeedback = JSON.parse(jsonText);
        return feedback;

    } catch (error) {
        console.error("Error generating project feedback from Gemini API:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return {
            score: 0,
            generalAssessment: "An error occurred while analyzing your project. This might be a temporary issue with the service or your connection.",
            strengths: [],
            issuesAndSuggestions: [{
                issue: "API Error",
                suggestion: `Could not get feedback from the AI model. Details: ${errorMessage}`
            }],
            optimizedCode: "// Could not generate an optimized code snippet due to an error."
        };
    }
};

export const explainTextSimply = async (textToExplain: string): Promise<string> => {
    const prompt = `
    You are 'Genie', an expert AI tutor. Your task is to explain a concept in simple, easy-to-understand terms for a learner.
    - Use a relatable, real-world analogy to clarify the main idea.
    - Keep the explanation concise (2-3 paragraphs).
    - Format your response in Markdown.

    **Concept to Explain:**
    "${textToExplain}"
    `;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating simple explanation:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return `### Error\n\nSorry, I couldn't generate an explanation for this. Please try again. \n\n**Details:** \`${errorMessage}\``;
    }
};

export const debugCode = async (userCode: string, errorMessage: string, problemDescription: string): Promise<string> => {
    const prompt = `
    You are 'Genie', an AI debugging assistant for a student on the 'Learn.data' platform. Your goal is to help the student understand their error and guide them toward a solution **without giving away the final answer**.

    **Context:**
    - **Problem the student is trying to solve:** "${problemDescription}"
    - **The student's code:**
      \`\`\`
      ${userCode}
      \`\`\`
    - **The error message they received:** "${errorMessage}"

    **Your Task:**
    Provide helpful debugging advice in Markdown format. Structure your response with the following sections:

    1.  **What the Error Means:** In simple terms, explain what this specific type of error generally means.
    2.  **Analyzing Your Code:** Point to the specific line or section of the student's code that is likely causing the error. Explain *why* that part of the code is leading to this error.
    3.  **A Helpful Hint:** Give a conceptual hint or suggest a specific function/method they should look into. Guide them on how to think about the problem differently. **Do not write the corrected code for them.**
    `;
     try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating debug help:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return `### Error\n\nSorry, I couldn't generate debugging help for this. Please try again. \n\n**Details:** \`${errorMessage}\``;
    }
};