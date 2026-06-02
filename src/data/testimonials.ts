export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "RemotelyAvailable automated our entire lead qualification process. What used to take 3 team members now runs on autopilot. We booked 40% more demos in the first month.",
    name: "Sarah Chen",
    title: "Head of Operations",
    company: "ScaleUp SaaS",
  },
  {
    quote:
      "The AI voice agent they built handles 200+ calls a day without missing a beat. Our customers can't tell it's not a real person. It's been a game-changer for our support team.",
    name: "Marcus Rivera",
    title: "CEO",
    company: "HomeFlow Services",
  },
  {
    quote:
      "We went from publishing one blog post a month to five per week — all on-brand, all reviewed by our team. The content pipeline they built is the best investment we've made this year.",
    name: "Priya Patel",
    title: "Marketing Director",
    company: "Apex Digital",
  },
];
