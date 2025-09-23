"use client";

import React, { useEffect, useState, useMemo, JSX } from "react";
import { MemberFormValues } from "@/src/utils/validations/FormValidation";
import { motion } from "framer-motion";
import { LucideCircleCheckBig } from "lucide-react";
import Button from "../../common/Buttons/Button";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

interface MemberPreviewProps {
    data: MemberFormValues & { createdAt?: string };
    onSubmit: () => void;
    onBack: () => void;
}

const MemberPreview = ({ data, onSubmit, onBack }: MemberPreviewProps) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const {
        name,
        position,
        title,
        description,
        about,
        keyPoints = [],
        facebookUrl,
        twitterUrl,
        instagramUrl,
        linkedInUrl,
    } = data;

    // Icon base class
    const socialIconClass =
        "text-white bg-blue-50 hover:bg-yellow rounded-full p-2 size-10 hover:scale-110 transition";

    const socialLinks = useMemo(
        () =>
            [
                { url: facebookUrl, icon: <FaFacebook className={socialIconClass} /> },
                { url: twitterUrl, icon: <FaTwitter className={socialIconClass} /> },
                { url: instagramUrl, icon: <FaInstagram className={socialIconClass} /> },
                { url: linkedInUrl, icon: <FaLinkedin className={socialIconClass} /> },
            ].filter((link): link is { url: string; icon: JSX.Element } => !!link.url),
        [facebookUrl, twitterUrl, instagramUrl, linkedInUrl]
    );

    // ✅ Handle image preview
    useEffect(() => {
        if (!data.image) return;

        let preview: string;

        if (typeof data.image === "string") {
            preview = data.image;
        } else if (data.image instanceof File || data.image instanceof Blob) {
            preview = URL.createObjectURL(data.image);
        } else {
            return;
        }

        setImagePreview(preview);

        return () => {
            if (preview.startsWith("blob:")) URL.revokeObjectURL(preview);
        };
    }, [data.image]);

    return (
        <motion.div
            className="bg-white lg:px-6 py-8 max-w-4xl mx-auto font-sans text-black"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {/* Member Image */}
            {imagePreview && (
                <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-lime-green shadow-md">
                    <img src={imagePreview} alt={name} className="w-full h-full object-cover" />
                </div>
            )}

            {/* Name & Position */}
            <h2 className="text-2xl lg:text-3xl font-bold mb-2 text-center text-foreground">{name}</h2>
            <p className="text-lg text-center text-foreground/70 mb-6">
                {position}
            </p>

            {/* Title */}
            <h3 className="text-2xl font-bold mb-2 text-foreground">{title ? `${title}` : ""}</h3>

            {/* About / Description */}
            <div className="space-y-4 text-foreground/70 font-[400] text-md leading-relaxed mb-8">
                <p>{description}</p>
                {about && <p>{about}</p>}
            </div>

            {/* Key Points */}
            {keyPoints.length > 0 && (
                <div className="mt-6">
                    <p className="font-bold text-lime-green mb-2">Key Highlights:</p>
                    <div className="grid sm:grid-cols-2 gap-2 ml-2">
                        {keyPoints.map((point, idx) => (
                            <p key={idx} className="flex items-start gap-2 text-foreground">
                                <LucideCircleCheckBig className="text-yellow h-5 w-5 mt-1" />
                                <span className="text-[16px]">{point}</span>
                            </p>
                        ))}
                    </div>
                </div>
            )}

            {/* Social Links */}
            {socialLinks.length > 0 && (
                <div className="mt-6">
                    <p className="font-bold text-lime-green mb-2">Social Links:</p>
                    <div className="flex gap-4">
                        {socialLinks.map((link, idx) => (
                            <a key={idx} href={link.url} target="_blank" rel="noreferrer">
                                {link.icon}
                            </a>

                        ))}
                    </div>
                </div>
            )}

            {/* Buttons */}
            <div className="mt-12 flex gap-6 justify-end md:w-fit mx-auto">
                <Button bgColor="bg-red" rounded="rounded-lg" hoverBg="before:bg-red-50" onClick={onBack}>
                    Back to Edit
                </Button>
                <Button rounded="rounded-lg" onClick={onSubmit} text="Submit" bgColor="bg-lime-green" hoverBg="before:bg-green" />
            </div>
        </motion.div>
    );
};

export default MemberPreview;
