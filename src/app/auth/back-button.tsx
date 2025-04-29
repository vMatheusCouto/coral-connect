import { Button } from "@/components/ui/button"
import Link from "next/link"

interface BackButtonProps {
    label: string,
    href: string
}

const BackButton = ({label, href}: BackButtonProps) => {
  return (
    <Button variant="link" className="font-light w-full text-white" size="sm" asChild>
        <Link href={href}>
            {label}
        </Link>
    </Button>
  )
}

export default BackButton