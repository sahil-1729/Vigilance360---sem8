export const metadata = {
    title: "Home - Open PRO",
    description: "Page description",
};

import PageIllustration from "@/components/page-illustration";
import Hero from "@/components/hero-home";
import Workflows from "@/components/workflows";
import Features from "@/components/features";
import Testimonials from "@/components/testimonials";
import Cta from "@/components/cta";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Home() {

    const sessionData = await getServerSession(authOptions);

    console.log('/test session data ', sessionData)

    if (!sessionData?.user?.name) {
        return <>
            You need to be logged in
        </>
    }
    return (
        <>
            <PageIllustration />
            WELCOME {sessionData.user.name}
            {/* <Hero /> */}
            {/* <Workflows /> */}
            {/* <Features /> */}
            {/* <Testimonials /> */}
            {/* <Cta /> */}
        </>
    );
}
