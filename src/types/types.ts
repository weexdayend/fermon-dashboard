import {
  HomeIcon,
  User2Icon,
  WarehouseIcon,
  SatelliteIcon,
  TicketIcon,
  DatabaseIcon,
  Users2Icon
} from 'lucide-react'

export const sideLinks = [
  {
    imgURL: HomeIcon,
    route: "/home",
    label: "Home",
    desc: "Homepage of fermon dashboard, and all the data in here is accumulated from all the data sources."
  },
  {
    imgURL: DatabaseIcon,
    route: "/master",
    label: "Master Data",
    desc: "Master data is the data that is used to build the dashboard, and fermon-app."
  },
  {
    imgURL: SatelliteIcon,
    route: "/wilayah",
    label: "Wilayah",
    desc: "Wilayah is the data for Provinsi, Kota/Kabupaten and Kecamatan."
  },
  {
    imgURL: WarehouseIcon,
    route: "/mitra",
    label: "Mitra",
    desc: "Mitra is the data for Gudang Lini III, Distributor, Kios and Petani."
  },
  {
    imgURL: TicketIcon,
    route: "/laporan",
    label: "Laporan",
    desc: "Report of fermon dashboard, this report is submitted from fermon-app to tell us when there is a problem."
  },
  {
    imgURL: Users2Icon,
    route: "/user",
    label: "User",
    desc: "In this page you can manage your user account, from admin till pic."
  },
  {
    imgURL: User2Icon,
    route: "/profile",
    label: "Profile",
    desc: "Here is your profile page, you can update your profile here."
  }
];