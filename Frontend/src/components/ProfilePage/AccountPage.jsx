import React, { useContext, useState } from 'react';
import ProfilePage from './ProfilePage.jsx';
import { AuthContext } from '../../contexts/AuthContext.js';

// Example user, events, and blogs data
// const user = {
//     name: 'Ashish Ujjwal',
//     email: 'ashishujjwal@gmail.com',
//     location: 'Lucknow, UttarPradesh',
//     bio: 'Full-stack developer passionate about coding and community building.',
//     avatarUrl: 'https://100k-faces.glitch.me/random-image',
//     social : 'https://www.linkedin.com/in/ashish-ujjwal-a9bb03228/',
// };

const events = [
    {
        _id: '1',
        title: 'Git and GitHub Workshop',
        date: '20nd Jul - 2024',
        description: 'Hands-on workshop on Git and GitHub for beginners.'
    },
    {
        _id: '1',
        title: 'Git and GitHub Workshop',
        date: '20nd Jul - 2024',
        description: 'Hands-on workshop on Git and GitHub for beginners.'
    },
    {
        _id: '1',
        title: 'Git and GitHub Workshop',
        date: '20nd Jul - 2024',
        description: 'Hands-on workshop on Git and GitHub for beginners.'
    },
    {
        _id: '1',
        title: 'Git and GitHub Workshop',
        date: '20nd Jul - 2024',
        description: 'Hands-on workshop on Git and GitHub for beginners.'
    },
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
    },
    {
        _id: '2',
        title: 'Top 10 Coding Practices',
        date: '15th Feb - 2024',
        description: 'A blog detailing the best practices to improve code quality.'
    },
    {
        _id: '2',
        title: 'Top 10 Coding Practices',
        date: '15th Feb - 2024',
        description: 'A blog detailing the best practices to improve code quality.'
    },
    {
        _id: '2',
        title: 'Top 10 Coding Practices',
        date: '15th Feb - 2024',
        description: 'A blog detailing the best practices to improve code quality.'
    },
    {
        _id: '2',
        title: 'Top 10 Coding Practices',
        date: '15th Feb - 2024',
        description: 'A blog detailing the best practices to improve code quality.'
    }
];

const App = () => {

    const { auth } = useContext(AuthContext);  // Access user from AuthContext
    const [user, setUser] = useState(auth?.user);

    const handleUserUpdate = (updatedUser) => {
        setUser(updatedUser); // Update the user state with the newly updated user data
    };

    return (
        <ProfilePage user={user} onUpdate={handleUserUpdate} events={events} blogs={blogs} />
    )
};

export default App;
