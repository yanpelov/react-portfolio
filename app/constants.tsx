export const scaleFactor = 4;
export const playerSpeed = 250;


export type TextWithPhoto = {
    text?: string;
    photoUrl?: string;
}


export const content: Record<string, TextWithPhoto> = {
    intro: {
        text: `Welcome, fearless recruiter! You’ve stepped into CodeLand, where every line of code tells a story and every bug is a dragon to be slayed. Ready to embark on an epic quest to uncover the legendary developer’s skills and achievements? Let the adventure begin!`,
        photoUrl: '' // Replace with actual path
    },
    saucelabs: {
        text: `Behold the legendary Sauce Labs cabinet! It's not just any sauce — it’s been tested on humans (and their taste buds). Which one will you choose? (My favorite onboarding question — it’s saucy, I know!) <span style="color:green">Rest assured, all sauces have been thoroughly tested.</span>`,
        photoUrl: '/sl_logo.png' // Replace with actual path
    },
    audiocodes: {
        text: `Welcome to the AudioCodes realm! Here, you’ll find the signal wave of the sound of... what’s this? A sin of sinosatis? Sounds like a plot twist in a sci-fi novel! Or maybe just a really complicated sound wave.`,
        photoUrl: '/ac_logo.png' // Optional, can be empty
    },
    beeriprint: {
        text: `Ever wondered how many mailboxes a Be'eri Printers can print? Let’s just say it’s a mailbox bonanza. Beeri Printers: where mailboxes are printed in bulk, just like your favorite beer is brewed!`,
        photoUrl: '/dfus_logo.png' // Replace with actual path
    },

    uni: {
        text: `I graduated law. I came, I saw, I left for CS `,
        photoUrl: '/heb_logo.png' // Replace with actual path
    },

    infinity: {
        text: `Ever wondered how many mailboxes a Be'eri Printers can print? Let’s just say it’s a mailbox bonanza. Beeri Printers: where mailboxes are printed in bulk, just like your favorite beer is brewed!`,
        photoUrl: '/infi_logo.png' // Replace with actual path
    },
    leetcode: {
        text: `LeetCode is like a rollercoaster for your brain — thrilling, challenging, and occasionally mind-bending. Your mind might go kaboom, just like the confetti in the photo frame. Buckle up and enjoy the ride!`,
        photoUrl: '/lcpxl.png' // Optional, can be empty
    },
    cv: {
        text: `Congratulations on making it this far! You’re about to be redirected — it’s like the suspenseful countdown before the big reveal. 3... 2... 1... Prepare for the grand finale!`,
        photoUrl: '' // Optional, can be empty
    },
    contact: {
        text: `Well done! You remembered to turn off the lights before leaving. Now, if you want to keep in touch, here are my contacts. No need for a flashlight — just reach out!`,
        photoUrl: '' // Replace with actual path
    }
};

