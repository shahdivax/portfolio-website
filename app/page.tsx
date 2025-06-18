'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Sun, Moon, Github, Linkedin, Mail, FileText, ExternalLink } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import Image from 'next/image'
import { useRef } from 'react'
import { TypeAnimation } from 'react-type-animation'
import { ChatBot } from '@/components/ChatBot'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const { scrollY } = useScroll()
  const ref = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  const backgroundY = useTransform(scrollY, [0, 500], [0, 100])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const switchTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-all duration-300">
      <div className="relative z-10">
        <header className="sticky top-0 z-20 backdrop-blur-md bg-white/75 dark:bg-gray-900/75 shadow-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <motion.h1 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold"
            >
              Divax Shah
            </motion.h1>
            <div className="md:hidden">
              {/* Hamburger menu button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                <svg
                  className="h-6 w-6 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {isOpen ? (
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M19.293 4.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L21.586 10l-3.293-3.293a1 1 0 010-1.414z"
                    />
                  ) : (
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
                    />
                  )}
                </svg>
              </Button>
            </div>
            <nav className="hidden md:flex items-center justify-center space-x-8">
              <div className="flex space-x-4">
                <a href="#about" className="text-lg font-medium hover:text-primary transition-colors">About</a>
                <a href="#experience" className="text-lg font-medium hover:text-primary transition-colors">Experience</a>
                <a href="#projects" className="text-lg font-medium hover:text-primary transition-colors">Projects</a>
                <a href="#skills" className="text-lg font-medium hover:text-primary transition-colors">Skills</a>
                <a href="#contact" className="text-lg font-medium hover:text-primary transition-colors">Contact</a>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={switchTheme}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
              </Button>
            </nav>
          </div>
          {/* Mobile menu */}
          {isOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a href="#about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700">About</a>
                <a href="#experience" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700">Experience</a>
                <a href="#projects" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700">Projects</a>
                <a href="#skills" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700">Skills</a>
                <a href="#contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700">Contact</a>
              </div>
            </div>
          )}
        </header>

        <main className="container mx-auto px-4 py-16">
          <section id="about" className="mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row items-center justify-between gap-12"
            >
              <div className="md:w-1/2 order-2 md:order-1">
                <h2 className="text-4xl font-bold mb-4">
                  <TypeAnimation
                    sequence={[
                      'AI Developer',
                      1000,
                      'AI Researcher',
                      1000,
                      'AI Engineer',
                      1000,
                      'AI Enthusiast',
                      1000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                  />
                </h2>
                <p className="text-xl mb-6">Passionate about pushing the boundaries of AI and creating innovative solutions that shape the future of technology.</p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="outline" asChild>
                    <a href="https://github.com/shahdivax" target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" /> GitHub
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="https://www.linkedin.com/in/divax-shah/" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="mailto:divax12345@gmail.com">
                      <Mail className="mr-2 h-4 w-4" /> Contact
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="https://huggingface.co/diabolic6045" target="_blank" rel="noopener noreferrer">
                      <Image src="/images/huggingface-logo.png" alt="HuggingFace" width={16} height={16} className="mr-2" /> HuggingFace
                    </a>
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center order-1 md:order-2 mb-8 md:mb-0">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Image
                    src="/images/profile.jpg"
                    alt="Divax Shah"
                    width={300}
                    height={300}
                    className="rounded-full border-4 border-primary shadow-lg"
                  />
                </motion.div>
              </div>
            </motion.div>
          </section>
          
          <section id="experience" className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h3 className="text-3xl font-bold mb-8">Professional Experience</h3>
              <div className="space-y-8">
                <ExperienceCard 
                  title="AI/ML Engineer"
                  company="Avinyaa Edtech Private Limited"
                  period="March 2025 - Present"
                  description="Currently developing innovative AI models for kreativespace.com, an advanced AI Writing Tools Suite. My primary focus is on creating and enhancing their core offerings, specifically by creating and refining the grammar checker and developing an advanced AI text detection system. This involves fine-tuning Transformer Models, including Masked Language Models (MLM) and Large Language Models (LLMs), to ensure high accuracy and optimal output for these critical features."
                />
                <ExperienceCard 
                  title="Jr. Python Developer"
                  company="Thinkbiz Technology Private Limited"
                  period="May 2024 - March 2025"
                  description="Developed an advanced pipeline for Jugaad, Thinkbiz's own product, leveraging OCR (Optical Character Recognition) and LLM (Large Language Model) technologies to extract and process text from various types of invoices. This involved thorough research and evaluation of open-source tools, including OCR systems and language models. Conducted extensive exploration and testing of open-source OCR and LLM tools to determine their efficacy in handling diverse invoice formats and languages. Built and curated specialized datasets to enhance the accuracy and reliability of the text extraction process, ensuring the system's robustness and scalability for real-world applications."
                />
                <ExperienceCard 
                title="AI and Synthetic Data Developer Intern"
                company="DMI Finance Private Limited"
                period="January 2024 - April 2024"
                description="Developed a generative AI system for synthetic structured data generation, from concept to deployment. This involved creating a pipeline with Python and Gradio for data cleaning, deduplication, and embedding, enhancing data quality for generative models. Additionally, I designed a robust training framework using PyTorch and Hugging Face's Transformers, enabling fine-tuning Large Language Models (LLMs) with diverse datasets, significantly improving model accuracy and performance. Introduced a user-friendly Gradio interface to streamline synthetic structured data generation, facilitating easy data synthesis for users and enhancing customer interaction with the system. This interface significantly simplified the synthetic structured data generation process for users."
              />
              </div>
            </motion.div>
          </section>

          <section id="projects" className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.2 }}
            >
              <h3 className="text-3xl font-bold mb-8">Featured Projects</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <ProjectCard
                  title="QuizWiz"
                  description="QuizWiz is an advanced, AI-powered chatbot creation platform that enables users to build, deploy, and interact with custom chatbots. It offers a user-friendly interface for creating intelligent conversational agents tailored to specific domains or purposes, leveraging cutting-edge natural language processing technologies."
                  links={[
                    { label: 'Website', url: 'https://quiz-wiz-official.vercel.app/' },
                    // { label: 'App', url: 'https://diabolic6045-quizwiz.hf.space/' }
                  ]}
                  tags={['NLP', 'Chatbot', 'Flask', 'Mistral-AI-API', 'Gemini-API']}
                />
                <ProjectCard
                  title="Sanskrit qwen 7B Translate"
                  description="Sanskrit qwen is a project focused on fine-tuning the Qwen2.5-7B-Instruct-1M  language model to translate Vedic Sanskrit texts into English. By leveraging Qlora technique and a curated dataset of Sanskrit-English parallel texts, this project aims to make ancient Sanskrit literature more accessible to a wider audience."
                  links={[
                    { label: 'Model', url: 'https://huggingface.co/diabolic6045/Sanskrit-qwen-7B-Translate' }
                  ]}
                  tags={['LLM', 'Translation', 'Fine-tuning', 'Sanskrit', 'Qwen-2.5-7B-Instruct-1M']}
                />
                <ProjectCard 
                  title="Geolocation through Image Classification"
                  description="Developed a deep learning model to identify Indian cities from images, achieving 66.3% accuracy. Implemented transfer learning using VGG16 CNN for feature extraction."
                  links={[
                    { label: 'Model', url: 'https://huggingface.co/diabolic6045/indian_cities_image_classification' }
                  ]}
                  tags={['Computer Vision', 'Deep Learning', 'Transfer Learning']}
                />
                <ProjectCard 
                  title="Character Chatbot"
                  description="Built an NLP chatbot using Python, TensorFlow, and HuggingFace Transformers for interactive conversations with fictional characters like Tony Stark and Harry Potter."
                  links={[
                    { label: 'Model', url: 'https://huggingface.co/diabolic6045/tony_stark_chatbot' }
                  ]}
                  tags={['LLM', 'Chatbot', 'Fine-tuning', 'DialoGPT-medium']}
                />
                <ProjectCard 
                  title="Itinerary Generator"
                  description="Developed an advanced itinerary builder by fine-tuning GPT-2 on worldwide trip plans, using PyTorch and Hugging Face's Transformers for on-demand travel itinerary generation."
                  links={[
                    { label: 'Model', url: 'https://huggingface.co/diabolic6045/itineraries_Generator' }
                  ]}
                  tags={['LLM', 'GPT-2', 'Fine-tuning']}
                />
                <ProjectCard 
                  title="Synthetic Data Generation"
                  description="Created a generative AI system for synthetic structured data generation, implementing a pipeline with Python and Gradio for data cleaning, deduplication, and embedding."
                  links={[
                    { label: 'Paper', url: '/documents/divax-recco.pdf' }
                  ]}
                  tags={['Generative AI', 'Data Synthesis', 'PyTorch', 'Fine-tuning' , 'Llama-2']}
                />
                <ProjectCard
                  title="Something"
                  description="Something is a powerful, user-friendly web application designed to keep investors informed with the latest, most relevant news about their stock portfolio. By aggregating news from multiple trusted sources and using AI to summarize key points, Something ensures you never miss crucial information that could impact your investments."
                  links={[
                    { label: 'App', url: 'https://something-atep.onrender.com' }
                  ]}
                  tags={['Flask', 'Firebase', 'Gemini AI']}
                />
              </div>
            </motion.div>
          </section>
          
          <section id="skills" className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-3xl font-bold mb-8">Skills & Expertise</h3>
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                initial="hidden"
                animate="show"
              >
                {[
                  'PyTorch', 'TensorFlow / Keras', 'HuggingFace Transformers',
                  'scikit-learn', 'LangChain', 'NumPy & Pandas',

                  // AI Specializations & Techniques
                  'Natural Language Processing (NLP)', 'Computer Vision (CV)',
                  'LLM Fine-tuning', 'Generative AI',
                  'Prompt Engineering', 'Reinforcement Learning (RL)',

                  // LLM Ecosystem & Tools
                  'Axolotl', 'Unsloth',
                  'OpenAI API', 'Google Gemini API', 'Anthropic API', 'Mistral AI API',
                ].map((skill) => (
                  <motion.div
                    key={skill}
                    className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-shadow"
                    variants={{
                      hidden: { y: 20, opacity: 0 },
                      show: { y: 0, opacity: 1 }
                    }}
                  >
                    {skill}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </section>

          <section id="contact" className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <h3 className="text-3xl font-bold mb-4">Let's Connect!</h3>
              <p className="mb-6">Interested in innovative AI solutions or cutting-edge research? Let's discuss how we can create impact together.</p>
              <Button asChild>
                <a href="/documents/Resume.pdf" download>
                  <FileText className="mr-2 h-4 w-4" /> Download Resume
                </a>
              </Button>
            </motion.div>
          </section>
        </main>

        <footer className="mt-20 py-8 text-center text-sm bg-gray-100 dark:bg-gray-800">
          <p>&copy; 2025 Divax Shah. All rights reserved.</p>
        </footer>
      </div>
      <ChatBot />
    </div>
  )
}

function ProjectCard({ title, description, links, tags }: {
  title: string
  description: string
  links: { label: string, url: string }[]
  tags: string[]
}) {
  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300"
    >
      <h4 className="text-xl font-bold mb-2">{title}</h4>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span key={tag} className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">
            {tag}
          </span>
        ))}
      </div>
      <div className="space-x-4">
        {links.map(({ label, url }) => (
          <Button key={url} variant="outline" asChild>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {label} <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        ))}
      </div>
    </motion.div>
  )
}

function ExperienceCard({ title, company, period, description }: {
  title: string
  company: string
  period: string
  description: string
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h4 className="text-xl font-bold mb-2">{title}</h4>
      <p className="text-primary mb-2">{company}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{period}</p>
      <p>{description}</p>
    </div>
  )
}
