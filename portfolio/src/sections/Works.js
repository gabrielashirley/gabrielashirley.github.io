import React from 'react';
import PropTypes from 'prop-types';
import { Heading, Text, Flex, Box } from 'rebass/styled-components';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import Section from '../components/Section';
import { CardContainer, Card } from '../components/Card';
import Triangle from '../components/Triangle';
import ImageSubtitle from '../components/ImageSubtitle';

const Background = () => (
  <div>
    <Triangle
      color="secondaryLight"
      height={['80vh', '80vh']}
      width={['100vw', '100vw']}
      invertX
    />

    <Triangle
      color="background"
      height={['50vh', '20vh']}
      width={['50vw', '50vw']}
      invertX
    />

    <Triangle
      color="primaryDark"
      height={['25vh', '40vh']}
      width={['75vw', '60vw']}
      invertX
      invertY
    />

    <Triangle
      color="backgroundDark"
      height={['25vh', '20vh']}
      width={['100vw', '100vw']}
      invertY
    />
  </div>
);

const CoverImage = styled.img`
  width: 100%;
  object-fit: cover;
`;

const EllipsisHeading = styled(Heading)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-inline-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: horizontal;
  border-bottom: ${(props) => props.theme.colors.primary} 5px solid;
  font-size: 20px;
  font-weight: 1000;
`;

const Title = styled(Text)`
  font-size: 14px;
  font-weight: 1000;
  font-style: italic;
`;

const Work = ({
  company,
  title,
  description,
  url,
  startDate,
  endDate,
  logo
}) => (
  <a
    href={url}
    target="__blank"
    title={title}
    style={{ textDecoration: 'none' }}
  >
    <Card pb={4}>
      <EllipsisHeading m={3} p={1} color="text">
        {company}
      </EllipsisHeading>
      <Title m={3} color="text">
        {title}
      </Title>
      <CoverImage src={logo.image.src} height="200px" alt={logo.title} />
      <Text m={3} color="text">
        {description}
      </Text>
      <ImageSubtitle bg="primary" color="white" x="right" y="bottom" round>
        {startDate}
        {endDate ? ` - ${endDate}` : ' - PRESENT'}
      </ImageSubtitle>
    </Card>
  </a>
  );

Work.propTypes = {
  company: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  logo: PropTypes.shape({
    image: PropTypes.shape({
      src: PropTypes.string,
    }),
    title: PropTypes.string,
  }).isRequired,
  url: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired
};

const Works = () => (
  <Section.Container id="work" Background={Background}>
    <Section.Header name="Where I've worked" icon="≧◠ᴥ◠≦" label="work" />
    <StaticQuery
      query={graphql`
        query WorkQuery {
          contentfulAbout {
            works {
			        id
			        company
              title
              description
              url
              startDate(formatString: "MM/YY")
              endDate(formatString: "MM/YY")
              logo {
                title
                image: resize(quality: 100) {
                  src
                }
              }
            }
          }
        }
      `}
      render={({ contentfulAbout }) => (
        <CardContainer minWidth="300px">
          {contentfulAbout.works.map(({ Component, ...rest }) => (
            <Fade bottom key={rest.id}>
              <Work {...rest} key={rest.id} />
            </Fade>
          ))}
        </CardContainer>
      )}
    />
  </Section.Container>
);

export default Works