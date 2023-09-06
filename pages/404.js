import {
    Box,
    Button
} from "@mui/material";
import Link from "next/link";

export default function Custom404() {
    return <Box sx = {
            {
                display: 'flex',
                justifyContent: 'space-around',
                flexDirection: 'column',
                alignItems: 'center'
            }
        } >
        <
        h1 > 404 - Page Not Found < /h1>   <
        Link href = "/auth/login" >
        <
        Button variant = "contained" > Login < /Button> <
        /Link> <
        /Box>
}