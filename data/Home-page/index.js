import {
  Bathrobe,
  Camper,
  National,
  Roadmap,
  Suitcase,
  Ticket,
} from "@/public/icon/home-page";
import {Marvellake, Purulia, Vagabandh} from "@/public/images/home-page/Index";
import {Airplane, Bus, Train} from "@/public/svg/home-page/How-to-reach/index";
import {
  Tickets,
  Hotel,
  Package,
  Vehicle,
  TravelItinerary,
} from "@/public/svg/home-page/Trip/Index";

export const ImageCarousel = [
  {image: Purulia, title: "Purulia", hotels: 10},
  {image: Marvellake, title: "Marvellake", hotels: 14},
  {image: Vagabandh, title: "Vagabandh", hotels: 6},
  {image: Purulia, title: "Purulia", hotels: 12},
  {image: Marvellake, title: "Marvellake", hotels: 8},
  {image: Vagabandh, title: "Vagabandh", hotels: 16},
];

export const CategoryData = [
  {icon: Roadmap, title: "Travel Intenary", id: "itinerary"},
  {icon: Camper, title: "Vehicle", id: "comingsoon"},
  {icon: Bathrobe, title: "Hotels", id: "comingsoon"},
  {icon: Suitcase, title: "Package", id: "comingsoon"},
  {icon: Ticket, title: "Ticket", id: "comingsoon"},
  {icon: National, title: "Natural beauty", id: "comingsoon"},
];

export const HowToReachData = [
  {icon: Airplane, title: "Flight", subtitle: "CCU [320KM]"},
  {icon: Train, title: "Train", subtitle: "PRR [32KM]"},
  {icon: Bus, title: "Bus", subtitle: "PRR BS [35KM]"},
];

export const TripCardData = [
  {icon: TravelItinerary, title: "Travel Itinerary"},
  {icon: Vehicle, title: "Vehicle"},
  {icon: Package, title: "Package"},
  {icon: Hotel, title: "Hotel"},
  // {icon: Tickets, title: "Ticket"},
];
