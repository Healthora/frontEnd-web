import {
  Calendar,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Facebook,
  Instagram,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Smooth Scroll Function
  const handleSmoothScroll = (e, href) => {
    // Only apply to internal anchor links
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const elem = document.getElementById(targetId);

      if (elem) {
        elem.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  const footerLinks = {
    product: [
      { name: "Problème", href: "#ProblemsSectionMedical" },
      { name: "Solution", href: "#SolutionsSectionMedical" },
      { name: "Fonctionnement", href: "#HowItWorksSection" },
      { name: "S'inscrire", href: "#FinalCTASectionMedical" },
    ],
  };

  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/issam-kebdani-8b6154334",
      label: "LinkedIn",
    },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  return (
    <footer className="relative bg-white overflow-hidden pt-1">
      {/* Top Separator Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2' fill='%23000000' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-200">
                <Calendar className="text-white w-6 h-6" />
              </div>
              <span className="font-black text-xl tracking-tight text-gray-900">
                Medeli<span className="text-sky-600">RDV</span>
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              La plateforme SaaS nouvelle génération pour les professionnels de
              santé. Optimisez votre agenda et réduisez vos absences de 70%.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600 group">
                <Mail className="w-4 h-4 text-sky-500" />
                <a
                  href="mailto:kebdaniissam780@gmail.com"
                  className="hover:text-sky-600 transition-colors"
                >
                  kebdaniissam780@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Phone className="w-4 h-4 text-sky-500" />
                <span>+213 781243966</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-sky-500 mt-0.5" />
                <span>Tlemcen, Algérie</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div className="lg:ml-auto">
            <h4 className="text-gray-900 font-bold mb-6 text-sm uppercase tracking-widest">
              Navigation
            </h4>
            <ul className="space-y-4">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="text-gray-500 hover:text-sky-600 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-3 h-3 text-sky-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
              <h4 className="text-gray-900 font-bold mb-2">Restez Informé</h4>
              <p className="text-gray-600 text-sm mb-6">
                Recevez nos conseils sur la gestion digitale de votre cabinet.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-1 px-5 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm shadow-sm"
                />
                <button className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-sky-600 transition-all shadow-lg shadow-gray-200">
                  S'inscrire
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 hover:text-sky-600 hover:border-sky-200 hover:bg-white transition-all shadow-sm"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>

            <div className="text-center md:text-right">
              <div className="flex items-center justify-center md:justify-end gap-2">
                <p className="text-slate-500 text-sm font-medium">
                  © {currentYear}{" "}
                  <span className="text-slate-900 font-bold">MedeliRDV</span>.
                  <span className="mx-2 text-gray-300">|</span>
                  Conçu avec passion par{" "}
                  <a
                    href="https://www.linkedin.com/in/issam-kebdani-8b6154334"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-600 hover:text-indigo-600 font-bold transition-all underline decoration-sky-200 decoration-2 underline-offset-4 hover:decoration-indigo-400"
                  >
                    Issam Kebdani
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
