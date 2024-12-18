import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import { FC } from 'react';

interface GroupedStackedColumnsChartProps{
  values:{label:string ; in:number, out:number, undefinedRange:number}[]
}

const GroupedStackedColumnsChart:FC<GroupedStackedColumnsChartProps> = ({values}) => {
  const options = {
    chart: {
      type: 'bar',
      stacked: true,
      stackType: 'normal',
      toolbar:{
        show:false
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth:110,
      },
    },
    xaxis: {
        labels:{
          rotate:90,
          offsetX:-40,
          offsetY:0,
          maxHeight:15,
          rotateAlways:true,
          style:{colors:"#FFFFFF", fontSize:"20px", fontWeight:700}
        },
        tooltip:{
            enabled:false
        },
        crosshairs:{
            show:false
        },
      categories: values.map(value=>value?.label),
      axisBorder:{
        show:false
      },
        axisTicks:{
        show:false
      }
  },
    yaxis: {
      // title: {
      //   text: 'Valores',
      // },
      labels:{
        show:false
      },
      axisBorder:{
        show:false
      },
        axisTicks:{
    show:false
    }
    },
    legend: {
      position: 'top',
      show:false
    },
    grid:{
        show:false
    },
    dataLabels:{
        style:{
          fontSize:"20px",
          colors:["#FFFFFF"],
          fontWeight:700
        }
    },
    tooltip:{
      enabled:false,
    },
    fill:{
      type:"gradient",
      gradient:{
        type: 'vertical',
        gradientToColors:['#39DBFF', '#E73636','#FFC524'],
        shadeIntensity: 0.2,
        stops: [40, 100]
      },
      colors: ['#228499', '#811E1E', '#917014'],
    }
  } as ApexOptions;

  const series = [
    {
      name: 'Dentro',
      data:values?.map(value=>value?.in),
    },
    {
      name: 'Fora',
      data:values?.map(value=>value?.out),
    },
    {
      name: 'Indefinido',
      data:values?.map(value=>value?.undefinedRange),
    },
  ]; 

  return (
    <div>
      <Chart options={options} series={series} type="bar" height={400} />
    </div>
  );
};

export default GroupedStackedColumnsChart;