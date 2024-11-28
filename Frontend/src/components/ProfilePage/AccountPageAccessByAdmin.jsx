import React, { useContext, useState, useEffect } from 'react';
import ProfilePage from './ProfilePage.jsx';
import { AuthContext } from '../../contexts/AuthContext.js';
import LoadingPage from '../../pages/LoadingPage.jsx'
import apiClient from '../../api/axiosInstance.js';
import { useParams } from 'react-router-dom';

const App = () => {
    const { auth } = useContext(AuthContext); // Access user from AuthContext
    const [user, setUser] = useState(auth?.user);
    const [events, setEvents] = useState([]); // State to store fetched events
    const [blogs, setBlogs] = useState([]); // State to store fetched blogs
    const [loading, setLoading] = useState(true);

    const { userId } = useParams();
    // console.log(events);

    // Fetch User data
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await apiClient.get(`/api/users/profile/${userId}`, {
                    withCredentials: true, // Include credentials
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                // console.log(`Response : `,response);
                setUser(response.data.user); // Set events data
                setEvents(response.data.events); // Set events data
                setBlogs(response.data.blogs); // Set events data
            } catch (err) {
                console.log("Failed to fetch userData.", err);
            } finally {
                setLoading(false);
            }
        };

        if (userId) fetchUserDetails();
    }, [userId]);


    const handleUserUpdate = (updatedUser) => {
        setUser(updatedUser); // Update the user state with the newly updated user data
    };

    if (loading) return <LoadingPage />;
    // if (error) return <Text color="red.500">{error}</Text>;

    return (
        <ProfilePage user={user} onUpdate={handleUserUpdate} events={events} blogs={blogs} />
    );
};

export default App;
