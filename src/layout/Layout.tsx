import { ReactNode } from "react";
import "./layout.css";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return <div className="body">{children}</div>;
}
