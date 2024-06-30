import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highcharts';
import data from 'highcharts/modules/data';
import more from 'highcharts/highcharts-more';
import windbarb from 'highcharts/modules/windbarb';
import exports from 'highcharts/modules/export-data';
import exporting from 'highcharts/modules/exporting';

data(Highcharts);
exporting(Highcharts);
more(Highcharts);
windbarb(Highcharts);
exports(Highcharts);

@Component({
  selector: 'app-highcharts',
  templateUrl: './highcharts.component.html',
  styleUrls: ['./highcharts.component.scss']
})
export class HighchartsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.meteo();
    this.windRose();
    this.fourRow();
  }

  windRose() {
    //@ts-ignore
    Highcharts.chart('container', {
        data: {
            table: 'freq',
            startRow: 1,
            endRow: 17,
            endColumn: 7,
        },

        chart: {
            polar: true,
            type: 'column'
        },

        title: {
            text: 'Wind Rose Graph',
            align: 'left'
        },

        // subtitle: {
        //     text: 'www.windrose.com',
        //     align: 'left'
        // },

        pane: {
            size: '85%'
        },

        legend: {
            align: 'right',
            verticalAlign: 'top',
            y: 100,
            layout: 'vertical'
        },

        xAxis: {
            tickmarkPlacement: 'on'
        },

        yAxis: {
            min: 0,
            endOnTick: false,
            showLastLabel: true,
            title: {
                text: 'Frequency (%)'
            },
            labels: {
                format: '{value}%'
            },
            reversedStacks: false
        },

        tooltip: {
            valueSuffix: '%'
        },

        plotOptions: {
            series: {
                stacking: 'normal',
                shadow: false,
                groupPadding: 0,
                pointPlacement: 'on'
            }
        },

        credits: {
            enabled: false
        }
    });

}

meteo() {

    const data = [
        [4.9, 246],
        [4.1, 242],
        [3.2, 262],
        [1.5, 284],
        [1.1, 294],
        [0.4, 192],
        [0.2, 30],
        [1.1, 110],
        [1.4, 112],
        [2.1, 132],
        [1.6, 134],
        [1.5, 128],
        [0.7, 91],

        [0.9, 327],
        [0.5, 336],
        [0.4, 331],
        [1.4, 157]];

    //@ts-ignore
    Highcharts.chart('chart', {
        chart: {
            zoomType: 'xy',
        },
        title: {
            text: 'Average Monthly Weather Data for Tokyo',
            align: 'left'
        },
        subtitle: {
            text: 'Source: WorldClimate.com',
            align: 'left'
        },
        xAxis: [{
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            crosshair: true
        }],
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}°C',
                style: {
                    color: 'red'
                }
            },
            title: {
                text: 'Temperature',
                style: {
                    color: 'blue'
                }
            },
            opposite: true

        }, { // Secondary yAxis
            gridLineWidth: 0,
            title: {
                text: 'Rainfall',
                style: {
                    color: 'purple'
                }
            },
            labels: {
                format: '{value} mm',
                style: {
                    color: 'green'
                }
            }

        }, { // Tertiary yAxis
            gridLineWidth: 0,
            title: {
                text: 'Sea-Level Pressure',
                style: {
                    color: 'yellow'
                }
            },
            labels: {
                format: '{value} mb',
                style: {
                    color: 'orange'
                }
            },
            opposite: true
        },
        { // Primary yAxis
            labels: {
                format: '{value} %',
                style: {
                    color: 'black'
                }
            },
            title: {
                text: 'Humidity',
                style: {
                    color: 'blue'
                }
            },
            opposite: true

        }],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            x: 0,
            verticalAlign: 'bottom',
            y: 0,
            floating: false,
            backgroundColor: 'rgba(255,255,255,0.25)'
        },
        series: [{
            name: 'Rainfall',
            type: 'column',
            yAxis: 0,
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
            tooltip: {
                valueSuffix: ' mm'
            },
            events: {
                afterAnimate: function () {
                    this.points.forEach(function (point: any) {
                        var imageUrl = 'path/to/your/image.png';

                        // Add the image to the point's graphic
                        point.graphic.attr({
                            href: imageUrl,
                            width: 20, // Adjust the width as needed
                            height: 20 // Adjust the height as needed
                        });
                    });
                }
            }

        }, {
            name: 'Sea-Level Pressure',
            type: 'spline',
            yAxis: 1,
            data: [1016, 1016, 1015.9, 1015.5, 1012.3, 1009.5, 1009.6, 1010.2, 1013.1, 1016.9, 1018.2, 1016.7],
            marker: {
                enabled: false
            },
            dashStyle: 'shortdot',
            tooltip: {
                valueSuffix: ' mb'
            }

        }, {
            name: 'Temperature',
            yAxis: 2,
            type: 'spline',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
            tooltip: {
                valueSuffix: ' °C'
            }
        },
        {
            name: 'Humidity',
            type: 'spline',
            yAxis: 3,
            data: [27.0, 16.9, 89.5, 1.5, 1.2, 1.5, 45.2, 6.5, 2.3, 18.3, 3.9, 39.6],

            tooltip: {
                valueSuffix: ' %'
            }
        }
            , {
            type: 'windbarb',
            data: data,
            name: 'Wind',
            color: 'black',
            showInLegend: true,
            tooltip: {
                valueSuffix: ' m/s'
            }
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 8
                },
                chartOptions: {
                    legend: {
                        floating: true,
                        layout: 'horizontal',
                        align: 'left',
                        verticalAlign: 'bottom',
                        x: 0,
                        y: -6
                    },
                    yAxis: [{
                        labels: {
                            align: 'right',
                            x: 0,
                            y: 0
                        },
                        showLastLabel: false
                    }, {
                        labels: {
                            align: 'left',
                            x: 0,
                            y: -6
                        },
                        showLastLabel: false
                    }, {
                        visible: false
                    }]
                }
            }]
        },
        credits: {
            enabled: false
        },
        'plotOptions': {
            'spline': {
                'marker': {
                    enabled: false
                },
                'dataLabels': {
                    enabled: true,
                    formatter: function () {
                        // Replace label text with cloud emoji
                        return '<span>&#127783;</span>';
                    }
                }
            }
        }
    });


}

fourRow() {
    //@ts-ignore
    Highcharts.chart('charts', {
        chart: {
            zoomType: 'xy',
            events: {
                render: function () {
                    var chart: any = this,
                        arrowDirections = [45, -30, 60]; // Adjust this array dynamically based on your data

                    // Clear previous arrows
                    if (chart.customArrows) {
                        chart.customArrows.forEach(function (arrow: any) {
                            arrow.destroy();
                        });
                    }

                    chart.customArrows = [];

                    arrowDirections.forEach(function (direction, index) {
                        var point = chart.series[2].points[index], // Assuming the arrow series is the third one
                            x = chart.plotLeft + point.plotX,
                            y = chart.plotTop + point.plotY,
                            arrowPath = 'M ' + x + ' ' + y +
                                ' L ' + (x + 10) + ' ' + (y - 20) +
                                ' L ' + (x - 10) + ' ' + (y - 20) +
                                ' Z';

                        var arrow = chart.renderer.path(arrowPath)
                            .attr({
                                'stroke-width': 1,
                                stroke: 'black',
                                fill: 'black',
                                rotation: direction
                            })
                            .add();

                        chart.customArrows.push(arrow);
                    });
                }
            }
        },
        title: {
            text: 'Average Monthly Weather Data for Tokyo',
            align: 'left'
        },
        subtitle: {
            text: 'Source: WorldClimate.com',
            align: 'left'
        },
        xAxis: [{
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            crosshair: true
        }],
        yAxis: [
            { // Primary yAxis
                labels: {
                    format: '{value} %',
                    style: {
                        color: 'black'
                    }
                },
                title: {
                    text: 'Humidity',
                    style: {
                        color: 'blue'
                    }
                },
                opposite: true

            }],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            x: 0,
            verticalAlign: 'bottom',
            y: 0,
            floating: false,
            backgroundColor: 'rgba(255,255,255,0.25)'
        },
        series: [
            {
                name: 'Humidity',
                type: 'spline',
                yAxis: 0,
                data: [27.0, 16.9, 89.5, 1.5, 1.2, 1.5, 45.2, 6.5, 2.3, 18.3, 3.9, 39.6],

                tooltip: {
                    valueSuffix: ' %'
                }
            }
        ],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 8
                },
                chartOptions: {
                    legend: {
                        floating: true,
                        layout: 'horizontal',
                        align: 'left',
                        verticalAlign: 'bottom',
                        x: 0,
                        y: -6
                    },
                    yAxis: [{
                        labels: {
                            align: 'right',
                            x: 0,
                            y: 0
                        },
                        showLastLabel: false
                    }, {
                        labels: {
                            align: 'left',
                            x: 0,
                            y: -6
                        },
                        showLastLabel: false
                    }, {
                        visible: false
                    }]
                }
            }]
        },
        credits: {
            enabled: false
        },

        plotOptions: {
            spline: {
                marker: {
                    enabled: false
                },
                dataLabels: {
                    enabled: true,
                    formatter: function () {
                        var directionIndex = this.point.index;
                        var arrowDirections = [67, 90, 45, 90, 32, 54, 98, 12]; // Adjust this array dynamically based on your data
                        var direction = arrowDirections[directionIndex];

                        // Customize the data label format based on the arrow direction
                        var arrowSymbol = getArrowSymbol(direction);

                        // Return the formatted content
                        return '<span style="font-size: 14px;">' + arrowSymbol + '</span>';
                    }
                }
            }
        }
    });

    function getArrowSymbol(direction: any) {
        // Customize this function based on your requirements

        // Example: Check multiple ranges for direction values
        if (direction > 0 && direction <= 45) {
            return '&UpArrow;';
        } else if (direction > 45 && direction <= 90) {
            return '&UpperRightArrow;';
        } else if (direction > 90 && direction <= 135) {
            return '&RightArrow;';
        } else if (direction > 135 && direction <= 180) {
            return '&LowerRightArrow;';
        } else if (direction > -45 && direction <= 0) {
            return '&DownArrow;';
        } else if (direction > -90 && direction <= -45) {
            return '&LowerLeftArrow;';
        } else if (direction > -135 && direction <= -90) {
            return '&LeftArrow;';
        } else if (direction >= -180 && direction <= -135) {
            return '&UpperLeftArrow;';
        } else {
            return '';
        }
    }

}

}
