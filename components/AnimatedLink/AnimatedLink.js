import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { animatePageOut } from "@/utils/animations";

export default function AnimatedLink(props) {
  const router = useRouter();
  const currentPath = usePathname();
  const handleClick = (e) => {
    e.preventDefault();
    if (currentPath !== props.href) {
      animatePageOut(props.href, router);
    }
  };

  return (
    <Link onClick={handleClick} {...props}>
      {props.children}
    </Link>
  );
}
