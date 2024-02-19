import { FaWarehouse } from "react-icons/fa6";
import { BiSolidDonateBlood } from "react-icons/bi";
import { FaHospital } from "react-icons/fa";
export const userMenu = [
    {
        name: "Inventory",
        path: "/",
        icon: <FaWarehouse />
    }, {
        name: "Donar",
        path: "/donar",
        icon: <BiSolidDonateBlood />
    }, {
        name: "Hospital",
        path: "/hospital",
        icon: <FaHospital />
    }, {
        name: "Organisation",
        path: "/organisation",
        icon: <FaHospital />
    }
]

