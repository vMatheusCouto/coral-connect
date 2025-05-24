import { Button } from "@/components/ui/button"
import Link from "next/link"

interface BackButtonProps {
    label: string,
    href: string,
    type: boolean,
    setType: Function,
}

const BackButton = ({label, href, type, setType}: BackButtonProps) => {
  return (
    <Button onClick={() => setType(!type)} variant="link" className="font-light w-full text-white" size="sm">
      {label}
    </Button>
  )
}

export default BackButton