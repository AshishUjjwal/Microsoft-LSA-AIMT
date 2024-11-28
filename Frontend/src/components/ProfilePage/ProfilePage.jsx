import {
    Box,
    Container,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Icon,
    useColorModeValue
} from '@chakra-ui/react';
import { FaTh, FaBookmark, FaTag } from 'react-icons/fa';
import ProfileHeader from './ProfileHeader';
import UserStats from './UserStats';
import EventsList from './EventsList';
import BlogsList from './BlogsList';

const ProfilePage = ({ user, onUpdate, events, blogs }) => {
    const userStats = {
        eventsRegistered: events?.events?.length || events?.length,
        blogsCreated: blogs?.length
    };

    // Color mode values for light and dark modes
    const bgColor = useColorModeValue('gray.50', 'gray.800');
    const tabColor = useColorModeValue('gray.600', 'gray.300');
    const panelBg = useColorModeValue('white', 'gray.700');
    const borderColor = useColorModeValue('gray.200', 'gray.600');

    return (
        <Container maxW="5xl" py={8} bg={bgColor} borderRadius="md" boxShadow="lg">
            {/* Profile Header */}
            <ProfileHeader user={user} onUpdate={onUpdate} />

            {/* User Statistics */}
            <UserStats stats={userStats} />

            {/* Tab Navigation */}
            <Tabs variant="soft-rounded" align="center" mt={8} isFitted>
                <TabList mb="1em" borderColor={borderColor}>
                    <Tab color={tabColor}>
                        <Icon as={FaTh} mr={2} />
                        EVENTS
                    </Tab>
                    <Tab color={tabColor}>
                        <Icon as={FaTag} mr={2} />

                        BLOGS
                    </Tab>
                    <Tab color={tabColor}>
                        <Icon as={FaBookmark} mr={2} />
                        SAVED
                    </Tab>
                </TabList>

                <TabPanels bg={panelBg} borderRadius="md" boxShadow="md">
                    {/* Events Section */}
                    <TabPanel>
                        <EventsList events={events} />
                    </TabPanel>

                    {/* Blogs Section */}
                    <TabPanel>
                        <BlogsList blogs={blogs} />
                    </TabPanel>

                    {/* Tagged Section */}
                    <TabPanel>
                        <Box textAlign="center" py={4}>
                            <p>No Saved items to show.</p>
                        </Box>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>
    );
};

export default ProfilePage;
