import { Mail, Twitter, Instagram, Facebook } from 'lucide-react';

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
                href="mailto:support@sherlocked.event"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                support@sherlocked.event
              </a>
              <div className="text-sm text-muted-foreground">Organizing Committee: Campus Events Team</div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg mb-4">Follow Us</h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-2 bg-muted hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-muted hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-muted hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © 2026 Sherlocked. All rights reserved.
            </div>
            <div className="text-sm text-muted-foreground italic">
              All characters and events are fictional. Any resemblance to real persons or events is purely coincidental.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
