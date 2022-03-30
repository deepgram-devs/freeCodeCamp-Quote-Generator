const newQuoteButton = document.getElementById("new-quote")
const tweetButton = document.getElementById("tweet-quote")

function random(number) {
    return Math.floor(Math.random() * (number + 1));
}
newQuoteButton.addEventListener('click', () => {

    fetch('/transcribe')
        .then((r) => r.json())
        .then((res) => {
            document.querySelector("#text").innerText = res.transcription.transcript
            document.querySelector("#author").innerText = res.author
        })
    const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)}, 0.4)`;
    document.body.style.backgroundColor = rndCol;
})

tweetButton.addEventListener('click', () => {
    tweetButton.href = "http://twitter.com/intent/tweet/?text=" + encodeURIComponent(`${document.querySelector("#text").innerText} -${document.querySelector("#author").innerText}`)
    console.log('tweet:', `${document.querySelector("#text").innerText}`)
});