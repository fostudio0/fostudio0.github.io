type LogoMarkProps = {
  className?: string;
  title?: string;
  decorative?: boolean;
};

export function LogoMark({
  className,
  title = "FO Studio",
  decorative = false,
}: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 240 96"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={decorative ? "presentation" : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : title}
    >
      {!decorative ? <title>{title}</title> : null}
      <rect x="1" y="1" width="238" height="94" fill="#ffffff" stroke="#151515" strokeWidth="2" />
      <rect x="1" y="1" width="119" height="94" fill="#151515" />
      <rect x="120" y="1" width="119" height="94" fill="#ffffff" />
      <text
        x="60"
        y="61"
        textAnchor="middle"
        fill="#ffffff"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="34"
        fontWeight="700"
        letterSpacing="3"
      >
        FO
      </text>
      <text
        x="180"
        y="61"
        textAnchor="middle"
        fill="#151515"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="23"
        fontWeight="700"
        letterSpacing="2"
      >
        STUDIO
      </text>
    </svg>
  );
}
