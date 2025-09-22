import { DropdownOption } from "@/src/types/adminCommon";
import { BannerSearchField } from "@/src/types/banner";


export const CampaignSearchOptions = [
  { label: "Title", value: "title" },
  { label: "Organizer", value: "organizer" },
  { label: "Category", value: "category" },
] as const;

export const CategorySearchOptions = [
  { label: "Name", value: "name" },
] as const;


export const BlogSearchOptions = [
  { label: "Title", value: "title" },
  { label: "Category", value: "category" },
  { label: "Location", value: "location" },
  { label: "CreatedAt", value: "createdAt" },
  { label: "UpdatedAt", value: "updatedAt" },
] as const;


export const CommentSearchOptions = [
  { label: "Status", value: "status" },

]

export const BannerSearchOptions = [
  { label: "Title", value: "title" },
  { label: "Subtitle", value: "subtitle" },
] as const satisfies readonly DropdownOption<BannerSearchField>[];


export const memberSearchOptions = [
  { label: "Name", value: "name" },
  { label: "Position", value: "position" },
  { label: "Status", value: "status" },
] as const;