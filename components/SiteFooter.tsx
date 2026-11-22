import Link from "next/link";
import type { Messages } from "@/i18n/messages";

type SiteFooterProps = {
  footer: Messages["footer"];
};

export function SiteFooter({ footer }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="page-shell site-footer-inner">
        <p className="footer-tagline">{footer.tagline}</p>
        <Link href="/legal-documents/" className="footer-link">
          {footer.legalDocuments}
        </Link>
      </div>
    </footer>
  );
}
