const socialMediaData = {
    whatsapp: {
        number: "918768438506",
        profileUrl: "https://wa.me/918768438506",
        prefilledUrl: (msg: string) => `https://wa.me/918768438506?text=${encodeURIComponent(msg)}`,
        handle: "+91 87684 38506"
    },
    linkedin: {
        profileUrl: "https://www.linkedin.com/in/barshanbanerjee/",
        prefilledUrl: (msg: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(msg)}`,
        handle: "barshanbanerjee"
    },
    messenger: {
        profileUrl: "https://m.me/banerjee.barshan",
        prefilledUrl: (msg: string) => `https://m.me/banerjee.barshan?text=${encodeURIComponent(msg)}`,
        handle: "banerjee.barshan"
    },
    instagram: {
        profileUrl: "https://instagram.com/fyataroo",
        prefilledUrl: (msg: string) => `https://instagram.com/fyataroo`,
        handle: "fyataroo"
    }
};

export default socialMediaData;
