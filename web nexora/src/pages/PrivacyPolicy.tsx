import { useEffect } from "react";
import { motion } from "motion/react";
import { Shield, Lock, Eye, Server, UserCheck, Link as LinkIcon } from "lucide-react";

export default function PrivacyPolicy() {
  // SEO Optimization
  useEffect(() => {
    document.title = "Privacy Policy | Nexora AI Platform";
    
    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Learn how Nexora protects your data, privacy, and security while using advanced AI decision engines.');
    
    // Update or create meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'AI platform privacy policy, data protection policy, user data security Nexora, AI decision engine privacy, neural intelligence platform privacy');
  }, []);

  return (
    <div className="pt-32 pb-20 min-h-screen relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] -z-10 pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -z-10 pointer-events-none translate-x-1/2" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none -z-10" />

      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <Shield className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
            Privacy <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Policy</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Effective Date: April 16, 2026
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-3xl p-8 md:p-12 border border-white/10 space-y-12 backdrop-blur-md"
        >
          <section>
            <p className="text-lg text-foreground/90 leading-relaxed mb-8">
              At Nexora, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or use our services.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <Eye className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold">1. Information We Collect</h2>
            </div>
            <p className="text-muted-foreground mb-4">We may collect the following types of information:</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                <h3 className="font-semibold text-white mb-3">a. Personal Information</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 text-sm">
                  <li>Name & Email address</li>
                  <li>Phone number</li>
                  <li>Company name</li>
                  <li>Any details submitted via forms</li>
                </ul>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                <h3 className="font-semibold text-white mb-3">b. Non-Personal Information</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 text-sm">
                  <li>IP address & Browser type</li>
                  <li>Device information</li>
                  <li>Pages visited and time spent</li>
                  <li>Cookies and tracking data</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-3 border-t border-white/10 pt-8">
              <Server className="w-6 h-6 text-purple-400" />
              2. How We Use Your Information
            </h2>
            <p className="text-muted-foreground">We use your information to:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-2">
              <li>Provide and improve our AI-powered services</li>
              <li>Respond to inquiries and customer support requests</li>
              <li>Send updates, newsletters, or marketing communications</li>
              <li>Analyze user behavior to improve website performance</li>
              <li>Ensure security and prevent fraud</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold border-t border-white/10 pt-8">3. Cookies and Tracking Technologies</h2>
            <p className="text-muted-foreground">
              Nexora uses cookies to enhance user experience, track website performance, and understand visitor behavior. 
              You can disable cookies through your browser settings.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold border-t border-white/10 pt-8">4. Data Sharing and Disclosure</h2>
            <p className="text-muted-foreground mb-4">
              We do not sell your personal data. However, we may share information with:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-2">
              <li>Trusted service providers (hosting, analytics tools)</li>
              <li>Legal authorities if required by law</li>
              <li>Business partners under strict confidentiality agreements</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-3 border-t border-white/10 pt-8">
              <Lock className="w-6 h-6 text-green-400" />
              5. Data Security
            </h2>
            <p className="text-muted-foreground mb-4">
              We implement strong user data security at Nexora, including SSL encryption, secure servers, and access control systems. 
              However, no system is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-3 border-t border-white/10 pt-8">
              <UserCheck className="w-6 h-6 text-blue-400" />
              6. Your Rights
            </h2>
            <p className="text-muted-foreground mb-4">Depending on your location, you may have the right to:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-2 mb-4">
              <li>Access your personal data</li>
              <li>Request correction or deletion</li>
              <li>Withdraw consent</li>
              <li>Opt-out of marketing communications</li>
            </ul>
            <p className="text-muted-foreground">
              To exercise your rights, contact us at: <a href="mailto:info@nexoraintelligents.com" className="text-blue-400 hover:text-blue-300 transition-colors">info@nexoraintelligents.com</a>
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-3 border-t border-white/10 pt-8">
              <LinkIcon className="w-6 h-6 text-purple-400" />
              7. Third-Party Links
            </h2>
            <p className="text-muted-foreground">
              Our website may contain links to external websites. We are not responsible for their privacy practices.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold border-t border-white/10 pt-8">8. Children's Privacy</h2>
            <p className="text-muted-foreground">
              Nexora does not knowingly collect data from children under 13. If such data is found, it will be deleted immediately.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold border-t border-white/10 pt-8">9. Changes to This Privacy Policy</h2>
            <p className="text-muted-foreground">
              We may update this policy periodically. Updates will be posted on this page with a revised date.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold border-t border-white/10 pt-8">10. Contact Us</h2>
            <div className="bg-white/5 p-6 rounded-xl border border-white/5 inline-block w-full sm:w-auto">
              <h3 className="font-semibold text-white mb-4 text-lg">Nexora</h3>
              <div className="space-y-3 text-muted-foreground">
                <p>📧 Email: <a href="mailto:info@nexoraintelligents.com" className="text-blue-400 hover:text-blue-300 transition-colors">info@nexoraintelligents.com</a></p>
                <p>🌐 Website: <a href="https://nexoraintelligents.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">nexoraintelligents.com</a></p>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
