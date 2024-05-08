import {
  HomeIcon,
  User2Icon,
  WarehouseIcon,
  SatelliteIcon,
  TicketIcon,
  DatabaseIcon,
  Users2Icon
} from 'lucide-react'

export type Session = {
  // Define the structure of your session data here
  // For example:
  userId: string;
  username: string;
  // Add other fields as needed
};

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
];