import React from 'react';
import { Calendar, Mail, Phone, MapPin, Linkedin, Facebook, Instagram, Twitter, ChevronRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "Problem", href: "#ProblemSection" },
      { name: "Solution", href: "#SolutionSection" },
      { name: "Comment ça marche", href: "#HowItWorksSection" },
      { name: "inscrire", href: "#FinalCTASection" },
    ]
  };

  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/votre-entreprise",
      label: "LinkedIn",
    },
    {
      icon: Facebook,
      href: "https://www.facebook.com/votre-page",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/votre-compte",
      label: "Instagram",
    },
  ];

  return (
    <footer className="relative bg-[#0B0C10] border-t border-white/5 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(56,189,248,0.05)_0%,rgba(0,0,0,0)_70%)] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(99,102,241,0.05)_0%,rgba(0,0,0,0)_70%)] rounded-full pointer-events-none -z-10"></div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center">
                <Calendar className="text-white w-6 h-6" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                Medeli<span className="text-sky-400">Rendez-Vous</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-6 max-w-xs leading-relaxed">
              La plateforme intelligente de gestion de rendez-vous médicaux. 
              Simplifiez votre quotidien et concentrez-vous sur vos patients.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="w-4 h-4 text-sky-400" />
                <a
                  href="mailto:contact@medirendezvous.fr"
                  className="hover:text-sky-400 transition-colors"
                >
                  kebdaniissam780@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Phone className="w-4 h-4 text-sky-400" />
                <a
                  href="tel:+213781243966"
                  className="hover:text-sky-400 transition-colors"
                >
                  +213 781243966
                </a>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
                <span>Tlemcen, Algeria</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
              Produit
            </h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-sky-400 transition-colors text-sm flex items-center gap-1 group"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Newsletter Section */}
        <div className="border-t border-white/5 pt-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-white font-semibold mb-2">
              Restez Informé
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              Recevez nos conseils et actualités sur la gestion de cabinet médical
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-sky-500/50 transition-colors text-sm"
              />
              <button className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full text-white font-semibold text-sm hover:shadow-lg hover:shadow-sky-500/50 transition-all">
                S'inscrire
              </button>
            </div>
          </div>
        </div>

        {/* Social Links & CTA */}
        <div className="border-t border-white/5 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-sky-500/20 border border-white/10 hover:border-sky-500/50 flex items-center justify-center text-gray-400 hover:text-sky-400 transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>

            {/* CTA Button */}
            <a
              href="#signup"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-sky-500/50 hover:scale-105 transition-all cursor-pointer"
            >
              Essai Gratuit 14 Jours
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>
              © {currentYear} MedeliRendez-Vous. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                </span>
                <span className="text-sky-400 text-xs font-medium">
                  Plateforme sécurisée et conforme RGPD
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;