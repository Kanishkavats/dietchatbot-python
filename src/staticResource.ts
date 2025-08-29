import { homeFive, homeFour, homeOne, homeThree, homeTwo } from "./assets";
import { NavItem } from "./header";


export const NAV_ITEMS: NavItem[] = [
  {
    label: "Home",
    dropdown: [
      { name: "Home One", image: homeOne.src },
      { name: "Home Two", image: homeTwo.src },
      { name: "Home Three", image: homeThree.src },
      { name: "Home Four", image: homeFour.src },
      { name: "Home Five", image: homeFive.src },
    ],
  },
  { label: "About Us", dropdown: null },
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