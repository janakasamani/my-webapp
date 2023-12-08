import * as React from 'react';
import { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useTranslation } from 'react-i18next';

function PieChart() {
    const {t, i18n} = useTranslation("common");
  useEffect(() => {
    const lang = localStorage.getItem('lang');
    if (lang === 'Arabic') {
      i18n.changeLanguage('ar')
    } else {
      i18n.changeLanguage('en')
    }
  }, [i18n]);

    const options2 =() => ( {
        chart: {
          type: 'pie',
          height: '300px',
          
      },
      title: {
          text: t('chart.title3'),
          style: {
            fontWeight: 'normal',
            fontSize: '16px',
          }
      },
      tooltip: {
          valueSuffix: '%'
      },
      plotOptions: {
          series: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: [{
                  enabled: true,
                  distance: 20
              }, {
                  enabled: true,
                  distance: -40,
                  format: '{point.percentage:.1f}%',
                  style: {
                      fontSize: '1.2em',
                      textOutline: 'none',
                      opacity: 0.7
                  },
                  filter: {
                      operator: '>',
                      property: 'percentage',
                      value: 10
                  }
              }]
          }
      },
      series: [
          {
              name: 'Percentage',
              colorByPoint: true,
              data: [
                  {
                      name: 'Germany',
                      y: 55.02
                  },
                  {
                      name: 'US',
                      sliced: true,
                      selected: true,
                      y: 26.71
                  },
                  {
                      name: 'Norway',
                      y: 2.1
                  }
              ]
          }
      ]
      });
    return (
      <>
      
      {/* highchart part */}
        <div> 
            <HighchartsReact  highcharts={Highcharts} options={options2()} />
        </div>
      </>
    );
  }
  export default PieChart;