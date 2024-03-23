import { Header } from "./header";
import { BackButton } from "./back-button";
import {
    Card,
    CardFooter,
    CardHeader,
} from "../ui/card"

export const ErrorCard = () => {
  return (
    <div>
        <Card className="W-[400px] shadow-md">
            <CardHeader>
                <Header title="Auth" label="Oops! Something went wrong!" />
            </CardHeader>
            <CardFooter>
                <BackButton
                    label="Back to login"
                    href="/auth/login"
                />
            </CardFooter>
        </Card>
    </div>
  );
};