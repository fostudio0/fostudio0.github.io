import type { Messages } from "@/i18n/messages";

type SiteFooterProps = {
  footer: Messages["footer"];
};

export function SiteFooter({ footer }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="page-shell site-footer-inner">
        <p className="footer-tagline">{footer.tagline}</p>
        <a href="/legal/" className="footer-link">
          {footer.legalDocuments}
        </a>
      </div>
    </footer>
  );
}
