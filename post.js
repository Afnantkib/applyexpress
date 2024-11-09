const axios = require('axios');

async function postToLinkedIn() {
    // Your LinkedIn Access Token
    const accessToken = 'YOUR_ACCESS_TOKEN';

    // LinkedIn API URL for sharing content
    const apiUrl = 'https://api.linkedin.com/v2/ugcPosts';

    // The content of your post
    const postContent = {
        author: `urn:li:person:YOUR_PERSON_ID`, // Replace with your LinkedIn Person ID
        lifecycleState: 'PUBLISHED',
        specificContent: {
                'com.linkedin.ugc.ShareContent': {
                shareCommentary: {
                    text: 'My name is Afnan',
                },
                shareMediaCategory: 'NONE',
            },
        },
        visibility: {
            'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
        },
    };

    try {
        // Make a POST request to LinkedIn API
        const response = await axios.post(apiUrl, postContent, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'X-Restli-Protocol-Version': '2.0.0',
            },
        });

        console.log('Post successfully created:', response.data);
    } catch (error) {
        console.error('Error posting to LinkedIn:', error.response.data);
    }
}

// Run the function
postToLinkedIn();
