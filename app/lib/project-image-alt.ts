import type { ProcessedAsset } from "./contentful-types";

// Reviewed labels for legacy numbered photos, without editing shared CMS assets.
const legacyDescriptions: Record<string, string> = {
  "6yG2ADlYKSTA5Ip4l48Ixu": "Club members beside the Siembra Mangle planting banner at Talabaan.",
  "4XmT2iAdhf4rpNRj8Fq7jq": "Volunteers plant mangrove propagules along the Talabaan coastline.",
  "4xtEAUFALaVeZQXGjaWSAP": "Participants walk through the mangrove planting site at Talabaan.",
  "pALmZtGJeSIzA6h4DkcId": "Volunteers gather beside the Siembra Mangle banner before planting.",
  "7nkv3f57L5dFLPFCYr2whh": "Volunteers place mangrove propagules in the soil at Talabaan.",
  "7altukdv3LzL5Crpyrt3SQ": "Club members distribute supplies to families during the Mariki outreach.",
  "64foNKO2A91A4jB6DbrXTT": "Outreach volunteers and residents gather behind a table of supplies in Mariki.",
  "5gskUeS4l9F9ejSkX0h0LH": "Club members and partners gather beneath the barangay assistance banner.",
  "3LroxiXn7byS7NZ95qtLZp": "Club members stand on the bridge at the entrance to Barangay Mariki.",
  "3HE2QX5IICXCpjohSalgaG": "A club representative addresses families during the Mariki outreach.",
  "aMQuGSq6ZIums6Hboe8AV": "An outreach volunteer hands toys to children in Mariki.",
  "6ZrMScBFH6nl2UmX8oC4hX": "Volunteers distribute books and other supplies to families in Mariki.",
  "1MJfMd4PxQOAnOdVtYSGfg": "Shootfest participants at the firing line with eye and hearing protection.",
  "65iioI1yvGwUGNCKCiGy8D": "A Shootfest award recipient holds a trophy beside event representatives.",
  "3HIzkx6Lwb38OF6SaQFq8V": "Trophies displayed for The Great West Shootfest Year 2.",
  "4E2Yx5YyjGDCXO1jyBKNqx": "A competitor aims at targets during The Great West Shootfest.",
  "2IXNn0BXmWzTdjSdTc2APE": "Club members and guests gather beside The Great West Shootfest banner.",
  "3QFj8TETRx5D1tMVCJR7VU": "A competitor takes part in a handgun stage at The Great West Shootfest.",
  "2v4Ihpz8qTdVBTHdTmQU0a": "Shootfest participants and officials gather for a group photograph.",
  "4e2MCDkO4XBU5KNPkusYdu": "Participants wearing hearing protection prepare at the Shootfest firing line.",
  "6voC4PyGLBlpTeXiD54lAk": "Club members in event shirts beside The Great West Shootfest banner.",
  "7jm8rWDmI083NMeGbUyT5J": "Project banner for the turnover of 25 Jetmatic pumps.",
  "1lizFUH0lP1K6FeXKiX4XI": "Club representatives stand behind rows of Jetmatic pumps at the turnover.",
  "5q10y1I3nO5rMqBcalmMXA": "Jetmatic pumps arranged in rows before the handover.",
  "D4yLwi59gkaUJa5Mmc0B2": "A club representative beside a Liloy emergency response vehicle.",
  "2rI1cBpj9QAyG6w3nOTHNx": "Certificate from the Municipality of Liloy acknowledging the Jetmatic pump donation.",
  "xaxNnB3tkwoL8ufl1Nspk": "Club members and school representatives hold documents at the Muti water project handover.",
  "3cLEgVhATwYLS7GHtcPdA2": "Club members gather with the Unite for Good banner at Muti Elementary School.",
  "37mSwdTEaXzapAHhyju8Mu": "A club representative speaks beside the Muti water supply project banner.",
  "1jjQIrt2hNl9viSrVtBIrT": "Club members and attendees gather inside Muti Elementary School for the handover.",
  "5VFevFrlMFDMLQGM4DdlpQ": "Club members and school representatives beside the Muti Elementary School sign.",
  "6vhYnIixv7XRhu28QLa3UU": "Club representatives present the Muti water supply project sign beside the water facility.",
  "6mHSbf16U76K7wXyAJzFtm": "Club and school representatives behind donated toys and books at Ayala Central School.",
  "3UvA0cn6L2WdqCt9eYNtPF": "Toys, books, storage boxes, and floor mats displayed at Ayala Central School.",
  "T846wzOm3DmRgrSXM6KlI": "Club and school representatives hold documents at the Project Sonrisas handover.",
  "6qXtMAlTzzft4xC9xwDQlP": "Project Sonrisas representatives on stage behind the donated learning materials.",
  "WzKIf9ob4Dg7g9vD2rD7D": "Club and school representatives gather in the book and toy library at Ayala Central School.",
  "5uiwCSKPhfOwgUqIDaaq0g": "Project Sonrisas book and toy library banner for Ayala Central School.",
  "7oJt9srbmeqjHcMRgxBzBm": "Workers join a water pipe during the Latuan–Curuan project construction.",
  "63ddvdptdvpEKlVcZvoAqr": "Coils of water pipe beside the road during the Latuan–Curuan project.",
  "2Lof7Heh4hXSfesIuPJCuf": "Participants seated inside Curuan Parish Church for the water project turnover.",
  "zTh3vpw0FsLC5tc52lDUJ": "Club members and partners beside the Latuan–Curuan water project turnover banner.",
  "JJRauqmYNthxMg9YQp1KO": "Representatives sign documents at the Latuan–Curuan water project turnover.",
  "3gcrlCvx94GZDSlbNrELO1": "Curuan Parish Water System tank with an exterior access ladder.",
  "4WVoKV8kCMapsknMVfyRgk": "Workers inside a concrete structure during the Latuan–Curuan water project construction.",
  "2rsdtVM8008rnUm2HeemCS": "Latuan–Curuan Water Project banner listing the global grant and project partners.",
};

export function projectImageAlt(image: ProcessedAsset, projectTitle: string, index: number): string {
  const title = image?.title?.trim();
  if (title && !/^(\d+|header)$/i.test(title)) return title;
  if (image?.description?.trim()) return image.description.trim();
  const assetId = image?.url.match(/^https:\/\/images\.ctfassets\.net\/ts3253qccucl\/([^/]+)\//)?.[1];
  return (assetId && legacyDescriptions[assetId]) || `${projectTitle} - Photo ${index + 1}`;
}
