import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import dayjs from 'dayjs';

function ApexChart(props) {
  const [series, setSeries] = useState([{ name: 'candle', data: props.data }]);

  useEffect(() => {
    setSeries([{ name: 'candle', data: props.data }]);
    console.log("Novos dados recebidos no ApexChart:", props.data);
  }, [props.data]);

  const options = {
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
  };

  console.log("Dados usados no gráfico:", series);

  return (
    <div id="chart">
      {props.data.length > 0 && (
        <ReactApexChart options={options} series={series} type="candlestick" height={350} />
      )}
    </div>
  );
}

export default ApexChart;
