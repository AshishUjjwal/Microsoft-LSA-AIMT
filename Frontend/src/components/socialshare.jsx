import React from 'react';
import { Flex, Box, IconButton } from '@chakra-ui/react';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from 'react-share';

const SocialShareBar = () => {
  const url = window.location.href;
  const title = 'Check out this website!';

  return (
    <Box
      position="fixed"
      top="40%"
      left="0"
      bg="gray.100"
      p="4"
      borderRadius="0 10px 10px 0"
      boxShadow="lg"
      zIndex="1000"
      _hover={{ transform: 'translateX(10px)', transition: '0.3s' }}
    >
      <Flex direction="column" gap={4}>
        <FacebookShareButton url={url} quote={title}>
          <IconButton
            aria-label="Share on Facebook"
            icon={<FacebookIcon size={50} round />}
            variant="ghost"
            _hover={{ transform: 'scale(1.2)', transition: '0.3s' }}
          />
        </FacebookShareButton>

        <TwitterShareButton url={url} title={title}>
          <IconButton
            aria-label="Share on Twitter"
            icon={<TwitterIcon size={50} round />}
            variant="ghost"
            _hover={{ transform: 'scale(1.2)', transition: '0.3s' }}
          />
        </TwitterShareButton>

        <LinkedinShareButton url={url} title={title}>
          <IconButton
            aria-label="Share on LinkedIn"
            icon={<LinkedinIcon size={50} round />}
            variant="ghost"
            _hover={{ transform: 'scale(1.2)', transition: '0.3s' }}
          />
        </LinkedinShareButton>

        <WhatsappShareButton url={url} title={title}>
          <IconButton
            aria-label="Share on WhatsApp"
            icon={<WhatsappIcon size={50} round />}
            variant="ghost"
            _hover={{ transform: 'scale(1.2)', transition: '0.3s' }}
          />
        </WhatsappShareButton>
      </Flex>
    </Box>
  );
};

export default SocialShareBar;
