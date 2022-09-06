import { Container, Grid } from "@mui/material";
import React from "react";

import PresaleSection from "./PresaleSection";
import TokenSection from "./TokenSection";

const Home = ({ setOpenBackdrop, handleOpenModal }) => {
	return (
		<>
			<Container>
				<Grid container spacing={5} mt={5}>
					<Grid item md={6} sm={12}>
						<PresaleSection
							setOpenBackdrop={setOpenBackdrop}
							handleOpenModal={handleOpenModal}
						/>
					</Grid>
					<Grid item md={6} sm={12}>
						<TokenSection />
					</Grid>
				</Grid>
			</Container>
		</>
	);
};

export default Home;
