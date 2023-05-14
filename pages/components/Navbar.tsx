import { Box, Button, Grid } from "@mui/material"
import VideocamIcon from "@mui/icons-material/Videocam"
import { useStoreTemporary } from "@/pages/zustand"
import { memo } from "react"
import { auth } from "../firebaseX"
import AccountMenu from "../auth/User/SignOut"

const Navbar = () => {
  const { classInfo } = useStoreTemporary()
  return (
    <Grid
      item
      xs={12}
      style={{
        // background: "#5f6ac4",
        color: "white",
        padding: "0px 10px",
        borderRadius: 5,
        maxWidth: "none",
        alignItems: "center",
        marginBottom: 20,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <h2 style={{ color: "#32325d", marginLeft: 2 }}>
          {auth?.currentUser
            ? "Hello, " + auth?.currentUser?.displayName + " 🙂"
            : "Hello"}
        </h2>
        <p style={{ color: "#32325d", marginLeft: 2 }}>
          {classInfo?.class_name}
        </p>
      </Box>
      <Box display="flex" alignItems="center">
        <a
          target="_blank"
          rel="noreferrer"
          href={`http://teleport.video/sakinah/yaseenavgani`}
        >
          <Button
            style={{
              marginRight: 5,
              textTransform: "none",
              background: "#5f61c4",
              color: "white",
              fontSize: 12,
              fontWeight: "600",
              padding: "5px 10px",
            }}
          >
            <VideocamIcon
              style={{
                color: "white",
                marginRight: 6,
              }}
            />{" "}
            Video Call
          </Button>
        </a>
        <AccountMenu />
      </Box>
    </Grid>
  )
}

export default Navbar
