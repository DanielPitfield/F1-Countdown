import type { IconType } from "react-icons/lib";

import { PiTelevisionSimpleBold } from "react-icons/pi";
import { MdOutlineMessage } from "react-icons/md";
import { FaReddit } from "react-icons/fa";

export const SocialMediaNames = ["Sky Sports", "F1 Quotes", "Reddit"] as const;
export type SocialMediaName = typeof SocialMediaNames[number];

export const socialMediaMappings: { name: SocialMediaName; icon: IconType; text: string; link: string }[] = [
  { name: "Sky Sports", icon: PiTelevisionSimpleBold, text: "Watch on Sky Sports", link: "https://www.skysports.com/watch/sky-sports-f1" },
  { name: "F1 Quotes", icon: MdOutlineMessage, text: "Read F1 Quotes", link: "https://gibbs-rules.vercel.app/?=F1" },
  { name: "Reddit", icon: FaReddit, text: "Browse Subreddit", link: "https://www.reddit.com/r/formula1" },
];