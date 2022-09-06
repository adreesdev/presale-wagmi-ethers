import { Box, Modal, Typography } from "@mui/material";
import React from "react";
import { useConnect } from "wagmi";

const ConnectModal = ({ openModal, handleCloseModal }) => {
	const { connect, connectors } = useConnect();

	return (
		<>
			<Modal
				open={openModal}
				onClose={handleCloseModal}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Box
					sx={{
						background: "#333",
						display: "flex",
						flexDirection: "column",
						borderRadius: "15px",
						border: "5px inset coral",
					}}
					p={2}
				>
					<Typography textAlign={"center"} py={2}>
						Wallet Connect
					</Typography>
					{connectors.map((connector) => (
						<Box
							key={connector.id}
							disabled={!connector.ready}
							onClick={() => connect({ connector })}
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
							mt={1}
							px={5}
						>
							{connector.name}
						</Box>
					))}
				</Box>
			</Modal>
		</>
	);
};

export default ConnectModal;
