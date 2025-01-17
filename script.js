import { fetchTweets } from './fetch.js';

async function displayTweets() {
    const tweets = await fetchTweets();
    const container = document.getElementById('tweets-container');
    const monthFilter = document.getElementById('monthFilter');
    
    function renderTweets(selectedMonth = 'all') {
        container.innerHTML = '';
        
        Object.entries(tweets).forEach(([month, monthTweets]) => {
            if (selectedMonth === 'all' || selectedMonth === month) {
                monthTweets.forEach(tweet => {
                    const tweetElement = document.createElement('div');
                    tweetElement.className = 'tweet';
                    tweetElement.innerHTML = `
                        <div class="tweet-content">${tweet.content}</div>
                        <div class="tweet-note">${tweet.note}</div>
                    `;
                    container.appendChild(tweetElement);
                });
            }
        });
    }
    
    monthFilter.addEventListener('change', (e) => {
        renderTweets(e.target.value);
    });
    
    renderTweets();
}

displayTweets();
