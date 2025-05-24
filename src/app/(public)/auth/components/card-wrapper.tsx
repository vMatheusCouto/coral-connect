import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import AuthHeader from "./ui/auth-header"
import BackButton from "./ui/back-button"
import { Button } from "@/components/ui/button"

interface CardWrapperProps {
    label: string,
    title: string,
    backButtonHref: string,
    backButtonLabel: string,
    children: React.ReactNode,
    type: boolean,
    setType: Function,
}

const CardWrapper = ({label, title, backButtonHref, backButtonLabel, children, type, setType}: CardWrapperProps) => {
    return (
        <Card className="xl:w-1/4 md:w-1/2 shadow-md max-w-[800px] bg-background max-sm:w-11/12 border-zinc-900 transition-all ease-in-out duration-700">
            <CardHeader>
                <AuthHeader label={label} title={title}/>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter className="flex-col">
                <BackButton label={backButtonLabel} href={backButtonHref} type={type} setType={setType}/>
            </CardFooter>
        </Card>
    )
}

export default CardWrapper