export interface FAQ {
  question: string;
  answer: string;
}

export const homeFaqs: FAQ[] = [
  {
    question: "What kind of businesses do you work with?",
    answer:
      "We work with businesses of all sizes, from startups looking to automate from day one, to established companies with 50-500 employees drowning in manual processes. If your team spends hours on repetitive tasks, we can help.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "It depends on the scope. A single automation workflow can be live in 1-2 weeks. A full AI voice agent or chatbot typically takes 3-4 weeks. A complete AI website with integrations is usually 4-6 weeks. We always prioritize getting your highest-impact deliverable live first.",
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer:
      "Absolutely. We offer maintenance plans that include monitoring, updates, and optimization. AI systems get smarter over time, ongoing support ensures you're always getting the best results.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Every project is scoped individually based on complexity and integrations needed. Book a free strategy call and we'll give you a transparent quote within 48 hours. No surprise fees, no hourly billing games.",
  },
  {
    question: "What if I'm not sure which service I need?",
    answer:
      "That's exactly what our free strategy call is for. We'll listen to your challenges, assess your current processes, and recommend the highest-ROI starting point. No pressure, no hard sell.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Security is a core principle. We follow industry best practices: encrypted data in transit and at rest, no API keys exposed client-side, role-based access controls, and we sign NDAs on every project. Your data stays yours.",
  },
];
