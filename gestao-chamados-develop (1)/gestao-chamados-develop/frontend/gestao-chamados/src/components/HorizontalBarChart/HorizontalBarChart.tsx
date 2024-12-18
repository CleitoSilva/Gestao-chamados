import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { FC } from 'react';

interface HorizontalBarsChartProps{
    series?:ApexOptions['series'];
    title?:string;
    legends:string[];
    barHeight?:number;
    limit?:number;
    name:string;
}
export const HorizontalBarsChart:FC<HorizontalBarsChartProps> = ({series, title, legends, limit=24, name}) => {
  const options = {
    colors:["#65dffa"],
    chart: {
      redrawOnWindowResize:true,
      redrawOnParentResize:true,
      toolbar:{
        show:false
      },
      id: 'basic-bar',
      type: 'bar',
      stacked: true
    },
    plotOptions: {
      bar: {
        barHeight:"60%",
        horizontal: true,
        colors: {
            ranges: 
            [
                {
                  from: limit, 
                  to: 1000,
                  color: '#E73636',
                }
            ],
            // backgroundBarOpacity:1
          },
      }
    },
    yaxis:{
      crosshairs:{
          show:true
      },
      axisBorder:{
        show:true
      },
        labels:{
            style:{
                colors:"#fff"
            }
        },
        axisTicks:{
          show:true,
            color:"#fff"
        },
    },
    tooltip:{
        theme:"dark"
    },
    xaxis: {
      categories:legends,
        labels:{
          show:true,
            style:{
                colors:"#fff"
            }
        },
        axisTicks:{
          show:true,
            color:"#fff"
        },
    },
    title: {
      text:title,
      align: 'center',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize:  '20px',
        color:  '#fff'
      },
    },
  } as ApexOptions;
  const formatedData = series &&  (series[0] as {data:number[]}).data
  // const formatedData = series &&  ({data:[200, 200, 300]} as {data:number[]}).data
  return (
    <div style={{width:"100%", height:"100%",  maxHeight:"96%"}}>
          <Chart
            options={options}
            series={[{name, data:formatedData as never  }]}
            type="bar"
            height="100%"
          />
    </div>
  );
}
