async function fetchTweets() {
    const docUrl = "https://docs.google.com/document/d/e/2PACX-1vTGobJ2e6N1Yjarkidkf_KfFep_6k3u8WvhrCVlxnWHuRULyzv3uJEyOwWDJn6Fn_ep4G27cdvy9AJh/pub";
    
    // Enhanced exclusion patterns
    const excludePatterns = [
        /^https?:\/\//i,
        /^Science & tech$/,
        /^Covid\/health$/,
        /^Worldwide issues$/,
        /^can you use/,
        /^Absolutely!/,
        /^These are some/
    ];

    try {
        const response = await fetch(docUrl);
        const data = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');

        const tweetsByMonth = {
            'August 2024': [],
            'September 2024': [],
            'October 2024': [],
            'November 2024': [],
            'December 2024': [],
            'January 2025': []
        };

        let currentMonth = 'August 2024';
        const seenContent = new Set(); // Track duplicate content

        const paragraphs = Array.from(doc.querySelectorAll('p'));

        paragraphs.forEach(p => {
            const text = p.textContent.trim();
            
            // Skip if content matches any exclude pattern or is too short
            const shouldExclude = excludePatterns.some(pattern => pattern.test(text)) || text.length < 20;
            
            if (!shouldExclude && !seenContent.has(text)) {
                seenContent.add(text); // Add to seen set
                
                const tweet = {
                    content: text.replace(/^-\s*/, '').trim(),
                    category: currentMonth,
                    note: `This tweet falls under ${currentMonth} exam period and can be used for all subsequent exams`
                };
                
                tweetsByMonth[currentMonth].push(tweet);
            }
        });

        return tweetsByMonth;
    } catch (error) {
        console.error('Error fetching tweets:', error);
        return {};
    }
}

export { fetchTweets };
