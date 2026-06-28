import Link from "next/link";

export function Wordmark({ size = 19 }: { size?: number }) {
  const markSize = Math.round(size * 1.5);

  return (
    <Link href="/" className="inline-flex items-center gap-2 no-underline">
      <svg
        width={markSize}
        height={markSize}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-none"
      >
        <path
          d="M62.84 36.25 A28 28 0 0 1 62.84 83.75"
          stroke="#e38c35"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          d="M69.73 25.23 A41 41 0 0 1 69.73 94.77"
          stroke="#e38c35"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          d="M76.62 14.21 A54 54 0 0 1 76.62 105.79"
          stroke="#6e77cb"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <circle cx="48" cy="60" r="12" fill="#e38c35" />
      </svg>
      <span
        style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontWeight: 700,
          fontSize: size,
          color: "var(--ra-cream)",
          letterSpacing: "-0.01em",
        }}
      >
        Remotely Available
      </span>
    </Link>
  );
}
