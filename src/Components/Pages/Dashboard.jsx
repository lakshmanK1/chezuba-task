import React from 'react'
import BarChart from '../Echarts/BarChart'
import WordCloud from '../Echarts/WordCloud'
import { getBarchartData, getBarchartDataTwo } from '../Echarts/ChartsData'

function Dashboard() {
  return (
    <React.Fragment>
        <BarChart getBarchartData={getBarchartData} title='All Food Items'/>
        <BarChart getBarchartData={getBarchartDataTwo} title='Order Status'/>
        <WordCloud/>
    </React.Fragment>
  )
}


export default Dashboard