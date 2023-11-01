import { Card, Col, Row } from 'react-bootstrap';
import React from 'react';
import * as anychart from 'anychart'
//import '../../JQuery/jqueryloader';
import wordcloudData from './ChartsData';

const WordCloud = () => {
React.useEffect(()=>{
 // wordcloud anychart
 const getWordCloudResult = () => {
    const wordclouddatas = wordcloudData();
      // eslint-disable-next-line no-undef
      $('#anychart').empty();
      // create a tag (word) cloud chart
      var chart = anychart.tagCloud(wordclouddatas);
        // set a chart title
      chart.title('Top 5 Branches')
      // display the word cloud chart
      chart.container("anychart");
      chart.draw();
  }
  getWordCloudResult();
  // wordcloud anychart end
},[])
  return (
    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className='py-3'>
    <Card className="no-shadow card_layout border-top">
    <Card.Header className="listing_header">
    <Row>
    <Col xs={6} xm={6} md={6} lg={6} xl={6} xxl={6}>
    Top 5 Branches
    </Col>
    <Col xs={6} xm={6} md={6} lg={6} xl={6} xxl={6}>
    {/*  */}
    </Col>
    </Row>
    </Card.Header>
    <Card.Body>
    <div id='anychart'></div>
    </Card.Body>
    </Card>
    </Col>
  )
}

export default WordCloud