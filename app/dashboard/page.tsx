export const metadata = {
    title: "Dashboard - Vigilance360",
    description: "Real-time surveillance monitoring system",
};

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Suspense } from "react";

// Import dashboard components
import DashboardHeader from "@/components/dashboard/header";
import CameraGrid from "@/components/dashboard/camera-grid";
import AlertsPanel from "@/components/dashboard/alerts-panel";
import StatisticsPanel from "@/components/dashboard/statistics-panel";
import SideNavigation from "@/components/dashboard/side-navigation";
import LoadingSpinner from "@/components/ui/loading-spinner";

export default async function Dashboard() {
    const sessionData = await getServerSession(authOptions);

    if (!sessionData?.user?.name) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-900">
                <div className="bg-slate-800 p-8 rounded-lg shadow-lg text-white">
                    <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
                    <p className="mb-4">You need to be logged in to access the surveillance dashboard.</p>
                    <a href="/login" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition duration-150 ease-in-out">
                        Login
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-slate-900 text-white">
            {/* Sidebar navigation */}
            <SideNavigation userName={sessionData.user.name} />

            {/* Main content area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Dashboard header */}
                <DashboardHeader userName={sessionData.user.name} />

                {/* Main dashboard content */}
                <main className="flex-1 overflow-y-auto p-4">
                    <div className="container mx-auto">
                        {/* Statistics overview */}
                        <div className="mb-6">
                            <Suspense fallback={<LoadingSpinner />}>
                                <StatisticsPanel />
                            </Suspense>
                        </div>

                        {/* Camera and alerts section */}
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                            {/* Camera feeds - takes 3/4 of the width on larger screens */}
                            <div className="lg:col-span-3">
                                <Suspense fallback={<LoadingSpinner />}>
                                    <CameraGrid />
                                </Suspense>
                            </div>

                            {/* Alerts panel - takes 1/4 of the width on larger screens */}
                            <div className="lg:col-span-1">
                                <Suspense fallback={<LoadingSpinner />}>
                                    <AlertsPanel />
                                </Suspense>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
