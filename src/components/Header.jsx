import { Box, Container } from "@mui/material";
import React from "react";
import { useAccount, useDisconnect } from "wagmi";
import bnbicon from "../assets/bndicon.png";

const Header = ({ handleOpenModal }) => {
	const { address, isConnected } = useAccount();
	const { disconnect } = useDisconnect();

	return (
		<>
			<Container>
				<Box sx={{ display: "flex", justifyContent: "space-between" }} py={3}>
					<img src={bnbicon} alt="bnbicon" width="70px" />
					{!isConnected ? (
						<Box
							onClick={handleOpenModal}
							sx={{
								border: "5px inset coral",
								borderRadius: "15px",
								transition: "0.5s all",
								pointerEvents: "pointer",
								cursor: "pointer",
								"&:hover": {
									background: "#F0CCB0",
									color: "#000",
								},
							}}
							py={2}
							px={5}
						>
							Connect
						</Box>
					) : (
						<Box
							onClick={disconnect}
							sx={{
								border: "5px inset coral",
								borderRadius: "15px",
								transition: "0.5s all",
								pointerEvents: "pointer",
								cursor: "pointer",
								"&:hover": {
									background: "#F0CCB0",
									color: "#000",
								},
							}}
							py={2}
							px={5}
						>
							{address?.slice(0, 6) + "..." + address?.slice(-4)}
						</Box>
					)}
				</Box>
			</Container>
		</>
	);
};

export default Header;
