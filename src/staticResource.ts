import {charityLife,  heartCare, loremIpsum, theBird, treeLife,  photo1, photo2, photo3, photo4 } from "../public/assets";
import { CharityCard, DonationCardData, SocialMediaButton } from "./types";
import { FAQItem } from "./types/web/faq";



export const socialIcons = [
  { icon: "fa6-brands:facebook-f", label: "Facebook", link: "#" },
  { icon: "simple-icons:vimeo", label: "Vimeo", link: "#" },
  { icon: "fa6-brands:twitter", label: "Twitter", link: "#" },
  { icon: "fa6-brands:linkedin-in", label: "LinkedIn", link: "#" },
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
    { label: "About Us", href: "/about" },

    { label: "FAQ", href: "/faq" },
    { label: "Get A Quote", href: "/contact" },
  ],
  services: [
    { label: "Our News", href: "/news-grid" },
    { label: "Our Campaign", href: "/causes" },
    { label: "Education Support", href: "/events" },
  ],
  contact: {
    address: "455 west orchard street kings mountain, nc 280867",
    phone: "+088 (246) 642-27-10",
    email: "example@email.com",
  },
  bottomLinks: [
    { label: "Terms & Conditions", href: "#" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Cookie Settings", href: "#" },
  ],
};



export const PartnersCompaniesData = [
  { src: theBird.src, alt: "The Bird" },
  { src: treeLife.src, alt: "Tree Life" },
  { src: loremIpsum.src, alt: "Lorem Ipsum" },
  { src: charityLife.src, alt: "Charity Life" },
  { src: heartCare.src, alt: "Heart Care" },
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
  { src: photo1, className: "col-span-1 lg:col-span-2" },
  { src: photo2 },
  { src: photo3 },
  { src: photo4, className: "col-span-1 lg:col-span-2" },
];



export const Donationmethods = [
  { label: "Test Donation", value: "test" },
  { label: "Offline Donation", value: "offline" },
  { label: "Credit Card", value: "credit" },
];


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




export const charityCards: CharityCard[] = [
  {
    id: 1,
    title: "Healthy Food",
    description: "Set Up A Secure And User-Friendly Online Donation Platform That Accepts Multiple",
    icon: "\e82a",
    image: "/blue_bg.jpeg",
    color: "border-green-600",
    bgColor: "bg-gray-100"

  },
  {
    id: 2,
    title: "Medical Care",
    description: "Set Up A Secure And User-Friendly Online Donation Platform That Accepts Multiple",
    icon: "\e82b",
    image: "/green_bg.jpeg",
    color: "border-orange-500",
    bgColor: "bg-orange-50"

  },
  {
    id: 3,
    title: "Child Education",
    description: "Set Up A Secure And User-Friendly Online Donation Platform That Accepts Multiple",
    icon: "\e829",
    image: "/yellow_bg.jpeg",
    color: "border-yellow-500",
    bgColor: "bg-yellow-50"
  },
  {
    id: 4,
    title: "Healthy Food",
    description: "Set Up A Secure And User-Friendly Online Donation Platform That Accepts Multiple",
    icon: "\e82a",
    image: "/blue_bg.jpeg",
    color: "border-green-600",
    bgColor: "bg-gray-100"
  },
  {
    id: 5,
    title: "Medical Care",
    description: "Set Up A Secure And User-Friendly Online Donation Platform That Accepts Multiple",
    icon: "\e82b",
    image: "/green_bg.jpeg",
    color: "border-orange-500",
    bgColor: "bg-orange-50"

  },
  {
    id: 6,
    title: "Child Education",
    description: "Set Up A Secure And User-Friendly Online Donation Platform That Accepts Multiple",
    icon: "\e829",
    image: "/yellow_bg.jpeg",
    color: "border-yellow-500",
    bgColor: "bg-yellow-50"
  },
];

// DonateDifferentWay component data
export const donateDifferentWayTabs = [
  { id: 'mission', label: 'Our Mission' },
  { id: 'vision', label: 'Our Vision' },
  { id: 'excellence', label: 'Excellence' }
];

export const donateDifferentWayMissionItems = [
  'We Help Companies Develop Powerful Corporate Social',
  'Helped Fund 3,265 Project Powerful Corporate Poor',
  'Dedicated Tech Services'
];

export const donateDifferentWayVisionItems = [
  'Creating A World Where Every Child Has Access To Education',
  'Building Sustainable Communities Through Technology',
  'Empowering Future Generations With Knowledge And Skills'
];

export const donateDifferentWayExcellenceItems = [
  'Delivering High-Quality Educational Programs',
  'Maintaining Excellence In All Our Services',
  'Continuous Improvement And Innovation'
];

export const donationCards: DonationCardData[] = [
  {
    id: 1,
    image: "/assets/helpforeducation.png",
    category: "Food",
    title: "Help For Education",
    description: "Lorem Ipsum Dolor Sit Amet, Consete Sadipscing Elitr, Sed Diam Nonum",
    progress: 90,
    raised: "$8500",
    goal: "$1,0000"
  },
  {
    id: 2,
    image: "/assets/helpforfood.png",
    category: "Health",
    title: "Help For Food",
    description: "Lorem Ipsum Dolor Sit Amet, Consete Sadipscing Elitr, Sed Diam Nonum",
    progress: 75,
    raised: "$8500",
    goal: "$1,0000"
  },
  {
    id: 3,
    image: "/assets/givehealthsupport.png",
    category: "Food",
    title: "Give Health Support",
    description: "Lorem Ipsum Dolor Sit Amet, Consete Sadipscing Elitr, Sed Diam Nonum",
    progress: 65,
    raised: "$8500",
    goal: "$1,0000"
  },
  {
    id: 4,
    image: "/assets/childenweworkfor.png",
    category: "Health",
    title: "Children We Work ",
    description: "Lorem Ipsum Dolor Sit Amet, Consete Sadipscing Elitr, Sed Diam Nonum",
    progress: 85,
    raised: "$8500",
    goal: "$1,0000"
  }
];
export const donationCardsBig: DonationCardData[] = [
  {
    id: 1,
    image: "/assets/childenweworkfor.png",
    category: "Health",
    title: "Children We Work ",
    description: "Lorem Ipsum Dolor Sit Amet, Consete Sadipscing Elitr, Sed Diam Nonum",
    progress: 85,
    raised: "$8500",
    goal: "$1,0000"
  },
  {
    id: 2,
    image: "/assets/helpforeducation.png",
    category: "Food",
    title: "Help For Education",
    description: "Lorem Ipsum Dolor Sit Amet, Consete Sadipscing Elitr, Sed Diam Nonum",
    progress: 70,
    raised: "$8500",
    goal: "$1,0000"
  },
  {
    id: 3,
    image: "/assets/helpforfood.png",
    category: "Health",
    title: "Help For Food",
    description: "Lorem Ipsum Dolor Sit Amet, Consete Sadipscing Elitr, Sed Diam Nonum",
    progress: 65,
    raised: "$8500",
    goal: "$1,0000"
  },
  {
    id: 4,
    image: "/assets/givehealthsupport.png",
    category: "Food",
    title: "Give Health Support",
    description: "Lorem Ipsum Dolor Sit Amet, Consete Sadipscing Elitr, Sed Diam Nonum",
    progress: 90,
    raised: "$8500",
    goal: "$1,0000"
  },
  {
    id: 5,
    image: "/assets/childenweworkfor.png",
    category: "Health",
    title: "Children We Work ",
    description: "Lorem Ipsum Dolor Sit Amet, Consete Sadipscing Elitr, Sed Diam Nonum",
    progress: 75,
    raised: "$8500",
    goal: "$1,0000"
  },
  {
    id: 6,
    image: "/assets/helpforeducation.png",
    category: "Food",
    title: "Help For Education",
    description: "Lorem Ipsum Dolor Sit Amet, Consete Sadipscing Elitr, Sed Diam Nonum",
    progress: 65,
    raised: "$8500",
    goal: "$1,0000"
  },
  {
    id: 7,
    image: "/assets/helpforfood.png",
    category: "Health",
    title: "Help For Food",
    description: "Lorem Ipsum Dolor Sit Amet, Consete Sadipscing Elitr, Sed Diam Nonum",
    progress: 90,
    raised: "$8500",
    goal: "$1,0000"
  },
  {
    id: 8,
    image: "/assets/givehealthsupport.png",
    category: "Food",
    title: "Give Health Support",
    description: "Lorem Ipsum Dolor Sit Amet, Consete Sadipscing Elitr, Sed Diam Nonum",
    progress: 55,
    raised: "$8500",
    goal: "$1,0000"
  }
];

// Create 8 cards by repeating the original 4
export const allDonationCards = [...donationCards, ...donationCards];

export const filterFields = [
  { label: "Select filter", value: "none" },
  { label: "Viewed Status", value: "isViewed" },
  { label: "Form Type", value: "formType" },
];

export const isViewedOptions = [
  { label: "All", value: "all" },
  { label: "Viewed", value: "true" },
  { label: "Not Viewed", value: "false" },
];

export const formTypeOptions = [
  { label: "All", value: "all" },
  { label: "Contact", value: "contact" },
  { label: "Detail", value: "detail" },
  { label: "Donation", value: "donation" },
  { label: "Volunteer", value: "volunteer" },
];

export const filterOptions = [
  { label: "All", value: "all" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
  { label: "Pending", value: "pending" },
]

// Event Detail Page Data


export const socialMediaButtons: SocialMediaButton[] = [
  { icon: "FaFacebookF", bg: "#4267B2", label: "Facebook" },
  { icon: "FaTwitter", bg: "#1DA1F2", label: "Twitter" },
  { icon: "FaPinterest", bg: "#E60023", label: "Pinterest" },
  { icon: "FaLinkedinIn", bg: "#0077B5", label: "LinkedIn" },
  { icon: "FaTumblr", bg: "#ff5528", label: "Tumblr" },
];

export const defaultEventData = {
  title: 'Give African Childrens A Good Education',
  date: "02 Apr 2021",
  location: "684 West College St. Sun City, USA",
  image: "/assets/poster 2.png",
  summary: "Charity And Donation Is A Categorys That Involves Giving Financial Category That Involves Giving Financial Or Material Support Various Causes Organizations. It Allows Individuals Towards The A Addressing Social Category That Involves Giving Financial Or Material Support Various Causes Of Organizations. It Allows Individuals Towards Addressing Social",
  keyPoints: [
    "Empower Through Charity",
    "Giving Hope, Changing Lives", 
    "Healing Communities",
    "Together We Can",
    "Compassion In Action",
    "Every Act Counts"
  ]
};

export const googleMapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976378252907!3d40.69766374874312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2588f046ee661%3A0xa0b3281fcecc08c!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1716298418080!5m2!1sen!2sin";