// Togglr FQA: https://v2.chakra-ui.com/docs/components/accordion/usage

import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from "@chakra-ui/react";

const About = () => {
    return (
        <div className="container">        
        <h1>About</h1>
        <p className="about_intro">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum leo nec purus sodales interdum. Quisque ante nibh, semper eu vulputate vel, facilisis eget tellus. Aenean dapibus augue orci, non laoreet dui porta dignissim. Nulla facilisi. Nam gravida nunc libero, id ullamcorper libero pellentesque sed. Praesent scelerisque quam lorem. Fusce at augue et leo vulputate egestas. Nunc cursus dui at porta semper. Donec eu hendrerit lacus. Maecenas vulputate fringilla eros, vitae rutrum nisl mattis at. In scelerisque sodales luctus. Maecenas dolor metus, imperdiet a urna vitae, egestas faucibus justo. Donec a ipsum vitae ligula tincidunt dictum. Aenean ut dui eget urna lacinia molestie quis at ex. In volutpat, justo a condimentum tempus, risus tellus efficitur erat, quis tincidunt libero mauris at eros.</p>

        <h2>FAQ</h2>
        <Accordion allowToggle reduceMotion={true}>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as='span' flex='1' textAlign='left'>
                  Section 1 title
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as='span' flex='1' textAlign='left'>
                  Section 2 title
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat. Maecenas vulputate fringilla eros, vitae rutrum nisl mattis at. In scelerisque sodales luctus. Maecenas dolor metus, imperdiet a urna vitae, egestas faucibus justo. 
            </AccordionPanel>
          </AccordionItem>
           <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as='span' flex='1' textAlign='left'>
                  Section 3 title
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        </div>
    );
  };
  
export default About
