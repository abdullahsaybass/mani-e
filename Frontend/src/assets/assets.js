import logo from './mani-textile-logo.png';
import background from './background.jpg';
import hero from './hero.png';
import header1 from './header1.png'
import esaree1 from './sarees3.jpg';
import esaree2 from './sarees4.jpg';
import brownchudu from './brownchudu.png';
import curt from './curt.png';
import yellowc from './yellowc.png';
import cottonsaree from './cottonsaree.png';
import offer from './child1.JPG';
import child from './child2.JPG';
import saree from './saree.JPG';
import child2 from './child3.JPG';
import anarkali from './anarkali.jpg';
import anarkali1 from './anarkali1.png';
import andra from './andra.jpg';
import andra1 from './andra1.png';
import banaras from './banaras.jpg';
import banaras1 from './banaras1.png';
import blouses from './blouses.jpg';
import blouses1 from './blouses1.png';
import butter from './butter.jpg';
import butter1 from './butter1.png';
import combo from './combo.jpg';
import combo1 from './combo1.png';
import discount from './discount.png';
import discount1 from './discount1.png';
import ethinic from './ethinic.jpg';
import ethinic1 from './ethinic1.png';
import froks from './froks.jpg';
import froks1 from './froks1.png';
import gownkutta from './gownkurta.jpg';
import gownkutta1 from './gownkurta11.png';
import green from './green.jpg';
import green1 from './green1.png';
import ikkat from './ikkat.jpg';
import ikkat1 from './ikkat1.png';
import jacquard from './jacquard.jpg';
import jacquard1 from './jacquard1.png';
import kanchipuram from './kanchipuram.jpg';
import kanchipuram1 from './kanchipuram.png';
import kurta from './kurta.png';
import kurta1 from './kurta1.jpg';
import kuta from './kuta1.jpg';
import kuta1 from './kuta1.png';
import kutchild from './kutchild.png';
import parampara from './parampara.jpg';
import pinkmaterial from './pinkmaterial.jpg';
import pinkmaterial1 from './pinkmaterial1.png';
import samudrika from './samudrika.jpg';
import subs from './subs.jpg';
import swarovski from './swarovski.png';
import swarovski1 from './swarovski1.png';

export const assets = {
    cottonsaree,
    brownchudu,
    curt,
    yellowc,
    esaree1,
    esaree2,
    header1,
    hero,
    logo,
    background,
    offer,
    child,
    child2,
    saree,
    anarkali,
    anarkali1,
    andra,
    andra1,
    banaras,
    banaras1,
    blouses,
    blouses1,
    butter,
    butter1,
    combo,
    combo1,
    discount,
    discount1,
    ethinic,
    ethinic1,
    froks,
    froks1,
    gownkutta,
    gownkutta1,
    green,
    green1,
    ikkat,
    ikkat1,
    jacquard,
    jacquard1,
    kanchipuram,
    kanchipuram1,
    kurta,
    kurta1,
    kuta,
    kuta1,
    kutchild,
    parampara,
    pinkmaterial,
    pinkmaterial1,
    samudrika,
    subs,
    swarovski,
    swarovski1
}

export const products = [
  {
    id: "1",
    title: "Gold Jacquard Silk Saree",
    price: 103295,
    image: cottonsaree,
    description: "Gold jacquard silk saree, contrast intricate pallu & zari highlighted border steeped with traditional designs.",
    sizes: ["S", "M", "L"],
    colors: ["#86efac", "#f97316", "#22d3ee", "#3b82f6", "#facc15"],
    relatedIds: ["2", "3", "4"]
  },
  {
    id: "2",
    title: "Kanchipuram Silk Saree",
    price: 12770,
    image: cottonsaree,
    description: "Richly woven traditional Kanchipuram saree perfect for weddings and grand occasions.",
    sizes: ["M", "L"],
    colors: ["#f472b6", "#9333ea", "#16a34a"],
    relatedIds: ["1", "5", "6"]
  },
  {
    id: "3",
    title: "Softy Silk Saree",
    price: 1995,
    image: cottonsaree,
    description: "Lightweight soft silk saree ideal for casual wear and daily elegance.",
    sizes: ["S", "M"],
    colors: ["#22d3ee", "#06b6d4"],
    relatedIds: ["1", "7", "8"]
  },
  {
    id: "4",
    title: "Wedding Silk Saree",
    price: 11550,
    image: cottonsaree,
    description: "Elegantly designed saree for weddings, parties, and special functions.",
    sizes: ["L"],
    colors: ["#f43f5e", "#f97316", "#c084fc"],
    relatedIds: ["1", "2"]
  },
  {
    id: "5",
    title: "Tussar Saree",
    price: 1965,
    image: cottonsaree,
    description: "Semi Tussar saree with earthy hues, ideal for ethnic sophistication.",
    sizes: ["S", "M"],
    colors: ["#a3e635", "#eab308", "#e879f9"],
    relatedIds: ["2", "6", "7"]
  },
  {
    id: "6",
    title: "Printed Chanderi Anarkali",
    price: 3322,
    image: cottonsaree,
    description: "Elegant printed Anarkali suit with soft Chanderi fabric.",
    sizes: ["M", "L"],
    colors: ["#60a5fa", "#a78bfa"],
    relatedIds: ["2", "5", "9"]
  },
  {
    id: "7",
    title: "Silk Half Saree",
    price: 26255,
    image: cottonsaree,
    description: "Classic half saree with bold color stripes and rich silk texture.",
    sizes: ["S", "M", "L"],
    colors: ["#f472b6", "#fde68a", "#22c55e"],
    relatedIds: ["3", "5", "10"]
  },
  {
    id: "8",
    title: "Combo Shirt & Pants",
    price: 600,
    image: cottonsaree,
    description: "Men's combo pack - formal shirt with trousers for daily comfort.",
    sizes: ["M", "L"],
    colors: ["#64748b", "#0f172a"],
    relatedIds: ["9"]
  },
  {
    id: "9",
    title: "Jaipur Silk Cotton",
    price: 1140,
    image: cottonsaree,
    description: "Soft Jaipur weave combining the beauty of silk and comfort of cotton.",
    sizes: ["S", "M"],
    colors: ["#eab308", "#fb923c"],
    relatedIds: ["1", "10"]
  },
  {
    id: "10",
    title: "Printed Chanderi Cotton",
    price: 10725,
    image: cottonsaree,
    description: "Luxurious Chanderi cotton saree with detailed block prints.",
    sizes: ["M", "L"],
    colors: ["#b91c1c", "#a855f7"],
    relatedIds: ["4", "5"]
  },
  {
    id: "11",
    title: "Chettinad Cotton Saree",
    price: 1555,
    image: cottonsaree,
    description: "Traditional Chettinad saree with vibrant hues and ethnic motifs.",
    sizes: ["S", "M"],
    colors: ["#be123c", "#7c3aed"],
    relatedIds: ["10", "3", "6"]
  },
  {
    id: "12",
    title: "Grey Cotton Half Saree",
    price: 2440,
    image: cottonsaree,
    description: "Graceful half saree in subtle grey tones with minimal prints.",
    sizes: ["S", "M"],
    colors: ["#4b5563", "#9ca3af"],
    relatedIds: ["11", "7", "1"]
  }
];
