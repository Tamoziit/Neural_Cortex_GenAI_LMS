import type { StudyGroup } from "../types";

export const mockGroups: StudyGroup[] = [
    {
        id: 1,
        name: "Azure AI Fundamentals Cohort 2026",
        domain: "Microsoft Azure AI & Generative AI",
        members: 38,
        progress: 55,
        joinCode: "AZURE-2026-XQWK",
        modules: [
            {
                id: "m1",
                title: "Introduction to AI & Cloud Basics",
                chapters: [
                    { id: "c1", title: "What is Artificial Intelligence?", duration: "45 mins", level: "Beginner", assignedTo: ["Alice", "Bob", "Charlie"] },
                    { id: "c2", title: "Overview of Machine Learning", duration: "50 mins", level: "Beginner", assignedTo: ["Alice", "Dave"] },
                    { id: "c3", title: "Deep Learning vs Traditional ML", duration: "60 mins", level: "Intermediate", assignedTo: ["Bob", "Eve"] },
                    { id: "c4", title: "Introduction to Azure Cloud Services", duration: "40 mins", level: "Beginner", assignedTo: ["Charlie", "Frank"] },
                    { id: "c5", title: "Creating an Azure Account & Portal Navigation", duration: "30 mins", level: "Beginner", assignedTo: ["Dave", "Alice"] },
                    { id: "c6", title: "Cost Management & Billing in Azure", duration: "35 mins", level: "Intermediate", assignedTo: ["Eve", "Frank"] }
                ]
            },
            {
                id: "m2",
                title: "Azure Cognitive Services Fundamentals",
                chapters: [
                    { id: "c7", title: "Overview of Azure Cognitive Services", duration: "45 mins", level: "Beginner", assignedTo: ["Alice", "Charlie"] },
                    { id: "c8", title: "Computer Vision API Basics", duration: "55 mins", level: "Intermediate", assignedTo: ["Bob", "Dave"] },
                    { id: "c9", title: "Text Analysis & Natural Language Processing", duration: "60 mins", level: "Intermediate", assignedTo: ["Eve", "Alice"] },
                    { id: "c10", title: "Speech Services & Translation", duration: "50 mins", level: "Beginner", assignedTo: ["Frank", "Bob"] },
                    { id: "c11", title: "Anomaly Detection Services", duration: "45 mins", level: "Advanced", assignedTo: ["Charlie", "Eve"] },
                    { id: "c12", title: "Building a Simple Bot Framework", duration: "65 mins", level: "Advanced", assignedTo: ["Dave", "Frank"] }
                ]
            },
            {
                id: "m3",
                title: "Azure Machine Learning Studio",
                chapters: [
                    { id: "c13", title: "Introduction to Azure ML Workspace", duration: "50 mins", level: "Beginner", assignedTo: ["Alice", "Bob"] },
                    { id: "c14", title: "Data Preparation & Datasets", duration: "60 mins", level: "Intermediate", assignedTo: ["Charlie", "Dave"] },
                    { id: "c15", title: "Automated Machine Learning (AutoML)", duration: "65 mins", level: "Intermediate", assignedTo: ["Eve", "Frank"] },
                    { id: "c16", title: "Building Regression Models", duration: "55 mins", level: "Intermediate", assignedTo: ["Alice", "Charlie"] },
                    { id: "c17", title: "Model Evaluation Metrics", duration: "45 mins", level: "Advanced", assignedTo: ["Bob", "Dave"] },
                    { id: "c18", title: "Deploying Models as Web Services", duration: "70 mins", level: "Advanced", assignedTo: ["Eve", "Frank"] }
                ]
            },
            {
                id: "m4",
                title: "Generative AI Concepts",
                chapters: [
                    { id: "c19", title: "What are Large Language Models?", duration: "45 mins", level: "Beginner", assignedTo: ["Alice", "Dave"] },
                    { id: "c20", title: "Prompt Engineering Essentials", duration: "55 mins", level: "Beginner", assignedTo: ["Bob", "Eve"] },
                    { id: "c21", title: "Introduction to OpenAI & Azure OpenAI", duration: "60 mins", level: "Intermediate", assignedTo: ["Charlie", "Frank"] },
                    { id: "c22", title: "Fine-Tuning Principles", duration: "65 mins", level: "Advanced", assignedTo: ["Alice", "Charlie"] },
                    { id: "c23", title: "Ethical Considerations & AI Safety", duration: "40 mins", level: "Beginner", assignedTo: ["Bob", "Dave"] },
                    { id: "c24", title: "Generative AI Code Examples with Python", duration: "75 mins", level: "Advanced", assignedTo: ["Eve", "Frank"] }
                ]
            },
            {
                id: "m5",
                title: "Advanced Azure OpenAI Implementations",
                chapters: [
                    { id: "c25", title: "Building Retrieval-Augmented Generation (RAG) Systems", duration: "80 mins", level: "Advanced", assignedTo: ["Alice", "Bob"] },
                    { id: "c26", title: "Integrating Cognitive Search with LLCs", duration: "75 mins", level: "Advanced", assignedTo: ["Charlie", "Dave"] },
                    { id: "c27", title: "Multi-modal AI Operations", duration: "60 mins", level: "Intermediate", assignedTo: ["Eve", "Frank"] },
                    { id: "c28", title: "Managing Large-Scale Token Workloads", duration: "55 mins", level: "Intermediate", assignedTo: ["Alice", "Charlie"] },
                    { id: "c29", title: "Securing Generative AI Applications", duration: "65 mins", level: "Advanced", assignedTo: ["Bob", "Dave"] },
                    { id: "c30", title: "Monitoring & Analytics for AI Apps", duration: "50 mins", level: "Intermediate", assignedTo: ["Eve", "Frank"] }
                ]
            }
        ]
    },
    {
        id: 2,
        name: "GenAI Builders Lab",
        domain: "LLMs, Prompt Engineering & AI Applications",
        members: 22,
        progress: 30,
        joinCode: "GENAI-LAB-9F2B",
        modules: [
            {
                id: "m6",
                title: "Prompt Engineering Foundations",
                chapters: [
                    { id: "c31", title: "Anatomy of a Prompt", duration: "40 mins", level: "Beginner", assignedTo: ["Grace", "Heidi"] },
                    { id: "c32", title: "Zero-Shot vs Few-Shot Prompting", duration: "45 mins", level: "Intermediate", assignedTo: ["Ivan", "Judy"] },
                    { id: "c33", title: "Chain of Thought Prompting", duration: "50 mins", level: "Intermediate", assignedTo: ["Grace", "Ivan"] },
                    { id: "c34", title: "Reducing Hallucinations", duration: "45 mins", level: "Advanced", assignedTo: ["Heidi", "Judy"] },
                    { id: "c35", title: "System Prompts & Temperature Settings", duration: "35 mins", level: "Beginner", assignedTo: ["Grace", "Heidi"] },
                    { id: "c36", title: "Best Practices & Common Pitfalls", duration: "40 mins", level: "Intermediate", assignedTo: ["Ivan", "Judy"] }
                ]
            },
            {
                id: "m7",
                title: "LangChain Basics",
                chapters: [
                    { id: "c37", title: "Introduction to LangChain", duration: "50 mins", level: "Beginner", assignedTo: ["Grace", "Heidi"] },
                    { id: "c38", title: "Connecting LLMs to Prompts", duration: "45 mins", level: "Intermediate", assignedTo: ["Ivan", "Judy"] },
                    { id: "c39", title: "Output Parsers", duration: "40 mins", level: "Intermediate", assignedTo: ["Grace"] },
                    { id: "c40", title: "Memory in LangChain", duration: "55 mins", level: "Intermediate", assignedTo: ["Heidi", "Ivan"] },
                    { id: "c41", title: "Chains Overview", duration: "45 mins", level: "Advanced", assignedTo: ["Judy"] },
                    { id: "c42", title: "Building a Simple Conversational Agent", duration: "60 mins", level: "Advanced", assignedTo: ["Grace", "Judy"] }
                ]
            },
            {
                id: "m8",
                title: "Data Connections & Embeddings",
                chapters: [
                    { id: "c43", title: "Vector Databases Overview", duration: "55 mins", level: "Beginner", assignedTo: ["Ivan", "Judy"] },
                    { id: "c44", title: "Document Loaders", duration: "45 mins", level: "Intermediate", assignedTo: ["Grace"] },
                    { id: "c45", title: "Text Splitting Strategies", duration: "50 mins", level: "Intermediate", assignedTo: ["Heidi"] },
                    { id: "c46", title: "Generating Embeddings", duration: "65 mins", level: "Advanced", assignedTo: ["Ivan", "Judy"] },
                    { id: "c47", title: "Vector Stores (Pinecone, Chroma)", duration: "60 mins", level: "Advanced", assignedTo: ["Grace", "Heidi"] },
                    { id: "c48", title: "Creating a Semantic Search Engine", duration: "75 mins", level: "Advanced", assignedTo: ["Ivan", "Grace"] },
                    { id: "c49", title: "Retrieval Strategies", duration: "50 mins", level: "Intermediate", assignedTo: ["Judy", "Heidi"] }
                ]
            },
            {
                id: "m9",
                title: "Agents and Tools",
                chapters: [
                    { id: "c50", title: "Introduction to Agents", duration: "45 mins", level: "Intermediate", assignedTo: ["Grace"] },
                    { id: "c51", title: "Defining Custom Tools", duration: "55 mins", level: "Advanced", assignedTo: ["Heidi"] },
                    { id: "c52", title: "ReAct Agents", duration: "60 mins", level: "Advanced", assignedTo: ["Ivan"] },
                    { id: "c53", title: "Giving Agents Memory", duration: "50 mins", level: "Intermediate", assignedTo: ["Judy"] },
                    { id: "c54", title: "Connecting Agents to External APIs", duration: "65 mins", level: "Advanced", assignedTo: ["Grace", "Ivan"] },
                    { id: "c55", title: "Evaluating Agent Performance", duration: "40 mins", level: "Advanced", assignedTo: ["Heidi", "Judy"] }
                ]
            },
            {
                id: "m10",
                title: "Production Deployments",
                chapters: [
                    { id: "c56", title: "Hosting LLM Applications with Vercel/Next.js", duration: "60 mins", level: "Intermediate", assignedTo: ["Grace", "Ivan"] },
                    { id: "c57", title: "API Rate-Limiting & Caching (Redis)", duration: "55 mins", level: "Advanced", assignedTo: ["Heidi", "Judy"] },
                    { id: "c58", title: "Using LangServe", duration: "50 mins", level: "Intermediate", assignedTo: ["Grace", "Judy"] },
                    { id: "c59", title: "Monitoring Hallucinations in Prod", duration: "65 mins", level: "Advanced", assignedTo: ["Ivan", "Heidi"] },
                    { id: "c60", title: "Continuous Evaluation Frameworks", duration: "60 mins", level: "Advanced", assignedTo: ["Grace", "Ivan"] },
                    { id: "c61", title: "Fine-tuning specific use-cases", duration: "75 mins", level: "Advanced", assignedTo: ["Judy", "Heidi"] }
                ]
            }
        ]
    }
];