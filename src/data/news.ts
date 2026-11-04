/** News posts migrated from the reference website. */
import type { Block } from "./content";

export interface NewsPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  blocks: Block[];
}

export const NEWS_POSTS: NewsPost[] = [
  {
    slug: "admissions-open-for-the-2025-2026-academic-session",
    title: "Admissions Open for the 2026–2027 Academic Session",
    date: "Admissions 2026–27",
    excerpt:
      "Start your journey towards a brighter future! Admissions are now open for the 2026–2027 academic session at MSITM — undergraduate, postgraduate, diploma and certificate programmes.",
    blocks: [
      {
        type: "prose",
        paragraphs: [
          "Start your journey towards a brighter future! Admissions are now open for the 2026–2027 academic session at MSITM. We invite aspiring students to apply for our wide range of undergraduate and postgraduate programs designed to empower you with knowledge, skills, and real-world experience.",
          "With expert faculty, modern infrastructure, and a student-centered approach, MSITM is the ideal place to achieve academic excellence and career success. Don't miss the opportunity — apply now and secure your seat for the upcoming session.",
        ],
      },
      {
        type: "cta",
        title: "Apply for 2026–27",
        text: "Submit the admission form and our counsellors will respond within one business day.",
        label: "Open admission form",
        href: "/admission-form",
      },
    ],
  },
  {
    slug: "celebrate-independence-day-with-creativity-and-fun-at-meena-shah-pre-school",
    title: "Celebrate Independence Day with Creativity and Fun at Meena Shah Pre School!",
    date: "15 August 2025",
    excerpt:
      "Meena Shah Pre School, powered by Bachpan, hosted essay, poster-making and painting competitions for young artists — with certificates downloadable online.",
    blocks: [
      {
        type: "prose",
        paragraphs: [
          "As the nation geared up to celebrate India's 79th Independence Day, Meena Shah Pre School, powered by Bachpan, brought an exciting opportunity for young minds to showcase their creativity and patriotism.",
        ],
      },
      { type: "heading", text: "Competitions for every young artist" },
      {
        type: "prose",
        paragraphs: ["Three engaging competitions were lined up for different classes:"],
      },
      {
        type: "list",
        style: "bullet",
        items: [
          "Essay Competition (Class 5th) — Topic: “My India”",
          "Poster Making Competition (Class 3rd & 4th) — Topic: “Unity and Diversity of India”",
          "Painting Competition (Class 1st & 2nd) — Theme: “National Flag (Tiranga)”",
        ],
      },
      { type: "heading", text: "Important details" },
      {
        type: "facts",
        items: [
          { label: "Date of competition", value: "13th August 2025" },
          { label: "Time", value: "03:00 PM" },
          { label: "Registration", value: "Free! (6th to 11th August 2025)" },
          { label: "Award distribution", value: "15th August 2025" },
          { label: "Venue", value: "Near Karbala, Circular Road, Gonda – 271002" },
        ],
      },
      { type: "heading", text: "Exciting prizes" },
      {
        type: "prose",
        paragraphs: [
          "From smart kits to remote-controlled cars, helicopters, cameras, microphones, and more — winners took home amazing rewards and unforgettable memories.",
        ],
      },
      { type: "heading", text: "Certificate download" },
      {
        type: "prose",
        paragraphs: [
          "All participants can download their Participation or Winner Certificate online. The certificate link was active from 15th August 2025, 9:00 AM.",
        ],
      },
      {
        type: "cta",
        title: "Verify or download a certificate",
        text: "Use the official certificate verification desk for this event.",
        label: "Bachpan certificate desk",
        href: "/bachpan-independence-day-certificate",
      },
    ],
  },
  {
    slug: "msitm-degree-college-mega-district-level-competition",
    title: "MSITM Degree College Mega District Level Competition",
    date: "15 August 2025",
    excerpt:
      "A mega district-level competition — online quiz, essay and painting — with tablets, Alexa devices, smart watches and trophies for winners.",
    blocks: [
      {
        type: "prose",
        paragraphs: [
          "In the spirit of patriotism and learning, MSITM Degree College hosted a Mega District Level Competition open to all. Students and young achievers tested their knowledge, expressed their creativity, and showcased their love for the nation.",
        ],
      },
      { type: "heading", text: "Competitions & topics" },
      {
        type: "list",
        style: "bullet",
        items: [
          "Online Quiz Competition (Under-Graduate) — Topic: “Know Your India”",
          "Essay Competition (Class 9th to 12th) — Topic: “India After Independence”",
          "Painting Competition (Class 6th to 8th) — Theme: “My India My Pride”",
        ],
      },
      { type: "heading", text: "Event details" },
      {
        type: "facts",
        items: [
          { label: "Date of competition", value: "13th August 2025" },
          { label: "Registration", value: "Free! (6th to 11th August 2025)" },
          { label: "Helpline", value: "+91-9918942937" },
        ],
      },
      { type: "heading", text: "Exciting prizes" },
      {
        type: "prose",
        paragraphs: [
          "Winners were awarded amazing prizes including tablets, Alexa devices, and smart watches, along with trophies for top achievers.",
        ],
      },
      { type: "heading", text: "Certificate download" },
      {
        type: "prose",
        paragraphs: [
          "All participants can download their Participation or Winner Certificate online. The certificate link was active from 15th August 2025, 9:00 AM.",
        ],
      },
      {
        type: "cta",
        title: "Verify or download a certificate",
        text: "Use the official certificate verification desk for this event.",
        label: "MSITM certificate desk",
        href: "/msitm-independence-day-certificate",
      },
    ],
  },
];

export function newsPost(slug: string): NewsPost | undefined {
  return NEWS_POSTS.find((p) => p.slug === slug);
}
