

const paragraphText = document.getElementById('paragraph-text');
const time = document.getElementById('time');
const mistakes = document.getElementById('mistakes');
const wpm = document.getElementById('wpm');
const cpm = document.getElementById('cpm');
const tryAgainButton = document.getElementById('try-again-btn');



let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistakesCount = 0;
let isTyping = false;


const loadParagraph = () => {
    const paragraph = [
        'Emily searched her house for hours, retracing her steps. The key to her grandmother’s old chest was nowhere to be found. Frustrated, she sat down and cried. Just then, her cat, whiskers twitching, nudged a small object under the couch. It was the key. Emily unlocked the chest, discovering a collection of letters and photos that unveiled a family history she had never known. The lost key had unlocked more than just a chest—it revealed her heritage and connected her with the past.',
        'On a rainy day, Tom offered his umbrella to a stranger waiting at the bus stop. The stranger, a young woman, thanked him and mentioned she was headed to a job interview. A week later, Tom saw her on the news—she had just been hired as the new company CEO. She later sent Tom a handwritten note, thanking him for his kindness and stating that his gesture had brightened her day and helped her feel confident. Sometimes, a small act of kindness can have an unexpected ripple effect.',
        "Sarah was heartbroken when she realized she had forgotten her best friend's birthday. She hurried to bake a cake and prepare a gift, hoping it wasn’t too late. As she arrived at her friend’s house, she found her friend already surrounded by loved ones and a cake. Sarah's friend ran to her, hugged her, and said, 'Your presence is the best gift of all.' The celebration continued, and Sarah learned that it’s never too late to show you care.",
        "Jack had spent years working on a massive puzzle but had lost the final piece. Frustrated, he placed it aside, unable to complete it. One day, while cleaning, he found the piece under a couch. He completed the puzzle, revealing a beautiful landscape. It was then he realized that life’s challenges often come with missing pieces, and finding them can lead to unexpected fulfillment. Sometimes, the patience to look for the lost piece makes the final picture even more rewarding.",
        "Lily found a stray dog shivering in the park. She took him home, fed him, and made a cozy bed. Days turned into weeks, and the dog’s health improved, but no one came to claim him. Lily decided to adopt him. The dog, once lost and alone, became her loyal companion. In rescuing him, Lily discovered that sometimes the greatest friendships are forged from unexpected moments of compassion.",
        "As a child, Tim found a smooth, shiny stone while playing in his backyard. He kept it as a lucky charm, believing it had magical powers. Years later, while going through old belongings, he rediscovered the stone. Reflecting on his childhood, he realized that it was not magic but his own belief and positivity that had guided him through challenges. The stone had been a symbol of his inner strength all along.",
        "Martha’s garden was a mess of wilted plants and dry soil. Determined, she spent days nurturing her garden with water and care. Slowly, it transformed into a vibrant haven of blooming flowers and lush greenery. Neighbors marveled at her dedication. Martha learned that growth requires patience and effort, and the beauty of her garden was a testament to the rewards of hard work and perseverance.",
        "Alex’s birthday was approaching, but he had no plans and felt lonely. On his birthday, he was surprised when friends and family showed up at his doorstep with a surprise party. They had been secretly planning it for weeks. Alex realized how much he was loved and appreciated, and the surprise reminded him that sometimes, the people who care about us make sure we never truly feel alone.",
        "Laufey Lin Jonsdottir, simply known as Laufey, is a Grammy winning singer-songwriter from Iceland. With her unique voice and musical talent, she has captured the hearts of listeners worldwide.",
        "At a family reunion, there was an empty chair at the table, reserved for Grandpa who had recently passed away. As the family shared stories and laughter, they felt his presence in the memories they shared. The empty chair became a symbol of the love that continued to unite them, reminding everyone that while loved ones may be gone, their spirit lives on through cherished moments.",
        "Maria found a wallet on the sidewalk and, after searching for identification, managed to return it to its owner. The owner, a young woman, was incredibly grateful and insisted on giving Maria a reward. Maria declined, saying that helping others was its own reward. The next week, Maria received a letter from the young woman, who had started a scholarship in Maria’s name to honor her selflessness.",
        "Laura was nervous about her first day at a new job. Her anxiety was palpable as she walked through the doors. A friendly co-worker noticed her unease and struck up a conversation, making Laura feel welcomed. By the end of the day, Laura was grateful for the warm welcome. She learned that taking the first step into something new is often made easier by the kindness of others.",
        "On a particularly rainy day, Tom forgot his umbrella and got drenched on his way home. A stranger offered him a ride, and Tom gratefully accepted. During the drive, they shared stories and laughter. The rainstorm turned into a memorable encounter that brightened Tom’s day. He realized that sometimes, even inconvenient situations lead to pleasant surprises and new friendships.",
        "Sophie found solace in a quiet corner of the library where she read for hours. One day, she noticed a young girl sitting alone, looking lost. Sophie struck up a conversation and discovered the girl was struggling with her studies. Sophie helped her with her homework, and their shared love of reading turned into a lasting friendship. The library, once a place of solitude, became a bridge to a new connection.",
        "During a summer storm, a small boat was lost at sea. The sailor, worried and cold, saw a distant light guiding him to safety. As he reached the shore, he discovered that the light was from a lighthouse, a beacon of hope in the storm. The sailor realized that even in the darkest times, guidance and hope are always available if you keep your eyes open.",
        "Jenny was always shy about her singing voice, believing it was mediocre. During a company talent show, her colleagues encouraged her to perform. To her surprise, her rendition of a classic song was met with enthusiastic applause. Jenny’s hidden talent was uncovered, and she learned that sharing one’s gifts can lead to unexpected joy and recognition.",
        "When new neighbors moved in, the street was abuzz with curiosity. Tom, usually reserved, decided to bake a batch of cookies and welcome them. The new family was touched by the gesture and invited Tom over for a cup of tea. Through this simple act of kindness, Tom made new friends and learned that sometimes reaching out can forge meaningful connections.",
        "On a hot summer day, Mary sat on her porch feeling the oppressive heat. As she closed her eyes, a gentle breeze cooled her face. It was a moment of unexpected relief and tranquility. Mary realized that even in the midst of discomfort, nature often provides small comforts that remind us to appreciate the simple pleasures in life.",
        "David found an old, dusty watch in his attic, once owned by his grandfather. It was broken, but he took it to a watchmaker for repair. When David finally received it back, the watch ticked with a new lease on life. It wasn’t just a timepiece but a symbol of his grandfather’s legacy, teaching David that some things, though worn and old, hold invaluable sentimental worth.",
        "At a busy train station, Maria saw a man sitting alone with a sign that read, “I need a friend.” Moved by the message, she sat down beside him and struck up a conversation. They talked for hours, sharing stories and life advice. Maria learned that sometimes, reaching out to others who seem in need can lead to meaningful and uplifting connections."
    ]
      
    const randomIndex = Math.floor(Math.random() * paragraph.length);
    

    paragraphText.innerHTML = '';
    for(const char of paragraph[randomIndex]) {
        console.log(char);
        paragraphText.innerHTML += `<span>${char}</span>`;
    }
    paragraphText.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown',()=>input.focus());
    paragraphText.addEventListener('click',()=>input.focus());
}


input.addEventListener("input", initTyping);
function initTyping(event) {
    const char = paragraphText.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);

    
    

    if (event.inputType === "deleteContentBackward" && charIndex > 0) {
        char[charIndex].classList.remove('active');
        charIndex--;
        char[charIndex].classList.remove('correct', 'incorrect', 'active');
        char[charIndex].classList.add('active');
        return;
    }

    if (charIndex < char.length && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(countdown, 1000);
            isTyping = true;
        }

        if (char[charIndex].innerText === typedChar) {
            char[charIndex].classList.add('correct');
        } else {
            char[charIndex].classList.add('incorrect');
            mistakesCount++;
        }
        char[charIndex].classList.remove('active');
        charIndex++;
        if (charIndex < char.length) {
            char[charIndex].classList.add('active');
        }

        mistakes.innerText = mistakesCount;
        cpm.innerText = charIndex - mistakesCount;
    } else {
        clearInterval(timer);
        input.value = '';
    }
}
loadParagraph();
function countdown(){
    if(timeLeft > 0){
        timeLeft--;
        time.innerText = timeLeft;
        let wpmValue = Math.round((charIndex-mistakesCount)/5 / (maxTime - timeLeft) * 60);
        wpm.innerText = wpmValue;
    }else{
        clearInterval(timer);
    }
}

tryAgainButton.addEventListener('click',()=>{
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = 0;
    mistakesCount = 0;
    isTyping = false;
    time.innerText = timeLeft;
    mistakes.innerText = mistakesCount;
    wpm.innerText = 0;
    cpm.innerText = 0;
    loadParagraph();
    input.value = '';
    input.focus();
})
