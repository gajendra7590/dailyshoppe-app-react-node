import DashboardAnalytics from "./DashboardAnalytics";
import DashboardRecentOrders from "./DashboardRecentOrders";
import DashboardStates from "./DashboardStates";
import { getUser } from '../../../utils/auth'

export default function Dashboard() {
    const user = getUser();
    return (
        <div className="p-6">

            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    Dashboard
                </h1>
                <p className="text-gray-500">
                    Welcome back {user?.name} 👋
                </p>
            </div>

            {/* Stats */}
            <DashboardStates />

            {/* Analytics */}
            <DashboardAnalytics />

            {/* Recent Orders */}
            <DashboardRecentOrders />

        </div>
    );
}