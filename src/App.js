import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Backdrop } from "@mui/material";
import { Dna } from "react-loader-spinner";
import ConnectModal from "./components/ConnectModal";
import { useAccount, useConnect } from "wagmi";

function App() {
	const { error, isLoading } = useConnect();
	const { isConnected } = useAccount();

	const [openBackdrop, setOpenBackdrop] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);

	useEffect(() => {
		if (isLoading) setOpenBackdrop(true);
		if (error) {
			setOpenBackdrop(false);
			toast(error.message);
		}
		if (isConnected) {
			setOpenModal(false);
			setOpenBackdrop(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading, isConnected]);

	return (
		<>
			<ToastContainer />
			<ConnectModal openModal={openModal} handleCloseModal={handleCloseModal} />
			<Backdrop
				sx={{
					color: "#fff",
					zIndex: (theme) => theme.zIndex.drawer + 1000,
				}}
				open={openBackdrop}
			>
				<Dna
					visible={true}
					height="80"
					width="80"
					ariaLabel="dna-loading"
					wrapperStyle={{}}
					wrapperClass="dna-wrapper"
				/>
			</Backdrop>
			<Header
				setOpenBackdrop={setOpenBackdrop}
				handleOpenModal={handleOpenModal}
				setOpenModal={setOpenModal}
			/>
			<Home
				setOpenBackdrop={setOpenBackdrop}
				handleOpenModal={handleOpenModal}
			/>
		</>
	);
}

export default App;
