'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Sun, Moon, Github, Linkedin, Mail, FileText, ExternalLink } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import Image from 'next/image'
import { useRef } from 'react'
import { TypeAnimation } from 'react-type-animation'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const { scrollY } = useScroll()
  const ref = useRef(null)

  const backgroundY = useTransform(scrollY, [0, 500], [0, 100])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const switchTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-all duration-300 overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/background-pattern.svg')",
          backgroundSize: 'cover',
          y: backgroundY
        }}
      />
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
            <nav className="flex items-center space-x-4">
              <a href="#about" className="hover:text-primary transition-colors">About</a>
              <a href="#skills" className="hover:text-primary transition-colors">Skills</a>
              <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
              <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
              </Button>
            </nav>
          </div>
        </header>

        <main className="container mx-auto px-4 py-16">
          <section id="about" className="mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row items-center justify-between gap-12"
            >
              <div className="md:w-1/2">
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
                <div className="flex space-x-4">
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
              <div className="md:w-1/2 flex justify-center">
                <Image
                  src="/images/profile.jpg"
                  alt="Divax Shah"
                  width={300}
                  height={300}
                  className="rounded-full border-4 border-primary shadow-lg"
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
                  'Python', 'PyTorch', 'TensorFlow', 
                  'Natural Language Processing', 'Computer Vision',
                  'HuggingFace Transformers', 'OpenAI API',
                  'Google Gemini API', 'Streamlit'
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
                    { label: 'Tool', url: 'https://github.com/shahdivax/QuizWiz_Deprecated' },
                    { label: 'Website', url: 'https://quiz-wiz-official.vercel.app/' }
                  ]}
                  tags={['NLP', 'Chatbot', 'Flask']}
                />
                <ProjectCard
                  title="Something"
                  description="Something is a powerful, user-friendly web application designed to keep investors informed with the latest, most relevant news about their stock portfolio. By aggregating news from multiple trusted sources and using AI to summarize key points, Something ensures you never miss crucial information that could impact your investments."
                  links={[
                    { label: 'App', url: 'https://something-atep.onrender.com' }
                  ]}
                  tags={['Flask', 'Firebase', 'Gemini AI']}
                />
                <ProjectCard
                  title="Sanskrit Llama"
                  description="Sanskrit Llama is a project focused on fine-tuning the Llama-3 language model to translate Vedic Sanskrit texts into English. By leveraging transfer learning techniques and a curated dataset of Sanskrit-English parallel texts, this project aims to make ancient Sanskrit literature more accessible to a wider audience."
                  links={[
                    { label: 'Model', url: 'https://huggingface.co/diabolic6045/Sanskrit-llama' }
                  ]}
                  tags={['NLP', 'Translation', 'Fine-tuning']}
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
                  tags={['NLP', 'Chatbot', 'HuggingFace']}
                />
                <ProjectCard 
                  title="Itinerary Generator"
                  description="Developed an advanced itinerary builder by fine-tuning GPT-2 on worldwide trip plans, using PyTorch and Hugging Face's Transformers for on-demand travel itinerary generation."
                  links={[
                    { label: 'Model', url: 'https://huggingface.co/diabolic6045/itineraries_Generator' }
                  ]}
                  tags={['NLP', 'GPT-2', 'Fine-tuning']}
                />
                <ProjectCard 
                  title="Synthetic Data Generation"
                  description="Created a generative AI system for synthetic structured data generation, implementing a pipeline with Python and Gradio for data cleaning, deduplication, and embedding."
                  links={[
                    { label: 'Paper', url: '/documents/divax-recco.pdf' }
                  ]}
                  tags={['Generative AI', 'Data Synthesis', 'PyTorch']}
                />
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
                  title="Jr. Python Developer"
                  company="Thinkbiz Technology Private Limited"
                  period="May 2024 - Present"
                  description="Developing an advanced pipeline for Jugaad, leveraging OCR and LLM technologies to extract and process text from various types of invoices. Conducting extensive research and evaluation of open-source OCR and LLM tools."
                />
                <ExperienceCard 
                  title="AI and Synthetic Data Developer Intern"
                  company="DMI Finance Private Limited"
                  period="January 2024 - April 2024"
                  description="Developed a generative AI system for synthetic structured data generation. Created a pipeline with Python and Gradio for data cleaning, deduplication, and embedding. Designed a robust training framework using PyTorch and Hugging Face's Transformers."
                />
              </div>
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
          <p>&copy; 2024 Divax Shah. All rights reserved.</p>
        </footer>
      </div>
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
