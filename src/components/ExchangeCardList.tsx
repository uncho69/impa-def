"use client";

import { CardContainer } from "./CardContainer";
import { SimpleCard } from "./SimpleCard";
import Placeholder from "@/assets/placeholder.svg";
import coinbaseIcon from "@/assets/coinbasecex.png";
import krakenIcon from "@/assets/krakencex.png";
import binanceIcon from "@/assets/binancecex.png";
import cryptoIcon from "@/assets/cryptocomex.png";
import holyheldIcon from "@/assets/holyheldcex.png";
import wirexIcon from "@/assets/wirexcex.png";
import youngIcon from "@/assets/youngplatformcex.png";
import transakIcon from "@/assets/transakcex.png";
// import moonpayIcon from "@/assets/moonpaycex.png";
// import hyperbeatIcon from "@/assets/hyperbeatcex.png";

export function ExchangeCardList() {
      const exchanges = [
        {
          title: "Coinbase",
          href: "/compraevendicrypto/coinbase",
          icon: coinbaseIcon,
          description: "La più grande exchange di criptovalute quotata in borsa. Regolamentata e sicura con oltre 200 criptovalute supportate.",
          type: "CEX",
          website: "https://www.coinbase.com/",
          xProfile: "https://x.com/coinbase"
        },
        {
          title: "Kraken",
          href: "/compraevendicrypto/kraken",
          icon: krakenIcon,
          description: "Una delle exchange più rispettate e sicure al mondo. Fondata nel 2011, supporta oltre 230 criptovalute.",
          type: "CEX",
          website: "https://www.kraken.com/",
          xProfile: "https://x.com/krakenfx"
        },
        {
          title: "Binance",
          href: "/compraevendicrypto/binance",
          icon: binanceIcon,
          description: "La più grande exchange al mondo per volume di trading. Offre trading spot, futures e servizi DeFi.",
          type: "CEX",
          website: "https://www.binance.com",
          xProfile: "https://x.com/binance"
        },
        {
          title: "Crypto.com",
          href: "/compraevendicrypto/crypto",
          icon: cryptoIcon,
          description: "Piattaforma completa con exchange, carte di debito e servizi DeFi. Supporta oltre 250 criptovalute.",
          type: "CEX",
          website: "https://crypto.com/",
          xProfile: "https://x.com/cryptocom"
        },
        {
          title: "Holyheld",
          href: "/compraevendicrypto/holyheld",
          icon: holyheldIcon,
          description: "Banca digitale Web3 con carta di debito per spendere crypto nel mondo reale. Sicurezza avanzata e cashback.",
          type: "On-ramp",
          website: "https://holyheld.com/",
          xProfile: "https://x.com/holyheld"
        },
        {
          title: "Wirex",
          href: "/compraevendicrypto/wirex",
          icon: wirexIcon,
          description: "Piattaforma di pagamenti digitali con carta di debito. Supporta oltre 37 criptovalute con ricompense Cryptoback™.",
          type: "On-ramp",
          website: "https://wirexapp.com/",
          xProfile: "https://x.com/wirexapp"
        },
        {
          title: "Young Platform",
          href: "/compraevendicrypto/young",
          icon: youngIcon,
          description: "Exchange italiana user-friendly con servizi educativi. Ideale per principianti con Academy e Step per guadagnare crypto.",
          type: "CEX",
          website: "https://exchange.youngplatform.com/",
          xProfile: "https://x.com/youngplatform"
        },
        {
          title: "Transak",
          href: "/compraevendicrypto/transak",
          icon: transakIcon,
          description: "On-ramp fiat-crypto che permette acquisti diretti con carta. Supporta oltre 155 paesi con integrazione facile.",
          type: "On-ramp",
          website: "https://transak.com/",
          xProfile: "https://x.com/Transak"
        }
    // {
    //   title: "Moonpay",
    //   href: "/compraevendicrypto/moonpay",
    //   icon: moonpayIcon,
    //   description: "Piattaforma di acquisto crypto con carta di credito. Integrazione semplice per dApp e wallet.",
    //   type: "On-ramp"
    // },
    // {
    //   title: "Hyperbeat",
    //   href: "/compraevendicrypto/hyperbeat",
    //   icon: hyperbeatIcon,
    //   description: "Piattaforma di trading e servizi crypto. Soluzioni innovative per il trading di criptovalute.",
    //   type: "CEX"
    // }
  ];

      return (
        <CardContainer>
          {exchanges.map((exchange) => (
            <SimpleCard
              key={exchange.title}
              title={exchange.title}
              href={exchange.href}
              icon={exchange.icon}
              description={exchange.description}
              badgeText={exchange.type}
              badgeColor={exchange.type === 'CEX' ? 'blue' : 'green'}
              website={exchange.website}
              xProfile={exchange.xProfile}
            />
          ))}
        </CardContainer>
      );
}
