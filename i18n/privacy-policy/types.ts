export type PolicyListItem = {
  label: string;
  href?: string;
};

export type PolicyBlock =
  | { type: "h1"; text: string }
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: PolicyListItem[] };

export type PolicySection = {
  id: string;
  blocks: PolicyBlock[];
};

export type PolicyContent = {
  meta: {
    title: string;
    description: string;
  };
  pageTitle: string;
  backHome: string;
  sections: PolicySection[];
};
