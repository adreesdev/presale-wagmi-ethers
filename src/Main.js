import {
	WagmiConfig,
	createClient,
	defaultChains,
	configureChains,
} from "wagmi";

// import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";

import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import App from "./App";

const {
	chains,
	provider,
	// webSocketProvider
} = configureChains(defaultChains, [
	// infuraProvider({ apiKey: "yourInfuraApiKey" }),
	publicProvider(),
]);

// Set up client
const client = createClient({
	autoConnect: true,
	connectors: [
		new MetaMaskConnector({ chains }),
		new CoinbaseWalletConnector({
			chains,
			options: {
				appName: "wagmi",
			},
		}),
		new WalletConnectConnector({
			chains,
			options: {
				qrcode: true,
			},
		}),
		new InjectedConnector({
			chains,
			options: {
				name: "Injected",
				shimDisconnect: true,
			},
		}),
	],
	provider,
	// webSocketProvider,
});

// Pass client to React Context Provider
function Main() {
	return (
		<WagmiConfig client={client}>
			<App />
		</WagmiConfig>
	);
}

export default Main;
