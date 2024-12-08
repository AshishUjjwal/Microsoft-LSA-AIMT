import { Button, HStack, Image, Tag, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import AdminBlogShimmer from "./AdminShimmer.jsx";

const BlogTags = ({ tags  }) => {
    // Ensure that tags is an array before using map
    if (!Array.isArray(tags)) {
        return null;  // Or handle it however you need
    }
    return (
        <HStack spacing={2} marginTop={5}>
            {tags.map((tag) => (
                <Tag size={'md'} variant="solid" colorScheme="orange" key={tag}>
                    {tag}
                </Tag>
            ))}
        </HStack>
    );
};

const TruncatedText = ({ text = '', slug }) => {
    const navigate = useNavigate();
    const maxLength = 80;

    const handleReadMore = () => {
        navigate(`/blog/${slug}`); // Navigate to blog detail page
    };

    if (!text) return;

    return (
        <Text>
            {`${text.substring(0, maxLength)}... `}
            <Button size="sm" variant="link" onClick={handleReadMore}>
                Read More
            </Button>
        </Text>
    );
};

const BlogAuthor = ({ authorImage, author, date }) => {
    if(!date) return;
    if (authorImage === '') {
        authorImage = 'https://100k-faces.glitch.me/random-image'; // Placeholder image URL
    }
    return (
        <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
            <Image borderRadius="full" boxSize="40px" src={authorImage} alt="Avatar" />
            <Text fontWeight="medium">{author?.name?.toUpperCase()}</Text>
            <Text>—</Text>
            <Text>{new Date(date).toLocaleDateString()}</Text>
        </HStack>
    );
};


export {
    BlogTags,
    TruncatedText,
    BlogAuthor,
}