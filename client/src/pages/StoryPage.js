import React from "react";
import { Spinner } from "react-bootstrap";
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Story from "./../components/story";

export default function StoryPage() {
  return (
    <RenderStories />
  );
}

function RenderStories(){
  const { loading, error, data } = useQuery(gql`
    {
      allStories{
        title
        story_content
        id
      }
    }
  `);

  if (loading) return <Spinner animation="border" />;
  if (error) return <p>Error :(</p>;

  console.log(data);

  return data.allStories.map((props) => (
    <div key={props.id}>
      <Story {...props} />
    </div>
  ));
}