import { charityLife, heartCare, homeFive, homeFour, homeOne, homeThree, homeTwo, loremIpsum, theBird, treeLife } from "./assets";
import { FAQItem } from "./types/faq";
import { NavItem } from "./types/header";


// ✅ Data arrays
export const currencies = ["USD", "EUR", "INR"];

export const languages = [
  { label: "English", icon: "twemoji:flag-england" },
  { label: "Spanish", icon: "twemoji:flag-united-states" },
  { label: "Chinese", icon: "twemoji:flag-china" },
  { label: "Italian", icon: "twemoji:flag-italy" },
];

export const socialIcons = [
  { icon: "fa6-brands:facebook-f", label: "Facebook", link: "#" },
  { icon: "simple-icons:vimeo", label: "Vimeo", link: "#" },
  { icon: "fa6-brands:twitter", label: "Twitter", link: "#" },
  { icon: "fa6-brands:linkedin-in", label: "LinkedIn", link: "#" },
];


export const NAV_ITEMS: NavItem[] = [
  {
    label: "Home",
    dropdown:null,
    href:'/'
    // dropdown: [
    //   { name: "Home One", image: homeOne.src },
    //   { name: "Home Two", image: homeTwo.src },
    //   { name: "Home Three", image: homeThree.src },
    //   { name: "Home Four", image: homeFour.src },
    //   { name: "Home Five", image: homeFive.src },
    // ],
  },
  { label: "About Us", dropdown: null, href:'/about' },
  {
    label: "Causes",
    dropdown: [
      { label: "Our Causes", href: "/causes" },
      { label: "Cause Details", href: "/causes/details" },
    ],
  },
  {
    label: "Pages",
    dropdown: [
      { label: "FAQ", href: "/faq" },
      { label: "Donate Us", href: "/donate" },
      { label: "Become Volunteer", href: "/volunteer" },
      {
        label: "Team",
        children: [
          { label: "Our Teams", href: "/team" },
          { label: "Team Details", href: "/team" },
        ],
      },
      {
        label: "Shop",
        children: [
          { label: "Our Shop", href: "/shop" },
          { label: "Product Details", href: "/shop" },
          { label: "View Cart", href: "/shop" },
          { label: "Checkout", href: "/shop" },
        ],
      },
      {
        label: "Events",
        children: [
          { label: "Events", href: "/events" },
          { label: "Event Details", href: "/events/details" },
        ],
      },
    ],
  },
  { label: "News", dropdown: [
    { label: "News List view", href: "/news-list" },
    { label: "News Grid View", href: "/news-grid" },
    { label: "News Details", href: "/news-details" },
  ] },
  { label: "Contact Us", dropdown: null },
];


export const footerData = {
  brand: {
    name: "Charifund",
    description:
      "Our Secure Online Donation Platform Allows You To Make Contributions Quickly And Safely. Choose From Various.",
    socials: [
      { icon: "line-md:facebook", href: "#" },
      { icon: "mdi:vimeo", href: "#" },
      { icon: "mdi:twitter", href: "#" },
      { icon: "fontisto:linkedin", href: "#" },
    ],
  },
  quickLinks: [
    { label: "About Us", href: "#" },
    { label: "Our News", href: "#" },
    { label: "Our Campaign", href: "#" },
    { label: "FAQ", href: "#" },
    { label: "Get A Quote", href: "#" },
  ],
  services: [
    { label: "Our Causes", href: "#" },
    { label: "Education Support", href: "#" },
    { label: "Our Campaign", href: "#" },
    { label: "Food Support", href: "#" },
    { label: "Health Support", href: "#" },
  ],
  contact: {
    address: "455 west orchard street kings mountain, nc 280867",
    phone: "+088 (246) 642-27-10",
    email: "example@email.com",
  },
  bottomLinks: [
    { label: "Terms & Conditions", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Cookie Settings", href: "#" },
  ],
};




export const PartnersCompaniesData = [
  { src: theBird.src, alt: "The Bird" },
  { src: treeLife.src, alt: "Tree Life" },
  { src: loremIpsum.src, alt: "Lorem Ipsum" },
  { src: charityLife.src, alt: "Charity Life" },
  { src: heartCare.src, alt: "Heart Care" },
];


export const faqData: FAQItem[] = [
  {
    question: "What kind of recipes can I find on your website?",
    answer:
      "It is a long established fact that a reader will be distracted by the readable the a content of a page when looking at its layout. Many desktop publishing packages and web page editors.",
  },
  {
    question: "Are the recipes suitable for beginners?",
    answer:
      "It is a long established fact that a reader will be distracted by the readable the a content of a page when looking at its layout. Many desktop publishing packages and web page editors.",
  },
  {
    question: "Do you offer cooking tips and techniques?",
    answer:
      "It is a long established fact that a reader will be distracted by the readable the a content of a page when looking at its layout. Many desktop publishing packages and web page editors.",
  },
  {
    question: "How frequently you update you recipe collection?",
    answer:
      "It is a long established fact that a reader will be distracted by the readable the a content of a page when looking at its layout. Many desktop publishing packages and web page editors.",
  },
];