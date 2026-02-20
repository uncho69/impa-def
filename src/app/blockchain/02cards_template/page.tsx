import { TokenCard } from "@/components/TokenCard";
import { SimpleCard } from "@/components/SimpleCard";
import Placeholder from "@/assets/placeholder.svg";
import { CardContainer } from "@/components/CardContainer";

export default function Giochi() {
  return (
    <>
      <div className="flex flex-wrap justify-between lg:justify-evenly gap-3 py-5">
        <SimpleCard
          title={"Metamask"}
          subArray={[
            { icon: Placeholder, text: "" },
            { icon: Placeholder, text: "" },
          ]}
          subArrayTitle="Reti"
          externalLink="https://www.ciao.it"
          xPage="https://x.com/varpippo"
        />
      </div>
      <CardContainer>
        <TokenCard
          externalLink="https://www.ciao.it"
          xPage="https://x.com/varpippo"
          tokenId="bitcoin"
          year={2009}
          icon={Placeholder}
        />
        <TokenCard
          externalLink="https://www.ciao.it"
          xPage="https://x.com/varpippo"
          tokenId="bitcoin"
          year={2009}
          icon={Placeholder}
        />
      </CardContainer>
    </>
  );
}
