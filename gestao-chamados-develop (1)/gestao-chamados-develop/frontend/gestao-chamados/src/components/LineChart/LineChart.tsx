import { ApexOptions } from 'apexcharts';
import { FC } from 'react';
import ReactApexChart from 'react-apexcharts';

interface LineChartProps{
  chartData?:ApexOptions["series"]
  chartLegend?:string[]
}

export const LineChart:FC<LineChartProps> = ({chartData, chartLegend}) => {
  const options = {
    chart: {
      id: 'line-chart',
      toolbar:{
        show:false
      },
      redrawOnWindowResize:true,
      redrawOnParentResize:true,
      animations:{
         enabled:false
      },
      width: '100%',
    },
    xaxis: {
      categories:chartLegend,
      colors:"#fff",
      axisTicks:{
         color:"#fff"
      },
      labels:{
        offsetY:2,
        style:{
            colors:"#fff"
        }
      }
    },
    yaxis:{
        axisTicks:{
            color:"#fff"
         },
         labels:{
           style:{
               colors:"#fff"
           }
         }
    },
    legend:{
        position:"top",
        labels:{
            colors:"#fff"
        }
    },
    tooltip:{
      theme:"dark"
    }

  } as ApexOptions;

  return (  
    <div style={{width:"98%" , height:"100%", maxHeight:1000}}>
        <ReactApexChart options={options} series={chartData || [0]} type="line" height="100%"/>
    </div>
  );
};
