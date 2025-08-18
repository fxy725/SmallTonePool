import { Metadata } from "next";

export const metadata: Metadata = {
    title: "关于我 - 小石潭记",
    description: "了解小石潭记博主的技术背景和分享理念",
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}