"use client";
import { footerData } from "@/staticResource";
import { Icon } from "@iconify/react";
import Newsletter from "./Newsletter";
import { logoLight } from "@/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-palate-green text-white py-5 relative">
      <Newsletter />
      <div className="max-w-7xl mx-auto  py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="h-10 w-50 relative">
            <Image src={logoLight} fill alt={footerData.brand.name} />
          </div>
          <p className="mt-10  text-palate-white2 tracking-tight leading-7">{footerData.brand.description}</p>
          <div className="flex gap-3 mt-6">
            {footerData.brand.socials.map((s, i) => (
              <a
                key={i}
                href={s.href}
                className="w-10 h-10 flex items-center justiy-center border rounded-full hover:bg-yellow-500 hover:text-black"
              >
                <Icon icon={s.icon} width="20" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {footerData.quickLinks.map((link, i) => (
              <li key={i}>
                <a
                  href={link.href}
                  className="text-palate-white2 hover:text-yellow-500 transition"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Our Services</h3>
          <ul className="space-y-2">
            {footerData.services.map((service, i) => (
              <li key={i}>
                <a
                  href={service.href}
                  className="text-palate-white2 hover:text-yellow-500 transition"
                >
                  {service.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="text-palate-white2">
          <h3 className="text-xl font-semibold mb-4 text-palate-white">Get In Touch</h3>
          <p className="flex items-center gap-2 ">
            <Icon icon="mdi:location" width="30" height="30" />
             {footerData.contact.address}
          </p>
          <p className="flex items-center gap-2 mt-3 ">
            <Icon icon="mdi:phone" width="20" height="30" /> {footerData.contact.phone}
          </p>
          <p className="flex items-center gap-2 mt-3 ">
            <Icon icon="mdi:email" width="20" height="30" /> {footerData.contact.email}
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-600 mt-8 py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-300">
          <p>
            Copyright © <span className="text-yellow-500">Charifund</span>. All
            Rights Reserved.
          </p>
          <div className="flex gap-6">
            {footerData.bottomLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="hover:text-yellow-500 transition"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
