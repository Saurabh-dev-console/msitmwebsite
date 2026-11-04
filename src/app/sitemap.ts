import type { MetadataRoute } from "next";
import { COURSES, LEVELS, courseHref } from "@/data/courses";
import { FACULTY_GROUPS } from "@/data/faculty";
import { NEWS_POSTS } from "@/data/news";
import { ABOUT_PAGES, FACILITY_PAGES, IQAC_PAGES, PLACEMENT_PAGES, NEWS_INDEX_EXTRA } from "@/data/content";

const BASE = "https://msitm.edu.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: string[] = [
    "/",
    "/about",
    "/courses",
    "/faculty",
    "/facilities",
    "/placement",
    "/college-news-events",
    "/iqac",
    "/contact",
    "/admission-process",
    "/admission-calender",
    "/admission-form",
    "/alumni",
    "/success-stories",
    "/student-corner",
    "/training-placement",
    "/privacy-policy",
    "/thank-you",
    "/search",
    "/audit",
    "/design-system",
    "/sitemap-page",
    "/msitm-independence-day-certificate",
    "/bachpan-independence-day-certificate",
    "/college-news-events/college-news",
    ...Object.keys(ABOUT_PAGES).map((s) => `/about/${s}`),
    ...Object.keys(LEVELS).map((s) => `/courses/${s}`),
    ...Object.keys(FACILITY_PAGES).map((s) => `/facilities/${s}`),
    ...Object.keys(PLACEMENT_PAGES).map((s) => `/placement/${s}`),
    ...Object.keys(NEWS_INDEX_EXTRA).map((s) => `/college-news-events/${s}`),
    ...Object.keys(IQAC_PAGES).map((s) => `/iqac/${s}`),
    ...COURSES.map(courseHref),
    ...FACULTY_GROUPS.map((g) => `/faculty/${g.slug}`),
    ...NEWS_POSTS.map((p) => `/${p.slug}`),
  ];
  return urls.map((url) => ({
    url: `${BASE}${url}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: url === "/" ? 1 : 0.7,
  }));
}
