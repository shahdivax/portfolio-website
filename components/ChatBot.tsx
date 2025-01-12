'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { GoogleGenerativeAI } from '@google/generative-ai'
import { Send, Loader2, MessageCircle, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Components } from 'react-markdown'

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!)

const resumeData = `
Divax Shah - AI Developer & Python Developer

Contact Information:
- Phone: +91-8866572525
- Email: divax12345@gmail.com
- LinkedIn: https://www.linkedin.com/in/divax-shah/
- GitHub: https://github.com/shahdivax
- HuggingFace: https://huggingface.co/diabolic6045
- Portfolio: https://divax-shah-portfolio.vercel.app/

Current Position:
Jr. Python Developer at Thinkbiz Technology Private Limited (May 2024 - Present)
- Developing RAG chatbot system using LangChain Agents and OpenAI
- Built OCR-LLM pipeline improving invoice extraction accuracy from 15% to 85%
- Enhanced receipt processing accuracy from 10% to 90%

Previous Experience:
AI and Synthetic Data Developer Intern at DMI Finance Private Limited (January 2024 - April 2024)
- Developed generative AI system for synthetic structured data generation
- Created pipeline using Python and Gradio for data cleaning and embedding
- Designed training framework using PyTorch and Hugging Face Transformers
- Implemented user-friendly Gradio interface for data synthesis

Key Projects:
1. QuizWiz (https://huggingface.co/spaces/diabolic6045/QuizWiz)
   - AI-powered chatbot creation platform
   - Document processing with PDFs and TXT files using llamaindex
   - Multi-language support and analytics
   - Tech: Flask, llamaindex, PostgreSQL, Cloudinary

2. Sanskrit-llama (https://huggingface.co/diabolic6045/Sanskrit-llama)
   - Fine-tuned Meta's LLaMA-3-8B model for Sanskrit language
   - Used QLoRA for efficient training
   - Implemented gradient checkpointing, 4-bit quantization
   - Deployed on Hugging Face Hub with interactive demo

3. Geolocation through Image Classification (https://huggingface.co/diabolic6045/indian_cities_image_classification)
   - Trained on 10,500 images of 5 Indian cities
   - Used VGG16 CNN model with transfer learning
   - Deployed using Flask

Technical Skills:
- Programming Languages: Python, Java, C++
- Frameworks/Libraries: TensorFlow, Keras, PyTorch, scikit-learn, Transformers, NumPy, Pandas, OpenCV, Flask, Streamlit, Tkinter
- AI Services: OpenAI, Google Gemini AI, Mistral AI

Education:
- B.Tech in Computer Science and Engineering
  Parul Institute of Engineering and Technology (2024)
  CGPA: 8.2
- GHSEB, Gujarat
  Gyanmanjari Secondary and Higher Secondary School, Bhavnagar (2020)
  Percentage: 64%
`

interface Message {
  role: 'user' | 'model'
  parts: { text: string }[]
}

interface CodeProps extends React.HTMLProps<HTMLElement> {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatRef = useRef<any>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const systemPrompt = `You are Divax Shah's personal AI assistant for his portfolio website. You have access to his complete professional information and should provide accurate, detailed responses about his work, projects, and skills.
**ONLY ANSWER QUESTIONS RELATED TO DIVAX'S PROFESSIONAL WORK AND SKILLS**
${resumeData}

Important Guidelines:
1. ALWAYS provide relevant links when discussing projects (they're in the resume data)
2. When mentioning technical details, be specific and accurate
3. For project inquiries, include both the project description and its link
4. If asked about skills, provide specific examples from his work experience
5. Include relevant metrics and improvements when discussing his work experience
6. ONLY answer questions related to Divax's professional work and skills
7. For unrelated questions, politely redirect to Divax's professional achievements
8. If information isn't in the resume data, say "I don't have that specific information about Divax"

Response Format:
- Include relevant links when discussing projects
- Use bullet points for listing multiple items
- Highlight key metrics and achievements
- Maintain a professional but approachable tone

Example response for project inquiry:
"QuizWiz (https://huggingface.co/spaces/diabolic6045/QuizWiz) is one of Divax's notable projects. It's an AI-powered chatbot creation platform that allows users to create custom chatbots with unique knowledge bases. The project features:
• Document processing capabilities for PDFs and TXT files
• Multi-language support
• Analytics integration
• Tech stack: Flask, llamaindex, PostgreSQL, Cloudinary"

Please maintain this level of detail and accuracy in all responses.`

  useEffect(() => {
    // Initialize chat with system prompt
    const initChat = async () => {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" })
      chatRef.current = model.startChat({
        history: [],
        generationConfig: {
          maxOutputTokens: 500,
        },
      })
      
      // Send system prompt
      try {
        await chatRef.current.sendMessage(systemPrompt)
      } catch (error) {
        console.error('Error initializing chat:', error)
      }
    }

    initChat()
  }, [])

  useEffect(() => {
    // Debug check for API key
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      console.error('Gemini API key is not set')
    }
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim() || isLoading || !chatRef.current) return

    const userMessage: Message = {
      role: 'user',
      parts: [{ text: input }]
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const result = await chatRef.current.sendMessage(input)
      const response = await result.response
      const text = response.text()

      const assistantMessage: Message = {
        role: 'model',
        parts: [{ text }]
      }
      
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, { 
        role: 'model',
        parts: [{ text: 'Sorry, I encountered an error. Please try again.' }]
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const markdownComponents: Components = {
    p: ({children}) => <p className="mb-2 last:mb-0">{children}</p>,
    a: ({href, children}) => (
      <a href={href} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
    ul: ({children}) => <ul className="list-disc pl-4 mb-2">{children}</ul>,
    ol: ({children}) => <ol className="list-decimal pl-4 mb-2">{children}</ol>,
    li: ({children}) => <li className="mb-1">{children}</li>,
    code: ({inline, className, children}: CodeProps) => (
      inline ? 
        <code className="bg-gray-200 dark:bg-gray-700 rounded px-1 py-0.5">
          {children}
        </code>
        : 
        <code className="block bg-gray-200 dark:bg-gray-700 rounded p-2 my-2 overflow-x-auto">
          {children}
        </code>
    ),
    pre: ({children}) => <pre className="bg-transparent p-0">{children}</pre>,
  }

  // Add suggested questions
  const suggestedQuestions = [
    "Tell me about his experience at Thinkbiz",
    "What did he work on at DMI Finance?",
    "Tell me about his Sanskrit-llama project",
    "What AI frameworks and libraries does he use?", 
    "What is QuizWiz and how does it work?",
  ]

  return (
    <>
      {/* Chat Toggle Button - Slower animations */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Breathing effect ring - Slower ping */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full animate-ping-slow opacity-60 bg-primary/40" />
        )}
        {/* Pulse effect rings - Slower pulses */}
        {!isOpen && (
          <>
            <div className="absolute inset-0 rounded-full animate-pulse-ring-slow-1 opacity-30 bg-primary/25" />
            <div className="absolute inset-0 rounded-full animate-pulse-ring-slow-2 opacity-25 bg-primary/20" />
          </>
        )}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="relative rounded-full w-12 h-12 shadow-lg flex items-center justify-center
            hover:scale-105 transition-transform duration-300"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.div>
          )}
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed z-50 
              bottom-20 right-4 
              w-[calc(100%-2rem)] max-w-[350px]
              h-[500px]
              lg:bottom-24 lg:right-8
              lg:w-[380px] lg:h-[600px]
              bg-white dark:bg-gray-800 
              rounded-xl shadow-2xl 
              flex flex-col
              border border-gray-200 dark:border-gray-700"
          >
            {/* Header */}
            <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800 rounded-t-xl">
              <h3 className="text-base font-medium">Chat with AI Assistant</h3>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
              {messages.length === 0 ? (
                // Welcome message and suggestions
                <div className="space-y-4">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                    <p className="text-sm mb-3">
                      👋 Hi! I'm Divax's AI assistant. I can help you learn about his:
                    </p>
                    <ul className="text-sm space-y-1 list-disc pl-4">
                      <li>AI and ML projects</li>
                      <li>Technical skills and expertise</li>
                      <li>Work experience and achievements</li>
                      <li>Education and background</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Suggested questions:</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedQuestions.map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => {
                            setInput(question)
                            // Optional: Automatically send the question
                            // handleSubmit(new Event('submit') as any)
                          }}
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                // Regular chat messages
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg p-3 ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground ml-4'
                          : 'bg-gray-100 dark:bg-gray-700 mr-4'
                      }`}
                    >
                      {message.role === 'user' ? (
                        message.parts[0].text
                      ) : (
                        <ReactMarkdown 
                          remarkPlugins={[remarkGfm]}
                          className="prose dark:prose-invert prose-sm max-w-none
                            text-sm
                            prose-a:text-blue-500 dark:prose-a:text-blue-400
                            prose-p:leading-relaxed
                            prose-code:text-sm prose-code:bg-gray-200 dark:prose-code:bg-gray-600
                            prose-code:rounded prose-code:px-1 prose-code:py-0.5"
                          components={markdownComponents}
                        >
                          {message.parts[0].text}
                        </ReactMarkdown>
                      )}
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-b-xl">
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 rounded-full border dark:border-gray-600 
                    bg-white dark:bg-gray-700 
                    px-4 py-2 text-sm
                    focus:outline-none focus:ring-2 focus:ring-primary/50"
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="rounded-full w-10 h-10 p-0 flex items-center justify-center"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 