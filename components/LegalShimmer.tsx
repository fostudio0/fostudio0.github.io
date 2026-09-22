function ShimmerBlock({ height }: { height: number }) {
  return (
    <div
      className="legal-shimmer"
      style={{ height: `${height}px`, width: "100%" }}
    />
  );
}

export function DocumentShimmer() {
  return (
    <div className="policy-document policy-document-loading" aria-live="polite">
      <ShimmerBlock height={32} />
      <ShimmerBlock height={16} />
      <ShimmerBlock height={16} />
      <ShimmerBlock height={16} />
      <ShimmerBlock height={24} />
      <ShimmerBlock height={16} />
      <ShimmerBlock height={16} />
    </div>
  );
}