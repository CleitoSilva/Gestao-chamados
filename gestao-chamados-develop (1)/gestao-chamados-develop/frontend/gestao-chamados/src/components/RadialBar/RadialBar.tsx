import { ApexOptions } from 'apexcharts';
import { FC } from 'react';
import Chart from 'react-apexcharts';

interface RadialBarProps {
  inValue:number;
  outValue:number;
  undefinedValue:number;
}

const RadialBar:FC<RadialBarProps> = ({inValue, outValue, undefinedValue}) => {


    const total = inValue + outValue + undefinedValue

    const percentage = (inValue * 100)/total
      const options = {
        animations: {
          enabled: false
        },
        chart: {
          height: 350,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            startAngle: -90,
            endAngle: 270,
            track: {
                strokeWidth: '85%', // Ajusta a largura do contorno da barra radial
                margin: 15 // Margem entre o contorno e o círculo externo
              },
           
            dataLabels: {
              name: {
                fontSize: '22px',
                show:false
              },
              value: {
                formatter:()=>{
                  return `${inValue}/${total}`
                },
                show:true,
                fontSize: '36px',
                color:"#15D5FF",
                fontWeight:700,
              
              },
              total: {
                show: false,
              }
            }
          }
        },
        tooltip:{
          enabled:false,
        },
        
        fill: {
            colors:["#15D5FF"],
            opacity:0.1,
            type: 'gradient',
            gradient: {
              shade: 'dark',
              type: 'vertical',
              shadeIntensity: 0.5,
              gradientToColors: ['#022399'],
              inverseColors: false,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 100],  
            },
          },
        series: [percentage],
        stroke: {
            lineCap: 'round',
          },
         
      } as ApexOptions;
    
      return (
        <div>
          <Chart key={outValue || inValue || undefinedValue}  options={options} series={options.series} type="radialBar" height={350} />
        </div>
      );
    };
export  {RadialBar};