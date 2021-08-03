import { Bar } from 'react-chartjs-2';
import { Grid } from '@material-ui/core';

export const BarChartWithFilteredData = (props) => {
    let data = props['data']
    let key = Object.keys(props['data'])
    return (
      <Grid container xs={12}>
        {key.map(item => (
          <Grid container item xs={12}>
            <Grid item xs={12}>
              <Bar
                height='100px'
                //width='10px'
                type='bar'
                data={{'labels':data[item]['labels'],'datasets':[{'data':data[item]['value'],'label':data[item]['filter'][0],'backgroundColor':'red',}]}}
                options={{
                  indexAxis: 'y',
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: true,
                      text: item
                    },
                    scales: {
                      x: {
                            width: 2
                    
                    },
                      y: {
                        barThickness: 1,
                        stacked: true
                      }
                    }
                  }
                }}
              />
            </Grid>
          </Grid>
  
        ))
        } </Grid>
    )
  }
  
  export const BarChartWithPlainFilteredData = (props) => {
    let data = props['data']
    let labels = props['labels']
    return (
        <Bar
            height='250px'
            type='bar'
            data={{ 'labels': labels, 'datasets': data }}
            options={{
                indexAxis: 'x',
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                    },
                    scales: {
                        x: {
                            width: 2

                        },
                        y: {
                            barThickness: 1,
                            stacked: true
                        }
                    }
                }
            }}
        />
    )
}
  