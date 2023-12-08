import * as React from 'react';
import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useTranslation } from 'react-i18next';

function BarChart() {
  const {t, i18n} = useTranslation("common");
  useEffect(() => {
    const lang = localStorage.getItem('lang');
    if (lang === 'Arabic') {
      i18n.changeLanguage('ar')
    } else {
      i18n.changeLanguage('en')
    }
  }, [i18n]);

    const options1 =() => ({
      
      chart: {
        type: 'column',
        height: '300px',
      },
      title: {
        text: t('chart.title1'),
        style: {
          fontWeight: 'normal',
          fontSize: '16px',
        }
      },
      series: [{
        name: 'Norway',
        data: [148, 133, 124],
        stack: 'Europe'
    }, {
        name: 'Germany',
        data: [102, 98, 65],
        stack: 'Europe'
    }, {
        name: 'United States',
        data: [113, 122, 95],
        stack: 'North America'
    }]  
  });
    return (
      <>
      
      {/* highchart part */}
        <div> 
            <HighchartsReact  highcharts={Highcharts} options={options1()} />
        </div>
      </>
    );
  }
  export default BarChart;