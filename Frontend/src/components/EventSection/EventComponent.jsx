import { HStack, Image, Tag, Text } from "@chakra-ui/react";

const EventTags = ({ tags  }) => {
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

const TruncatedText = ({ text = '' }) => {
    return (
        <Text>
            {`${text}`}
            {/* <Button size="sm" variant="link" onClick={handleReadMore}>
                Read More
            </Button> */}
        </Text>
    );
};

const EventAuthor = ({ authorImage, author, date }) => {
    // if (authorImage === '') {
        authorImage = 'https://100k-faces.glitch.me/random-image'; // Placeholder image URL
    // }
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
    EventTags,
    TruncatedText,
    EventAuthor,
}