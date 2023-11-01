import React from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import ReactEcharts from "echarts-for-react";
// import '@/JQuery/jqueryloader';

let option1;
var app = {};

// eslint-disable-next-line react/prop-types
const BarChart = ({getBarchartData, title}) => {
    // Echarts Barchart 
    const [apiData1, setapiData1] = React.useState();
    const series = apiData1?.map((item)=>({
    name: item?.name,
    data: item?.data,
    }))
    app.config = {
    rotate: 67,
    align: 'right',
    verticalAlign: 'middle',
    position: 'bottom',
    distance: 6,
    };
    const labelOption = {
    show: true,
    position: app.config.position,
    distance: app.config.distance,
    align: app.config.align,
    verticalAlign: app.config.verticalAlign,
    rotate: app.config.rotate,
    formatter: '{c}  {name|{a}}',
    fontSize: 12,
    rich: {
    name: {
        color: '#0066cc',
        fontSize: 12,
    },
    }
    };
    option1 = {
    tooltip: {
    trigger: 'axis',
    axisPointer: {
        type: 'shadow'
    }
    },
    legend: {
    data: series?.map(item => item?.name),
    top:"2%",
    },
    toolbox: {
    show: true,
    orient: 'vertical',
    left: 'right',
    top: 'center',
    feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['bar', 'line'] },
        restore: { show: true },
        saveAsImage: {
            type: "png"
        }
    }
    },
    xAxis: [
    {
        type: 'category',
        axisTick: { show: false },
        data: ['', '', '', '', ''],
        boundaryGap: true,
        triggerEvent : true
    },
    ],
    yAxis: [
    {
        type: 'value',
    }
    ],
    series: series?.map((item) => Object.assign(item, {
    type: 'bar',
    label: labelOption,
    }))
    };
    const onBarChartClick = (params) => {
    console.log('BarChart clicked', params);
    };
    // Echart Barchart end
    // Echarts events
    const onEvents = {
      click: onBarChartClick,
    };
    // Echarts events end
  React.useEffect(()=>{
    // Echarts Barchart 
    const getBarChartResult = () => {
        // ⚠️ This is where you should pull data in from your server
        const barchartResultsResponse = getBarchartData();
        setapiData1(barchartResultsResponse);
    };
    getBarChartResult();
    // Echarts Barchart end
  },[])
  return (
    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className='py-3'>
    <Card className="no-shadow card_layout border-top">
    <Card.Header className="listing_header">
    <Row>
    <Col xs={6} xm={6} md={6} lg={6} xl={6} xxl={6}>
      {title}
    </Col>
    {/* <Col xs={6} xm={6} md={6} lg={6} xl={6} xxl={6}>

    </Col> */}
    </Row>
    </Card.Header>
    <Card.Body>
    <ReactEcharts option={option1} onEvents={onEvents}/>
    </Card.Body>
    </Card>
    </Col>
  )
}

export default BarChart