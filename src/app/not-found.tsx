import Link from "next/link";
import { SearchBox } from "@/components/widgets";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-16 md:py-24 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="font-display mt-3 text-4xl md:text-5xl font-semibold text-navy-900">Page not found</h1>
      <div className="rule-gold mt-5 mx-auto" aria-hidden="true" />
      <p className="mt-5 text-muted leading-relaxed">
        The page you are looking for has moved or never existed. Try searching, or start from one of these
        destinations.
      </p>
      <div className="mt-6 text-left">
        <SearchBox />
      </div>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-navy">
          Home
        </Link>
        <Link href="/courses" className="btn btn-outline-dark">
          Courses
        </Link>
        <Link href="/contact" className="btn btn-outline-dark">
          Contact
        </Link>
        <Link href="/sitemap-page" className="btn btn-outline-dark">
          Sitemap
        </Link>
      </div>
    </div>
  );
}
