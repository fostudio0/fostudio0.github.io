import type { PolicyBlock, PolicyListItem } from "@/i18n/privacy-policy/types";

function PolicyList({ items }: { items: PolicyListItem[] }) {
  return (
    <ul className="policy-list">
      {items.map((item) => (
        <li key={`${item.label}-${item.href ?? "text"}`}>
          {item.href ? (
            <a href={item.href} target="_blank" rel="noopener noreferrer">
              {item.label}
            </a>
          ) : (
            item.label
          )}
        </li>
      ))}
    </ul>
  );
}

function PolicyBlockView({ block }: { block: PolicyBlock }) {
  switch (block.type) {
    case "h1":
      return <h2 className="policy-heading policy-heading-lg">{block.text}</h2>;
    case "h2":
      return <h3 className="policy-heading">{block.text}</h3>;
    case "p":
      return <p className="policy-paragraph">{block.text}</p>;
    case "ul":
      return <PolicyList items={block.items} />;
    default:
      return null;
  }
}

type PolicyDocumentProps = {
  sections: Array<{ id: string; blocks: PolicyBlock[] }>;
};

export function PolicyDocument({ sections }: PolicyDocumentProps) {
  return (
    <div className="policy-document">
      {sections.map((section) => (
        <section key={section.id} id={section.id} className="policy-section">
          {section.blocks.map((block, index) => (
            <PolicyBlockView key={`${section.id}-${index}`} block={block} />
          ))}
        </section>
      ))}
    </div>
  );
}
