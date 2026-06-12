import type { Messages } from "@/i18n/messages";

type SiteFooterProps = {
  footer: Messages["footer"];
};

export function SiteFooter({ footer }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="page-shell site-footer-inner">
        <p className="footer-tagline">{footer.tagline}</p>
        <a href="/privacy-policy/" className="footer-link">
          {footer.privacyPolicy}
        </a>
      </div>
    </footer>
  );
}
