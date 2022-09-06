import { Backdrop, Box, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
// import { formatUnits } from "@ethersproject/units";
import { useTokenContract } from "../contract/hooks";
import Environment from "../contract/environment";
import { Dna } from "react-loader-spinner";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { toast } from "react-toastify";

const TokenSection = () => {
	const [tokenInfo, setTokenInfo] = useState({
		name: null,
		symbol: null,
		decimals: null,
		totalSupply: null,
	});

	const [copyState, setCopyState] = useState({
		value: Environment.TokenAddress,
		copied: false,
	});

	useEffect(() => {
		if (copyState.copied) toast("Copied!");
	}, [copyState]);

	const [openBackdrop, setOpenBackdrop] = useState(true);

	let tokenContract = useTokenContract();
	useEffect(() => {
		async function handleTokenContract() {
			let name = await tokenContract.name();
			let symbol = await tokenContract.symbol();
			let decimals = await tokenContract.decimals();
			let totalSupply = await tokenContract.totalSupply();
			// totalSupply = ethers.utils.formatUnits(totalSupply, 18);
			// totalSupply = (+totalSupply).toFixed(2);
			totalSupply = (+totalSupply).toLocaleString("fullwide", {
				useGrouping: false,
			});
			setTokenInfo({
				name: name,
				symbol: symbol,
				decimals: decimals,
				totalSupply: totalSupply,
			});
			setOpenBackdrop(false);
		}
		handleTokenContract();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
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
					Token Information
				</Typography>

				<Box
					sx={{
						width: "80%",
						display: "flex",
						justifyContent: "space-between",
						borderBottom: "1px solid white",
					}}
					mb={1}
				>
					<Typography>NAME</Typography>
					<Typography>{tokenInfo.name}</Typography>
				</Box>
				<Box
					sx={{
						width: "80%",
						display: "flex",
						justifyContent: "space-between",
						borderBottom: "1px solid white",
					}}
					mb={1}
				>
					<Typography>SYMBOL</Typography>
					<Typography>{tokenInfo.symbol}</Typography>
				</Box>
				<Box
					sx={{
						width: "80%",
						display: "flex",
						justifyContent: "space-between",
						borderBottom: "1px solid white",
					}}
					mb={1}
				>
					<Typography>DECIMALS</Typography>
					<Typography>{tokenInfo.decimals}</Typography>
				</Box>
				<Box
					sx={{
						width: "80%",
						display: "flex",
						justifyContent: "space-between",
						alignItems: "end",
						borderBottom: "1px solid white",
					}}
					mb={1}
				>
					<Typography>CONTRACT ADDRESS</Typography>
					<Typography sx={{ display: "flex", alignItems: "center" }}>
						{Environment.TokenAddress?.slice(0, 6) +
							"..." +
							Environment.TokenAddress?.slice(-4)}
						<CopyToClipboard
							text={copyState.value}
							onCopy={() => setCopyState({ copied: true })}
						>
							<IconButton>
								<ContentCopyIcon sx={{ fontSize: "16px" }} />
							</IconButton>
						</CopyToClipboard>
					</Typography>
				</Box>
				<Box
					sx={{
						width: "80%",
						display: "flex",
						justifyContent: "space-between",
						borderBottom: "1px solid white",
					}}
					mb={1}
				>
					<Typography>TOTAL SUPPLY</Typography>
					<Typography fontSize="12px">{tokenInfo.totalSupply}</Typography>
				</Box>
				<Box
					sx={{
						width: "80%",
						display: "flex",
						justifyContent: "space-between",
						borderBottom: "1px solid white",
					}}
					mb={1}
				>
					<Typography>TOKEN PRICE</Typography>
					<Typography>0.00000000617 BNB</Typography>
				</Box>
				<Box
					sx={{
						width: "80%",
						display: "flex",
						justifyContent: "space-between",
						borderBottom: "1px solid white",
					}}
					mb={1}
				>
					<Typography>ACCESS TYPE</Typography>
					<Typography>PUBLIC</Typography>
				</Box>
			</Box>
		</>
	);
};

export default TokenSection;
