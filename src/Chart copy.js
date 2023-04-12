
import React from "react";
import ReactApexChart from "react-apexcharts";
import dayjs from 'dayjs';


class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      series: [{
        name: 'candle',
        data: props.data 
      }],
      
      options: {
        
        chart: {
          height: 350,
          type: 'candlestick',
        },
        title: {
          text: 'CandleStick Chart - Category X-axis',
          align: 'left'
        },
        annotations: {
          
          xaxis: [
            {
              x: 'Oct 06 14:00',
              borderColor: '#00E396',
              label: {
                borderColor: '#00E396',
                style: {
                  fontSize: '12px',
                  color: '#fff',
                  background: '#00E396'
                },
                orientation: 'horizontal',
                offsetY: 7,
                text: 'Annotation Test'
              }
            }
          ]
        },
        tooltip: {
          enabled: true,
        },
        xaxis: {
          type: 'category',
          labels: {
            formatter: function (val) {
              return dayjs(val).format('MMM DD HH:mm')
            }
          },
          minBarWidth: 10
        },
        yaxis: {
          tooltip: {
            enabled: true,
           
          }
        }
      },


    };
  }

  render() {
    console.log('Dados do gráfico:', this.props.data);
  
    return (
      <div id="chart">
        {this.props.data.length > 0 && (
          <ReactApexChart options={this.state.options} series={this.state.series} type="candlestick" height={350} />
        )}
      </div>
    );
  }
  
}


export default ApexChart;