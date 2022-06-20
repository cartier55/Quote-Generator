// import {localQuotes as quotes} from './quotes.js'
// const quotes = require('./quotes.js');

const quoteDiv = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const loaderDiv = document.getElementById('loader')

// Pull quotes from api
// Get quotes from api
let quotes = []
let getQuotes = async() =>{
    loading()
    const url = 'https://type.fit/api/quotes'
    try {
        const response = await fetch(url)
        quotes = await response.json()
        complete()

    } catch (error) {
        console.error(error)
    }
}

let getRandomQuote = () =>{
    let index = Math.floor(Math.random() * quotes.length)

    
    
    if (quotes[index].text.length > 50){
        quoteText.classList.add('long-quote')
    }else{
        quoteText.classList.remove('long-quote')
    }
    
    quoteText.textContent = quotes[index].text 
    if (quotes[index].author === null){
        authorText.textContent = 'N/A'
        return
    }
    authorText.textContent = quotes[index].author 
}

let tweet = () =>{
    let tweetUrl = `https://twitter.com/intent/tweet?text${quoteText.textContent} - ${authorText.textContent}`
    window.open(tweetUrl)
}

let loading = () =>{
    loader.hidden = false
    quoteDiv.hidden = true 
}

let complete = () =>{
    loader.hidden = true    
    quoteDiv.hidden = false 

}

document.getElementById('new-quote').onclick = getRandomQuote
document.getElementById('twitter').onclick = tweet


// Pull quotes from api
getQuotes()
