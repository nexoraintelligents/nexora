import { Github, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="py-12 border-t border-white/5 bg-white/50 dark:bg-black/50">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6 hover:opacity-80 transition-opacity w-fit">
              <div className="w-10 h-10 flex items-center justify-center shrink-0">
                <img src="/logo.png" alt="Nexora Logo" className="w-full h-full object-contain scale-[1.3]" />
              </div>
              <div className="flex flex-col -space-y-1">
                <span className="text-lg font-bold tracking-tighter text-white">Nexora</span>
                <span className="text-[7px] uppercase tracking-[0.1em] text-muted-foreground">Powering the Next Era of Intelligence</span>
              </div>
            </Link>
            <p className="text-muted-foreground max-w-sm mb-6">
              Powering the Next Era of Intelligence with advanced decision engines and neural reasoning.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-bold mb-6 text-white">Product</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link to="/services" className="hover:text-white transition-colors">Features</Link></li>
              <li><a href="https://nexora-signal-rouge.vercel.app/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Nexora Signal</a></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Security</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold mb-6 text-white">Company</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-xs text-muted-foreground">
          <p>© 2026 Nexora Intelligence Inc. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <Link to="/contact" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
