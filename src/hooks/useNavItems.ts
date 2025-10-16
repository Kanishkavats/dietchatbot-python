import { useTranslation } from "react-i18next";


export interface NavItem {
  label: string;
  href?: string;
   dropdown?: NavItem[] | null;
 // dropdown?: { label: string; href: string }[] | null;
}

export const useNavItems = (): NavItem[] => {
  const { t } = useTranslation();

  return [
    { label: t("Home"), href: "/" },
    { label: t("About Us"), href: "/about" },
    { label: t("Causes"), href: "/causes" },
    {
      label: t("Pages"),
      dropdown: [
        { label: t("FAQ"), href: "/faq" },
        { label: t("Donate Us"), href: "/donate-us" },
        { label: t("Become Volunteer"), href: "/volunteer" },
        { label: t("Events"), href: "/events" },
        { label: t("Team"), href: "/team" },
      ],
    },
    { label: t("News"), href: "/news-grid" },
    { label: t("Contact Us"), href: "/contact" },
  ];
};
