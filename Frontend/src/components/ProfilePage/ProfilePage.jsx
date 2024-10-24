import { Box, Container } from '@chakra-ui/react';
import ProfileHeader from './ProfileHeader.jsx';
import UserStats from './UserStats.jsx';
import EventsList from './EventsList.jsx';
import BlogsList from './BlogsList.jsx';

const ProfilePage = ({ user, events, blogs }) => {
    const userStats = {
        eventsRegistered: events.length,
        blogsCreated: blogs.length
    };

    return (
        <Container maxW="6xl" py={8}>
            {/* Profile Header */}
            <ProfileHeader user={user} />

            {/* User Statistics */}
            <UserStats stats={userStats} />

            {/* Registered Events */}
            <EventsList events={events} />

            {/* Created Blogs */}
            <BlogsList blogs={blogs} />
        </Container>
    );
};

export default ProfilePage;
