export interface Question {
  id: string;
  tag: string;
  question: string;
  options: string[];
  correctIndex: number; // 0 for A, 1 for B, 2 for C, 3 for D
  explanation: string;
  image?: string;
}

export const questions: Question[] = [
  {
    id: "fermah-core-focus",
    tag: "01 · Core Focus",
    question: "What is Fermah's primary architectural focus in the Zero-Knowledge (ZK) ecosystem?",
    options: [
      "Designing new cryptographic proving systems and arithmetic schemes",
      "A decentralized network optimizing the physical generation of proofs across heterogeneous hardware",
      "Building general-purpose L1 blockchains with built-in consensus mechanisms",
      "Operating a centralized cloud platform specifically for compiling smart contracts"
    ],
    correctIndex: 1,
    explanation: "Fermah does not design proving systems (like Groth16 or Halo2); instead, it acts as a decentralized coordination network matching proof requests to specialized hardware operators (GPUs, FPGAs) to achieve maximum cost and latency efficiency.",
    image: "/src/assets/images/zk_hardware_cluster_1783027970975.jpg"
  },
  {
    id: "network-matching",
    tag: "02 · Network Matching",
    question: "How does the Fermah network match incoming proof generation requests with hardware operators?",
    options: [
      "By selecting the operator with the highest amount of staked utility tokens regardless of latency",
      "Through manual operator queues where users manually negotiate hardware pricing off-chain",
      "By dynamically matching proof requirements (system type, latency, cost) to the optimal GPU/FPGA operator profiles",
      "Using a round-robin scheduler that distributes all proof tasks equally without hardware awareness"
    ],
    correctIndex: 2,
    explanation: "The Fermah protocol dynamically matches the specific requirements of a proof (like proof system, desired SLA, and target cost) to operators holding the precise hardware configuration (GPUs, FPGAs, ASICs) needed for optimal execution.",
    image: "/src/assets/images/digital_neon_network_1783027983139.jpg"
  },
  {
    id: "zksync-integration",
    tag: "03 · Production Proof Point",
    question: "Which major scaling ecosystem serves as a real-world, production-level proof point for Fermah's proving capabilities?",
    options: [
      "Solana's Sealevel runtime engine",
      "ZKsync, validating decentralized proof generation for high-throughput Elastic Chains",
      "Cosmos Inter-Blockchain Communication (IBC) hubs",
      "The Bitcoin Lightning Network state channels"
    ],
    correctIndex: 1,
    explanation: "ZKsync has integrated with Fermah to validate its decentralized proof-generation model, demonstrating that heavy production-grade workloads for ZK-rollups can be trustlessly delegated to a shared network.",
    image: "/src/assets/images/zk_hardware_cluster_1783027970975.jpg"
  },
  {
    id: "fermah-kernel",
    tag: "04 · Smart Contract Agency",
    question: "What is the primary role of the 'Fermah Kernel' within the protocol's architecture?",
    options: [
      "A localized command-line interface used solely for compiling circuits",
      "A software kernel installed on hardware operators to overclock GPU memory",
      "An onchain smart contract agency that automates, orchestrates, and verifies cross-chain proof workflows",
      "A private peer-to-peer network for sharing encrypted transaction payloads"
    ],
    correctIndex: 2,
    explanation: "The Fermah Kernel is a smart-contract-based coordination engine. It acts as an autonomous agency, orchestrating how proofs are requested, verified onchain, and integrated back into calling applications.",
    image: "/src/assets/images/glowing_smart_kernel_1783027996098.jpg"
  },
  {
    id: "kernel-replaces",
    tag: "05 · Replaced Infrastructure",
    question: "What traditional, fragile off-chain infrastructure does the Fermah Kernel replace for dApp developers?",
    options: [
      "Centralized databases like PostgreSQL or MySQL",
      "Custom off-chain servers, automated keeper bots, and direct private key dependencies for proof submission",
      "The physical storage drives of hardware operators",
      "The frontend hosting providers and domain registries"
    ],
    correctIndex: 1,
    explanation: "By embedding proof orchestration directly onchain, the Kernel removes the need for developers to maintain fragile keeper bots, custom off-chain cron servers, or private keys to monitor and submit proofs.",
    image: "/src/assets/images/glowing_smart_kernel_1783027996098.jpg"
  },
  {
    id: "flashcast-social",
    tag: "06 · Kernel-Powered Product",
    question: "Which high-speed prediction market application serves as a prime showcase for the Fermah Kernel's orchestration?",
    options: [
      "Flashcast Social",
      "Polymarket Classic",
      "Augur v2 Core",
      "Fermah Betting Terminal"
    ],
    correctIndex: 0,
    explanation: "Flashcast Social is a high-performance, community-focused prediction market application designed specifically to showcase the autonomous orchestration and speed of the Fermah Kernel.",
    image: "/src/assets/images/hyper_speed_dashboard_1783028008170.jpg"
  },
  {
    id: "creation-speed",
    tag: "07 · Market Creation Speed",
    question: "What is the approximate market creation and resolution speed demonstrated by Flashcast using Fermah?",
    options: [
      "Approximately 24 hours due to multi-signature consensus steps",
      "Roughly 3 seconds, proving near-instant, verifiable on-chain markets are viable",
      "About 45 minutes to accommodate block confirmations on Ethereum Mainnet",
      "Over 12 hours to allow manual dispute windows to clear"
    ],
    correctIndex: 1,
    explanation: "Flashcast demonstrates market creation and automated resolution in approximately 3 seconds, showcasing how high-speed proof-generation infrastructure unlocks real-time ZK use cases.",
    image: "/src/assets/images/hyper_speed_dashboard_1783028008170.jpg"
  },
  {
    id: "onchain-resolution",
    tag: "08 · Resolution Model",
    question: "Unlike traditional prediction markets, how does a Kernel-powered market achieve secure, trustless resolution?",
    options: [
      "By relying on a centralized committee of multi-sig signers to manually vote",
      "Through onchain cryptographic proof generation and resolution, bypassing long dispute windows",
      "By taking a simple average of Web2 social media sentiment API endpoints",
      "Using an optimistic challenge period that delays user withdrawals for 7 to 14 days"
    ],
    correctIndex: 1,
    explanation: "Kernel-powered markets use onchain proof generation and verification of specific oracle data or state inputs to resolve markets instantly and cryptographically, eliminating dispute windows and subjective committees.",
    image: "/src/assets/images/digital_neon_network_1783027983139.jpg"
  },
  {
    id: "infrastructure-undervalued",
    tag: "09 · Economic Thesis",
    question: "Why is decentralized, commodity-grade proof-generation infrastructure currently viewed as highly undervalued?",
    options: [
      "Because ZK-rollups are planning to deprecate proofs entirely in favor of optimistic execution",
      "Because proof generation has zero latency impact on finality speeds",
      "Because compute-heavy provers are the ultimate bottleneck to ZK scaling, and a unified network drastically lowers cost while maximizing hardware utilization",
      "Because ASIC manufacturers have made GPU and FPGA hardware obsolete for ZK proving"
    ],
    correctIndex: 2,
    explanation: "Proof-generation is highly compute-intensive and costly, serving as the core bottleneck to finality and scale in ZK. A unified network commoditizes this compute, driving down costs and ensuring massive hardware efficiency.",
    image: "/src/assets/images/zk_hardware_cluster_1783027970975.jpg"
  },
  {
    id: "synthesis-thesis",
    tag: "10 · Unified Thesis",
    question: "How do the Proving Network, Fermah Kernel, and Flashcast synthesize into one cohesive thesis?",
    options: [
      "They demonstrate that decentralized storage is more important than proof generation",
      "They show that ZK applications can only run on centralized physical private servers",
      "They prove that combining hardware-efficient supply, smart contract orchestration, and ultra-fast end-user products unlocks a new class of real-time, trustless ZK dApps",
      "They prove that prediction markets should be isolated from smart contracts"
    ],
    correctIndex: 2,
    explanation: "The synthesis is powerful: the Network provides cheap/fast proof compute; the Kernel orchestrates it autonomously onchain; and Flashcast demonstrates the end-user reality—fully trustless, real-time applications.",
    image: "/src/assets/images/glowing_smart_kernel_1783027996098.jpg"
  }
];
