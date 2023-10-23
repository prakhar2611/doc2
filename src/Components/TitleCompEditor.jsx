import { Heading } from "@radix-ui/themes";

 export default function TitleCompEditor({title}) {
    return( 
    <div>
        <Heading as="h3">{title}</Heading>
    </div>
    )
 }