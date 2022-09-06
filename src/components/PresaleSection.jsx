import { Box, IconButton, InputBase, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { formatUnits, parseUnits } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";
import { MaxUint256 } from "@ethersproject/constants";

import bnbicon from "../assets/bndicon.png";
import { usePresaleContract, useTokenContract } from "../contract/hooks";
import { toast } from "react-toastify";

const PresaleSection = ({ handleOpenModal, setOpenBackdrop }) => {
	const { isConnected, address } = useAccount();

	let presaleContract = usePresaleContract();
	let tokenContract = useTokenContract();
	const [tokenDecimals, settokenDecimals] = useState();
	const [tokensAmount, settokensAmount] = useState("");
	const [tokenValue, setTokenValue] = useState();
	let bnbDecimal = 18;

	function calculateGasMargin(value) {
		return +(
			(value * BigNumber.from(10000).add(BigNumber.from(1000))) /
			BigNumber.from(10000)
		).toFixed(0);
	}
	//CalculatePayableGas
	const gasEstimationPayable = async (account, fn, data, amount) => {
		console.log(data, "data");
		if (account) {
			const estimateGas = await fn(...data, MaxUint256).catch(() => {
				return fn(...data, { value: amount.toString() });
			});
			console.log(calculateGasMargin(estimateGas));
			return calculateGasMargin(estimateGas);
		}
	};

	// const gasEstimationForAll = async (account, fn, data) => {
	// 	console.log(data, "data");
	// 	if (account) {
	// 		const estimateGas = await fn(...data, MaxUint256).catch(() => {
	// 			return fn(...data);
	// 		});
	// 		return calculateGasMargin(estimateGas);
	// 	}
	// };

	const bnbToToken = async () => {
		try {
			setOpenBackdrop(true);
			let amount = parseUnits(
				tokensAmount.toString(),
				bnbDecimal.toString()
			).toString();
			let token = await presaleContract.bnbToToken(amount);
			token = formatUnits(
				token.toString(),
				tokenDecimals.toString()
			).toString();
			setTokenValue(parseFloat(token).toFixed(0));
			setOpenBackdrop(false);
		} catch (error) {
			setOpenBackdrop(false);
			toast(error);
		}
	};

	const buyHandler = async () => {
		if (!isConnected) {
			toast.error("Please connect Wallet");
		} else if (tokensAmount === "") {
			toast.error("Please Enter Amount");
		} else if (tokensAmount === "0") {
			toast.error("Please Enter Amount");
		} else {
			try {
				setOpenBackdrop(true);
				let fn = presaleContract.estimateGas.buyToken;
				let data = [];
				const tx1 = await presaleContract.buyToken({
					value: parseUnits(tokensAmount.toString()),
					gasLimit: gasEstimationPayable(
						address,
						fn,
						data,
						parseUnits(tokensAmount.toString())
					),
				});
				await tx1.wait();
				setOpenBackdrop(false);
			} catch (error) {
				setOpenBackdrop(false);
				if (error?.data?.message) {
					toast.error(error?.data?.message);
				} else {
					toast.error(error?.message);
				}
			}
		}
	};

	useEffect(() => {
		async function value() {
			let dec = await tokenContract.decimals();
			settokenDecimals(dec.toString());
			if (isConnected && tokensAmount) bnbToToken();
		}
		value();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tokensAmount]);

	return (
		<>
			<Box
				sx={{
					width: "100%",
					display: "flex",
					alignItems: "center",
					flexDirection: "column",
					background: "#333",
					borderRadius: "15px",
					border: "5px inset coral",
				}}
				py={5}
			>
				<Typography pb={2} variant="h5">
					Buy Token
				</Typography>
				<Paper
					component="form"
					sx={{
						p: "2px 4px",
						display: "flex",
						alignItems: "center",
						width: 380,
					}}
				>
					<InputBase
						sx={{
							ml: 1,
							flex: 2,
						}}
						placeholder="0.1"
						type="number"
						onChange={(e) => settokensAmount(e.target.value)}
					/>

					<IconButton
						color="primary"
						sx={{ p: "10px" }}
						aria-label="directions"
					>
						<img src={bnbicon} alt="bnbicon" />
					</IconButton>
				</Paper>
				<br />
				<Paper
					component="form"
					sx={{
						p: "2px 4px",
						display: "flex",
						alignItems: "center",
						width: 380,
					}}
				>
					<InputBase
						sx={{
							ml: 1,
							flex: 2,
						}}
						disabled
						value={tokenValue}
					/>

					<IconButton
						color="primary"
						sx={{ p: "10px" }}
						aria-label="directions"
					>
						<img src={bnbicon} alt="bnbicon" />
					</IconButton>
				</Paper>
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
								transformX: "100",
							},
						}}
						py={2}
						mt={2}
						px={5}
					>
						Wallet Connect
					</Box>
				) : (
					<Box
						onClick={buyHandler}
						sx={{
							border: "5px inset coral",
							borderRadius: "15px",
							transition: "0.5s all",
							pointerEvents: "pointer",
							cursor: "pointer",
							"&:hover": {
								background: "#F0CCB0",
								color: "#000",
								transformX: "100",
							},
						}}
						py={2}
						mt={2}
						px={5}
					>
						Buy
					</Box>
				)}
			</Box>
		</>
	);
};

export default PresaleSection;
