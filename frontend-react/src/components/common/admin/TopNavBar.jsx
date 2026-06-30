import { Outlet, Link } from "react-router";
import { getUser } from "../../../utils/auth";

export default function TopNavBar() {
    const user = getUser();
    return (
        <header className="h-16 bg-white border-b px-6 flex items-center justify-between">
            <h2 className="font-semibold text-lg"> Admin Panel </h2>
            <div className="flex items-center gap-4">
                <span> {user?.name} </span>
                <img src={user?.avatar} alt="" className="w-10 h-10 rounded-full" />
            </div>
        </header>
    )
}
