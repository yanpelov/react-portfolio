export const scaleFactor = 4;
export const playerSpeed = 250;


export type TextWithPhoto = {
    text?: string;
    photoUrl?: string;
}

export const content: Record<string, TextWithPhoto> = {
    intro: {
        text: `Hi, I’m Yan, a Senior Software Developer. Feel free to explore my little game. If you’re curious about my background, you can check out my CV <a style="color:blue" href="/cv">here</a> or my LinkedIn profile <a style="color:blue" href="https://www.linkedin.com/in/yanpe/">here</a>. Have fun!`,
        photoUrl: '/yan_logo.png'
    },
    saucelabs: {
        text: `Check out the sauces cabinet from the sauce laboratories at Sauce Labs. What’s your favorite sauce? (It’s the classic onboarding question at Sauce Labs). Did you know that <span style="color:green; font-weight:bold;">all sauces have passed and tested successfully ...by humans!</span>`,
        photoUrl: '/sl_logo.png'
    },
    audiocodes: {
        text: `Welcome to AudioCodes! Can you find the wave on the table? It's just like a DSP sine wave — a wave-tastic adventure!`,
        photoUrl: '/ac_logo.png'
    },
    beeriprint: {
        text: `Welcome to Be'eri Printers, where every envelope is treated like royalty! You know you’re in the right place when even the paper is treated with the utmost respect. Why did the envelope go to therapy? It had too many issues to handle!`,
        photoUrl: '/dfus_logo.png'
    },
    uni: {
        text: `From law books to coding books — that’s my journey! Graduated law, but found my true calling in software development. Who knew the legal world would lead to coding adventures?`,
        photoUrl: '/heb_logo.png'
    },
    infinity: {
        text: `Infinity Labs was like entering a competitive arena where only the most motivated developers thrived. It's like a coding marathon where data structures and algorithms are your energy drinks and the finish line is the next big breakthrough.`,
        photoUrl: '/infi_logo.png'
    },
    leetcode: {
        text: `LeetCode is like the ultimate brain workout — a rollercoaster of challenges that keeps you on your toes. Just like the confetti in the photo frame, it’s thrilling, exhilarating, and occasionally mind-bending! Check out my LeetCode profile <a style="color:blue" href="https://leetcode.com/u/bentz123/">here</a>.`,
        photoUrl: '/lc_logo.png'
    },
    stackoverflow: {
        text: `Welcome to Stack Overflow! Here’s where the coding community shares knowledge and finds solutions. Did you know that when a question is asked, it can get a 'high score' — just like a game? Check out my Stack Overflow profile <a style="color:blue" href="https://stackoverflow.com/users/6098812/bentz123">here</a>.`,
        photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Stack_Overflow_logo_2019.svg' // Replace with a more suitable logo URL if needed
    },
    freecodecamp: {
        text: `Explore FreeCodeCamp, where coding dreams become reality! From front-end to back-end, it's a journey of learning and growth. Check out my FreeCodeCamp profile <a style="color:blue" href="https://www.freecodecamp.org/beleeleb">here</a>.`,
        photoUrl: 'https://www.freecodecamp.org/news/content/images/2022/04/fcc-logos-06.png' // Replace with a more suitable logo URL if needed
    },
    cv: {
        text: `Oh what's the funny paper on the desk? You're just 3 seconds away from diving into my CV and exploring my professional journey. Click <a style="color:blue" href="/cv">here</a> to check it out. See you on the other side!`,
        photoUrl: ''
    },
    door: {
        text: `Nice to meet you! If you’d like to stay in touch or have a chat about coding adventures, here are my contact details. Feel free to reach out anytime, and don’t forget to connect with me on LinkedIn <a style="color:blue" href="https://www.linkedin.com/in/yanpe/">here</a>. Bye for now!`,
        photoUrl: ''
    },
    archive: {
        text: `This cabinet holds cherished memories, preserving photos, documents, and even movies. Curious to explore? Take a look at our <a style="color:blue" href="https://archie.beeri.org.il/search?searchTerm=*&searchTermModifier=any&firstRow=1&numberOfRows=50&sortField=dcDate&sortOrder=asc&dcTypeFilter=image&dcAccessRights=public">Be'eri Archive</a> – a treasured team project.`,
        photoUrl: 'archie.png'
    },
    credit: {
        text: `Shout out to JSLegendDev for an awesome idea. The game was adopted and inspired from <a style="color:blue" href="https://github.com/JSLegendDev/2d-portfolio-kaboom/tree/master">this GitHub repository</a>.`,
        photoUrl: ''
    }
};
