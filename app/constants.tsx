export const scaleFactor = 3.25;
export const playerSpeed = 250;


export type TextWithPhoto = {
    text?: string;
    photoUrl?: string;
}


export const content: Record<string, TextWithPhoto> = {
    intro: {
        text: `Hi there, I'm Yan, a Senior Software Developer. Welcome to my little playground! Want to peek at my resume? Check out my <a style="color:blue" href="/cv">CV</a> or my <a style="color:blue" href="https://www.linkedin.com/in/yanpe/">LinkedIn profile</a>. Buckle up for some retro fun!`,
        photoUrl: '/yan.png'
    },
    saucelabs: {
        text: `Behold! The legendary Sauce Labs sauce cabinet. What's your favorite flavor? (It's a trick question, there are no wrong answers... except maybe ketchup on a pizza.) Did you know that <span style="color:green; font-weight:bold;">all sauces have passed and tested successfully ...by humans!</span></span>`,
        photoUrl: '/sl_logo.png'
    },
    audiocodes: {
        text: `Welcome to AudioCodes! Spot the wave chilling on the table? It's a DSP sine wave, just like the ones we work with. Prepare for a wave-tastic adventure!`,
        photoUrl: '/ac_logo.png'
    },
    beeriprint: {
        text: `Greetings from Be'eri Printers, where envelopes and letters are treated like royalty! You'll know you're in the right place because even the paper gets the royal treatment. Speaking of therapy, why did the envelope need one? It had too many addressing issues!`,
        photoUrl: '/dfus_logo.png'
    },
    uni: {
        text: `From law books to code books, that's my journey! Law school grad turned software developer. Who knew legal jargon would pave the way for coding adventures?`,
        photoUrl: '/heb_logo.png'
    },
    infinity: {
        text: `Infinity Labs: a competitive yet collaborative coding arena where brilliant minds push each other to excel. It's like a coding marathon fueled by data structures and algorithms, with the finish line being the next groundbreaking innovation.`,
        photoUrl: '/infi_logo.png'
    },
    leetcode: {
        text: `LeetCode: the ultimate brain gym. A rollercoaster of coding challenges that'll keep you sharp, just like the explosion in this picture (except hopefully less mind-blowing!). Check out my profile: <a style="color:blue" href="https://leetcode.com/u/bentz123/">LeetCode profile</a>`,
        photoUrl: '/lc_logo.png'
    },
    stackoverflow: {
        text: `Welcome to Stack Overflow, the coding community's go-to spot for knowledge sharing and problem-solving. Did you know that questions can get "high scores" here, just like in a game? Check out my profile: <a style="color:blue" href="https://stackoverflow.com/users/6098812/bentz123">Stack Overflow profile</a>.`,
        photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Stack_Overflow_logo_2019.svg' // Replace with a more suitable logo URL if needed
    },
    freecodecamp: {
        text: `Explore FreeCodeCamp, where coding dreams become reality! From front-end to back-end, it's a journey of learning and growth. Check out my profile: <a style="color:blue" href="https://www.freecodecamp.org/beleeleb">FreeCodeCamp profile</a>.`,
        photoUrl: 'https://www.freecodecamp.org/news/content/images/2022/04/fcc-logos-06.png' // Replace with a more suitable logo URL if needed
    },
    cv: {
        text: `That curious paper on the desk? Countdown to dive into my CV and explore my professional journey. See you on the other side! 3... 2... 1...`,
        photoUrl: ''
    },
    door: {
        text: `It was nice meeting you! If you'd like to connect or chat about coding adventures, feel free to reach out on <a style="color:blue" href="https://www.linkedin.com/in/yanpe/">LinkedIn</a>. See ya later!`,
        photoUrl: ''
    },
    archive: {
        text: `This cabinet holds a treasure trove of memories – photos, documents, and even movies. Curious to peek inside? Explore our <a style="color:blue" href="https://archie.beeri.org.il/search?searchTerm=*&searchTermModifier=any&firstRow=1&numberOfRows=50&sortField=dcDate&sortOrder=asc&dcTypeFilter=image&dcAccessRights=public">Be'eri Archive</a> – a cherished team project.`,
        photoUrl: 'archie.png'
    },
    credit: {
        text: `Big thanks to JSLegendDev for the awesome inspiration! This game is based on this <a style="color:blue" href="https://github.com/JSLegendDev/2d-portfolio-kaboom/tree/master">GitHub repository</a>.`,
        photoUrl: ''
    }
};
