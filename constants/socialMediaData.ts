const socialMediaData = {
    whatsapp: {
        number: "6291642437",
        profileUrl: "https://wa.me/916291642437",
        prefilledUrl: (msg: string) => `https://wa.me/916291642437?text=${encodeURIComponent(msg)}`,
        handle: "+91 6291 642 437"
    },
    messenger: {
        profileUrl: "https://m.me/pragyauemk",
        prefilledUrl: (msg: string) => `https://m.me/pragyauemk?text=${encodeURIComponent(msg)}`,
        handle: "pragyauemk"
    },
    linkedin: {
        profileUrl: "https://www.linkedin.com/company/pragya-uemk",
        prefilledUrl: (msg: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(msg)}`,
        handle: "pragyauemk"
    },

    instagram: {
        profileUrl: "https://www.instagram.com/pragyauemk",
        prefilledUrl: (msg: string) => `https://www.instagram.com/pragyauemk`,
        handle: "pragyauemk"
    }
};

export default socialMediaData;
