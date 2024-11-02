import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import ProfilePage from './ProfilePage.jsx';
import { AuthContext } from '../../contexts/AuthContext.js';
import LoadingPage from '../../pages/LoadingPage.jsx'

const App = () => {
    const { auth } = useContext(AuthContext); // Access user from AuthContext
    const [user, setUser] = useState(auth?.user);
    const [events, setEvents] = useState([]); // State to store fetched events
    const [blogs, setBlogs] = useState([]); // State to store fetched blogs
    const [loading, setLoading] = useState(true);

    // Fetch events data
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/registrations/registered-events`, {
                    withCredentials: true, // Include credentials
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                // console.log(`Response : `,response);
                setEvents(response.data); // Set events data
            } catch (err) {
                console.log("Failed to fetch events.", err);
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchEvents();
    }, [user]);

    // Fetch blogs data
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/blogs/getuserblog`, {
                    withCredentials: true, // Include credentials
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log(`blog res`,response);
                setBlogs(response.data.data); // Set blogs data
            } catch (err) {
                console.log("Failed to fetch blogs.", err);
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchBlogs();
    }, [user]);

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
