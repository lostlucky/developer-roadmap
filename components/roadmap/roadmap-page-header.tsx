import siteConfig from '../../content/site.json';
import { isInteractiveRoadmap, RoadmapType } from '../../lib/roadmap';
import { NewAlertBanner } from './new-alert-banner';
import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { AtSignIcon, ChatIcon, DownloadIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import React from 'react';
import { SIGNUP_EMAIL_INPUT_NAME, SIGNUP_FORM_ACTION } from '../../pages/signup';
import { event } from '../../lib/gtag';

type RoadmapPageHeaderType = {
  roadmap: RoadmapType;
};

function RoadmapDownloader({ roadmapTitle }: { roadmapTitle: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);

  return (
    <>
      <Button
        onClick={(e) => {
          event({
            category: 'Subscription',
            action: `Clicked Download ${roadmapTitle} Roadmap`,
            label: `Download ${roadmapTitle} Roadmap Button`
          });
          onOpen();
        }}
        size='xs'
        py='14px'
        px='10px'
        leftIcon={<DownloadIcon />}
        display={['none', 'flex']}
        colorScheme='yellow'
        variant='solid'
        _hover={{ textDecoration: 'none' }}
        _focus={{ boxShadow: 'none' }}
      >
        Download
      </Button>

      <Modal initialFocusRef={initialRef} closeOnOverlayClick={true} isOpen={isOpen} onClose={onClose} isCentered motionPreset='none'>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p={6}>
            <Heading mb='5px' fontSize='2xl'>Download Roadmap</Heading>
            <Text fontSize={'md'} color='gray.700'>Enter your email below to receive the download link.</Text>
            <form action={SIGNUP_FORM_ACTION} method='post' target='_blank' onSubmit={() => {
              event({
                category: 'Subscription',
                action: `Submitted Download ${roadmapTitle} Roadmap Email`,
                label: `PDF / Subscribe ${roadmapTitle} Roadmap`
              });

              onClose();
            }}>
              <Input required ref={initialRef} size='md' my='10px' type='email' placeholder='Email address' name={SIGNUP_EMAIL_INPUT_NAME}  />
              <Button type='submit' colorScheme='green' size='md' width={'full'}>Send Link</Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

function RoadmapSubscriber({ roadmapTitle }: { roadmapTitle: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);

  return (
    <>
      <Button
        onClick={(e) => {
          event({
            category: 'Subscription',
            action: `Clicked Subscribe ${roadmapTitle} Roadmap`,
            label: `Subscribe ${roadmapTitle} Roadmap Button`
          });
          onOpen();
        }}
        size='xs'
        py='14px'
        px='10px'
        leftIcon={<AtSignIcon />}
        display={'flex'}
        colorScheme='yellow'
        variant='solid'
        _hover={{ textDecoration: 'none' }}
        _focus={{ boxShadow: 'none' }}
      >
        Subscribe
      </Button>

      <Modal initialFocusRef={initialRef} closeOnOverlayClick={true} isOpen={isOpen} onClose={onClose} isCentered motionPreset='none'>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p={6}>
            <Heading mb='5px' fontSize='2xl'>Subscribe</Heading>
            <Text fontSize={'md'} color='gray.700'>Enter your email below to receive updates to this roadmap.</Text>
            <form action={SIGNUP_FORM_ACTION} method='post' target='_blank' onSubmit={() => {
              event({
                category: 'Subscription',
                action: `Submitted Subscribe ${roadmapTitle} Roadmap Email`,
                label: `Email / Subscribe ${roadmapTitle} Roadmap`
              });

              onClose();
            }}>
              <Input required ref={initialRef} size='md' my='10px' type='email' placeholder='Email address' name={SIGNUP_EMAIL_INPUT_NAME}  />
              <Button type='submit' colorScheme='green' size='md' width={'full'}>Subscribe</Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export function RoadmapPageHeader(props: RoadmapPageHeaderType) {
  const { roadmap } = props;

  const hasTNSAlert = ['frontend', 'backend', 'devops'].includes(roadmap.id);

  return (
    <Box
      pt={['25px', '20px', '45px']}
      pb={['20px', '15px', '30px']}
      borderBottomWidth={1}
      mb='50px'
    >
      <Container maxW='container.md' position='relative'>
        <NewAlertBanner />
        <Heading
          as='h1'
          color='black'
          fontSize={['28px', '33px', '40px']}
          fontWeight={700}
          mb={['2px', '2px', '5px']}
        >
          {roadmap.title}
        </Heading>
        <Text fontSize={['13px', '14px', '15px']}>{roadmap.description}</Text>
        <Flex justifyContent='space-between' alignItems={'center'} mt='20px'>
          <Stack isInline flex={1}>
            <Button
              d={['flex', 'flex']}
              as={Link}
              href={'/roadmaps'}
              size='xs'
              py='14px'
              px='10px'
              colorScheme='teal'
              variant='solid'
              _hover={{ textDecoration: 'none' }}
            >
              &larr;
              <Text as='span' d={['none', 'inline']} ml='5px'>
                All Roadmaps
              </Text>
            </Button>

            <RoadmapDownloader roadmapTitle={roadmap.featuredTitle} />
            <RoadmapSubscriber roadmapTitle={roadmap.featuredTitle} />

            <Box flex={1} justifyContent='flex-end' d='flex'>
              <Button
                as={Link}
                href={`${siteConfig.url.issue}?title=[Suggestion] ${roadmap.title}`}
                target='_blank'
                size='xs'
                py='14px'
                px='10px'
                colorScheme='green'
                leftIcon={<ChatIcon />}
                _hover={{ textDecoration: 'none' }}
              >
                Suggest Changes
              </Button>
            </Box>
          </Stack>
        </Flex>
        {isInteractiveRoadmap(roadmap.id) && (
          <Box mt='30px' mb={hasTNSAlert ? ['-53px', '-48px', '-63px'] : ['-37px', '-32px', '-47px']} borderWidth={1} rounded='3px'>
            { hasTNSAlert && (
              <Text
                fontWeight={500}
                fontSize='14px'
                bg='gray.100'
                p='5px 7px'
                rounded='2px 2px 0 0'
                borderBottomWidth={1}
              >
                <Box as='span' display={['none', 'none', 'inline']}>Get the latest { roadmap.featuredTitle } news from our sister site&nbsp;<Link href={'https://thenewstack.io?utm_source=roadmap-sh&utm_medium=Referral&utm_campaign=Banner'} target='_blank' textDecoration='underline' fontWeight={600}>TheNewStack.io <ExternalLinkIcon /></Link></Box>
                <Box as='span' display={['inline', 'inline', 'none']}>Get latest { roadmap.featuredTitle } news on &nbsp;<Link href={'https://thenewstack.io?utm_source=roadmap-sh&utm_medium=Referral&utm_campaign=Banner'} target={'_blank'} textDecoration='underline' fontWeight={600}>TheNewStack.io <ExternalLinkIcon /></Link></Box>
              </Text>
            )}
            <Text
              fontWeight={500}
              fontSize='14px'
              bg='white'
              p='5px 7px'
              rounded='3px'
            >
              <Badge pos='relative' top={'-1px'} mr='6px' colorScheme='yellow'>
                New
              </Badge>
              Resources are here, try clicking any nodes.
            </Text>
          </Box>
        )}
      </Container>
    </Box>
  );
}
