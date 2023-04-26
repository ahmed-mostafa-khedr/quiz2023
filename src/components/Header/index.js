import React, { useState } from "react";
import { Menu, Button } from "semantic-ui-react";
import Logo from "./logo-header.png";

const Header = () => {
  const [promptEvent, setPromptEvent] = useState(null);
  const [appAccepted, setAppAccepted] = useState(false);

  // let isAppInstalled = false;

  // if (window.matchMedia("(display-mode: standalone)").matches || appAccepted) {
  //   isAppInstalled = true;
  // }

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    setPromptEvent(e);
  });

  // const installApp = () => {
  //   promptEvent.prompt();
  //   promptEvent.userChoice.then((result) => {
  //     if (result.outcome === "accepted") {
  //       setAppAccepted(true);
  //       console.log("User accepted the A2HS prompt");
  //     } else {
  //       console.log("User dismissed the A2HS prompt");
  //     }
  //   });
  // };

  return (
    <Menu stackable inverted size="small" style={{ borderRadius: "0px" }}>
      <Menu.Item header>
        <img alt="logo" src={Logo} style={{ width: "120px" }} />
        {/*<h6
          style={{
            color: "#ccc",
            marginBottom: "-30px",
            marginRight: "-15px",
            fontSize: "10px",
            fontFamily: "initial",
          }}
        >
          &copy; T.I.T.Solutions
        </h6> */}
      </Menu.Item>
      {/*promptEvent && !isAppInstalled && (
        <Menu.Item position="right">
          <Button
            color="teal"
            icon="cloud download"
            labelPosition="left"
            content="Install App"
            onClick={installApp}
          />
        </Menu.Item>
      )*/}
    </Menu>
  );
};

export default Header;

/*
 
*/
