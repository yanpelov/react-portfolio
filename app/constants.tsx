export const scaleFactor = 4;
export const playerSpeed = 250;


export type TextWithPhoto = {
    text?: string;
    photoUrl?: string;
}

export const content: Record<string, TextWithPhoto> = {
    intro: {
        text: `Hi, I’m Yan, a Senior Software Developer. Feel free to explore my little game. If you’re curious about my background, you can check out my CV <a style="color:blue" href="/cv">here</a> or head to the office by the exit. Have fun!`,
        photoUrl: ''
    },
    saucelabs: {
        text: `Check out the sauces cabinet from the sauce laboratories at Sauce Labs. What’s your favorite sauce? (It’s the classic onboarding question at Sauce Labs). Did you know that <span style="color:green; font-weight:bold;">all sauces have passed and tested successfully ...by humans!</span>`,
        photoUrl: '/sl_logo.png'
    },
    audiocodes: {
        text: `Welcome to AudioCodes, where every sound wave tells a story! From launching new IP phone models to slashing latency with memory mapping, my time here was like a symphony of coding excellence. Plus, mastering SIP and RTP protocols was like hitting the high notes of networking.`,
        photoUrl: '/ac_logo.png'
    },
    beeriprint: {
        text: `Wondering how Be'eri Printers handles envelopes? Imagine a high-speed envelope fiesta! With a React front end and a PHP back end, we turned bulk processing into an art form. Be'eri Printers: where envelopes are managed with the precision of a fine brew.`,
        photoUrl: '/dfus_logo.png'
    },
    uni: {
        text: `From law books to coding books — that’s my journey! Graduated law, but found my true calling in software development. Who knew the legal world would lead to coding adventures?`,
        photoUrl: '/heb_logo.png'
    },
    infinity: {
        text: `Infinity Labs was my playground for mastering software development in an agile environment. Think of it as a boot camp for coding superheroes, where data structures and algorithms are your trusty sidekicks.`,
        photoUrl: '/infi_logo.png'
    },
    leetcode: {
        text: `LeetCode is like the ultimate brain workout — a rollercoaster of challenges that keeps you on your toes. Just like the confetti in the photo frame, it’s thrilling, exhilarating, and occasionally mind-bending!`,
        photoUrl: '/leetcode.png'
    },
    cv: {
        text: `Congratulations on reaching the final frontier! You’re about to be redirected — countdown 3... 2... 1...`,
        photoUrl: ''
    },
    door: {
        text: `Well done! You’ve made it to the end of the journey. If you’d like to stay in touch or have a chat about coding adventures, here are my contact details. No need for a flashlight — just reach out!`,
        photoUrl: ''
    },
    archive: {
        text: `This cabinet is the memories cabinet were photos, documents and even movies are kept safe. Want a quick look? Check it out at <a style="color:blue" href="https://archie.beeri.org.il/search?searchTerm=*&searchTermModifier=any&firstRow=1&numberOfRows=50&sortField=dcDate&sortOrder=asc&dcTypeFilter=image&dcAccessRights=public">Be'eri Archive</a> - a precious team project`,
        photoUrl: 'archie.png'
    }
};
