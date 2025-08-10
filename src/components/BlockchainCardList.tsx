import { CardContainer } from "./CardContainer";
import { SimpleCard } from "./SimpleCard";
import Placeholder from "@/assets/placeholder.svg";
import btcIcon from "@/assets/bitcoin-icon.svg";
import ethIcon from "@/assets/ethereum-icon.svg";
import solIcon from "@/assets/solana-sol-logo.svg";
import arbIcon from "@/assets/arbitrum-arb-logo.svg";
import polIcon from "@/assets/polygon-matic-logo.svg";
import degIcon from "@/assets/degen-base-degen-logo.svg";
import basIcon from "@/assets/base-logo.svg";
import optIcon from "@/assets/optimism-ethereum-op-logo.svg";
import zorIcon from "@/assets/zora-logo.png";
import hlqIcon from "@/assets/hyperliquid-logo.png";
import sclIcon from "@/assets/Scroll-Logo.svg";
import berIcon from "@/assets/berachain-logo.png";
import zksIcon from "@/assets/zkSync-logo.png";
import linIcon from "@/assets/linea-logo.svg";
import layIcon from "@/assets/layer3-logo.png";
import hlaIcon from "@/assets/hyperlane-logo.svg";
import blaIcon from "@/assets/blast-logo.webp";
import avaIcon from "@/assets/avalanche-avax-logo.svg";

export function BlockchainCardList() {
  return (
    <CardContainer gateOnExpand={true}>
      <SimpleCard
        icon={btcIcon}
        title={"Bitcoin"}
        subArray={[
          { icon: Placeholder, text: "" },
          { icon: Placeholder, text: "" },
        ]}
        href={"./blockchain/bitcoin"}
        externalLink="https://bitcoin.org"
        xPage="https://x.com/bitcoin"
      />
      <SimpleCard
        icon={ethIcon}
        title={"Ethereum"}
        subArray={[
          { icon: Placeholder, text: "" },
          { icon: Placeholder, text: "" },
        ]}
        href={"./blockchain/ethereum"}
        externalLink="https://ethereum.org/it/"
        xPage="https://x.com/ethereum"
      />
      <SimpleCard
        icon={solIcon}
        title={"Solana"}
        subArray={[
          { icon: Placeholder, text: "" },
          { icon: Placeholder, text: "" },
        ]}
        href={"./blockchain/solana"}
        externalLink="https://solana.com/"
        xPage="https://x.com/solana"
      />
      <SimpleCard
        icon={arbIcon}
        title={"Arbitrum"}
        subArray={[
          { icon: Placeholder, text: "" },
          { icon: Placeholder, text: "" },
        ]}
        href={"./blockchain/arbitrum"}
        externalLink="https://arbitrum.foundation/"
        xPage="https://x.com/arbitrum"
      />
      <SimpleCard
        icon={polIcon}
        title={"Polygon"}
        subArray={[
          { icon: Placeholder, text: "" },
          { icon: Placeholder, text: "" },
        ]}
        href={"./blockchain/polygon"}
        externalLink="https://polygon.technology/"
        xPage="https://x.com/0xPolygon"
      />
      <SimpleCard
        icon={basIcon}
        title={"Base"}
        subArray={[
          { icon: Placeholder, text: "" },
          { icon: Placeholder, text: "" },
        ]}
        href={"./blockchain/base"}
        externalLink="https://www.base.org/"
        xPage="https://x.com/base"
      />
      <SimpleCard
        icon={optIcon}
        title={"Optimism"}
        subArray={[
          { icon: Placeholder, text: "" },
          { icon: Placeholder, text: "" },
        ]}
        href={"./blockchain/optimism"}
        externalLink="https://www.optimism.io/"
        xPage="https://twitter.com/Optimism"
      />
      <SimpleCard
        icon={zorIcon}
        title={"Zora"}
        subArray={[
          { icon: Placeholder, text: "" },
          { icon: Placeholder, text: "" },
        ]}
        href={"./blockchain/zora"}
        externalLink="https://zora.co/"
        xPage="https://x.com/ourZORA"
      />
      <SimpleCard
        icon={Placeholder}
        title={"Sanko"}
        subArray={[
          { icon: Placeholder, text: "" },
          { icon: Placeholder, text: "" },
        ]}
        href={"./blockchain/sanko"}
        externalLink="https://sanko.xyz/"
        xPage="https://x.com/SankoGameCorp"
      />
      <SimpleCard
        icon={hlqIcon}
        title={"Hyperliquid"}
        subArray={[
          { icon: Placeholder, text: "" },
          { icon: Placeholder, text: "" },
        ]}
        href={"./blockchain/hyperliquid"}
        externalLink="https://hyperliquid.xyz/"
        xPage="https://twitter.com/HyperliquidX"
      />
      <SimpleCard
        icon={sclIcon}
        title={"Scroll"}
        subArray={[
          { icon: Placeholder, text: "" },
          { icon: Placeholder, text: "" },
        ]}
        href={"./blockchain/scroll"}
        externalLink="https://scroll.io/"
        xPage="https://x.com/Scroll_ZKP"
      />
      <SimpleCard
        icon={berIcon}
        title={"Berachain"}
        subArray={[
          { icon: Placeholder, text: "" },
          { icon: Placeholder, text: "" },
        ]}
        href={"./blockchain/berachain"}
        externalLink="https://www.berachain.com/"
        xPage="https://x.com/berachain"
      />
      <SimpleCard
        icon={zksIcon}
        title={"zkSync"}
        subArray={[
          { icon: Placeholder, text: "" },
          { icon: Placeholder, text: "" },
        ]}
        href={"./blockchain/zksync"}
        externalLink="https://zksync.io/"
        xPage="https://x.com/zksync"
      />
      <SimpleCard
        icon={linIcon}
        title={"Linea"}
        subArray={[
          { icon: Placeholder, text: "" },
          { icon: Placeholder, text: "" },
        ]}
        href={"./blockchain/linea"}
        externalLink="https://linea.build/"
        xPage="https://x.com/LineaBuild"
      />
      <SimpleCard
        icon={layIcon}
        title={"Layer3"}
        subArray={[
          { icon: Placeholder, text: "" },
          { icon: Placeholder, text: "" },
        ]}
        href={"./blockchain/layer3"}
        externalLink="https://layer3.xyz/"
        xPage="https://x.com/layer3xyz"
      />
      <SimpleCard
        icon={hlaIcon}
        title={"Hyperlane"}
        subArray={[
          { icon: Placeholder, text: "" },
          { icon: Placeholder, text: "" },
        ]}
        href={"./blockchain/hyperlane"}
        externalLink="https://www.hyperlane.xyz/"
        xPage="https://x.com/hyperlane"
      />
      <SimpleCard
        icon={polIcon}
        title={"Polygon zkEVM"}
        subArray={[
          { icon: Placeholder, text: "" },
          { icon: Placeholder, text: "" },
        ]}
        href={"./blockchain/polygon_zkEVM"}
        externalLink="https://polygon.technology/"
        xPage="https://x.com/0xpolygondefi"
      />
      <SimpleCard
        icon={degIcon}
        title={"Degen"}
        subArray={[
          { icon: Placeholder, text: "" },
          { icon: Placeholder, text: "" },
        ]}
        href={"./blockchain/degen"}
        externalLink="degen.tips"
        xPage="https://x.com/degentokenbase"
      />
      <SimpleCard
        icon={blaIcon}
        title={"Blast"}
        subArray={[
          { icon: Placeholder, text: "" },
          { icon: Placeholder, text: "" },
        ]}
        href={"./blockchain/blast"}
        externalLink="blast.io"
        xPage="https://x.com/Blast_L2"
      />
      <SimpleCard
        icon={avaIcon}
        title={"Avalanche"}
        subArray={[
          { icon: Placeholder, text: "" },
          { icon: Placeholder, text: "" },
        ]}
        href={"./blockchain/avalanche"}
        externalLink="https://www.avax.network/"
        xPage="https://x.com/avax"
      />
    </CardContainer>
  );
}
