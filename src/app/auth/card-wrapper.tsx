import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import AuthHeader from "./auth-header"
import BackButton from "./back-button"
import { Button } from "@/components/ui/button"

interface CardWrapperProps {
    label: string,
    title: string,
    backButtonHref: string,
    backButtonLabel: string,
    children: React.ReactNode
}

const CardWrapper = ({label, title, backButtonHref, backButtonLabel, children}: CardWrapperProps) => {
    return (
        <Card className="xl:w-1/4 md:w-1/2 shadow-md max-w-[800px] bg- border-zinc-900">
            <CardHeader>
                <AuthHeader label={label} title={title}/>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter className="flex-col">
                <Button type="submit" className="w-full cursor-pointer">Sign In</Button>
                <BackButton label={backButtonLabel} href={backButtonHref} />
            </CardFooter>
        </Card>
    )
}

export default CardWrapper