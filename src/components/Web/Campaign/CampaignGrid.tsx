import FadeUpCard from '@/src/animations/FadeButtomUp'
import React, { useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useInView } from 'framer-motion';
import { useRouter } from 'next/navigation';
import CustomLoader from '../../UI/web/Loader/CustomLoader';
import CampaignCard from './CampaignCard';
import { useFetchAllCampaigns } from '@/src/hooks/web/useCampaigns';


const CampaignGrid = () => {
    const router = useRouter();
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const [page, setPage] = useState(1);
    const { data, isLoading, isError }: any = useFetchAllCampaigns(page, 8);
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    const campaignsToDisplay = useMemo(() => {
        if (!(data as any)?.campaigns) return [];
        return (data as any).campaigns.map((campaign: any) => ({
            id: campaign._id || campaign.id,
            image: campaign.images?.[0] || "/default-image.jpg",
            category: campaign.category,
            title: campaign.title,
            description: campaign.description,
            progress: (campaign.raisedAmount / campaign.goalAmount) * 100,
            raised: `$${campaign.raisedAmount}`,
            goal: `$${campaign.goalAmount}`,
        }));
    }, [data]);

    const { t } = useTranslation();

    const handleCardClick = (id?: string) => {
        if (!id) return;
        router.push(`/campaign/${id}`);
    };

    return (
        <section ref={sectionRef} className="relative py-20 min-h-[500px] overflow-hidden">
            <div className="container mx-auto px-4 max-w-7xl ">
                <FadeUpCard delay={0.3}>
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center mb-6">
                            <i className="text-xl mr-2 text-green hand-icon"></i>
                            <span className={`text-green font-caveat font-bold ${t("Start Donating Poor People").length > 25
                                ? "text-lg sm:text-xl md:text-2xl"
                                : "text-2xl"
                                }`}>
                                {t("Start Donating Poor People")}
                            </span>
                        </div>
                        <h2 className={`font-extrabold font-nunito leading-tight mb-8 ${t("Be The Reason Of Someone").length > 20
                            ? "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
                            : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                            }`}>
                            <span className="text-dark-green font-extrabold">{t("Be The Reason Of Someone")} </span>
                            <br />
                            <span className="text-yellow-400 font-extrabold">{t("Smiles")} </span>
                            <span className="text-dark-green font-extrabold">{t("Causes")}</span>
                            
                        </h2>
                    </div>
                </FadeUpCard>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {isLoading ? (
                        <div className="col-span-full text-center py-8">
                           <CustomLoader />
                        </div>
                    ) : isError ? (
                        <div className="col-span-full text-center py-8">
                            <p className="text-red">Failed to load campaigns. Please try again.</p>
                        </div>
                    ) : (
                        campaignsToDisplay.map((card: any, index: number) => (
                            <FadeUpCard key={card.id || index} delay={index * 0.2}>
                                <CampaignCard
                                    card={card}
                                    isInView={isInView}
                                    hoveredCard={hoveredCard}
                                    onMouseEnter={setHoveredCard}
                                    onMouseLeave={() => setHoveredCard(null)}
                                    onCardClick={handleCardClick}
                                />
                            </FadeUpCard>
                        ))
                    )}
                </div>
            </div>
        </section>
    )
}

export default CampaignGrid
