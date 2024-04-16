import {
  HomeIcon,
  User2Icon,
  WarehouseIcon,
  SatelliteIcon,
  TicketIcon,
  DatabaseIcon
} from 'lucide-react'

export const sideLinks = [
  {
    imgURL: HomeIcon,
    route: "/home",
    label: "Home",
  },
  {
    imgURL: DatabaseIcon,
    route: "/master",
    label: "Master Data",
  },
  {
    imgURL: SatelliteIcon,
    route: "/wilayah",
    label: "Wilayah",
  },
  {
    imgURL: WarehouseIcon,
    route: "/mitra",
    label: "Mitra",
  },
  {
    imgURL: TicketIcon,
    route: "/laporan",
    label: "Laporan",
  },
  {
    imgURL: User2Icon,
    route: "/user",
    label: "User",
  }
];