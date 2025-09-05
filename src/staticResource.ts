import { bannerOne, bannerTwo, charityLife, galleryImageOne, galleryImageThree, galleryImageTwo, heartCare, homeFive, homeFour, homeOne, homeThree, homeTwo, loremIpsum, phOne, phTree, phTwo, theBird, treeLife, womenWithOneChild, womenWithOneChildDark } from "../public/assets";
import { Cause } from "./types/donateUs";
import { FAQItem } from "./types/faq";
import { NavItem } from "./types/header";

// home hero banner image 

export const homeHeroImages = [
  {
    id: 1,
    image: bannerOne.src,
  },
  {
    id: 2,
    image: bannerTwo.src,
    tagline: "Start Donating Poor People",
    heading: ["Giving Help", "To Those", "Who Need It."],
  },
];

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
    dropdown: null,
    href: '/'
  },
  { label: "About Us", dropdown: null, href: '/about' },
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
      { label: "Donate Us", href: "/donate-us" },
      { label: "Become Volunteer", href: "/volunteer" },
      {
        label: "Events",
        children: [
          { label: "Events", href: "/events" },
          { label: "Event Details", href: "/events/details" },
        ],
      },
      {
        label: "Shop",
        children: [
          { label: "Our Shop", href: "/our-shop" },
          { label: "Product Details", href: "/product-details" },
          { label: "View Cart", href: "/view-cart" },
          { label: "Checkout", href: "/checkout" },
        ],
      },
      {
        label: "Team",
        children: [
          { label: "Our Teams", href: "/team" },
          { label: "Team Details", href: "/team" },
        ],
      },
      {
        label: "Coming Soon",
        href: "/coming-soon"
      },
      {
        label: "Error",
        href: "/error"
      },


    ],
  },
  {
    label: "News", dropdown: [
      { label: "News List view", href: "/latestnews" },
      { label: "News Grid View", href: "/news-grid" },
      { label: "News Details", href: "/news-details" },
    ]
  },
  { label: "Contact Us", dropdown: null, href: "contact" },
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


// donate us page data

export const GalleryImage = [
  { src: galleryImageOne, className: "col-span-1 lg:col-span-2" },
  { src: womenWithOneChildDark },
  { src: galleryImageTwo },
  { src: galleryImageThree, className: "col-span-1 lg:col-span-2" },
];

export const causes: Cause[] = [
  {
    id: 1,
    title: "Where Innovation Meets Foundation",
    date: "November 19, 2024",
    image: phOne.src,
  },
  {
    id: 2,
    title: "Where Innovation Meets Foundation",
    date: "November 19, 2024",
    image: phTree.src,
  },
  {
    id: 3,
    title: "Where Innovation Meets Foundation",
    date: "November 22, 2024",
    image: phTwo.src,
  },
];

export const tags = [
  "T-Shirt",
  "Banner Design",
  "Brochures",
  "Landing",
  "Print",
  "Business Card",
];

export const Donationmethods = [
  { label: "Test Donation", value: "test" },
  { label: "Offline Donation", value: "offline" },
  { label: "Credit Card", value: "credit" },
];

// ✅ volunteer page data
export const VolunteerPage = {
  subtitle: "Become A Volunteer",
  title: "Volunteer Requirements",
  description:
    "Sed Ut Perspiciatis Unde Omnis Iste Natus Error Sit Voluptatem Accusantium Doloremque Laudantium, Totam Rem Aperiam, Eaque Inventore",
};

export const VolunteerNotice = {
  icon: "mdi:alert",
  title: "Notice",
  message:
    "Test Mode Is Enabled. While In Test Mode No Live Donations Are Processed.",
};

export const VolunteerProgress = [
  { label: "Donation Collect", value: 70 },
  { label: "Successful Events", value: 85 },
];

export const VolunteerFeatures = [
  { text: "Best Quality Services" },
  { text: "Time Saving" },
  { text: "Meet The Deadlines" },
  { text: "24/7 Customer Support" },
];

