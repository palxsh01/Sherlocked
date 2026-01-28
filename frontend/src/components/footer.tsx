import { PhoneCall, Instagram} from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12 justify-between items-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact */}
          <div>
            <h3 className="text-lg mb-4">Contact</h3>
            <div className="space-y-2">
              <a
                href="tel:+91 86183 10257"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                +91 86183 10257 - Adit Sundriyal
              </a>
              <a
                href="tel:+91 96180 90597"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                +91 96180 90597 - Sanjana Regulagedda
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg mb-4">Follow Us</h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.instagram.com/elas.bphc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 bg-muted hover:bg-primary/10 hover:text-primary rounded-lg transition-colors w-fit"
              >
                <Instagram className="w-5 h-5" />
                <p>ELAS BPHC</p>
              </a>
              <a
                href="https://www.instagram.com/vm.bphc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 bg-muted hover:bg-primary/10 hover:text-primary rounded-lg transition-colors w-fit"
              >
                <Instagram className="w-5 h-5" />
                <p>Verba Maximus BPHC</p>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <div className="text-sm text-muted-foreground">
                © 2026 ELAS. All rights reserved.
              </div>
              <div className="text-sm text-muted-foreground">
                Developed by Palash Shivnani.
              </div>
            </div>
            <div className="text-sm text-muted-foreground italic">
              All characters and events are fictional. Any resemblance to real
              persons or events is purely coincidental.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}