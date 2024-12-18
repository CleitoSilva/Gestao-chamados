
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import { FC } from 'react';

interface VerticalChartBarProps{
    series?:ApexOptions['series']
    title?:string;
    lagends?:string[];
    columnWidth?:number;
    limit?:number;
}

export const VerticalChartBar:FC<VerticalChartBarProps> = ({series, title, lagends, columnWidth=60, limit=24}) => {
    const options:ApexOptions = {
        colors:["#58C3DC"],
        chart: {
          redrawOnWindowResize:true,
          redrawOnParentResize:true,
          toolbar:{
            show:false
          },
          id: 'basic-bar',
          type: 'bar',
          height: 350,
        },
        title:{
            text:title ||"Titulo",
            style:{
                color:"#fff"
            }
        },
        plotOptions: {
          bar: {
            columnWidth,
            horizontal: false,
            colors: {
                ranges: 
                [
                    {
                        from: limit, 
                        to: 1000,
                        color: '#E73636',
                    }
                ]
        },
          }
        },
        tooltip:{
            theme:"dark"
        },
        yaxis:{
            labels:{
                show:false,
                style:{
                    colors:"#fff"
                }
            },
            axisTicks:{
                color:"#fff"
            },
        },
        xaxis: {
            type:"category",
            // categories:lagends,
            labels:{
                style:{
                    colors:"#fff"
                },
            },
            axisTicks:{
                color:"#fff",
            },

          categories: lagends
        },
        // fill:{
        //     type: 'gradient',
        //     gradient: {
        //       shade: 'light',
        //       type: 'vertical',
        //       shadeIntensity: 0.5,
        //       gradientToColors: ['#008FFB'],
        //       inverseColors: false,
        //       opacityFrom: 1,
        //       opacityTo: 0.8,
        //       stops: [0, 100]
        //     }
        // }
      }; 

      return (
        <div style={{height:"100%", width:"100%", maxWidth:"96%", maxHeight:"96%"}}>
            <Chart
              options={options}
              series={series}
              type="bar"
              height="100%"
              width="100%"
            />
        </div>
      );
}
