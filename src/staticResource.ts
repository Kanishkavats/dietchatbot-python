import { bannerOne, bannerTwo, charityLife, galleryImageOne, galleryImageThree, galleryImageTwo, heartCare, homeCommunity, homeFive, homeFour, homeOne, homeThree, homeTwo, loremIpsum, phOne, phTree, phTwo, theBird, treeLife, womenWithOneChild, womenWithOneChildDark } from "../public/assets";
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
  { label: "Causes", href: "/causes", dropdown: null },
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
        label: "Team",href: "/team"
      },

    ],
  },
  { label: "News", href: "/news-grid", dropdown: null },
  { label: "Contact Us", dropdown: null, href: "/contact" },
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





export const teamMembers = [
  {
    id: 1,
    name: "Michel Fokluz",
    role: "Volunteer",
    img: "/assets/volunteer1.png",
    delay: 0,
  },
  {
    id: 2,
    name: "Arian Drobloas",
    role: "Volunteer",
    img: "/assets/volunteer2.png",
    delay: 300,
  },
  {
    id: 3,
    name: "Jara Klintof",
    role: "Volunteer",
    img: "/assets/volunteer3.png",
    delay: 600,
  },
  {
    id: 4,
    name: "Aiden Markram",
    role: "Volunteer",
    img: "/assets/volunteer4.png",
    delay: 900,
  },
  {
    id: 5,
    name: "Michel Fokluz",
    role: "Volunteer",
    img: "/assets/aboutsection/voluntear5.png",
    delay: 0,
  },
  {
    id: 6,
    name: "Arian Drobloas",
    role: "Volunteer",
    img: "/assets/aboutsection/voluntear6.png",
    delay: 300,
  },
  {
    id: 7,
    name: "Jara Klintof",
    role: "Volunteer",
    img: "/assets/aboutsection/voluntear7.png",
    delay: 600,
  },
  {
    id: 8,
    name: "Aiden Markram",
    role: "Volunteer",
    img: "/assets/aboutsection/voluntear8.png",
    delay: 900,
  },
  {
    id: 9,
    name: "Michel Fokluz",
    role: "Volunteer",
    img: "/assets/aboutsection/voluntear5.png",
    delay: 0,
  },
  {
    id: 10,
    name: "Arian Drobloas",
    role: "Volunteer",
    img: "/assets/aboutsection/voluntear6.png",
    delay: 300,
  },
  {
    id: 11,
    name: "Jara Klintof",
    role: "Volunteer",
    img: "/assets/aboutsection/voluntear7.png",
    delay: 600,
  },
  {
    id: 12,
    name: "Aiden Markram",
    role: "Volunteer",
    img: "/assets/aboutsection/voluntear8.png",
    delay: 900,
  }
];



export const testimonials = [
  {
    name: "Michel Smith",
    role: "Cloth Store Inc.",
    avatar: "/assets/author.png",
    review:
      "Charity is the voluntary act of giving help, typically in the form of money, time, or resources, to those in need. Charitable organizations aim to solve social, environmental, and economic challenges by addressing issues like poverty.",
  },
  {
    name: "Ruby Klara",
    role: "Cloth Store Inc.",
    avatar: "/assets/author.png",
    review:
      "Charity is the voluntary act of giving help, typically in the form of money, time, or resources, to those in need. Charitable organizations aim to solve social, environmental, and economic challenges by addressing issues like poverty.",
  },
  {
    name: "Bishu Kiev",
    role: "Cloth Store Inc.",
    avatar: "/assets/author.png",
    review:
      "Charity is the voluntary act of giving help, typically in the form of money, time, or resources, to those in need. Charitable organizations aim to solve social, environmental, and economic challenges by addressing issues like poverty.",
  },
];


























export interface Event {
  id: number;
  date: string;
  title: string;
  location: string;
  image: string;
}

export const events: Event[] = [
  {
    id: 1,
    date: "October 19, 2025",
    title: "Transforming Lives Charity Golf Tournament",
    location: "135 W, 46nd Street, New York",
    image: "/one.png",
  },
  {
    id: 2,
    date: "October 19, 2025",
    title: "Unity in Giving Community Charity Event",
    location: "135 W, 46nd Street, New York",
    image: "/two.png",
  },
  {
    id: 3,
    date: "October 19, 2025",
    title: "Unity in Giving Community Charity Event",
    location: "135 W, 46nd Street, New York",
    image: "/three.png",
  }
];


export interface Comment {
  id: number;
  name: string;
  avatar: string;
  content: string;
  time: string;
}

export const comments: Comment[] = [
  {
    id: 1,
    name: "Martha Grey",
    avatar: "/assets/author-four.png",
    content:
      "Ut Sint Posse Sit, Eum Sumo Diam Ea. Liber Consectetuer In Mei, Sea In, \nImperdiet Assueverit Contentiones, An His Cib.",
    time: "2 Min Ago",
  },
  {
    id: 2,
    name: "Jackie Dawson",
    avatar: "/assets/author.png",
    content:
      "Ut Sint Posse Sit, Eum Sumo Diam Ea. Liber Consectetuer In Mei, Sea In \nImperdiet Assueverit Contentiones, An His Cib.",
    time: "2 Min Ago",
  },
  {
    id: 3,
    name: "Hesia Lara",
    avatar: "/assets/author-two.png",
    content:
      "Ut Sint Posse Sit, Eum Sumo Diam Ea. Liber Consectetuer In Mei, Sea In \nImperdiet Assueverit Contentiones, An His Cib.",
    time: "2 Min Ago",
  },
];

export interface RecentPost {
  id: number;
  title: string;
  date: string;
  image: string;
  alt: string;
}

export const recentPosts: RecentPost[] = [
  {
    id: 1,
    title: "Where Innovation Meets Foundation",
    date: "November 19, 2024",
    image: phOne.src,
    alt: "Family with woman holding child",
  },
  {
    id: 2,
    title: "Where Innovation Meets Foundation",
    date: "November 19, 2024",
    image: phTwo.src,
    alt: "Group of hands stacked together",
  },
  {
    id: 3,
    title: "Structures That Stand, Dreams That Soar",
    date: "November 22, 2024",
    image: phTree.src,
    alt: "Two young children looking at camera",
  },
]

export const totalPages = Math.ceil(events.length / 2);

// Charity with Difference component data
export interface CharityCard {
  id: number;
  title: string;
  description: string;
  icon: string;
  image: string;
  color: string;
  bgColor: string;
}

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

// Charity with Difference Comments data
export interface CharityComment {
  id: number;
  name: string;
  image: string;
  comment: string;
  timeAgo: string;
}

export const charityComments: CharityComment[] = [
  {
    id: 1,
    name: "Martha Grey",
    image: "/assets/charity_with_difference/author-four.png",
    comment: "Ut Sint Posse Sit, Eum Sumo Diam Ea. Liber Consectetuer In Mei, Sea In \nImperdiet Assueverit Contentiones, An His Cib",
    timeAgo: "2 Min Ago"
  },
  {
    id: 2,
    name: "Jackie Dawson",
    image: "/assets/charity_with_difference/one-author.png",
    comment: "Ut Sint Posse Sit, Eum Sumo Diam Ea. Liber Consectetuer In Mei, Sea In \nImperdiet Assueverit Contentiones, An His Cib.",
    timeAgo: "5 Min Ago"
  },
  {
    id: 3,
    name: "Hesia Lara",
    image: "/assets/charity_with_difference/author-two.png",
    comment: "Ut Sint Posse Sit, Eum Sumo Diam Ea. Liber Consectetuer In Mei, Sea In \nImperdiet Assueverit Contentiones, An His Cib.",
    timeAgo: "10 Min Ago"
  }
];

// Charity with Difference Recent Posts data
export interface CharityRecentPost {
  id: number;
  title: string;
  date: string;
  image: string;
  alt: string;
}

export const charityRecentPosts: CharityRecentPost[] = [
  {
    id: 1,
    title: "Where Innovation Meets Foundation",
    date: "November 19, 2024",
    image: phOne.src,
    alt: "Family with woman holding child"
  },
  {
    id: 2,
    title: "Where Innovation Meets Foundation",
    date: "November 19, 2024",
    image: phTwo.src,
    alt: "Group of hands stacked together"
  },
  {
    id: 3,
    title: "Structures That Stand, Dreams That Soar",
    date: "November 22, 2024",
    image: phTree.src,
    alt: "Two young children looking at camera"
  }
];

// Charity with Difference Tags data
export const charityTags = [
  "T-Shirt",
  "Banner Design",
  "Brochures",
  "Landing",
  "Print",
  "Business Card"
];

// ChildOldCare component data
export const childOldCareImages = [
  { src: '/assets/childoldcare/4people.png', alt: 'Image 1' },
  { src: '/assets/childoldcare/child.png', alt: 'Image 2' },
  { src: '/assets/childoldcare/brownchild.png', alt: 'Image 3' },
  { src: '/assets/childoldcare/4people.png', alt: 'Image 1' },
  { src: '/assets/childoldcare/child.png', alt: 'Image 2' },
  { src: '/assets/childoldcare/brownchild.png', alt: 'Image 3' }
];

export const childOldCareSliderSettings = {
  className: "center",
  centerMode: false,
  infinite: true,
  centerPadding: "0px",
  slidesToShow: 3,
  speed: 500,
  arrows: true,
  dots: false,
  autoplay: false,
  draggable: true,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        centerPadding: "0px",
        arrows: true,
        draggable: true,
        swipeToSlide: true
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        centerPadding: "0px",
        arrows: true,
        draggable: true,
        swipeToSlide: true,
        centerMode: false
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        centerPadding: "0px",
        arrows: true,
        draggable: true,
        swipeToSlide: true,
        centerMode: false
      }
    }
  ]
};

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

// LatestNewsArticle component data
export interface NewsItem {
  img: string;
  category: string;
  categoryIcon: string;
  title: string;
  author: string;
  comments: string;
}

export const newsData: NewsItem[] = [
  {
    img: homeCommunity.src,
    category: "Health",
    categoryIcon: "🏥",
    title: "IT Service Case Studies Accelerate Business Fly Success Tech",
    author: "Robert Fox",
    comments: "03"
  },
  {
    img: "/artical2.png",
    category: "Education",
    categoryIcon: "🎓",
    title: "IT Service Case Studies Accelerate Business Fly Success Tech",
    author: "Robert Fox",
    comments: "08"
  },
  {
    img: "/artical3.png",
    category: "Food",
    categoryIcon: "🍽️",
    title: "IT Service Case Studies Accelerate Business Fly Success Tech",
    author: "Robert Fox",
    comments: "13"
  }
];

// HelpAndDonate component data
export interface DonationCardData {
  id: number;
  image: string;
  category: string;
  title: string;
  description: string;
  progress: number;
  raised: string;
  goal: string;
}

export const donationCards: DonationCardData[] = [
  {
    id: 1,
    image: "/assets/section3/helpforeducation.png",
    category: "Food",
    title: "Help For Education",
    description: "Lorem Ipsum Dolor Sit Amet, Consete Sadipscing Elitr, Sed Diam Nonum",
    progress: 90,
    raised: "$8500",
    goal: "$1,0000"
  },
  {
    id: 2,
    image: "/assets/section3/helpforfood.png",
    category: "Health",
    title: "Help For Food",
    description: "Lorem Ipsum Dolor Sit Amet, Consete Sadipscing Elitr, Sed Diam Nonum",
    progress: 75,
    raised: "$8500",
    goal: "$1,0000"
  },
  {
    id: 3,
    image: "/assets/section3/givehealthsupport.png",
    category: "Food",
    title: "Give Health Support",
    description: "Lorem Ipsum Dolor Sit Amet, Consete Sadipscing Elitr, Sed Diam Nonum",
    progress: 65,
    raised: "$8500",
    goal: "$1,0000"
  },
  {
    id: 4,
    image: "/assets/section3/childenweworkfor.png",
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
    image: "/assets/section3/childenweworkfor.png",
    category: "Health",
    title: "Children We Work ",
    description: "Lorem Ipsum Dolor Sit Amet, Consete Sadipscing Elitr, Sed Diam Nonum",
    progress: 85,
    raised: "$8500",
    goal: "$1,0000"
  },
  {
    id: 2,
    image: "/assets/section3/helpforeducation.png",
    category: "Food",
    title: "Help For Education",
    description: "Lorem Ipsum Dolor Sit Amet, Consete Sadipscing Elitr, Sed Diam Nonum",
    progress: 70,
    raised: "$8500",
    goal: "$1,0000"
  },
  {
    id: 3,
    image: "/assets/section3/helpforfood.png",
    category: "Health",
    title: "Help For Food",
    description: "Lorem Ipsum Dolor Sit Amet, Consete Sadipscing Elitr, Sed Diam Nonum",
    progress: 65,
    raised: "$8500",
    goal: "$1,0000"
  },
  {
    id: 4,
    image: "/assets/section3/givehealthsupport.png",
    category: "Food",
    title: "Give Health Support",
    description: "Lorem Ipsum Dolor Sit Amet, Consete Sadipscing Elitr, Sed Diam Nonum",
    progress: 90,
    raised: "$8500",
    goal: "$1,0000"
  },
  {
    id: 5,
    image: "/assets/section3/childenweworkfor.png",
    category: "Health",
    title: "Children We Work ",
    description: "Lorem Ipsum Dolor Sit Amet, Consete Sadipscing Elitr, Sed Diam Nonum",
    progress: 75,
    raised: "$8500",
    goal: "$1,0000"
  },
  {
    id: 6,
    image: "/assets/section3/helpforeducation.png",
    category: "Food",
    title: "Help For Education",
    description: "Lorem Ipsum Dolor Sit Amet, Consete Sadipscing Elitr, Sed Diam Nonum",
    progress: 65,
    raised: "$8500",
    goal: "$1,0000"
  },
  {
    id: 7,
    image: "/assets/section3/helpforfood.png",
    category: "Health",
    title: "Help For Food",
    description: "Lorem Ipsum Dolor Sit Amet, Consete Sadipscing Elitr, Sed Diam Nonum",
    progress: 90,
    raised: "$8500",
    goal: "$1,0000"
  },
  {
    id: 8,
    image: "/assets/section3/givehealthsupport.png",
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







export const newsCards = [
  { img: "/article1.png", category: "Food", title: "Our New Campaign to Support Displaced Families" },
  { img: "/artical2.png", category: "Health", title: "Health Camp Provides Medical Aid to Remote Villages" },
  { img: "/artical3.png", category: "Education", title: "Building New Schools for a Brighter Future" },
  { img: "/artical4.png", category: "Education", title: "Scholarships for Underprivileged Students" },
  { img: "/artical5.png", category: "Food", title: "Community Kitchens Feed Thousands" },
  { img: "/artical6.png", category: "Health", title: "Vaccination Drive Protects Children" },
  { img: "/artical7.png", category: "Education", title: "Digital Literacy Program Launched" },
  { img: "/artical8.png", category: "Food", title: "Food Packages Distributed in Flood-Hit Areas" },
];

export const authorInfo = {
  img: "/assets/charity_with_difference/author-two.png",
  name: "Rosalina Willaim",
  role: "Front End Developer",
  bio: "He Whimsically Named Egg Canvas Is The Design Director And Photographer In New York.",
  socials: [
    { icon: "facebook", url: "https://www.facebook.com/" },
    { icon: "vimeo", url: "https://vimeo.com/" },
    { icon: "twitter", url: "https://twitter.com/" },
    { icon: "linkedin", url: "https://www.linkedin.com/" },
  ],
};

// export const recentPosts = [
//   { img: "/recentpost1.png", date: "November 19, 2024", title: "Where Innovation Meets Foundation" },
//   { img: "/recentpost2.png", date: "November 19, 2024", title: "Charity That Brings Smiles" },
//   { img: "/artical3.png", date: "November 22, 2024", title: "Structures That Stand, Dreams That Soar" },
// ];

export const categories = [
  { name: "Donation", count: "05" },
  { name: "Charity", count: "02" },
  { name: "Volunteer", count: "09" },
  { name: "Health", count: "07" },
  { name: "Education", count: "04" },
];

export const popularTags = [
  "T-Shirt", "Banner Design", "Brochures", "Landing", "Print", "Business Card"
];





