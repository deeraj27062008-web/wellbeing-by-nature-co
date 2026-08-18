import { getAssetUrl } from '../utils/assetHelper';

export const categories = [
  {
    id: "seed-cycling",
    name: "Hormone Balance & Women's Health",
    shortName: "Seed Cycling",
    icon: "🌻",
    image: getAssetUrl("/images/products/seed-cycling-artwork.jpg"),
    description: "Phase 1 & Phase 2 raw unroasted whole seed protocols formulated for 28-day hormone balance."
  },
  {
    id: "gut-shots",
    name: "Gut Health & Morning Shots",
    shortName: "Morning Shots",
    icon: "🫚",
    image: getAssetUrl("/images/products/morning-shots-10sachets.jpg"),
    description: "Daily turmeric, amla & ginger gut-friendly drink mix to awaken metabolism and calm morning bloating."
  },
  {
    id: "heirloom",
    name: "Traditional Grains & Superfoods",
    shortName: "Rajamudi Rice",
    icon: "🌾",
    image: getAssetUrl("/images/products/rajamudi-red-rice-front.jpg"),
    description: "100% Traditional unpolished Rajamudi Red Rice rich in fibre, low GI, and heart antioxidants."
  },
  {
    id: "millet-powder",
    name: "Traditional Supergrain Blends",
    shortName: "Millet Powder",
    icon: "🥣",
    image: getAssetUrl("/images/products/millet-mixed-powder.jpg"),
    description: "Nourishing blend of Ragi, Jowar, Chickpea & Foxtail Millet for daily plant calcium and clean energy."
  }
];

export const healthBenefits = [
  { id: "hormone", title: "Hormone Balance & Women's Health", icon: "🌸", tag: "Hormone Balance", count: "3 Protocols" },
  { id: "gut", title: "Gut Health & Clean Digestion", icon: "🫚", tag: "Gut Health", count: "2 Blends" },
  { id: "heirloom", title: "Heirloom Grains & Heart Health", icon: "🌾", tag: "Heart Health", count: "1 Heritage Grain" },
  { id: "nutrition", title: "Daily Superfood Nutrition & Energy", icon: "🥣", tag: "Daily Nutrition", count: "2 Superfoods" },
  { id: "immunity", title: "Natural Immunity & Daily Detox", icon: "🛡️", tag: "Immunity", count: "4 Formulations" }
];
