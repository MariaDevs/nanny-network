import Link from "next/link";
import { Heart, Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ background: "#1a1a2e", color: "#e5e7eb" }}>
      <div className="max-w-7xl mx-auto px-4 py-14 grid md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#4a90d9,#7bc67e)" }}>
              <Heart size={16} fill="white" color="white" />
            </div>
            <span className="font-bold text-lg text-white">Nanny Network</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            South Africa's trusted platform connecting families with experienced, caring nannies.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="font-bold text-white mb-4">Quick Links</h3>
          <div className="flex flex-col gap-2 text-sm">
            {[
              ["Home", "/"], ["About Us", "/about"], ["Find a Nanny", "/nannies"],
              ["Services", "/services"], ["Contact", "/contact"],
            ].map(([label, href]) => (
              <Link key={href} href={href} className="text-gray-400 hover:text-blue-400 transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-bold text-white mb-4">Our Services</h3>
          <div className="flex flex-col gap-2 text-sm text-gray-400">
            <span>Full-Time Nannies</span>
            <span>Part-Time Nannies</span>
            <span>Live-In Nannies</span>
            <span>Au Pair Services</span>
            <span>Newborn Care</span>
            <span>Emergency Childcare</span>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-bold text-white mb-4">Contact Us</h3>
          <div className="flex flex-col gap-3 text-sm">
            <a href="tel:0810259931" className="flex items-center gap-2 text-gray-400 hover:text-blue-400">
              <Phone size={16} /> 081 025 9931
            </a>
            <a href="https://wa.me/270810259931" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-green-400">
              <MessageCircle size={16} /> WhatsApp Us
            </a>
            <a href="mailto:info@nannynetwork.co.za"
              className="flex items-center gap-2 text-gray-400 hover:text-blue-400">
              <Mail size={16} /> info@nannynetwork.co.za
            </a>
            <div className="flex items-center gap-2 text-gray-400">
              <MapPin size={16} /> South Africa
            </div>
          </div>
          <div className="mt-4">
            <Link href="/register"
              className="inline-block text-sm font-semibold py-2 px-4 rounded-full"
              style={{ background: "#4a90d9", color: "white" }}>
              Register as Nanny
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 py-5 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Nanny Network. All rights reserved. | South Africa
      </div>
    </footer>
  );
}
