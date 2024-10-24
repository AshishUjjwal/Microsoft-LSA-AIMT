import React from 'react';
import ProfilePage from './ProfilePage.jsx';

// Example user, events, and blogs data
const user = {
    name: 'Ashish Ujjwal',
    email: 'ashishujjwal@gmail.com',
    location: 'Lucknow, UttarPradesh',
    bio: 'Full-stack developer passionate about coding and community building.',
    avatarUrl: 'https://100k-faces.glitch.me/random-image'
};

const events = [
    {
        _id: '1',
        title: 'Git and GitHub Workshop',
        date: '20nd Jul - 2024',
        description: 'Hands-on workshop on Git and GitHub for beginners.'
    },
    {
        _id: '2',
        title: 'Azure Skill Challenge',
        date: '8th Feb - 2024',
        description: 'Embark on a journey of innovation with the Power Platform App Maker Challenge.'
    }
];

const blogs = [
    {
        _id: '1',
        title: 'Full-stack Development',
        date: '2nd Jan - 2024',
        description: 'A complete guide to becoming a full-stack developer.'
    },
    {
        _id: '2',
        title: 'Top 10 Coding Practices',
        date: '15th Feb - 2024',
        description: 'A blog detailing the best practices to improve code quality.'
    }
];

const App = () => (
    <ProfilePage user={user} events={events} blogs={blogs} />
);

export default App;
