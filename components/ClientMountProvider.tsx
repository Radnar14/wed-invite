"use client";

import { useState, useEffect } from "react";
import Loading from "@/app/loading";

export default function ClientMountProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [loading, setLoading] = useState(true);
    const overlayStyles: React.CSSProperties = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#e1c4bc",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99999,
    };

    useEffect(() => {
        // This executes strictly after the page mounts on the client side
        // Check if the page is already fully parsed and loaded
        if (document.readyState === "complete") {
            setLoading(false);
            console.log(`page fully loaded! IF!`);
        }
        else {
            // Otherwise, wait for the browser window load event
            const handleLoad = () => setLoading(false);
            window.addEventListener("load", handleLoad);

            console.log(`page fully loaded! ELSE!`);
            return () => window.removeEventListener("load", handleLoad);
        }
    }, []);

    if (!loading) return <>{children}</>;
    return (
        <div style={overlayStyles}>
            <Loading />
        </div>
    );
}